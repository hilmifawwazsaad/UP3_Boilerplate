import type { HttpContext } from '@adonisjs/core/http'
import { client, code_challenge, code_verifier, generators } from '#config/oidc'

import db from '@adonisjs/lucid/services/db'
import env from '#start/env'
import PegawaiITS from '#models/pegawai_its'
import { selectFirstLogin, updateAuthConfig } from '#services/auth'

class ResourceController {
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.reflash()
    return response.json({ status: 'ok' })
  }
}

class SSOAuthController extends ResourceController {
  async ssoLogin({ response, inertia }: HttpContext) {
    const state = generators.state()
    try {
      const authorizationUrl = client.authorizationUrl({
        scope: 'openid profile',
        resource: env.get('SSO_RESOURCE') as string,
        code_challenge,
        state,
        code_challenge_method: 'S256',
      })
      response.redirect(authorizationUrl)
    } catch (error) {
      return inertia.render('errors/oidc_error', {
        meta: {
          error: error,
        },
      })
    }
  }

  async ssoLoginRedirect({ request, auth, response, session, inertia }: HttpContext) {
    try {
      const params = client.callbackParams(request.request)
      const state = params.state

      const tokenSet = await client.callback(env.get('SSO_REDIRECT_URI'), params, {
        code_verifier,
        state,
      })
      const claims = tokenSet.claims()
      const ssoId = claims.sub

      const user = await PegawaiITS.query().preload('users').where('sso_id', ssoId).first()

      if (!user) {
        return response.redirect('/login-error')
      }

      if (user.users.length == 0) {
        return response.badRequest({ status: 'error' })
      }

      const id_jabatan = selectFirstLogin(user)
      session.put('auth_config', {
        current: id_jabatan,
        mode: 'auth',
        origin: { id_jabatan: id_jabatan, sso_id: ssoId },
      })
      await auth.use('web').login(user)

      const nextRedirect = session.get('nextRedirect')
      session.forget('nextRedirect')

      // Save Log if exist

      if (nextRedirect) {
        return response.redirect(nextRedirect)
      }

      return response.redirect('/login-sso')
    } catch (error) {
      return inertia.render('errors/oidc_error', {
        meta: {
          error: error,
        },
      })
    }
  }
}

class GhostAuthController extends SSOAuthController {
  async ghostLogin({ request, auth, response, session }: HttpContext) {
    try {
      const { username, password } = request.all()

      let user = await PegawaiITS.query()
        .preload('users')
        .whereHas('users', (qb) => {
          qb.where('nip', username)
          qb.where('password', password)
        })
        .firstOrFail()

      if (user.users.length == 0) {
        return response.badRequest({ status: 'error' })
      }

      const id_jabatan = selectFirstLogin(user)

      session.put('auth_config', {
        current: id_jabatan,
        mode: 'auth',
        origin: { id_jabatan: id_jabatan, sso_id: user.sso_id },
      })

      await auth.use('web').login(user)

      // Save Log if exist

      return response.send({ status: 'ok' })
    } catch (error) {
      return response.badRequest({ status: 'error' })
    }
  }
}

class ImpersonateController extends GhostAuthController {
  async impersonateLogin({ request, response, session, auth }: HttpContext) {
    try {
      const { id, ssoid } = request.all()

      const user = await PegawaiITS.query()
        .preload('users', (qb) => {
          qb.preload('jabatan')
          qb.whereHas('jabatan', (qb) => {
            qb.where('id_jabatan', id)
          })
        })
        .where('sso_id', ssoid)
        .firstOrFail()

      if (id != 570) {
        // Save Log if exist

        updateAuthConfig(session, {
          current: id,
          mode: 'impersonate',
        })
      } else {
        // Save Log if exist

        session.put('auth_config', {
          current: id,
          mode: 'auth',
          origin: { id_jabatan: id, sso_id: user.sso_id },
        })
      }

      await auth.use('web').login(user)

      return response.ok({ status: 'ok' })
    } catch (error) {
      console.log(error)

      // Save Log if exist

      return response.badRequest({ status: 'User tidak ditemukan' })
    }
  }

  async endImpersonate({ response, session, auth }: HttpContext) {
    const trx = await db.transaction()
    try {
      // Save Log if exist

      const auth_config = session.get('auth_config')
      const origin = auth_config.origin

      const user = await PegawaiITS.query()
        .preload('users', (qb) => {
          qb.preload('jabatan')
          qb.whereHas('jabatan', (qb) => {
            qb.where('id_jabatan', origin.id_jabatan)
          })
        })
        .where('sso_id', origin.sso_id)
        .firstOrFail()

      await auth.use('web').login(user)

      updateAuthConfig(session, {
        current: origin.id_jabatan,
        mode: 'auth',
      })

      trx.commit()
      return response.ok({ status: 'ok' })
    } catch (error) {
      console.log(error)
      trx.rollback()
      // Save Log if exist

      return response.badRequest({ status: 'error' })
    }
  }
}

export default class AuthController extends ImpersonateController {
  async ghostLoginIndex({ inertia }: HttpContext) {
    return inertia.render('auth/LoginGhostView', {})
  }

  async ssoLoginIndex({ inertia, request, response }: HttpContext) {
    const code = request.input('code')

    if (code) {
      const queryString = request.qs()

      return response.redirect().toRoute(
        env.get('NODE_ENV') !== 'development' ? 'auth.callback.production' : 'auth.callback',
        {},
        {
          qs: queryString,
        }
      )
    }

    return inertia.render('auth/LoginSSOView', {})
  }

  async ssoRedirectLoginIndex({ inertia }: HttpContext) {
    return inertia.render('auth/LoginSSORedirectView', {})
  }
}

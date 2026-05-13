import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import AuthMiddleware from './auth_middleware.js'
const middleware = new AuthMiddleware()

export default class AdminMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(ctx: HttpContext, next: NextFn) {
    await middleware.handle(ctx, next)

    const idjabatan = ctx.session.get('auth_config')?.origin?.id_jabatan

    if (idjabatan == 570) {
      return next()
    }

    return ctx.response.redirect('/')
  }
}

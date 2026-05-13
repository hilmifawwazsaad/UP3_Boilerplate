import router from '@adonisjs/core/services/router'
import { group, middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
const { guest, auth, admin } = middleware

const AuthController = controllers.auth.Auth

group(() => {
  router.get('/ghost', [AuthController, 'ghostLoginIndex'])
  router.post('/login/ghost', [AuthController, 'ghostLogin'])
}).use(guest())

group(() => {
  router.get('/login', [AuthController, 'ssoLoginIndex'])
  router.get('/login/oidc', [AuthController, 'ssoLogin'])
}).use(guest())

group(() => {
  router.get('/auth/callback', [AuthController, 'ssoLoginRedirect']).as('auth.callback')
  router
    .get('/api/login/oidc/callback', [AuthController, 'ssoLoginRedirect'])
    .as('auth.callback.production')
}).use(guest())

group(() => {
  router.get('/login-sso', [AuthController, 'ssoRedirectLoginIndex'])
  router.post('/auth/logout', [AuthController, 'logout'])
}).use(auth())

group(() => {
  router.post('/auth/impersonate', [AuthController, 'impersonateLogin'])
  router.post('/auth/impersonate/end', [AuthController, 'endImpersonate'])
}).use([auth(), admin()])

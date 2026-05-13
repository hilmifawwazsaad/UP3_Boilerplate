import env from '#start/env'
import { BaseClient, Issuer, generators, custom } from 'openid-client'

custom.setHttpOptionsDefaults({
  timeout: 60000,
})

const code_verifier = generators.codeVerifier()
const code_challenge = generators.codeChallenge(code_verifier)

let client: BaseClient
 
Issuer.discover(env.get('SSO_RESOURCE') as string)
  .then((issuer: any) => {
    client = new issuer.Client({
      client_id: env.get('SSO_CLIENT_ID') as string,
      client_secret: env.get('SSO_CLIENT_SECRET') as string,
      redirect_uris: [env.get('SSO_REDIRECT_URI') as string],
      response_types: ['code'],
    })
    console.log('✅ OIDC issuer ditemukan:', issuer.issuer)
  })
  .catch((err: any) => {
    console.error('❌ Failed to discover issuer:', err)
  })

export { client, code_challenge, code_verifier, generators }

import env from '#start/env'
import { defineConfig, drivers } from '@adonisjs/core/encryption'

const encryptionConfig = defineConfig({
  /**
   * Default encryption driver used by the application.
   */
  default: 'gcm',

  list: {
    gcm: drivers.aes256gcm({
      id: 'gcm',
      keys: [env.get('APP_KEY')],
    }),
    chacha: drivers.chacha20({
      id: 'chacha',
      keys: [env.get('APP_KEY')],
    }),
  },
})

export default encryptionConfig

/**
 * Inferring types for the list of encryptors you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface EncryptorsList extends InferEncryptors<typeof encryptionConfig> {}
}

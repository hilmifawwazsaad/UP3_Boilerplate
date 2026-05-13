/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    ghostLoginIndex: typeof routes['auth.ghost_login_index']
    ghostLogin: typeof routes['auth.ghost_login']
    ssoLoginIndex: typeof routes['auth.sso_login_index']
    ssoLogin: typeof routes['auth.sso_login']
    callback: typeof routes['auth.callback'] & {
      production: typeof routes['auth.callback.production']
    }
    ssoRedirectLoginIndex: typeof routes['auth.sso_redirect_login_index']
    logout: typeof routes['auth.logout']
  }
  example: typeof routes['example']
  test: typeof routes['test']
  testPost: typeof routes['test-post']
  testPut: typeof routes['test-put']
  testDelete: typeof routes['test-delete']
  tipTapUploader: {
    storeImage: typeof routes['tip_tap_uploader.store_image']
    destroyImage: typeof routes['tip_tap_uploader.destroy_image']
  }
  nextcloud: {
    upload: typeof routes['nextcloud.upload']
    remove: typeof routes['nextcloud.remove']
  }
}

import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.ghost_login_index': { paramsTuple?: []; params?: {} }
    'auth.ghost_login': { paramsTuple?: []; params?: {} }
    'auth.sso_login_index': { paramsTuple?: []; params?: {} }
    'auth.sso_login': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.callback.production': { paramsTuple?: []; params?: {} }
    'auth.sso_redirect_login_index': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'example': { paramsTuple?: []; params?: {} }
    'test': { paramsTuple?: []; params?: {} }
    'test-post': { paramsTuple?: []; params?: {} }
    'test-put': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'test-delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tip_tap_uploader.store_image': { paramsTuple?: []; params?: {} }
    'tip_tap_uploader.destroy_image': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
    'nextcloud.upload': { paramsTuple?: []; params?: {} }
    'nextcloud.remove': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.ghost_login_index': { paramsTuple?: []; params?: {} }
    'auth.sso_login_index': { paramsTuple?: []; params?: {} }
    'auth.sso_login': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.callback.production': { paramsTuple?: []; params?: {} }
    'auth.sso_redirect_login_index': { paramsTuple?: []; params?: {} }
    'example': { paramsTuple?: []; params?: {} }
    'test': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.ghost_login_index': { paramsTuple?: []; params?: {} }
    'auth.sso_login_index': { paramsTuple?: []; params?: {} }
    'auth.sso_login': { paramsTuple?: []; params?: {} }
    'auth.callback': { paramsTuple?: []; params?: {} }
    'auth.callback.production': { paramsTuple?: []; params?: {} }
    'auth.sso_redirect_login_index': { paramsTuple?: []; params?: {} }
    'example': { paramsTuple?: []; params?: {} }
    'test': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.ghost_login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'test-post': { paramsTuple?: []; params?: {} }
    'tip_tap_uploader.store_image': { paramsTuple?: []; params?: {} }
    'nextcloud.upload': { paramsTuple?: []; params?: {} }
    'nextcloud.remove': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'test-put': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'test-delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tip_tap_uploader.destroy_image': { paramsTuple: [ParamValue]; params: {'filename': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
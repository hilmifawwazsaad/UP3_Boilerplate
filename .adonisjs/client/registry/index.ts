/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.ghost_login_index': {
    methods: ["GET","HEAD"],
    pattern: '/ghost',
    tokens: [{"old":"/ghost","type":0,"val":"ghost","end":""}],
    types: placeholder as Registry['auth.ghost_login_index']['types'],
  },
  'auth.ghost_login': {
    methods: ["POST"],
    pattern: '/login/ghost',
    tokens: [{"old":"/login/ghost","type":0,"val":"login","end":""},{"old":"/login/ghost","type":0,"val":"ghost","end":""}],
    types: placeholder as Registry['auth.ghost_login']['types'],
  },
  'auth.sso_login_index': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.sso_login_index']['types'],
  },
  'auth.sso_login': {
    methods: ["GET","HEAD"],
    pattern: '/login/oidc',
    tokens: [{"old":"/login/oidc","type":0,"val":"login","end":""},{"old":"/login/oidc","type":0,"val":"oidc","end":""}],
    types: placeholder as Registry['auth.sso_login']['types'],
  },
  'auth.callback': {
    methods: ["GET","HEAD"],
    pattern: '/auth/callback',
    tokens: [{"old":"/auth/callback","type":0,"val":"auth","end":""},{"old":"/auth/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['auth.callback']['types'],
  },
  'auth.callback.production': {
    methods: ["GET","HEAD"],
    pattern: '/api/login/oidc/callback',
    tokens: [{"old":"/api/login/oidc/callback","type":0,"val":"api","end":""},{"old":"/api/login/oidc/callback","type":0,"val":"login","end":""},{"old":"/api/login/oidc/callback","type":0,"val":"oidc","end":""},{"old":"/api/login/oidc/callback","type":0,"val":"callback","end":""}],
    types: placeholder as Registry['auth.callback.production']['types'],
  },
  'auth.sso_redirect_login_index': {
    methods: ["GET","HEAD"],
    pattern: '/login-sso',
    tokens: [{"old":"/login-sso","type":0,"val":"login-sso","end":""}],
    types: placeholder as Registry['auth.sso_redirect_login_index']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'example': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['example']['types'],
  },
  'test': {
    methods: ["GET","HEAD"],
    pattern: '/test',
    tokens: [{"old":"/test","type":0,"val":"test","end":""}],
    types: placeholder as Registry['test']['types'],
  },
  'test-post': {
    methods: ["POST"],
    pattern: '/test',
    tokens: [{"old":"/test","type":0,"val":"test","end":""}],
    types: placeholder as Registry['test-post']['types'],
  },
  'test-put': {
    methods: ["PUT"],
    pattern: '/test/:id',
    tokens: [{"old":"/test/:id","type":0,"val":"test","end":""},{"old":"/test/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['test-put']['types'],
  },
  'test-delete': {
    methods: ["DELETE"],
    pattern: '/test/:id',
    tokens: [{"old":"/test/:id","type":0,"val":"test","end":""},{"old":"/test/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['test-delete']['types'],
  },
  'tip_tap_uploader.store_image': {
    methods: ["POST"],
    pattern: '/webdav/resources/tiptap/images',
    tokens: [{"old":"/webdav/resources/tiptap/images","type":0,"val":"webdav","end":""},{"old":"/webdav/resources/tiptap/images","type":0,"val":"resources","end":""},{"old":"/webdav/resources/tiptap/images","type":0,"val":"tiptap","end":""},{"old":"/webdav/resources/tiptap/images","type":0,"val":"images","end":""}],
    types: placeholder as Registry['tip_tap_uploader.store_image']['types'],
  },
  'tip_tap_uploader.destroy_image': {
    methods: ["DELETE"],
    pattern: '/webdav/resources/tiptap/images/:filename',
    tokens: [{"old":"/webdav/resources/tiptap/images/:filename","type":0,"val":"webdav","end":""},{"old":"/webdav/resources/tiptap/images/:filename","type":0,"val":"resources","end":""},{"old":"/webdav/resources/tiptap/images/:filename","type":0,"val":"tiptap","end":""},{"old":"/webdav/resources/tiptap/images/:filename","type":0,"val":"images","end":""},{"old":"/webdav/resources/tiptap/images/:filename","type":1,"val":"filename","end":""}],
    types: placeholder as Registry['tip_tap_uploader.destroy_image']['types'],
  },
  'nextcloud.upload': {
    methods: ["POST"],
    pattern: '/r/nc/req/upload',
    tokens: [{"old":"/r/nc/req/upload","type":0,"val":"r","end":""},{"old":"/r/nc/req/upload","type":0,"val":"nc","end":""},{"old":"/r/nc/req/upload","type":0,"val":"req","end":""},{"old":"/r/nc/req/upload","type":0,"val":"upload","end":""}],
    types: placeholder as Registry['nextcloud.upload']['types'],
  },
  'nextcloud.remove': {
    methods: ["POST"],
    pattern: '/r/nc/req/remove',
    tokens: [{"old":"/r/nc/req/remove","type":0,"val":"r","end":""},{"old":"/r/nc/req/remove","type":0,"val":"nc","end":""},{"old":"/r/nc/req/remove","type":0,"val":"req","end":""},{"old":"/r/nc/req/remove","type":0,"val":"remove","end":""}],
    types: placeholder as Registry['nextcloud.remove']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}

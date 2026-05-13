/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.ghost_login_index': {
    methods: ["GET","HEAD"]
    pattern: '/ghost'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ghostLoginIndex']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ghostLoginIndex']>>>
    }
  }
  'auth.ghost_login': {
    methods: ["POST"]
    pattern: '/login/ghost'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ghostLogin']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ghostLogin']>>>
    }
  }
  'auth.sso_login_index': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoLoginIndex']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoLoginIndex']>>>
    }
  }
  'auth.sso_login': {
    methods: ["GET","HEAD"]
    pattern: '/login/oidc'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoLogin']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoLogin']>>>
    }
  }
  'auth.callback': {
    methods: ["GET","HEAD"]
    pattern: '/auth/callback'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoLoginRedirect']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoLoginRedirect']>>>
    }
  }
  'auth.callback.production': {
    methods: ["GET","HEAD"]
    pattern: '/api/login/oidc/callback'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoLoginRedirect']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoLoginRedirect']>>>
    }
  }
  'auth.sso_redirect_login_index': {
    methods: ["GET","HEAD"]
    pattern: '/login-sso'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoRedirectLoginIndex']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['ssoRedirectLoginIndex']>>>
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['logout']>>>
    }
  }
  'example': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/example_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/example_controller').default['index']>>>
    }
  }
  'test': {
    methods: ["GET","HEAD"]
    pattern: '/test'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/example_controller').default['testExample']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/example_controller').default['testExample']>>>
    }
  }
  'test-post': {
    methods: ["POST"]
    pattern: '/test'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/example_controller').default['testExample']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/example_controller').default['testExample']>>>
    }
  }
  'test-put': {
    methods: ["PUT"]
    pattern: '/test/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/example_controller').default['testExample']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/example_controller').default['testExample']>>>
    }
  }
  'test-delete': {
    methods: ["DELETE"]
    pattern: '/test/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/example_controller').default['testExample']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/example_controller').default['testExample']>>>
    }
  }
  'tip_tap_uploader.store_image': {
    methods: ["POST"]
    pattern: '/webdav/resources/tiptap/images'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'tip_tap_uploader.destroy_image': {
    methods: ["DELETE"]
    pattern: '/webdav/resources/tiptap/images/:filename'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { filename: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'nextcloud.upload': {
    methods: ["POST"]
    pattern: '/r/nc/req/upload'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'nextcloud.remove': {
    methods: ["POST"]
    pattern: '/r/nc/req/remove'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}

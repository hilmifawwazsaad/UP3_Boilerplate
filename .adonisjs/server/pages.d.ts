import '@adonisjs/inertia/types'

import type { VNodeProps, AllowedComponentProps, ComponentInstance } from 'vue'

type ExtractProps<T> = Omit<
  ComponentInstance<T>['$props'],
  keyof VNodeProps | keyof AllowedComponentProps
>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/components/LoadingLoginComponent': ExtractProps<(typeof import('../../inertia/pages/auth/components/LoadingLoginComponent.vue'))['default']>
    'auth/LoginGhostView': ExtractProps<(typeof import('../../inertia/pages/auth/LoginGhostView.vue'))['default']>
    'auth/LoginSSORedirectView': ExtractProps<(typeof import('../../inertia/pages/auth/LoginSSORedirectView.vue'))['default']>
    'auth/LoginSSOView': ExtractProps<(typeof import('../../inertia/pages/auth/LoginSSOView.vue'))['default']>
    'errors/login_error': ExtractProps<(typeof import('../../inertia/pages/errors/login_error.vue'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.vue'))['default']>
    'errors/oidc_error': ExtractProps<(typeof import('../../inertia/pages/errors/oidc_error.vue'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.vue'))['default']>
    'Example': ExtractProps<(typeof import('../../inertia/pages/Example.vue'))['default']>
  }
}

import { usePage, router } from '@inertiajs/vue3'

export default function useQueryParams<
  T extends Record<string, string | number | null | undefined> = Record<string, string>,
>() {
  const page = usePage()

  const queryString =
    typeof window !== 'undefined' && page.url.includes('?') ? page.url.split('?')[1] : ''

  const params = new URLSearchParams(queryString)

  function get(key: string, defaultValue: string | null = null): string | null {
    return params.get(key) || defaultValue
  }

  function all(): Record<string, string> {
    const obj: Record<string, string> = {}
    for (const [key, value] of params.entries()) {
      obj[key] = value
    }
    return obj
  }

  function set(newParams: T, options: Record<string, any> = {}) {
    if (typeof window !== 'undefined') {
      router.get(window.location.pathname, newParams, { preserveState: true, ...options })
    }
  }

  return { get, all, set }
}

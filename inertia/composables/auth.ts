import { usePage } from '@inertiajs/vue3'

export default function useAuth({ current = false } = {}) {
  try {
    const props = usePage().props
    const auth = props.auth ?? (null as any)
    const auth_config = props.auth_config ?? (null as any)

    const currUser = auth.users.find((u: any) => u.idjabatan == auth_config?.current)

    if (current) {
      return currUser
    }
    return {
      auth: auth,
      auth_config: auth_config,
      currUser: currUser,
    }
  } catch (error) {
    return null
  }
}

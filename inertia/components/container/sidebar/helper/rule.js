import { useAuth } from '~/composables'

export default {
  all: (params) => true,
  admin: (params) => params.user.idjabatan == 570,
  validator: (params) => {
    const user = useAuth({ current: true })
    return user.idjabatan == 570
  },
  object: () => {
    if (!params.visible) {
      return false
    }

    return true
  },
}

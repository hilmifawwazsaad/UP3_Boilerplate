import Swal from 'sweetalert2'

export default {
  install: (app: any) => {
    app.config.globalProperties.$swal = Swal
  },
}

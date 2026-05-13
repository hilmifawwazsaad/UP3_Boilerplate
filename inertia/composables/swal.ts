import Swal from 'sweetalert2'

let swal = null as any

function swalConfirm({
  title = 'Konfirmasi',
  text = 'Apakah kamu yakin ?',
  html = null,
  confirmButtonText = 'Ya',
  cancelButtonText = 'Batal',
}) {
  return swal.fire({
    title: title,
    text: text,
    html: html,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  })
}

function swalCatch({ title = 'Gagal', error = 'Internal Server Error', html = null }) {
  return swal.fire({
    icon: 'error',
    title: title,
    text: error,
    html: html,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
  })
}

function swalProcess({ title = 'Tunggu Sebentar...', html = null, onProcess = () => {} }) {
  return swal.fire({
    title: title,
    html: html,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    timerProgressBar: true,
    didOpen: () => {
      swal.showLoading()
      onProcess()
    },
  })
}

function swalSuccess({ title = 'Berhasil', text = null, html=null, onClose = () => {} }) {
  return swal.fire({
    icon: 'success',
    title: title,
    text: text,
    html: html,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    timer: 1500,
    timerProgressBar: true,
    didClose: () => {
      swal.close()
      onClose()
    },
  })
}

export default function useSwal() {
  swal = Swal
  return {
    fire: swal.fire,
    close: swal.close,
    confirm: swalConfirm,
    process: swalProcess,
    catch: swalCatch,
    success: swalSuccess,
  }
}

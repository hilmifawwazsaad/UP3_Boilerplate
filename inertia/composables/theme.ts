// const midnightStyle = () => import("flexmonster/theme/midnight/flexmonster.min.css")
// const originalStyle = () => import("flexmonster/theme/macos/flexmonster.min.css")

export default function useTheme() {
  return {
    sweetAlert2: (theme: string = 'light') => {
      let swalThemeActive = document.querySelector('link#swalTheme')
      if (swalThemeActive) {
        swalThemeActive.remove()
      }

      let ss = document.createElement('link')
      ss.id = 'swalTheme'
      ss.rel = 'stylesheet'
      if (theme == 'dark') {
        ss.href = '/css/vendor/sweetalert/sweetalert2-dark.min.css'
      } else {
        ss.href = '/css/vendor/sweetalert/sweetalert2-light.min.css'
      }
      document.head.appendChild(ss)
    },
    flexMonster: (theme: string = 'light') => {
      let flexmonsterThemeActive = document.querySelector('link#flexmonsterTheme')

      if (flexmonsterThemeActive) {
        flexmonsterThemeActive.remove()
      }

      let ss = document.createElement('link')
      ss.id = 'flexmonsterTheme'
      ss.rel = 'stylesheet'
      if (theme == 'dark') {
        ss.href = '/css/vendor/flexmonster/flexmonster-dark.min.css'
      } else {
        ss.href = '/css/vendor/flexmonster/flexmonster-light.min.css'
      }
      document.head.appendChild(ss)
    },
  }
}

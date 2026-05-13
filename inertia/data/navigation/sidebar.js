/**
 * Definisi Menu
 *
 * {
 *  [Required] menu_name     [String]          "Nama Menu yang akan ditampilkan diSidebar",
 *  [Required] icon          [Object Icon]     "Icon yang akan ditampilkan diSidebar, dapat diambil dari iconsPack pada Assets",
 *  [Required] to            [String]          "Link ke halaman yang dituju, bisa diambil dari route yang telah didaftarkan di router.js",
 *  [Optional] visible       [String]          "Menu dapat dibatasi oleh hak akses suatu user,
 *                                              jika 'all' maka menu dapat diakses oleh semua user,
 *                                              jika 'admin' maka menu hanya dapat diakses oleh user yang memiliki hak akses admin
 *                                              Defaultnya adalah 'all'",
 *  [Optional] children      [Array of Object] "Jika children ada, maka children akan menjadi submenu dari menu ini"
 *  [Optional] beforeDivider [Boolean]         "Jika didefinisikan, maka akan ada divider sebelum menu ini",
 *  [Optional] afterDivider  [Boolean]         "Jika didefinisikan, maka akan ada divider setelah menu ini",
 *  [Optional] url_parent    [Boolean]         "Jika didefinisikan, maka url menu ini akan mengikuti url parent |
 *                                              Default adalah true"
 *  [Optional] allow_next    [Boolean]         "Jika didefinisikan, maka tambahan url apapun yang ada dibelakang path parent,
 *                                              akan dianggap sebagai url child menu ini (meskipun tidak didaftarkan sekalipun) |
 *                                              Default false"
 * }
 *
 * Perlakuan pada children dapat dilakukan secara rekursif mendalam
 * artinya didalam children masih dapat didefinisikan children yang lain,
 * semakin dalam N-children yang didefinisikan, semakin banyak N-sub-menu yang ditampilkan
 * apabila tidak diberi rule visible-nya
 *
 * selain itu aturan visible dari child dapat didefinisikan maupun tidak,
 * apabila didefinisikan maka child akan memiliki rule visible dia sendiri,
 * jika tidak didefinisikan, maka rule visible akan mengikuti parent-nya
 *
 * url 'to' untuk child dapat secara otomatis mengikuti url parent-nya
 * misal = {
 *  menu_name: "Dashboard",
 *  icon: iconsPack.IconHome,
 *  to: '/'
 *  children: [
 *      {
 *        menu_name: "Program Kerja",
 *        icon: iconsPack.IconFolders,
 *        to: "/program-kerja", --> maka url dari child ini adalah: '/dashboard/program-kerja'
 *      }
 *    ]
 * }
 *
 * apabila sebuah child ingin menggunakan url dia sendiri tanpa mengikuti url dari parentnya, maka dapat gunakan
 * parameter 'url_parent' bernilai false
 *
 */

import {
  IconHome,
} from '@tabler/icons-vue'

export default [
  {
    menu_name: 'Dashboard',
    icon: IconHome,
    to: '/',
    alternateTo: '',
    visible: 'all',
  },
]

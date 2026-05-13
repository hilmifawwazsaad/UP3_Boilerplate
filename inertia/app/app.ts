import '../css/app.css'
import 'vue-sonner/style.css'

import Layout from '~/layouts/default.vue'
import { client } from '~/app/client'
import { createInertiaApp, Link, router } from '@inertiajs/vue3'
import { TuyauProvider } from '@adonisjs/inertia/vue'
import { createApp, type DefineComponent, h } from 'vue'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

import setupGlobal from '../types/global'

import 'preline/preline'
import 'nprogress/nprogress.css'
import 'vue3-colorpicker/style.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import '@vuepic/vue-datepicker/dist/main.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'vue3-pdf-app/dist/icons/main.css'

import moment from 'moment-timezone'
import SweetAlert from '#config/sweetalert'
import NProgress from 'nprogress'
import VueDatePicker from '@vuepic/vue-datepicker'
import ElementPlus from 'element-plus'
import veProgress from 'vue-ellipse-progress'
import CanvasJSChart from '@canvasjs/vue-charts'
import Vue3ColorPicker from 'vue3-colorpicker'

import { initFlowbite } from 'flowbite'
import { HSStaticMethods } from 'preline/preline'

moment.tz.setDefault('Asia/Jakarta')

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue'),
      Layout
    )
  },

  setup({ el, App, props, plugin }) {
    const app = createApp({
      render: () => h(TuyauProvider, { client }, { default: () => h(App, props) }),
    })
    app.use(plugin)
    app.use(SweetAlert)
    app.use(Vue3ColorPicker)
    app.use(ElementPlus)
    app.use(CanvasJSChart)
    app.use(veProgress)

    setupGlobal(app)

    router.on('start', () => {
      NProgress.start()
    })
    router.on('finish', () => {
      initFlowbite()
      HSStaticMethods.autoInit()
      NProgress.done()
    })

    app.component('Link', Link)
    app.component('VueDatePicker', VueDatePicker)

    app.mount(el)
  },
})

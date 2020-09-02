import Vue from 'vue'
import App from './App.vue'
import { EvContextMenu, EvMenu, EvStore } from 'evwt/plugins'
import { EvLayout, EvToolbar, EvToolbarItem } from 'evwt/components'
import '@/assets/icons'
import menu from './menu'

Vue.config.productionTip = false

Vue.component(EvToolbar.name, EvToolbar)
Vue.component(EvToolbarItem.name, EvToolbarItem)
Vue.component(EvLayout.name, EvLayout)
Vue.use(EvContextMenu)
Vue.use(EvMenu, menu)
Vue.use(EvStore)

new Vue({
  render: (h) => h(App)
}).$mount('#app')

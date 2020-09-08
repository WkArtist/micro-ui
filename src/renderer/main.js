import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/font.css'
import 'videojs-flash'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import animated from 'animate.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueVideoPlayer)
Vue.use(ElementUI)
Vue.use(animated)
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

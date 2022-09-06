import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入rem适配
import 'amfe-flexible'
// 引入icon 图标
import '@/assets/fons/iconfont.css'
// 引入所有vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

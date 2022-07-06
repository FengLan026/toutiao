import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant
import Vant from 'vant'

// 加载全局样式
import './styles/index.less'

//动态设置 rem基准值
import "amfe-flexible"

// 注册全局组件
import Components from "@/components"

Vue.use(Components)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

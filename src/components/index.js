/***
* 全局组件
***/

import FootNavBar from "./FootNavBar.vue"
import HeaderBackBar from "./HeaderBackBar.vue"
import ArtCard from "./ArtCard.vue"
export default {
  install(Vue) {
    Vue.component('FootNavBar', FootNavBar)
    Vue.component('HeaderBackBar', HeaderBackBar)
    Vue.component('ArtCard', ArtCard)
  }
}

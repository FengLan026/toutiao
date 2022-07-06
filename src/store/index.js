import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user"
import getters from "./getters"
import { getTimeStamp } from "@/utils/auth"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters
})

export default store

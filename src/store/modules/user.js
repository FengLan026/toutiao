import { getToken, setToken, removeToken } from "@/utils/auth"
import { login, getUserInfo } from "@/api/user"
import { resetRouter } from "@/router"
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    const result = await login(data)
    console.log(result)
    if (result.status == '201') {
      context.commit('setToken', result.data.data.token)
    }
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    console.log(result)
    if (result.status == '200') {
      context.commit('setUserInfo', result.data)
    }
    return result
  },
  // 登出操作
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('reomveUserInfo')
    // 重置路由
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

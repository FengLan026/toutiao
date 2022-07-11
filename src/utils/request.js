/***
 * 请求模块 拦截器
 */
import axios from "axios"
import store from "@/store"
import { Toast } from "vant"
const request = axios.create({
  // 接口的基地址
  baseURL: '/v1_0',
  // timeout: 5000
})


// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  // axios 默认加了一层data
  const { message, data } = response.data
  const { status } = response
  // 请求成功与否决定下面的操作
  if (status >= 200 && status <= 400) {
    return data
  } else {
    Toast.fail(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.status === 403) {
    store.dispatch('user/logout') // 登出action
    router.push('/login')
  } else {
    Toast.fail(error.message)
  }
  return Promise.reject(error)
})

export default request

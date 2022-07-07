/***
 * 请求模块 拦截器
 */
import axios from "axios"
import store from "@/store"
import { Toast } from "vant"
import { getTimeStamp } from '@/utils/auth'
const request = axios.create({
  // 接口的基地址
  baseURL: '/v1_0',
  // timeout: 5000
})


// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
    // console.log(store.getters.token)
    // console.log(config)
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
// request.interceptors.response.use(response => {
//   // axios 默认加了一层data
//   const { status, message, data } = response.data
//   // 要根据success的成功与否决定下面的操作
//   if (status >= 200) {
//     return data
//   } else {
//     Toast.fail(message) // 提示错误消息
//     return Promise.reject(new Error(message))
//   }
// }, error => {
//   // error 信息里面 response 的对象
//   if (error.response && error.response.data && error.response.data.code === 403) {
//     // 当等于1002的时候表示 后端告诉我 token 超时了
//     store.dispatch('user/logout') // 登出action
//     router.push('/login')
//   } else {
//     Toast.fail(error.message)
//   }
//   return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功, 直接进入catch
// })

export default request

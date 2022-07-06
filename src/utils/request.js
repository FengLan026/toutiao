/***
 * 请求模块
 */
import axios from "axios"
import store from "@/store"
import { Toast } from 'vant'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600
const service = axios.create({
  // 接口的基地址
  baseURl: '/v1_0',
  timeout: 5000
})

function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
// service.interceptors.response.use(response => {
//   // axios 默认加了一层data
//   const { message, data } = response.data
//   // 要根据success的成功与否决定下面的操作
//   if () {
//     return data
//   } else {
//     Toast.fail(message) // 提示错误消息
//     return Promise.reject(new Error(message))
//   }
// }, error => {
//   // error 信息里面 response 的对象
//   if (error.response && error.response.data && error.response.data.code === 1002) {
//     // 当等于1002的时候表示 后端告诉我 token 超时了
//     store.dispatch('user/logout') // 登出action
//     router.push('/login')
//   } else {
//     Toast.fail(error.message)
//   }
//   return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功, 直接进入catch
// })

export default service

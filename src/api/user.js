import request from "@/utils/request"

// 登录
export function login(data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}

// 发送验证码
export function getSmsCode(mobile) {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'get',
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/v1_0/authorizations',
    method: 'get',
  })
}

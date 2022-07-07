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
    url: '/v1_0/user',
    method: 'get',
  })
}

// 获取用户个人资料
export function getPersonInfo() {
  return request({
    url: '/v1_0/user/profile',
    method: 'get',
  })
}

// 获取关注列表
export function getFollowingsList(params) {
  return request({
    url: '/v1_0/user/followings',
    method: 'get',
    params
  })
}

// 获取粉丝列表
export function getFollowersList(params) {
  return request({
    url: '/v1_0/user/followers',
    method: 'get',
    params
  })
}

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
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/v1_0/user',
  })
}

// 获取用户个人资料
export function getPersonInfo() {
  return request({
    url: '/v1_0/user/profile',
  })
}

// 编辑用户个人资料
export function editPersonInfo(data) {
  return request({
    url: '/v1_0/user/profile',
    method: 'patch',
    data
  })
}

// 获取关注列表
export function getFollowingsList(params) {
  return request({
    url: '/v1_0/user/followings',
    params
  })
}

// 获取粉丝列表
export function getFollowersList(params) {
  return request({
    url: '/v1_0/user/followers',
    params
  })
}

// 获取收藏列表
export function getCollectionsList(params) {
  return request({
    url: '/v1_0/article/collections',
    params
  })
}

// 获取用户阅读历史
export function getHistoryList(params) {
  return request({
    url: '/v1_0/user/histories',
    params
  })
}

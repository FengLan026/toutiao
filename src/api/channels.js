import request from "@/utils/request"

// 获取频道列表
export function getChannelsList() {
  return request({
    url: '/v1_0/channels',
  })
}

// 获取文章推荐
export function getArticlesList(params) {
  return request({
    url: '/v1_0/articles',
    params
  })
}

// 获取文章详情
export function getArticlesDetail(id) {
  return request({
    url: `/v1_0/articles/${id}`,
  })
}

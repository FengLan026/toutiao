import request from "@/utils/request"

// 获取频道列表
export function getChannelsList() {
  return request({
    url: '/v1_0/channels',
  })
}

// 设置用户的频道
export function setUserChannels(data) {
  return request({
    url: '/v1_0/channels',
    method: 'put',
    data: {
      channels: data
    }
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

// 获取评论
export function getArticleComments(data) {
  return request({
    url: '/v1_0/comments',
    params: {
      type: "a",
      source: data.source,
      limit: data.read_count,
    }
  })
}

// 获取评论
export function getSubComments(data) {
  return request({
    url: '/v1_0/comments',
    params: {
      type: "c",
      source: data.source,
      limit: data.read_count,
    }
  })
}

// 收藏文章
export function addCollection(data) {
  return request({
    url: '/v1_0/article/collections',
    method: 'post',
    data: {
      target: data
    }
  })
}

// 取消收藏文章
export function delCollection(id) {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'delete',
  })
}

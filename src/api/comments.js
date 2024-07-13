import qs from 'qs'
import request from '@/utils/request'

// 获取帖子评论数据接口
export const getComments = params => {
  return request.get('/public/comments?' + qs.stringify(params))
}

// 上传帖子评论接口
export const addComment = data => {
  return request.post('/comments/reply', data)
}

// 更新评论信息接口
export const updateComment = data => {
  return request.post('/comments/update', data)
}

// 采纳评论接口
export const setBestComment = params => {
  return request.get('/comments/accept?' + qs.stringify(params))
}

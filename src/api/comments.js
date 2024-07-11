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

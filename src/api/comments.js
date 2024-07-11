import request from '@/utils/request'

// 获取帖子评论数据接口
export const getComments = tid => {
  return request.get('/public/comments?tid=' + tid)
}

// 上传帖子评论接口
export const addComment = data => {
  return request.post('/comments/reply', data)
}

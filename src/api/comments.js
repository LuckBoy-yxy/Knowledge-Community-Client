import request from '@/utils/request'

// 获取帖子评论数据接口
export const getComments = tid => {
  return request.get('/public/comments?tid=' + tid)
}

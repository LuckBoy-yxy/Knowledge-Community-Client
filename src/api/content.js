import qs from 'qs'
import request from '@/utils/request'

/**
* @description: 获取文章列表
* @param {options} 请求列表所需的参数
*
*/
export const getList = options => {
  return request.get('/public/list?' + qs.stringify(options))
}

/**
* @description: 获取温馨通道或友情链接列表
* @param {type} links 为获取友情链接, tips 为获取温馨通道
*/
export const getTipsOrLinks = type => {
  return request.get('/public/links', {
    params: {
      type
    }
  })
}

/**
* @description: 获取本周热议列表
*/
export const getTopWeek = () => {
  return request.get('/public/topWeek')
}
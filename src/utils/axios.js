import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  // axios 配置对象
  getInsideConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }

    return config
  }

  // 给 axios 实例添加请求拦截器和响应拦截器
  interceptors (instance) {
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      errorHandle(err)
      return Promise.reject(err)
    })

    instance.interceptors.response.use(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, err => {
      errorHandle(err)
      return Promise.reject(err)
    })
  }

  // 创建 axios 实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)

    return instance(newOptions)
  }

  // 封装 get 请求方法
  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url
    }, config)

    return this.request(options)
  }

  // 封装 post 请求方法
  post (url, data) {
    return this.request({
      method: 'post',
      url,
      data: data
    })
  }
}

export default HttpRequest

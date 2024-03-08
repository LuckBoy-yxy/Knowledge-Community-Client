import instance from '@/utils/request'

const getCaptcha = function (sid) {
  return instance.get('/getCaptcha', {
    params: {
      sid
    }
  })
}

export {
  getCaptcha
}

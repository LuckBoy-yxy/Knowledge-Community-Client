import instance from '@/utils/request'

const getCaptcha = function () {
  return instance.get('/getCaptcha')
}

export {
  getCaptcha
}

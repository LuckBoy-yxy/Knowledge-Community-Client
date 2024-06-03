import axios from '@/utils/request'
import store from '../store'

const headers = {
  Authorization: 'Bearer ' + store.state.userInfo.token,
  'Content-Type': 'application/json'
}

// 用户签到接口
export const userSign = () => {
  return axios.get('/user/fav', {
    headers
  })
}

import axios from '@/utils/request'
// import store from '../store'

// const headers = {
//   Authorization: 'Bearer ' + store.state.userInfo.token,
//   'Content-Type': 'application/json'
// }

// 用户签到接口
export const userSign = () => {
  // return axios.get('/user/fav', {
  //   headers
  // })
  return axios.get('/user/fav')
}

// 更新用户的基本信息接口
export const updateUserInfo = data => {
  return axios.post('/user/basic', data)
}

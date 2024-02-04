import axios from 'axios'
import { getCaptcha } from './common'

const forget = async (submitData) => {
  let result = ''
  try {
    result = await axios.post('/forget', submitData)
    if (result.status === 200) {
      return result.data
    }
  } catch (err) {
    console.log(err)
  }
}

export {
  getCaptcha,
  forget
}

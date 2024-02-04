import axios from 'axios'

const getCaptcha = async function () {
  let result = ''
  try {
    result = await axios.get('/getCaptcha')
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {
    console.log(error)
  }
}

export {
  getCaptcha
}

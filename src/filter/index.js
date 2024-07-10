import moment from 'moment'
import 'moment/locale/zh-cn'

const momentDate = date => {
  if (moment(date).isBefore(moment().subtract(7, 'days'))) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return moment(date).from(moment())
  }
}

// export {
//   formatDate
// }

export default {
  momentDate
}

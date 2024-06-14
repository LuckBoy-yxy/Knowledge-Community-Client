import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/v4'
import { getCaptcha } from '@/api/common'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      svg: '',
      code: ''
    }
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }

    this.$store.commit('setSid', sid)
    this._getCaptcha(sid)
  },
  methods: {
    async _getCaptcha (sid) {
      const res = await getCaptcha(sid)
      if (res.code === 200) {
        this.svg = res.data
      }
    }
  }
}

<template>
  <div class="layui-container flex">
    <div class="layui-row front pb3">确认更新用户名: {{ username }} 吗?</div>

    <div class="layui-row">
      <button
        class="layui-btn"
        :class="{ 'layui-btn-disabled': isSend }"
        type="button"
        @click="submit"
      >确定更新</button>

      <RouterLink
        class="layui-btn layui-btn-primary"
        to="/"
      >返回首页</RouterLink>
      </div>
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'

let obj = null
export default {
  name: 'ComfirmCom',
  data () {
    return {
      username: '',
      isSend: false
    }
  },
  mounted () {
    const queryStr = window.location.href.replace(/.*\?/, '')
    obj = Object.fromEntries(queryStr.split('&').map(item => item.split('=')))
    this.username = decodeURIComponent(obj.username)
    // console.log(obj)
  },
  methods: {
    submit () {
      if (this.isSend) return
      obj.username = this.username
      updateUserName(obj).then(res => {
        if (res.code === 200) {
          this.isSend = true
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
.front {
  font-size: 16px;
  color: #333;
}
</style>

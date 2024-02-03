<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-block">
            <input
            type="text"
            name="title"
            v-model="username"
            required
            lay-verify="required"
            placeholder="请输入标题"
            autocomplete="off"
            class="layui-input"
          >
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密&emsp;码</label>
          <div class="layui-input-block">
            <input
            type="password"
            name="title"
            v-model="password"
            required
            lay-verify="required"
            placeholder="请输入标题"
            autocomplete="off"
            class="layui-input"
          >
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
            type="text"
            name="title"
            v-model="code"
            required
            lay-verify="required"
            placeholder="请输入标题"
            autocomplete="off"
            class="layui-input"
          >
          </div>
          <div
            class="layui-form-mid svg"
            v-html="svg"
            @click="getCaptcha"
          ></div>
        </div>
        <button type="button" class="layui-btn" @click="checkForm">点击登录</button>
        <a class="imooc-link" href="http:/">忘记密码</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      svg: '',
      username: '',
      password: '',
      code: '',
      errorMsg: []
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      axios.get('http://localhost:8090/api/getCaptcha').then(res => {
        if (res.status === 200) {
          const obj = res.data
          if (obj.code === 200) {
            this.svg = obj.data
          }
        }
      }).catch(err => console.log(err))
    },
    checkForm () {
      this.errorMsg = []
      if (!this.username) {
        this.errorMsg.push('用户名不能为空!')
      }
      if (!this.password) {
        this.errorMsg.push('密码不能为空!')
      }
      if (!this.code) {
        this.errorMsg.push('验证码不能为空!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  background-color: #f2f2f2f2;
}
.layui-container {
  background-color: #fff;
  input {
    width: 190px;
  }

  .svg {
    position: relative;
    top: -15px;
  }

  .imooc-link {
    margin-left: 30px;
    &:hover {
      color: #009688;
    }
  }
}
</style>

<template>
  <div class="layui-container fly-marginTop">
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title">
        <li class="layui-this">登入</li>
        <li>
          <RouterLink :to="{ name: 'reg' }">注册</RouterLink>
        </li>
      </ul>

      <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
        <div class="layui-tab-item layui-show">
          <div class="layui-form layui-form-pane">
            <form method="post">
              <div class="layui-form-item">
                <label for="username" class="layui-form-label">用户名</label>
                <ValidationProvider name="用户名" rules="required|email" v-slot="{ errors }">
                  <div class="layui-input-inline">
                    <input
                      id="username"
                      class="layui-input"
                      type="text"
                      name="username"
                      autocomplete="off"
                      placeholder="请输入用户名(邮箱)"
                      v-model="username"
                    >
                  </div>
                  <span class="error layui-form-mid">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="layui-form-item">
                <label for="password" class="layui-form-label">密码</label>
                <ValidationProvider name="密码" rules="required|min:6|max:12" v-slot="{ errors }">
                  <div class="layui-input-inline">
                    <input
                      id="password"
                      class="layui-input"
                      type="password"
                      name="password"
                      autocomplete="off"
                      placeholder="请输入密码"
                      v-model="password"
                    >
                  </div>
                  <div class="error layui-form-mid">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

              <div class="layui-form-item">
                <ValidationProvider name="验证码" rules="required|code:6" v-slot="{ errors }">
                  <div class="layui-row">
                    <label for="code" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <input
                        id="code"
                        class="layui-input"
                        type="text"
                        name="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        v-model="code"
                      >
                    </div>
                    <div>
                      <span class="svg" v-html="svg" @click="_getCaptcha"></span>
                    </div>
                  </div>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

              <div class="layui-form-item">
                <button class="layui-btn">立即登录</button>
                <span style="padding-left:20px;">
                  <RouterLink :to="{ name: 'forget' }">忘记密码</RouterLink>
                </span>
              </div>

              <div class="layui-form-item fly-form-app">
                <span>或者使用社交账号登入</span>
                <a href="/app/qq" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                <a href="/app/weibo/" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required, min, max } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'

import { getCaptcha } from '@/api/login'

extend('required', {
  ...required,
  message: '{_field_}不能为空'
})
extend('email', {
  validate (value) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  },
  message: '请输入正确的邮箱格式'
})
extend('min', {
  ...min,
  message: zh.messages.min
})
extend('max', {
  ...max,
  message: zh.messages.max
})
extend('code', {
  validate (value, args) {
    return value.length === +args.length
  },
  params: ['length'],
  message (filed, args) {
    return `${filed}长度为 ${args.length} 位`
  }
})

export default {
  name: 'LoginCom',
  components: {
    ValidationProvider
  },
  data: () => {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCaptcha()
  },
  methods: {
    async _getCaptcha () {
      const res = await getCaptcha()
      if (res.code === 200) {
        this.svg = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: #c00;
}

.svg {
  position: relative;
  top: -15px;
  &:hover {
    cursor: pointer;
  }
}
</style>

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
          <ValidationObserver ref="form">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="username" class="layui-form-label">用户名</label>
                    <ValidationProvider name="username" rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          id="username"
                          class="layui-input"
                          type="text"
                          name="username"
                          autocomplete="off"
                          placeholder="请输入用户名(邮箱)"
                          v-model.trim="username"
                        >
                      </div>
                      <span class="error layui-form-mid">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <label for="password" class="layui-form-label">密码</label>
                    <ValidationProvider name="password" rules="required|min:6|max:16" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          id="password"
                          class="layui-input"
                          type="password"
                          name="password"
                          autocomplete="off"
                          placeholder="请输入密码"
                          v-model.trim="password"
                        >
                      </div>
                      <div class="error layui-form-mid">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <ValidationProvider name="code" rules="required|code:6" v-slot="{ errors }">
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
                            v-model.trim="code"
                          >
                        </div>
                        <div>
                          <span class="svg" v-html="svg" @click="_getCaptcha"></span>
                        </div>
                      </div>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="submit"
                    >立即登录</button>
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
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/v4'

import { getCaptcha, login } from '@/api/login'

export default {
  name: 'LoginCom',
  components: {
    ValidationProvider,
    ValidationObserver
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
    window.vue = this

    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCaptcha()
  },
  methods: {
    async _getCaptcha () {
      const sid = this.$store.state.sid
      const res = await getCaptcha(sid)
      if (res.code === 200) {
        this.svg = res.data
      }
    },
    async submit () {
      const res = await this.$refs.form.validate()
      if (!res) return

      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          console.log(res)
        }
      })
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

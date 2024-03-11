<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <RouterLink :to="{ name: 'login' }">登入</RouterLink>
          </li>
          <li class="layui-this">注册</li>
        </ul>

        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0;"
        >
          <ValidationObserver ref="form">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="email" class="layui-form-label">邮箱</label>
                    <ValidationProvider
                      name="email"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          id="email"
                          class="layui-input"
                          type="text"
                          name="email"
                          placeholder="请输入邮箱"
                          autocomplete="off"
                          v-model.trim="email"
                        >
                      </div>
                      <span class="error">{{ errors[0] }}</span>
                      <div
                        class="layui-form-mid layui-word-aux"
                        v-if="!errors[0]"
                      >将会成为您唯一的登入名</div>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <label for="username" class="layui-form-label">昵称</label>
                    <ValidationProvider
                      name="name"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          id="username"
                          class="layui-input"
                          type="text"
                          name="username"
                          placeholder="请输入昵称"
                          autocomplete="off"
                          v-model.trim="username"
                        >
                      </div>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <label for="password" class="layui-form-label">密码</label>
                    <ValidationProvider
                      name="密码"
                      rules="required|min:6|max:16"
                      v-slot="{ errors }"
                      vid="password"
                    >
                      <div class="layui-input-inline">
                        <input
                          id="password"
                          class="layui-input"
                          type="password"
                          name="pass"
                          placeholder="请输入密码"
                          autocomplete="off"
                          v-model.trim="password"
                        >
                      </div>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <label for="repass" class="layui-form-label">确认密码</label>
                    <ValidationProvider
                      name="确认密码"
                      rules="required|confirmed:password"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          id="repass"
                          class="layui-input"
                          type="password"
                          name="repass"
                          placeholder="请再次确认密码"
                          autocomplete="off"
                          v-model.trim="password2"
                        >
                      </div>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="layui-form-item">
                    <ValidationProvider
                      name="code"
                      rules="required|code:6"
                      v-slot="{ errors }"
                    >
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
                      type="button"
                      class="layui-btn"
                      @click="submit"
                    >立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      href="/app/qq"
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"></a>
                    <a
                      href="/app/weibo/"
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"></a>
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

import { getCaptcha, reg } from '@/api/reg'

export default {
  name: 'RegisterCom',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      password2: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
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
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      reg({
        username: this.email,
        name: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.email = ''
          this.username = ''
          this.password = ''
          this.password2 = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.form.reset()
          })
          this.$router.push('/login')
        } else {
          this.$refs.form.setErrors(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: #c00;
  line-height: 38px;
}
.svg {
  position: relative;
  top: -15px;
  &:hover {
    cursor: pointer;
  }
}
</style>

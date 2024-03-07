<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <RouterLink :to="{ name: 'login' }">登入</RouterLink>
          </li>
          <li class="layui-this">找回密码</li>
        </ul>

        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <!-- <div class="fly-msg">{{d.username}}，请重置您的密码</div>
            <div class="layui-form layui-form-pane"  style="margin-top: 30px;">
              <form action="/user/repass" method="post">
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass" class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <input type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off" class="layui-input">
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">人类验证</label>
                  <div class="layui-input-inline">
                    <input type="text" id="L_vercode" name="vercode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{d.vercode}}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <input type="hidden" name="username" value="{{d.username}}">
                  <input type="hidden" name="email" value="{{d.email}}">
                  <button class="layui-btn" alert="1" lay-filter="*" lay-submit>提交</button>
                </div>
              </form>
            </div> -->

            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="email" class="layui-form-label">邮箱</label>
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input
                        id="email"
                        class="layui-input"
                        type="text"
                        name="email"
                        placeholder="请输入邮箱"
                        autocomplete="off"
                        v-model="email"
                      >
                    </div>
                    <span class="error">{{ errors[0] }}</span>
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
                  <button type="button" class="layui-btn" @click="submit">提交</button>
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
import { ValidationProvider } from 'vee-validate'

import { getCaptcha, forget } from '@/api/forget'

export default {
  name: 'ForgetCom',
  data () {
    return {
      email: '',
      code: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider
  },
  mounted () {
    this._getCaptcha()
  },
  methods: {
    async _getCaptcha () {
      const result = await getCaptcha()
      if (result.code === 200) {
        this.svg = result.data
      }
    },
    async submit () {
      const res = await forget({
        username: this.email,
        code: this.code
      })
      if (res.code === 200) {
        alert('邮件发送成功')
        console.log(res)
      }
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

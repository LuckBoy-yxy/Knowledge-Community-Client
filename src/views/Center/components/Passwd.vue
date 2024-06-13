<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver ref="form">
      <div class="layui-form-item">
        <label for="L_nowpass" class="layui-form-label">当前密码</label>
        <ValidationProvider
          name="oldpassword"
          rules="required|min:6|max:16"
          v-slot="{ errors }"
        >
          <div class="layui-input-inline">
            <input
              type="password"
              class="layui-input"
              v-model="oldpassword"
            />
          </div>
          <span
            class="layui-form-mid layui-word-aux error"
          >{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">新密码</label>
        <ValidationProvider
          name="password"
          rules="required|min:6|max:16|confirmed:confirmation"
          v-slot="{ errors }"
        >
          <div class="layui-input-inline">
            <input
              type="password"
              class="layui-input"
              v-model="password"
            />
          </div>
          <div
            class="layui-form-mid layui-word-aux"
            v-show="!errors[0]"
          >6到16个字符</div>
          <span
            class="layui-form-mid layui-word-aux error"
          >{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">确认密码</label>
        <ValidationProvider
          vid="confirmation"
          v-slot="{ errors }"
        >
          <div class="layui-input-inline">
            <input
              v-model="repassword"
              type="password"
              name="repass"
              class="layui-input"
            />
          </div>
          <span
            class="layui-form-mid layui-word-aux error"
          >{{ errors[0] }}</span>
      </ValidationProvider>
      </div>

      <div class="layui-form-item">
        <button class="layui-btn" key="set-mine" @click="submit">确认修改</button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changePasswd } from '@/api/user'

export default {
  name: 'PassWord',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      password: '',
      repassword: '',
      oldpassword: ''
    }
  },
  methods: {
    async submit () {
      const res = await this.$refs.form.validate()
      if (!res) return

      if (this.oldpassword === this.password) {
        return this.$alert('新密码不能和原先的密码一致')
      }

      changePasswd({
        oldpwd: this.oldpassword,
        newpwd: this.password
      }).then(res => {
        if (res.code === 200) {
          this.oldpassword = ''
          this.password = ''
          this.repassword = ''
          requestAnimationFrame(() => {
            this.$refs.form.reset()
          })
          this.$alert(res.msg)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: #c00 !important;
}
</style>

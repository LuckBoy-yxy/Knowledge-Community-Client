<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver
      ref="form"
    >
      <div class="layui-form-item">
        <ValidationProvider
          name="email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <label for="L_email" class="layui-form-label">邮箱</label>
          <div class="layui-input-inline">
            <input
              id="L_email"
              class="layui-input"
              type="text"
              name="email"
              v-model="username"
            />
          </div>

          <div class="layui-form-mid layui-word-aux">
            <template v-if="!errors[0]">
              如果您在邮箱已激活的情况下，变更了邮箱，需
              <a
                href="activate.html"
                style="font-size: 12px; color: #4f99cf;"
              >重新验证邮箱</a>。
            </template>
            <template v-else>
              <span class="error">{{ errors[0] }}</span>
            </template>
          </div>
        </ValidationProvider>
      </div>

      <div class="layui-form-item">
        <ValidationProvider
          name="name"
          rules="required"
          v-slot="{ errors }"
        >
          <label for="L_username" class="layui-form-label">昵称</label>
          <div class="layui-input-inline">
            <input
              class="layui-input"
              id="L_username"
              type="text"
              name="username"
              v-model="name"
            />
          </div>
          <span class="error layui-form-mid">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="layui-form-item">
        <label for="L_city" class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input
            class="layui-input"
            id="L_city"
            type="text"
            name="city"
            v-model="location"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">性别</label>
        <div class="layui-inline gray mt1 ml1">
          <label for="male" class="mr1">
            <input
              v-model="gender"
              id="male"
              type="radio"
              name="sex"
              value="0"
              checked
              title="男"
            />
            <i
              class="layui-icon"
              :class="gender === '0' ? 'layui-icon-radio' : 'layui-icon-circle'"
            ></i>
            男
          </label>
          <label for="female">
            <input
              v-model="gender"
              id="female"
              type="radio"
              name="sex"
              value="1"
              title="女"
            />
            <i
              class="layui-icon"
              :class="gender === '1' ? 'layui-icon-radio' : 'layui-icon-circle'"
            ></i>
            女
          </label>
        </div>
      </div>

      <div class="layui-form-item layui-form-text">
        <label for="L_sign" class="layui-form-label">签名</label>
        <div class="layui-input-block">
          <textarea
            class="layui-textarea"
            style="height: 80px;"
            name="sign"
            placeholder="随便写些什么刷下存在感"
            v-model="regmark"
          ></textarea>
        </div>
      </div>

      <div class="layui-form-item">
        <button
          class="layui-btn"
          @click="submit"
        >确认修改</button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import { updateUserInfo } from '@/api/user'

export default {
  name: 'MyInfo',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      username: '',
      name: '',
      location: '',
      gender: '0',
      regmark: ''
    }
  },
  mounted () {
    const { username, name, location, gender, regmark } = this.$store.state.userInfo
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  },
  methods: {
    submit () {
      const res = this.$refs.form.validate()
      if (!res) return

      updateUserInfo({
        username: this.username,
        name: this.name,
        location: this.location,
        gender: this.gender,
        regmark: this.regmark
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', {
            ...this.$store.state.userInfo,
            ...{
              username: this.username,
              name: this.name,
              location: this.location,
              gender: this.gender,
              regmark: this.regmark
            }
          })
          this.$alert('用户资料更新成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-inline {
  label {
    i {
      position: relative;
      top: 1.5px;
    }
  }
}
.layui-icon-radio {
  color: green
}
.error {
  color: #c00;
}
</style>

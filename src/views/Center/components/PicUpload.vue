<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <!-- <button type="button" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </button> -->

        <label
          form="pic"
          class="layui-btn upload-img"
        >
          <i class="layui-icon">&#xe67c;</i>上传头像
          <input
            ref="pic"
            id="pic"
            type="file"
            name="file"
            accept="image/png, image/gif, image/jpg"
            @change="upload"
          />
        </label>
        <img
          :src="pic"
        />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/content'
import { updateUserInfo } from '@/api/user'

import config from '@/config'

export default {
  name: 'PicUpload',
  data () {
    return {
      pic: this.$store.state.userInfo.pic ? this.$store.state.userInfo.pic : '@/assets/bear-200-200.jpg',
      formData: ''
    }
  },
  methods: {
    upload (e) {
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }

      uploadImg(formData).then(res => {
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production' ? config.baseURL.pro : config.baseURL.dev
          this.pic = baseUrl + res.filePath
          updateUserInfo({
            pic: this.pic
          }).then(res => {
            if (res.code === 200) {
              const userInfo = this.$store.state.userInfo
              userInfo.pic = this.pic
              this.$store.commit('setUserInfo', userInfo)
              this.$alert('图片上传成功')
            }
          })
          this.$refs.pic.value = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#pic {
  display: none;
}
</style>

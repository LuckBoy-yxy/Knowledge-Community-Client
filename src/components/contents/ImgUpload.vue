<template>
  <Transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-border edit-content"
      v-show="isShow"
      ref="wrapper"
    >
      <div class="layui-layer-title">插入图片</div>

      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">

          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                type="text"
                id="fileInput"
                placeholder="粘贴图片地址或者点击上传"
                class="layui-input"
                v-model="url"
                autocomplete="off"
              />
            </div>

            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input
              type="file"
              name="file"
              id="uploadImg"
              class="layui-upload-file"
              @change="_uploadImg"
            />
          </li>

          <li class="layui-form-item">
            <button
              type="button"
              class="layui-btn"
              @click="submit"
            >确认</button>
          </li>
        </ul>
      </div>

      <span
        class="layui-layer-setwin"
        @click.stop="close"
      >
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
    </div>
  </Transition>
</template>

<script>
import { uploadImg } from '@/api/content'
import config from '@/config'

export default {
  name: 'ImgUpload',
  props: ['isShow', 'ctrl'],
  data () {
    return {
      url: '',
      formData: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.body.addEventListener('click', (e) => {
        this.handleBodyClick(e)
      })
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  },
  methods: {
    handleBodyClick (e) {
      if (!(this.ctrl?.contains(e.target) || this.$refs.wrapper?.contains(e.target))) {
        this.$emit('closeImgEvent')
        this.url = ''
        this.formData = ''
      }
    },
    close () {
      this.$emit('closeImgEvent')
      this.url = ''
      this.formData = ''
    },
    _uploadImg (e) {
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData

        uploadImg(formData).then(res => {
          if (res.code === 200) {
            const baseURL = process.env.NODE_ENV === 'production' ? config.baseURL.pro : config.baseURL.dev
            this.url = baseURL + res.filePath
            document.getElementById('uploadImg').value = ''
          }
        })
      }
    },
    submit () {
      if (this.url === '') {
        document.getElementById('fileInput').focus()
        this.$pop('请手动输入图片地址或点击上传图片', 'shake')
        return
      }
      this.$emit('addImgEvent', this.url)
      setTimeout(() => {
        this.url = ''
        this.formData = ''
        this.$emit('closeImgEvent')
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>

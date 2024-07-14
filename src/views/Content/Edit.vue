<template>
  <div class="layui-container fly-marginTop" :class="{'d-hide': isHide}">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">编辑帖子</li>
          </ul>

          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <ValidationObserver ref="form">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                    <label class="layui-form-label">所在专栏</label>
                    <div class="layui-input-block" >
                      <div
                        class="layui-unselect layui-form-select"
                      >
                        <div class="layui-select-title">
                          <input
                            class="layui-input layui-unselect layui-disabled"
                            type="text"
                            readonly
                            placeholder="请选择"
                            :value="catalogs[cataIndex].text"
                          >
                          <i class="layui-edge"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="layui-col-md9">
                    <label for="L_title" class="layui-form-label">标题</label>
                    <div class="layui-input-block">
                      <input
                        type="text"
                        id="L_title"
                        autocomplete="off"
                        class="layui-input"
                        v-model="title"
                      >
                      <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                    </div>
                  </div>
                </div>

                <Editor
                  @changeContent="handleChangeContent"
                  :initContent="content"
                />

                <div class="layui-form-item">
                  <div class="layui-inline">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <div class="layui-input-inline" style="width: 190px;">
                      <div
                        class="layui-unselect layui-form-select"
                      >
                        <div class="layui-select-title">
                          <input
                            class="layui-input layui-unselect layui-disabled"
                            type="text"
                            readonly
                            :value="favList[favIndex]"
                          >
                          <i class="layui-edge"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <ValidationProvider
                    name="code"
                    rules="required|code:6"
                    v-slot="{ errors }"
                  >
                    <div class="layui-input-inline">
                      <input
                        class="layui-input"
                        type="text"
                        name="code"
                        placeholder="请输入图片验证码"
                        v-model.trim="code"
                        autocomplete="off"
                      >
                    </div>
                    <div class="svg layui-form-mid">
                      <span v-html="svg" @click="_getCaptcha($store.state.sid)"></span>
                    </div>
                    <span class="layui-form-mid layui-word-aux error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="layui-form-item">
                  <button
                    type="button"
                    class="layui-btn"
                    lay-filter="*"
                    lay-submit
                    @click="submit"
                  >立即发布</button>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/contents/Editor.vue'

import codeMixin from '@/mixins/code.js'

import { updatePost } from '@/api/content'

export default {
  name: 'EditCom',
  mixins: [codeMixin],
  components: {
    Editor
  },
  props: ['tid', 'page'],
  data () {
    return {
      cataIndex: 0,
      favIndex: 0,
      content: '',
      title: '',
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favList: [20, 30, 50, 60, 80]
    }
  },
  computed: {
    isHide () {
      return this.$store.state.isHide
    }
  },
  methods: {
    handleChangeContent (value) {
      this.content = value
      if (this.content.trim()) {
        const saveData = {
          title: this.title,
          cataIndex: this.cataIndex,
          favIndex: this.favIndex,
          content: this.content
        }
        let newObj = { ...saveData }
        const editData = localStorage.getItem('editData')
        if (editData) {
          const editObj = JSON.parse(editData)
          newObj = { ...saveData, ...editObj }
        }
        localStorage.setItem('editData', JSON.stringify(newObj))
      }
    },
    async submit () {
      if (!this.title.trim()) return this.$pop('请输入帖子标题', 'shake')
      if (!this.content.trim()) return this.$pop('请输入帖子内容', 'shake')

      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      updatePost({
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid,
        tid: this.tid
      }).then(res => {
        if (res.code === 200) {
          localStorage.setItem('editData', '')
          this.$pop(res.msg + ', 2秒钟之后跳转')
          setTimeout(() => {
            localStorage.setItem('editData', '')
            this.$router.push({
              name: 'detail',
              params: {
                tid: this.tid
              }
            })
          }, 2000)
        } else {
          this.$pop(res.msg)
        }
      })
    }
  },
  mounted () {
    if (!this.page) {
      if (!localStorage.getItem('editData')) return
      const saveData = localStorage.getItem('editData')
      if (saveData) {
        this.$confirm('是否加载先前未完成的内容', () => {
          localStorage.setItem('editData', '')
        }, () => {
          const { title, content, favIndex, cataIndex } = JSON.parse(saveData)
          this.title = title
          this.content = content
          this.favIndex = favIndex
          this.cataIndex = cataIndex
        })
      }
    } else {
      this.content = this.page.content
      this.title = this.page.title
      this.cataIndex = this.catalogs.indexOf(this.catalogs.filter(item => item.value === this.page.catalog)[0])
      this.favIndex = this.favList.indexOf(+this.page.fav)
      localStorage.setItem('editData', JSON.stringify(this.page))
    }
  },
  beforeDestroy () {
    localStorage.setItem('editData', '')
  }
}
</script>

<style lang="scss" scoped>
dd.layui-this {
  color: #fff !important;
  background-color: #16b777 !important;
}
.svg {
  position: relative;
  top: -15px;
  &:hover {
    cursor: pointer;
  }
}
.error {
  color: #c00 !important;
}
</style>

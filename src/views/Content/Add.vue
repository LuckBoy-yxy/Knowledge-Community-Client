<template>
  <div class="layui-container fly-marginTop" :class="{'d-hide': isHide}">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <!-- tab 栏选项 -->
          <ul class="layui-tab-title">
            <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
          </ul>

          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <ValidationObserver ref="form">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                    <label class="layui-form-label">所在专栏</label>
                    <div
                      class="layui-input-block"
                      @click="open('catalog')"
                    >
                      <!-- <select lay-verify="required" name="class" lay-filter="column">
                        <option></option>
                        <option value="0">提问</option>
                        <option value="99">分享</option>
                        <option value="100">讨论</option>
                        <option value="101">建议</option>
                        <option value="168">公告</option>
                        <option value="169">动态</option>
                      </select> -->
                      <div
                        class="layui-unselect layui-form-select"
                       :class="{'layui-form-selected': isSelect}"
                      >
                        <div class="layui-select-title">
                          <input
                            class="layui-input layui-unselect"
                            type="text"
                            readonly
                            placeholder="请选择"
                            :value="catalogs[cataIndex].text"
                          >
                          <i class="layui-edge"></i>
                        </div>
                        <dl
                          class="layui-anim layui-anim-upbit"
                        >
                          <dd
                            v-for="(option, index) in catalogs"
                            :key="option.value"
                            :class="{ 'layui-this': index === cataIndex }"
                            @click="chooseCatalog(option, index)"
                          >{{ option.text }}</dd>
                        </dl>
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
                      <!-- <select name="experience">
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="80">80</option>
                      </select> -->
                      <div
                        class="layui-unselect layui-form-select"
                        :class="{'layui-form-selected': isSelectFav}"
                        @click="open('fav')"
                      >
                        <div class="layui-select-title">
                          <input
                            class="layui-input layui-unselect"
                            type="text"
                            readonly
                            :value="favList[favIndex]"
                          >
                          <i class="layui-edge"></i>
                        </div>
                        <dl
                          class="layui-anim layui-anim-upbit"
                        >
                          <dd
                            v-for="(fav, index) in favList"
                            :key="'fav' + index"
                            :class="{ 'layui-this': index === favIndex }"
                            @click="chooseFav(fav, index)"
                          >{{ fav }}</dd>
                        </dl>
                      </div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
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

import { addPost } from '@/api/content'
export default {
  name: 'AddCom',
  mixins: [codeMixin],
  components: {
    Editor
  },
  data () {
    return {
      isSelect: false,
      isSelectFav: false,
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
    chooseCatalog (option, index) {
      this.cataIndex = index
    },
    chooseFav (fav, index) {
      this.favIndex = index
    },
    open (flag) {
      if (flag === 'catalog') {
        this.isSelect = !this.isSelect
        if (this.isSelectFav) {
          this.isSelectFav = false
        }
      } else {
        this.isSelectFav = !this.isSelectFav
        if (this.isSelect) {
          this.isSelect = false
        }
      }
    },
    handleChangeContent (value) {
      this.content = value
      if (this.content.trim()) {
        const saveData = {
          title: this.title,
          cataIndex: this.cataIndex,
          favIndex: this.favIndex,
          content: this.content
        }
        localStorage.setItem('addData', JSON.stringify(saveData))
      }
    },
    async submit () {
      if (!this.cataIndex) return this.$pop('请选择帖子专栏', 'shake')
      if (!this.title.trim()) return this.$pop('请输入帖子标题', 'shake')
      if (!this.content.trim()) return this.$pop('请输入帖子内容', 'shake')

      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    const saveData = JSON.parse(localStorage.getItem('addData'))
    if (saveData) {
      this.$confirm('是否加载先前未完成的内容', () => {
        localStorage.setItem('addData', '')
      }, () => {
        const { title, content, favIndex, cataIndex } = saveData
        this.title = title
        this.content = content
        this.favIndex = favIndex
        this.cataIndex = cataIndex
      })
    }
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

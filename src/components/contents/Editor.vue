<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <span
            @click="() => this.faceStatus = !this.faceStatus"
          >
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span
            @click="() => this.imgStatus = !this.imgStatus"
          >
            <i class="iconfont icon-tupian"></i>
          </span>
          <span
            @click="() => this.linkStatus = !this.linkStatus"
          >
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span
            class="quote"
            @click="() => this.quoteStatus = !this.quoteStatus"
          >
            ”
          </span>
          <span
            @click="() => this.codeStatus = !this.codeStatus"
          >
            <i class="iconfont icon-daima"></i>
          </span>
          <span
            @click="addHr"
          >
            hr
          </span>
          <span
            @click="() => this.previewStatus = !this.previewStatus"
          >
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>

        <textarea
          id="editContent"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          v-model="content"
          @focus="focusEvent"
          @blur="blurEvent"
        ></textarea>
      </div>
    </div>

    <div ref="modal">
      <Face
        :isShow="faceStatus"
        @addFaceEvent="addFace"
        @closeFaceEvent="() => this.faceStatus = false"
      />
      <ImgUpload
        :isShow="imgStatus"
        @addImgEvent="addImg"
        @closeImgEvent="() => this.imgStatus = false"
      />
      <LinkAdd
        :isShow="linkStatus"
        @addLinkEvent="addLink"
        @closeLinkEvent="() => this.linkStatus = false"
      />
      <Quote
        :isShow="quoteStatus"
        @addQuoteEvent="addQuote"
        @closeQuoteEvent="() => this.quoteStatus = false"
      />
      <Code
        :isShow="codeStatus"
        :width="codeWidth"
        :height="codeHeight"
        @addCodeEvent="addCode"
        @closeCodeEvent="() => this.codeStatus = false"
      />
      <Preview
        :isShow="previewStatus"
        :content="content"
        @closePreviewEvent="() => this.previewStatus = false"
      />
    </div>
  </div>
</template>

<script>
import Face from './Face.vue'
import ImgUpload from './ImgUpload.vue'
import LinkAdd from './LinkAdd.vue'
import Quote from './Quote.vue'
import Code from './Code.vue'
import Preview from './Preview.vue'

export default {
  name: 'EditorCom',
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Quote,
    Code,
    Preview
  },
  props: {
    initContent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      faceStatus: false,
      imgStatus: false,
      linkStatus: false,
      quoteStatus: false,
      codeStatus: false,
      previewStatus: false,
      codeWidth: 400,
      codeHeight: 200,
      content: '',
      pos: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.body.addEventListener('click', e => {
        this.handleBodyClick(e)
      })
    })
    this.codeWidth = this.$refs.textEdit?.offsetWidth - 60
    this.codeHeight = this.$refs.textEdit?.offsetHeight - 80
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit?.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit?.offsetHeight - 80
    })
  },
  updated () {
    // console.log(this.content)
    this.$emit('changeContent', this.content)
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.handleBodyClick)
  },
  methods: {
    addFace (item) {
      const insertContent = ` face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addImg (imgUrl) {
      const insertContent = ` img[${imgUrl}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addLink (link) {
      const insertContent = ` a(${link})[${link}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addQuote (quote) {
      const insertContent = ` \n[quote]\n${quote}\n[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addCode (code) {
      const insertContent = ` \n[pre]\n${code}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },
    handleBodyClick (e) {
      if (!(this.$refs.icons?.contains(e.target) || this.$refs.modal?.contains(e.target))) {
        this.faceStatus = false
        this.imgStatus = false
        this.linkStatus = false
        this.quoteStatus = false
        this.codeStatus = false
      }
    },
    insert (val) {
      if (typeof this.content === 'undefined') return
      const tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
      // this.$emit('changeContent', this.content)
    },
    getPos () {
      let currentPos = 0
      const elem = document.getElementById('editContent')
      if (document.selection) {
        const selecRange = document.selection.createRange()
        selecRange.moveStart('character', -elem.value.length)
        currentPos = selecRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        currentPos = elem.selectionStart
      }

      this.pos = currentPos
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    }
  },
  watch: {
    initContent (newVal) {
      this.content = newVal
    }
  }
}
</script>

<style lang="scss">
.fly-editor {
  height: 260px;
}
.quote {
  position: relative;
  top: 4px;
  vertical-align: middle;
  font-size: 22px;
}
.edit-wrap {
  position: relative;
}

.edit-content {
  position: absolute;
  z-index: 100;
  top: 40px;
  left: 0;
  background-color: #fff;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, .2);
}
</style>

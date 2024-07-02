<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <span
            ref="face"
            @click="() => this.faceStatus = !this.faceStatus"
          >
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span
            ref="img"
            @click="() => this.imgStatus = !this.imgStatus"
          >
            <i class="iconfont icon-tupian"></i>
          </span>
          <span
            ref="link"
            @click="() => this.linkStatus = !this.linkStatus"
          >
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote">
            ”
          </span>
          <span>
            <i class="iconfont icon-daima"></i>
          </span>
          <span>
            hr
          </span>
          <span>
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>

        <textarea
          class="layui-textarea fly-editor"
          name="content"
        ></textarea>
      </div>
    </div>

    <div ref="modal">
      <Face
        :isShow="faceStatus"
        :ctrl="this.$refs.face"
        @addFaceEvent="addFace"
        @closeFaceEvent="() => this.faceStatus = false"
      />
      <ImgUpload
        :isShow="imgStatus"
        :ctrl="this.$refs.img"
        @addImgEvent="addImg"
        @closeImgEvent="() => this.imgStatus = false"
      />
      <LinkAdd
        :isShow="linkStatus"
        :ctrl="this.$refs.link"
        @addLinkEvent="addLink"
        @closeLinkEvent="() => this.linkStatus = false"
      />
    </div>
  </div>
</template>

<script>
import Face from './Face.vue'
import ImgUpload from './ImgUpload.vue'
import LinkAdd from './LinkAdd.vue'

export default {
  name: 'EditorCom',
  components: {
    Face,
    ImgUpload,
    LinkAdd
  },
  data () {
    return {
      faceStatus: false,
      imgStatus: false,
      linkStatus: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.body.addEventListener('click', e => {
        this.handleBodyClick(e)
      })
    })
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.handleBodyClick)
  },
  methods: {
    addFace (face) {
      console.log(face)
    },
    addImg (imgUrl) {
      console.log(imgUrl)
    },
    addLink (link) {
      console.log(link)
    },
    handleBodyClick (e) {
      if (!(this.$refs.icons?.contains(e.target) || this.$refs.modal?.contains(e.target))) {
        this.faceStatus = false
        this.imgStatus = false
        this.linkStatus = false
      }
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}
.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

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
  top: 40px;
  left: 0;
}
</style>

<template>
  <Transition name="fade">
    <div
      class="layui-layer-tips layui-edit-face edit-content"
      v-show="isShow"
    >
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li
            v-for="(value, key) in faceList"
            :key="key"
            @click="handleFaceClick(key)"
          >
            <img :src="value" alt />
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script>
import face from '@/assets/js/face.js'

export default {
  name: 'FaceCom',
  // props: {
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   },
  //   ctrl: {
  //     type: Object,
  //     default: () => {}
  //   }
  // },
  props: ['isShow', 'ctrl'],
  data () {
    return {
      faceList: face
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.body.addEventListener('click', (e) => {
        this.handleBodyClick(e)
      })
      // document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  },
  methods: {
    handleFaceClick (key) {
      this.$emit('addFaceEvent', key)
    },
    handleBodyClick (e) {
      // e.stopPropagation()
      if (!this.ctrl?.contains(e.target)) {
        this.$emit('closeFaceEvent')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-content {
  position: absolute;
  top: 40px;
  left: 0;
}
</style>

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
  props: ['isShow'],
  data () {
    return {
      faceList: face
    }
  },
  methods: {
    handleFaceClick (key) {
      this.$emit('addFaceEvent', key)
      this.$emit('closeFaceEvent')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

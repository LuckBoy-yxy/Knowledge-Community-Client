<template>
  <transition name="fade">
    <div
      class="layui-layer layui-layer-page layui-layer-prompt edit-content"
      v-show="isShow"
    >
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <input type="text" class="layui-layer-input" id="inputItem" v-model="link" />
      </div>
      <span class="layui-layer-setwin" @click="close">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit">确定</a>
        <a class="layui-layer-btn" @click.prevent="close">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinkAdd',
  // props: ['isShow', 'ctrl'],
  props: ['isShow'],
  data () {
    return {
      link: ''
    }
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     document.body.addEventListener('click', (e) => {
  //       console.log(111)
  //       this.handleBodyClick(e)
  //     })
  //   })
  // },
  // beforeDestroy () {
  //   document.body.removeEventListener('click', this.handleBodyClick)
  // },
  methods: {
    close () {
      this.$emit('closeLinkEvent')
      this.link = ''
    },
    submit () {
      if (this.link === '') {
        document.getElementById('inputItem').focus()
        this.$pop('请先输入需要添加的外链接', 'shake')
        return
      }

      this.$emit('addLinkEvent', this.link)
      setTimeout(() => {
        this.close()
      }, 0)
    }
    // handleBodyClick (e) {
    //   if (!(this.ctrl?.contains(e.target) || this.$refs.wrapper?.contains(e.target))) {
    //     this.close()
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>

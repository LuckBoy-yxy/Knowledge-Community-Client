<template>
  <div
    class="tips animation"
    v-show="isShow"
    ref="tips"
    :class="{ shake: type === 'shake' }"
  >
    <div class="content">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'PopCom',
  props: {
    type: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow (newVal, oldVal) {
      if (newVal !== oldVal && newVal === true) {
        setTimeout(() => {
          const width = this.$refs.tips.clientWidth
          const height = this.$refs.tips.clientWidth
          this.$refs.tips.style.marginLeft = -width / 2 + 'px'
          this.$refs.tips.style.marginTop = -height / 2 + 'px'
        }, 0)
        setTimeout(() => {
          // eslint-disable-next-line vue/no-mutating-props
          this.isShow = false
          // eslint-disable-next-line vue/no-mutating-props
          this.msg = ''
          // eslint-disable-next-line vue/no-mutating-props
          this.type = ''
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }

  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

.tips {
  position: fixed;
  top: 50%;
  left: 50%;
}
.animation {
  animation-fill-mode: both;
  animation-duration: .3s;
}
.content {
  padding: 10px 15px;
  color: #fff;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, .4);
}
.shake {
  animation-name: shake;
}
</style>

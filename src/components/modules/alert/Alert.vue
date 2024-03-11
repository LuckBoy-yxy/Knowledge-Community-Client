<template>
  <div v-show="isShow">
    <div class="alert">
      <div class="flex">{{ msg }}</div>
      <div class="btnCommon success" @click="close">确定</div>
    </div>

    <div class="mask" @click="closeMask"></div>
  </div>
</template>

<script>
export default {
  name: 'AlertCom',
  props: {
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      // eslint-disable-next-line vue/no-mutating-props
      this.isShow = false
    },
    closeMask () {
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);

.alert {
  position: fixed;
  z-index: 3000;
  top: 50%;
  left: 50%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  width: 300px;
  height: 150px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 5px 8px rgba(0, 0, 0, .2);

  .btnCommon {
    width: 105px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 6px;
    &.success {
      color: #fff;
      background-color: #009688;
    }
    &:hover {
      cursor: pointer;
      background-color: $btn-dark;
    }
  }
}

.mask {
  overflow: hidden;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
}

.flex {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

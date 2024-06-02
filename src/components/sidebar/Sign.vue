<template>
  <div class="fly-panel fly-signin">
    <!-- 签到版块头部内容 -->
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinHelp"
        @click="showInfo"
      >说明</a>
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinTop"
        @click="showTop"
      >
        活跃榜
        <span class="layui-badge-dot"></span>
      </a>
      <span class="fly-signin-days">
        已连续签到
        <cite>16</cite>天
      </span>
    </div>

    <!-- 签到板块主体内容 -->
    <div class="fly-panel-main fly-signin-main">
      <button class="layui-btn layui-btn-danger" id="LAY_signin">今日签到</button>
      <span>
        可获得
        <cite>5</cite>飞吻
      </span>

      <!-- 已签到状态 -->
      <!--
          <button class="layui-btn layui-btn-disabled">今日已签到</button>
          <span>获得了<cite>20</cite>飞吻</span>
      -->
    </div>

    <!-- 签到说明板块内容 -->
    <SignInfo :isShow="isShow" @closeModal="close" />

    <!-- 签到活跃榜板块内容 -->
    <SignList :isShow="showList" :lists="lists" @closeModal="close" />
  </div>
</template>

<script>
import SignInfo from './SignInfo.vue'
import SignList from './SignList.vue'

export default {
  name: 'SignCom',
  components: {
    SignInfo,
    SignList
  },
  data () {
    return {
      isShow: false,
      showList: false,
      current: 0,
      lists: []
    }
  },
  methods: {
    showInfo () {
      this.isShow = true
    },
    showTop () {
      this.showList = true
    },
    close () {
      this.isShow = false
      this.showList = false
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
.mask {
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
}
.layui-layer {
  z-index: 21000;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -250px;
  width: 500px;
  height: 480px;
  background-color: #fff;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title {
    padding-left: 20px;
    padding-right: 20px;
    height: 42px;
    line-height: 42px;
    color: #333;
    background-color: #f8f8f8;
  }
  .layui-layer-content {
    padding: 20px;
    .layui-tab-item {
      line-height: 45px;
      img {
        // margin-left: 10px;
        width: 30px;
        height: 30px;
        border-radius: 2px;
      }
      li {
        border-bottom: 1px dotted #dcdcdc;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .layui-tab-content {
    padding: 0 10px;
  }
}
</style>

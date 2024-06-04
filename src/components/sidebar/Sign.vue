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
      <span
        class="fly-signin-days"
        v-show="isSign || token"
      >
        已连续签到
        <cite>{{ count }}</cite>天
      </span>
    </div>

    <!-- 签到板块主体内容 -->
    <div class="fly-panel-main fly-signin-main">
      <!-- 没有签到的模板 -->
      <template v-if="!isSign">
        <button
          class="layui-btn layui-btn-danger"
          id="LAY_signin"
          @click="sign"
        >今日签到</button>
        <span v-show="token">
          可获得
          <cite>{{ favs }}</cite>飞吻
        </span>
      </template>

      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span>获得了<cite>{{ favs }}</cite>飞吻</span>
      </template>
    </div>

    <!-- 签到说明板块内容 -->
    <SignInfo :isShow="isShow" @closeModal="close" />

    <!-- 签到活跃榜板块内容 -->
    <SignList :isShow="showList" :lists="lists" @closeModal="close" />
  </div>
</template>

<script>
import moment from 'moment'

import SignInfo from './SignInfo.vue'
import SignList from './SignList.vue'

import userSign from '@/api/user.js'

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
      lists: [],
      isSign: false
    }
  },
  mounted () {
    if (this.$store.state.userInfo.token) {
      const isSign = this.$store.state.userInfo.isSign
      const lastSign = this.$store.state.userInfo.lastSign
      const nowDate = moment().format('YYYY-MM-DD')
      const lastDate = moment(lastSign).format('YYYY-MM-DD')
      const diff = moment(nowDate).diff(moment(lastDate), 'days')
      if (diff > 0 && isSign) {
        this.isSign = false
      } else {
        this.isSign = true
      }
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
    },
    sign () {
      if (!this.$store.state.userInfo.token) {
        // return this.$alert('请先登录')
        return this.$pop('请先登录', 'shake')
      }
      userSign().then(res => {
        const user = this.$store.state.userInfo
        if (res.code === 200) {
          user.count = res.data.count
          user.favs = res.data.favs
          this.$pop('登录成功')
        } else {
          // this.$alert('今日已经签到过了')
          this.$pop('今日已经签到过了')
        }
        user.isSign = true
        user.lastSign = res.data.lastSign
        this.$store.commit('setUserInfo', user)
      })
    }
  },
  computed: {
    favs () {
      let fav = 0
      const count = parseInt(this.count)
      if (count < 5) {
        fav = 5
      } else if (count >= 5 && count < 15) {
        fav = 10
      } else if (count >= 15 && count < 30) {
        fav = 15
      } else if (count >= 30 && count < 100) {
        fav = 20
      } else if (count >= 100 && count < 365) {
        fav = 30
      } else if (count >= 365) {
        fav = 50
      }

      return fav
    },
    count () {
      if (this.$store.state.userInfo.token) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    token () {
      return this.$store.state.userInfo.token
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

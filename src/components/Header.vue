<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img src="../assets/logo-2.png" alt="layui">
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html"><i class="iconfont icon-iconmingxinganli"></i>案例</a>
        </li>
        <li class="layui-nav-item">
          <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <template v-if="!userInfo.token">
          <li class="layui-nav-item">
            <RouterLink
              class="iconfont icon-touxiang layui-hide-xs"
              to="/user123"
            ></RouterLink>
          </li>
          <li class="layui-nav-item">
            <RouterLink :to="{ name: 'login' }">登入</RouterLink>
          </li>
          <li class="layui-nav-item">
            <RouterLink :to="{ name: 'reg' }">注册</RouterLink>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" title="QQ登入" class="iconfont icon-qq"></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" title="微博登入" class="iconfont icon-weibo"></a>
          </li>
        </template>

        <template v-else>
          <li
            class="layui-nav-item"
            @mouseenter="show"
            @mouseleave="hide"
          >
            <RouterLink
              class="fly-nav-avatar"
              to="/center"
            >
              <cite class="layui-hide-xs">{{ userInfo.name }} </cite>
              <i class="iconfont icon-renzheng layui-hide-xs" :title="userInfo.name"></i>
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'">VIP{{ userInfo.isVip }}</i>
              <img :src="userInfo.pic">
            </RouterLink>

            <!-- 下拉菜单 -->
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': isShow }"
            >
              <dd>
                <RouterLink to="/center/settings">
                  <i class="layui-icon">&#xe620;</i>基本设置
                </RouterLink>
              </dd>
              <dd>
                <RouterLink to="/center/messages">
                  <i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息
                </RouterLink>
              </dd>
              <dd>
                <RouterLink :to="`/user/${userInfo._id}`">
                  <i
                    class="layui-icon"
                    style="margin-left: 2px; font-size: 22px;"
                  >&#xe68e;</i>我的主页
                </RouterLink>
              </dd>

              <hr style="margin: 5px 0;">
              <dd>
                <a
                  href="javascript: void(0)"
                  style="text-align: center;"
                  @click="logout"
                >退出</a></dd>
            </dl>
          </li>

          <!-- v-if="num !== 0" -->
          <div
            v-if="num.message && num.message !== 0"
            class="fly-nav-msg"
          >{{ num.message }}</div>
          <Transition name="fade">
            <div
              class="layui-layer-tips"
              v-show="hasMsg"
            >
              <div class="layui-layer-content">
                您有 {{ num.message }} 条未读消息
                <i class="layui-layer-TipsG layui-layer-TipsB"></i>
              </div>
            </div>
          </Transition>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

let timeId = null

export default {
  name: 'HeaderCom',
  data () {
    return {
      isShow: false,
      hasMsg: false
    }
  },
  mounted () {
    window.vue = this
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    ...mapState({
      num: state => state.num
    })
  },
  methods: {
    show () {
      clearTimeout(timeId)
      timeId = setTimeout(() => {
        this.isShow = true
      }, 200)
    },
    hide () {
      clearTimeout(timeId)
      timeId = setTimeout(() => {
        this.isShow = false
      }, 500)
    },
    logout () {
      this.$confirm('确定要退出吗?', () => {}, () => {
        this.$store.commit('logout')
      })
    }
  },
  watch: {
    num (newVal, oldVal) {
      if (newVal.event && newVal !== oldVal) {
        this.hasMsg = true
        setTimeout(() => {
          this.hasMsg = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}
.layui-layer-tips {
  position: fixed;
  top: 55px;
  right: 130px;
  z-index: 2000;
  white-space: nowrap;
}
</style>

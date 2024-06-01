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
            <a class="iconfont icon-touxiang layui-hide-xs" href="../user/login.html"></a>
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
            <a
              class="fly-nav-avatar"
              href="javascript:;"
            >
              <cite class="layui-hide-xs">{{ userInfo.name }} </cite>
              <i class="iconfont icon-renzheng layui-hide-xs" :title="userInfo.name"></i>
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-show="userInfo.isVip !== '0'">VIP{{ userInfo.isVip }}</i>
              <img :src="userInfo.pic">
            </a>

            <!-- 下拉菜单 -->
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': isShow }"
            >
              <dd><a href="user/set.html"><i class="layui-icon">&#xe620;</i>基本设置</a></dd>
              <dd><a href="user/message.html"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</a></dd>
              <dd><a href="user/home.html"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
              <hr style="margin: 5px 0;">
              <dd>
                <a
                  href="javascript: void(0)"
                  style="text-align: center;"
                  @click="logout"
                >退出</a></dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
let timeId = null

export default {
  name: 'HeaderCom',
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
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
  }
}
</script>

<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}
</style>

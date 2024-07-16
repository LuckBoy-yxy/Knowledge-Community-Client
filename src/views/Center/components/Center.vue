<template>
  <div class="panel main pd2">
    <div class="msg">Hi, Admin，你已经是我们的正式会员！</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">我的会员信息</div>
          <div class="content fly-signin">
            <p>
              积分经验值:
              <cite>{{ userInfo.favs }}</cite>
            </p>
            <p>
              您当前为:
              <cite>
                {{ userInfo.isVip === '0' ? '非VIP' : `VIP ${ userInfo.isVip }` }}
              </cite>
            </p>
          </div>
        </div>
      </div>

      <div class="layui-col-md6">
        <sign class="border"></sign>
      </div>

      <div class="layui-col-md12 mt20">
        <div class="panel border">
          <div class="title">快捷方式</div>
          <div class="content" style="height: auto;">
            <ul class="layui-row layui-col-space10">
              <li
                class="layui-col-sm3 layui-col-xs4"
                v-for="(item, index) in lists"
                :key="index + item.name"
              >
                <RouterLink :to="item.link ? { name: item.link } : '/'">
                  <div
                    class="layui-icon shortcut"
                    :class="item.icon"
                  ></div>
                  <span>{{ item.name }}</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'

import Sign from '@/components/sidebar/Sign.vue'

export default {
  name: 'UserCenter',
  components: {
    Sign
  },
  data () {
    return {
      lists: [
        {
          name: '修改信息',
          link: 'info',
          icon: 'layui-icon-set'
        },
        {
          name: '修改头像',
          link: 'pic',
          icon: 'layui-icon-face-smile'
        },
        {
          name: '修改密码',
          link: 'passwd',
          icon: 'layui-icon-password'
        },
        {
          name: '账号绑定',
          link: 'account',
          icon: 'layui-icon-app'
        },
        {
          name: '发表新帖',
          link: '',
          icon: 'layui-icon-add-circle'
        },
        {
          name: '查看分享',
          link: '',
          icon: 'layui-icon-share'
        },
        {
          name: '我的帖子',
          link: 'mypost',
          icon: 'layui-icon-username'
        },
        {
          name: '我的收藏',
          link: 'mycollection',
          icon: 'layui-icon-rate-solid'
        },
        {
          name: '其他资料',
          link: '',
          icon: 'layui-icon-template-1'
        },
        {
          name: '关注公众号',
          link: '',
          icon: 'layui-icon-login-wechat'
        },
        {
          name: '文档',
          link: '',
          icon: 'layui-icon-file'
        },
        {
          name: '后台管理',
          link: '',
          icon: 'layui-icon-user'
        }
      ]
    }
  },
  mounted () {
    this._getUserInfo()
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    _getUserInfo () {
      getUserInfo({
        uid: this.$store.state.userInfo._id
      }).then(res => {
        if (res.code === 200) {
          // this.$store.commit('setUserInfo', res.data)
          const userInfo = this.userInfo
          this.$store.commit('setUserInfo', {
            ...userInfo,
            ...res.data
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .panel {
    &.main {
      margin: 0 !important;
    }
  }
}
.panel {
  color: #333;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  &.main {
    margin: 0 0 10px 225px;
  }
}

.msg {
  background-color: #f8f8f8;
  color: #666;
  padding: 10px 15px;
  margin-bottom: 20px;
}

.border {
  border: 1px solid #e6e6e6;
}

.title {
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  color: #333;
  border-bottom: 1px dotted #e9e9e9;
  font-size: 14px;
}

.content {
  padding: 18px 15px;
  height: 50px;
  line-height: 26px;
  font-size: 14px;
  color: #666;
}

li {
  text-align: center;
  padding: 5px;
}

.shortcut {
  background-color: #2f9688;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 30px;
}
</style>

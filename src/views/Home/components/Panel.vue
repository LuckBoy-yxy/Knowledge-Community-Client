<template>
  <div>
    <div class="panel">
      <div class="layui-container">
        <div class="left">
          <ul>
            <li class="layui-hide-xs"><router-link to="/">首页</router-link></li>
            <li v-for="item in lists" :key="item.path">
              <router-link :to="item.path" exact-active-class="layui-this">
                {{ item.name }}
                <span class="layui-badge-dot" v-if="item.isNew"></span>
              </router-link>
            </li>
            <template v-if="userInfo.token">
              <li class="layui-hide-xs"><span class="line"></span></li>
              <li class="layui-hide-xs"><a href="#">我发表的帖</a></li>
              <li class="layui-hide-xs"><a href="#">我收藏的帖</a></li>
            </template>
          </ul>
        </div>
        <div class="right layui-hide-xs">
          <i class="layui-icon layui-icon-search"></i>
          <router-link to="/add" class="layui-btn">发表新帖</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelCom',
  data () {
    return {
      lists: [
        {
          path: '/homeIndex/ask',
          name: '提问',
          isNew: true
        },
        {
          path: '/homeIndex/share',
          name: '分享',
          isNew: true
        },
        {
          path: '/homeIndex/discuss',
          name: '讨论',
          isNew: true
        },
        {
          path: '/homeIndex/advise',
          name: '建议',
          isNew: true
        },
        {
          path: '/homeIndex/notice',
          name: '公告',
          isNew: true
        },
        {
          path: '/homeIndex/logs',
          name: '动态',
          isNew: true
        }
      ]
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .panel {
    height: auto !important;
  }
  ul {
    li {
      width: 33.3%;
    }
  }
}

.panel {
  position: relative;
  margin-bottom: 15px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  .left {
    ul {
      li {
        position: relative;
        display: inline-block;
        a {
          padding: 0 20px;
        }
        .line {
          display: inline-block;
          position: relative;
          top: -2px;
          margin: 0 20px;
          width: 1px;
          height: 20px;
          background: #ccc;
          vertical-align: middle;
        }
        .layui-badge-dot {
          position: absolute;
          top: 12px;
          right: 8px;
        }
      }
    }
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      margin-right: 20px;
      font-size: 25px;
      &:hover {
        color: #5fb878;
        cursor: pointer;
      }
    }
  }
}
</style>

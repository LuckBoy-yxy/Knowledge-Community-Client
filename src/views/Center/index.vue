<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <li class="layui-nav-item" v-for="(item,index) in lists" :key="'center' + index">
        <RouterLink :to="{ name: item.path }">
          <i class="layui-icon" :class="item.icon"></i>
          {{item.name}}
        </RouterLink>
      </li>
    </ul>

    <RouterView />
  </div>
</template>

<script>

export default {
  name: 'CenterCom',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'layui-icon-home',
          path: 'home'
        },
        {
          name: '用户中心',
          icon: 'layui-icon-username',
          path: 'user-center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set',
          path: 'settings'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-form',
          path: 'posts'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-dialogue',
          path: 'messages'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-component',
          path: 'others'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "../assets/custom/iconfont.css";
.layui-icon {
  margin-right: 10px;
}
</style>

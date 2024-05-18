<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <li class="layui-nav-item" v-for="(item,index) in lists" :key="'center' + index">
        <a href>
          <i class="layui-icon" :class="item.icon"></i>
          {{item.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'centerCom',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'layui-icon-home'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-form'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-dialogue'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-component'
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

<template>
  <div>
    <div class="fly-panel" v-show="lists.length > 0">
      <div class="fly-panel-title fly-filter">
        <a>置顶</a>
        <a
          href="#signin"
          class="layui-hide-sm layui-show-xs-block fly-right"
          id="LAY_goSignin"
          style="color: #FF5722;"
        >去签到</a>
      </div>

      <ListItem :lists="lists" :isMore="false" />
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'TopList',
  components: {
    ListItem
  },
  data () {
    return {
      page: 1,
      pageSize: 10,
      lists: []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

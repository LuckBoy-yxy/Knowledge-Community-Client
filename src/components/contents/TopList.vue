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
      lists: [
        {
          user: {
            name: '大帅',
            isVip: '7'
          },
          title: '大帅加油',
          content: '',
          created_time: '2024-05-1 18:27:00',
          catalog: 'ask',
          fav: 100,
          isEnd: 0,
          reads: 10,
          answer: 100,
          status: 0,
          isTop: 1,
          tags: [
            {
              name: '精华',
              class: 'layui-bg-red'
            },
            {
              name: '热门',
              class: 'layui-bg-blue'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

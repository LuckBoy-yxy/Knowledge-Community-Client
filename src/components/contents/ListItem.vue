<template>
  <div>
    <ul class="fly-list">
      <li v-for="item in items" :key="item.tid">
        <a href="user/home.html" class="fly-avatar">
          <img src="" alt="贤心" />
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <a href="jie/detail.html">{{ item.title }}</a>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>{{ item.user.name }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i
              class="layui-badge fly-badge-vip"
              v-if="item.user.isVip !== '0'"
            >{{ 'VIP' + item.user.isVip }}</i>
          </a>
          <span>{{ item.created_time }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
            <i class="iconfont icon-kiss"></i> {{ item.fav }}
          </span>
          <span
            class="layui-badge fly-badge-accept layui-hide-xs"
            v-show="item.status !== '0'"
          >已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0">
          <span
            class="layui-badge"
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
            :class="tag.class"
          >{{ tag }}</span>
        </div>
      </li>
    </ul>

    <div style="text-align: center">
      <div class="laypage-main">
        <a
          class="laypage-next"
          @click.prevent="nextPage"
        >更多求解</a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ListItem',
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    items () {
      // return this.props.lists
      _.map(this.props.lists, item => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
          default:
            item.catalog = '全部'
        }
      })
      return this.lists
    }
  },
  methods: {
    nextPage () {
      this.$emit('nextPage')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

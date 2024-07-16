<template>
  <div>
    <ul class="fly-list">
      <li v-for="item in items" :key="item.tid">
        <a href="user/home.html" class="fly-avatar">
          <img :src="item.uid.pic" alt="大帅" />
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <RouterLink :to="`/detail/${item._id}`">{{ item.title }}</RouterLink>
        </h2>
        <div class="fly-list-info">
          <RouterLink
            :to="{
              name: 'home',
              params: {
                uid: item.uid?._id
              }
            }"
            link
          >
            <cite>{{ item.uid.name }}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i
              class="layui-badge fly-badge-vip"
              v-if="item.uid.isVip !== '0'"
            >{{ 'VIP' + item.uid.isVip }}</i>
          </RouterLink>
          <span>{{ item.created | moment }}</span>

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
          >{{ tag.name }}</span>
        </div>
      </li>
    </ul>

    <div style="text-align: center" v-show="isMore">
      <div class="laypage-main" v-if="!isEnd">
        <a
          class="laypage-next"
          @click.prevent="nextPage"
        >更多求解</a>
      </div>
      <div class="nomore gray" v-else>
        没有更多了
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  name: 'ListItem',
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    isMore: {
      type: Boolean,
      default: true
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items () {
      // return this.props.lists
      _.map(this.$props.lists, item => {
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
  filters: {
    moment (date) {
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return moment(date).from(moment())
      }
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
.nomore {
  padding: 30px 0;
  font-size: 16px;
}
</style>

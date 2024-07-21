<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
      <button class="layui-btn layui-btn-danger" id="LAY_delallmsg">清空全部消息</button>
      <div id="LAY_minemsg" style="margin-top: 10px;">
        <div
          v-if="!lists.length"
          class="fly-none"
        >您暂时没有最新消息</div>
        <ul
          v-else
          class="mine-msg"
        >
          <li
            v-for="item in lists"
            :key="item._id"
          >
            <blockquote class="layui-elem-quote">
              <RouterLink
                :to="item.cuid ? `/user/${item.cuid._id}` : '/404'"
              >
                <cite>{{ item.cuid?.name || 'testUser' }}</cite>
              </RouterLink>回答了您的求解
              <RouterLink
                :to="item.tid ? `/detail/${item.tid._id}` : '/404'"
              >
                <cite>{{ item.tid?.title || '当前帖子已被删除' }}</cite>
              </RouterLink>
            </blockquote>
            <p>
              <span>{{ item.created | momentDate }}</span>
              <a
                href="javascript:;"
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
              >删除</a>
            </p>
          </li>
        </ul>

        <Pagination
          v-if="lists.length"
          :currPage="page"
          :pageSize="pageSize"
          :total="total"
          :showEnd="false"
          @changeCurrentPage="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'

import { getMsg } from '@/api/user'

export default {
  name: 'MessageCom',
  components: {
    Pagination
  },
  data () {
    return {
      lists: [],
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted () {
    this.getMsgAll()
  },
  methods: {
    getMsgAll () {
      getMsg({
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    handleChangePage (page, flag) {
      if (flag) {
        this.page = page
        this.getMsgAll()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

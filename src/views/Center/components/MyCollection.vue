<template>
    <div>
      <table class="layui-table">
        <thead>
          <tr>
            <th class="title">
              <div class="layui-table-cell pl0">
                <span>帖子标题</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-right pr0">
                <span>收藏时间</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in collectList"
            :key="item._id"
          >
            <td class="title">
              <RouterLink
                class="link"
                :to="{
                  name: 'detail',
                  params: {
                    tid: item.tid
                  }
                }"
              >
                {{ item.title }}
              </RouterLink>
            </td>
            <td class="text-right">{{ item.created | momentDate }}</td>
          </tr>
        </tbody>
      </table>

      <Pagination
        v-if="collectList.length"
        align="left"
        :currPage="currPage"
        :pageSize="pageSize"
        :total="total"
        showType="icon"
        :showEnd="false"
        @changeCurrentPage="handleChangePage"
      />
    </div>
</template>

<script>
import { getCollect } from '@/api/user'

import Pagination from '@/components/pagination'

export default {
  name: 'MyCollection',
  components: {
    Pagination
  },
  data () {
    return {
      currPage: 1,
      pageSize: 10,
      total: 0,
      collectList: []
    }
  },
  mounted () {
    this._getCollect()
  },
  methods: {
    _getCollect () {
      getCollect({
        page: this.currPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.collectList = res.data
          this.total = res.total
        }
      })
    },
    changeCurrentPage ({ page, flag }) {
      if (flag) {
        this.currPage = page
        this._getCollect()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
.link {
  color: rgb(95, 95, 238);
}
</style>

<template>
  <div>
    <div class="overflow">
      <table class="layui-table" border="0">
        <thead>
          <tr>
            <th>
              <div class="layui-table-cell pl0 text-center">
                <span>帖子标题</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>状态</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>结帖</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>发表时间</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>数据</span>
              </div>
            </th>
            <th class="min-cell">
              <div class="layui-table-cell text-center">
                <span>操作</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="item in lists"
            :key="item._id"
          >
            <td class="text-center">{{ item.title }}</td>
            <td>{{ item.status === '0' ? '打开' : '关闭' }}</td>
            <td>{{ item.isEnd === '0' ? '未结' : '已结' }}</td>
            <td>{{ item.created | momentDate }}</td>
            <td>{{ item.reads }} 读/{{ item.answer }} 答</td>
            <td>
              <RouterLink
                class="layui-btn layui-btn-xs"
                :to="{ name: 'detail', params: { tid: item._id } }"
              >编辑</RouterLink>
              <div
                class="layui-btn layui-btn-xs layui-btn-danger"
                @click="del(item)"
              >删除</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination
      v-if="lists.length"
      align="left"
      showType="icon"
      :showEnd="false"
      :currPage="currPage"
      :pageSize="pageSize"
      :total="total"
      @changeCurrentPage="handleChangePage"
    />
  </div>
</template>

<script>
import Pagination from '@/components/pagination'

import { getPostList } from '@/api/user'

export default {
  name: 'MyPost',
  components: {
    Pagination
  },
  data () {
    return {
      currPage: 1,
      pageSize: 10,
      total: 0,
      lists: []
    }
  },
  mounted () {
    this._getPostList()
  },
  methods: {
    _getPostList () {
      getPostList({
        page: this.currPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.lists = res.data.list
          this.total = res.data.total
        }
      })
    },
    handleChangePage ({ page, flag }) {
      if (flag) {
        this.currPage = page
        this._getPostList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overflow {
  overflow-y: auto;
}
.min-cell {
  min-width: 80px;
}
</style>

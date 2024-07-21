<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
      <button class="layui-btn layui-btn-danger" id="LAY_delallmsg">清空全部消息</button>
      <div id="LAY_minemsg" style="margin-top: 10px;">
        <div
          v-if="lists.length"
          class="fly-none"
        >您暂时没有最新消息</div>
        <ul
          v-else
          class="mine-msg"
        >
          <li data-id="123">
            <blockquote class="layui-elem-quote">
              <a href="/jump?username=Absolutely" target="_blank">
                <cite>Absolutely</cite>
              </a>回答了您的求解
              <a target="_blank" href="/jie/8153.html/page/0/#item-1489505778669">
                <cite>layui后台框架</cite>
              </a>
            </blockquote>
            <p>
              <span>1小时前</span>
              <a
                href="javascript:;"
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
              >删除</a>
            </p>
          </li>
          <li data-id="123">
            <blockquote class="layui-elem-quote">系统消息：欢迎使用 layui</blockquote>
            <p>
              <span>1小时前</span>
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

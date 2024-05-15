<template>
  <div>
    <div class="fly-panel" style="margin-bottom: 0;">
      <div class="fly-panel-title fly-filter">
        <a
          :class="{ 'layui-this': status === '' && tag === '' }"
          @click.prevent="search('')"
        >综合</a>
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': status === '0' }"
          @click.prevent="search(0)"
        >未结</a>
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': status === '1' }"
          @click.prevent="search(1)"
        >已结</a>
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': status === '' && tag === '精华' }"
          @click.prevent="search(2)"
        >精华</a>
        <span class="fly-filter-right layui-hide-xs">
          <a
            :class="{ 'layui-this': sort === 'created' }"
            @click.prevent="search(3)"
          >按最新</a>
          <span class="fly-mid"></span>
          <a
            :class="{ 'layui-this': sort === 'answer' }"
            @click.prevent="search(4)"
          >按热议</a>
        </span>
      </div>

      <ListItem :isEnd="isEnd" :lists="lists" @nextPage="nextPage" />
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'

import { getList } from '@/api/content'

export default {
  name: 'listCom',
  components: {
    ListItem
  },
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 1,
      pagseSize: 10,
      catalog: '',
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
          isTop: 0,
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
      ],
      isEnd: true,
      isRepeat: false
    }
  },
  created () {
    // this._getList()
  },
  methods: {
    search (val) {
      switch (val) {
        case 0:
          this.status = '0'
          this.tag = ''
          break
        case 1:
          this.status = '1'
          this.tag = ''
          break
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
      }
    },
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      const options = {
        page: this.page,
        pagseSize: this.pagseSize,
        sort: this.sort,
        tag: this.tag,
        catalog: this.catalog,
        status: this.status,
        isTop: 0
      }
      getList(options).then(res => {
        console.log(res)
        if (res.code === 200) {
          if (res.data.length < this.pagseSize) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
          this.isRepeat = false
        }
      }).catch(err => {
        this.isRepeat = false
        if (err.msg) {
          this.$alert(err.msg)
        }
      })
    },
    nextPage () {
      this.page++
      this._getList()
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  &:hover {
    cursor: pointer;
  }
}
</style>

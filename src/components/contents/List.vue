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
      page: 0,
      pagseSize: 10,
      catalog: '',
      lists: [],
      isEnd: false,
      isRepeat: false,
      current: ''
    }
  },
  created () {
    const catalog = this.$route.params.catalog
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getList()
  },
  methods: {
    search (val) {
      if (val === '' && this.current === '') return
      if (val === this.current) return
      this.current = val
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
          this.current = ''
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
        if (err.message) {
          this.$alert(err.message)
        }
      })
    },
    nextPage () {
      this.page++
      this._getList()
    },
    initList (flag = false) {
      if (flag) {
        const catalog = this.$route.params.catalog
        if (typeof catalog !== 'undefined' && catalog !== '') {
          this.catalog = catalog
        }
      }
      this.page = 0
      this.pageSize = 10
      this.isEnd = false
      this.lists = []
      this._getList()
    }
  },
  watch: {
    current (newVal, oldVal) {
      this.initList()
    },
    '$route' (newVal, oldVal) {
      this.initList(true)
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

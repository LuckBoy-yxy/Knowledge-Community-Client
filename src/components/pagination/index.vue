<template>
  <div
    class="d-flex"
    :class="{
      'flex-center': align === 'center',
      'flex-start': align === 'left',
      'flex-end': align === 'right'
    }"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <!-- 首页 -->
      <a
        class="layui-laypage-prev"
        v-show="showEnd"
        :class="[ currPage === 1 ? 'layui-disabled' : '' ]"
        @click.prevent="home"
      >
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-prev"
        ></i>
        <template v-else>首页</template>
      </a>

      <!-- 上一页 -->
      <a
        :class="{ 'layui-disabled': currPage === 1 }"
        @click.prevent="prev"
      >
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-left"
        ></i>
        <template v-else>上一页</template>
      </a>

      <a
        href="javascript:;"
        v-if="pages.length > 5 && currPage - 2 > 1"
        class="layui-disabled"
      >
        ...
      </a>
      <template v-for="(item, index) in pages" >
        <a
          v-if="item >= (currPage - 2) && item <= (currPage + 2)"
          :key="index"
          :class="[
            currPage === item ? 'active' : '',
            currPage === item ? theme : ''
          ]"
          @click="change(item)"
        >
          {{ item }}
        </a>
      </template>
      <a
        href="javascript:;"
        v-if="pages.length > 5 && currPage + 2 < pages.length"
        class="layui-disabled"
      >
        ...
      </a>

      <!-- 下一页 -->
      <a
        :class="{ 'layui-disabled': currPage === pages.length }"
        @click.prevent="next"
      >
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-right"
        ></i>
        <template v-else>下一页</template>
      </a>

      <!-- 尾页 -->
      <a
        class="layui-laypage-next"
        v-show="showEnd"
        :class="[ currPage === pages.length ? 'layui-disabled' : '' ]"
        @click.prevent="end"
      >
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-next"
        ></i>
        <template v-else>尾页</template>
      </a>
    </div>

    <!-- 跳转指定页码区域 -->
    <div class="total" v-if="hasTotal">
      到第
      <input type="text" class="imooc-input" /> 页&emsp;共 {{ Math.ceil(total / pageSize) }} 页
    </div>

    <!-- 限制页码区域 -->
    <div v-if="hasSelect">
      <div
        class="layui-unselect layui-form-select"
        :class="{'layui-form-selected': isSelect}"
        @click="changePageSize"
      >
        <div class="layui-select-title">
          <input
            type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
          />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item,index) in options"
            :key="'catalog' + index"
            @click="choosePageSize(item, index)"
            :class="{'layui-this': index === optIndex}"
          >{{item}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'PaginationCom',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      // icon
      default: 'text'
    },
    showEnd: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    currPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      isSelect: false,
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      pages: []
    }
  },
  mounted () {
    this.initPages()
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.pageSize)))
    this.optIndex = this.options.indexOf(this.pageSize)
  },
  methods: {
    changePageSize () {
      this.isSelect = !this.isSelect
    },
    choosePageSize (pageSize, index) {
      if (this.optIndex !== index) {
        let oldPage = this.pageSize * this.currPage
        if (oldPage > this.total) {
          oldPage = this.total
        }
        this.$emit('changeCurrentPage', {
          page: Math.ceil(oldPage / this.options[index]),
          flag: false
        })
        this.$emit('changePageSize', this.options[index])
        this.optIndex = index
        this.initPages(this.options[index])
      }
    },
    initPages (newPageSize) {
      const len = Math.ceil(this.total / (newPageSize || this.pageSize))
      this.pages = _.range(1, len + 1)
    },
    home () {
      if (this.currPage === 1) return
      this.$emit('changeCurrentPage', {
        page: 1,
        flag: true
      })
    },
    prev () {
      if (this.currPage === 1) return
      this.$emit('changeCurrentPage', {
        page: this.currPage - 1,
        flag: true
      })
    },
    next () {
      if (this.currPage === this.pages.length) return
      this.$emit('changeCurrentPage', {
        page: this.currPage + 1,
        flag: true
      })
    },
    end () {
      if (this.currPage === this.pages.length) return
      this.$emit('changeCurrentPage', {
        page: this.pages.length,
        flag: true
      })
    },
    change (page) {
      if (page === this.currPage) return
      this.$emit('changeCurrentPage', {
        page,
        flag: true
      })
    }
  },
  watch: {
    total (newVal, OldVal) {
      this.initPages()
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px !important;
    // &:first-child {
    //   border-right: 0;
    // }
    // &:last-child {
    //   border-left: 0;
    // }
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -3.5px;
}
.imooc-input {
  padding: 0 5px;
  width: 30px;
  height: 23px;
  line-height: 23px;
}

.layui-input {
  height: 28px;
  line-height: 28px;
}

.layui-input {
  height: 30px;
  line-height: 30px;
}

.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>

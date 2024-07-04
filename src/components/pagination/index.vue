<template>
  <div
    class="d-flex"
    :class="{
      'flex-center': align === 'center',
      'flex-left': align === 'left',
      'flex-right': align === 'right'
    }"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <!-- 首页 -->
      <a
        href="javascript:;"
        class="layui-laypage-prev layui-disabled"
        data-page="0"
        v-show="showEnd"
      >
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-prev"
        ></i>
        <template v-else>首页</template>
      </a>

      <!-- 上一页 -->
      <a href="javascript:;" data-page="2">
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-left"
        ></i>
        <template v-else>上一页</template>
      </a>

      <a href="javascript:;"
        :class="[
          true ? theme : '',
          true ? 'active' : ''
        ]"
      >1</a>
      <a href="javascript:;">2</a>
      <a href="javascript:;">3</a>
      <a href="javascript:;">4</a>
      <a href="javascript:;">5</a>

      <!-- 下一页 -->
      <a href="javascript:;" data-page="2">
        <i
          v-if="showType === 'icon'"
          class="layui-icon layui-icon-right"
        ></i>
        <template v-else>下一页</template>
      </a>

      <!-- 尾页 -->
      <a
        href="javascript:;"
        class="layui-laypage-next"
        data-page="2"
        v-show="showEnd"
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
      <input type="text" class="imooc-input" /> 页&emsp;共 100 页
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
      default: false
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
    }
  },
  data () {
    return {
      isSelect: false,
      optIndex: 0,
      options: [10, 20, 30, 50, 100]
    }
  },
  methods: {
    changePageSize () {
      this.isSelect = !this.isSelect
    },
    choosePageSize (pageSize, index) {
      this.optIndex = index
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

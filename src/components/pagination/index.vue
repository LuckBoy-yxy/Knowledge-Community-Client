<template>
  <div
    :class="{
      'text-center': align === 'center',
      'text-left': align === 'left',
      'text-right': align === 'right'
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
  top: -2px;
}
.imooc-input {
  width: 30px;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
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

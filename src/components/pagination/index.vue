<template>
  <div class="text-center">
    <div
      class="layui-box layui-laypage layui-laypage-default"
    >
      <a
        href="javascript:;"
        class="layui-laypage-prev layui-disabled"
        data-page="0"
      >
        上一页
      </a>
      <span class="layui-laypage-curr">
        <em class="layui-laypage-em"></em>
        <em>1</em>
      </span>
      <a href="javascript:;" data-page="2">2</a>
      <a href="javascript:;" data-page="3">3</a>
      <a href="javascript:;" data-page="4">4</a>
      <a href="javascript:;" data-page="5">5</a>
      <a
        href="javascript:;"
        class="layui-laypage-next"
        data-page="2"
      >
        下一页
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationCom'
}
</script>

<style lang="scss" scoped>

</style>

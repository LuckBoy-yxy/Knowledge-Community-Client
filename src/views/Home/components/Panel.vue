<template>
  <div>
    <div class="panel">
      <div class="layui-container">
        <div class="left">
          <ul>
            <li class="layui-hide-xs"><a href="#">首页</a></li>
            <li><a href="#">提问</a></li>
            <li><a href="#">分享</a></li>
            <li><a href="#">讨论</a></li>
            <li><a href="#">建议</a></li>
            <li><a href="#">公告</a></li>
            <li><a href="#">动态</a></li>
            <li class="layui-hide-xs"><span class="line"></span></li>
            <li class="layui-hide-xs"><a href="#">我发表的帖</a></li>
            <li class="layui-hide-xs"><a href="#">我收藏的帖</a></li>
          </ul>
        </div>
        <div class="right layui-hide-xs">
          <i class="layui-icon layui-icon-search"></i>
          <div class="layui-btn">发表新帖</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelCom'
}
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .panel {
    height: auto !important;
  }
  ul {
    li {
      width: 33.3%;
    }
  }
}

.panel {
  position: relative;
  margin-bottom: 15px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  .left {
    ul {
      li {
        display: inline-block;
        a {
          padding: 0 20px;
        }
        .line {
          display: inline-block;
          position: relative;
          top: -2px;
          margin: 0 20px;
          width: 1px;
          height: 20px;
          background: #ccc;
          vertical-align: middle;
        }
      }
    }
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      margin-right: 20px;
      font-size: 25px;
      &:hover {
        color: #5fb878;
        cursor: pointer;
      }
    }
  }
}
</style>

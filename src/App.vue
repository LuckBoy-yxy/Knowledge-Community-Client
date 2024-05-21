<template>
  <div id="app">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script>
import HeaderCom from '@/components/Header.vue'
import FooterCom from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header: HeaderCom,
    Footer: FooterCom
  }
}
</script>

<style lang="scss">
// @import './assets/layui/css/layui.css';
// @import './assets/layui/css/modules/layer/default/layer.css';
@import './assets/css/global.css';

.svg {
  position: relative;
}
.gray {
color: #999;
}
pr0 {
  padding-right: 0;
}
.pl0 {
padding-left: 0;
}
.pd20 {
  padding: 20px;
}
.mt20 {
  margin-top: -20px;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
</style>

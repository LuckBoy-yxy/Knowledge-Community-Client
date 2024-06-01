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
  top: -4px;
}
.gray {
  color: #999;
}
.orange {
  color: #ff5722;
}
.pull-right {
  float: right !important;
}

// pr0 {
//   padding-right: 0;
// }
// .pl0 {
// padding-left: 0;
// }
// .pd20 {
//   padding: 20px;
// }

@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px !important;
  }
  .pt#{$i} {
    padding-top: $i * 10 + px !important;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px !important;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px !important;
  }
  .pb#{$i} {
    padding-bottom: $i * 10 + px !important;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px !important;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px !important;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px !important;
  }
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

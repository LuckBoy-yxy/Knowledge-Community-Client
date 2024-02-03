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
@import './assets/layui/css/layui.css';
@import './assets/css/global.css';
@import './assets/layui/css/modules/layer/default/layer.css'
</style>

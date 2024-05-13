<template>
  <div>
    <Panel />
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <List />
        </div>
        <div class="layui-col-md4">
          <Tips />
          <Sign />
          <HotList />
          <Ads />
          <Links />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from './components/Panel.vue'
import List from './components/List.vue'
import Ads from '../../components/sidebar/Ads.vue'
import HotList from '../../components/sidebar/HotList.vue'
import Links from '../../components/sidebar/Links.vue'
import Sign from '../../components/sidebar/Sign.vue'
import Tips from '../../components/sidebar/Tips.vue'

export default {
  name: 'HomeCom',
  components: {
    Panel,
    List,
    Ads,
    HotList,
    Links,
    Sign,
    Tips
  }
}
</script>

<style lang="scss" scoped>

</style>

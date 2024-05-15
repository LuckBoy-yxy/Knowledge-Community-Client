<template>
  <div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <TopList />
          <List />
        </div>
        <div class="layui-col-md4">
          <Tips />
          <Sign />
          <Links />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopList from '../../components/contents/TopList.vue'
import List from '@/components/contents/List.vue'
import Links from '../../components/sidebar/Links.vue'
import Sign from '../../components/sidebar/Sign.vue'
import Tips from '../../components/sidebar/Tips.vue'

export default {
  name: 'HomeCom',
  components: {
    TopList,
    List,
    Links,
    Sign,
    Tips
  }
}
</script>

<style lang="scss" scoped>

</style>

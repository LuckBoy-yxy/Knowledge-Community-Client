<template>
  <div>
    <Panel />
    <RouterView />
  </div>
</template>

<script>
import Panel from './components/Panel.vue'

export default {
  name: 'HomeCom',
  components: {
    Panel
  }
}
</script>

<style lang="scss" scoped>

</style>

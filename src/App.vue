<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
// import { mapActions, mapState, mapGetters } from 'vuex'
// import bindState from '@/assets/js/bindState'
export default {
  methods: {
    ...mapActions(['initMap'])
  },
  watch: {
    $route: {
      handler (route) {
        this.initMap(route.query)
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/style/base";
</style>
<style lang="scss" scoped>
@import "@/assets/style/global";
</style>

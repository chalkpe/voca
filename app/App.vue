<template lang="pug">
  v-app#app
    app-nav(:title='TITLE')
    main: router-view
    v-footer
      v-spacer
      .grey--text &copy; 2017 ChalkPE
</template>

<script>
  import Vue from 'vue'
  import Vuetify from 'vuetify'

  import './app.sass'
  import './app.styl'

  import 'typeface-nanum-barun-gothic'
  import * as config from '../config'

  import AppNav from './components/AppNav.vue'
  import AppFooter from './components/AppFooter.vue'

  Vue.use(Vuetify)

  export default {
    data: () => config,
    components: { AppNav, AppFooter }
  }
</script>

<style lang="scss" scoped>
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }
</style>

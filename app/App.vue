<template lang="pug">
  v-app#app
    app-nav(:title='TITLE')
    main: router-view
</template>

<script>
  import 'noto-sans-kr'
  import * as config from '../config'

  import AppNav from './components/AppNav.vue'
  import AppFooter from './components/AppFooter.vue'

  export default {
    data: () => config,
    components: { AppNav, AppFooter }
  }
</script>

<style lang="sass">
  @import '~vuetify/dist/vuetify.min.css'

  *:focus
    outline: none

  #app
    background-color: #fff

  body, .md-tooltip
    font-family: Roboto, "Noto Sans", Noto, 'Noto Sans Korean', sans-serif !important
</style>

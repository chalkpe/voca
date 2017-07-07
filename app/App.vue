<template lang="pug">
  #app
    app-nav(:title='TITLE')
    app-hero

    section.section
      main.container: router-view

    app-footer
</template>

<script>
  import './app.sass'

  import 'lato-webfont'
  import 'typeface-nanum-barun-gothic'
  import 'font-awesome/scss/font-awesome.scss'

  import AppNav from './components/AppNav.vue'
  import AppHero from './components/AppHero.vue'
  import AppFooter from './components/AppFooter.vue'

  import * as config from '../config'

  export default {
    data: () => config,
    components: { AppNav, AppHero, AppFooter }
  }
</script>

<style lang="sass" scoped>
  #app
    display: flex
    min-height: 100vh
    flex-direction: column

  section.section
    flex: 1 0 auto
</style>

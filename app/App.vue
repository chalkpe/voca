<template lang="pug">
  #app
    app-nav
    section.section: .container
      router-view
    app-footer
</template>

<script>
  import './app.sass'

  import 'lato-webfont'
  import 'typeface-nanum-barun-gothic'
  import 'font-awesome/scss/font-awesome.scss'

  import AppNav from './components/AppNav.vue'
  import AppFooter from './components/AppFooter.vue'

  export default {
    components: { AppNav, AppFooter }
  }
</script>

<style lang="sass" scoped>
  #app
    display: flex
    min-height: 100vh
    flex-direction: column

  section
    flex: 1 0 auto
</style>

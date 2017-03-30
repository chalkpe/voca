<template lang="pug">
  #app
    navigation
    section.section: .container
      router-view
</template>

<script>
  import 'bulma'
  import Navigation from './components/Navigation.vue'

  export default {
    components: { Navigation }
  }
</script>

<style lang="css">
</style>

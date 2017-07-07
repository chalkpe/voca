<template lang="pug">
  .container: nav.navbar
    .navbar-brand
      router-link.navbar-item(to='/', exact) {{ title }}
      .navbar-burger(:class='open', @click='toggleNavbar')
        span
        span
        span

    .navbar-menu(:class='open')
      .navbar-start
        router-link.navbar-item(v-for='l in links', :key='l', :to='l') {{ l.slice(1) }}
    .nav-right
</template>

<script>
  export default {
    props: ['title'],

    data: () => ({
      open: false,
      links: ['/learn', '/exam', '/ranks']
    }),

    methods: {
      toggleNavbar () {
        this.open = this.open ? false : 'is-active'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar-menu .navbar-item {
    text-transform: capitalize;
  }
</style>

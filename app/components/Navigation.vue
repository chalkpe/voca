<template lang="pug">
  nav.nav.has-shadow: .container
    .nav-left
      a.nav-item: h1 DIMI VOCA
      router-link.nav-item.is-tab.is-hidden-mobile(active-class='is-active', to='/home') Home
      router-link.nav-item.is-tab.is-hidden-mobile(active-class='is-active', to='/learn') Learn
</template>

<script>
  export default {
  }
</script>

<template lang="pug">
  section.hero.is-primary
    .hero-body: .container
      p.title {{ $route.name }}
      p.subtitle Current path: {{ $route.path }}
</template>

<script>
  export default {
  }
</script>

<style lang="css">
</style>

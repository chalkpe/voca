<template lang="pug">
  nav.nav.has-shadow: .container
    .nav-left
      router-link.nav-item.is-tab.is-hidden-mobile(
        v-for='link in links', :key='link.url',
        exact, active-class='is-active', :to='link.url') {{ link.name }}
</template>

<script>
  export default {
    name: 'navigation',
    data: () => ({
      links: [
        { url: '/', name: 'DIMI VOCA' },
        { url: '/learn', name: 'Learn' }
      ]
    })
  }
</script>

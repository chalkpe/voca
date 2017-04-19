<template lang="pug">
  nav.nav.has-shadow: .container
    .nav-left
      router-link.nav-item.is-tab.is-hidden-mobile(
        v-for='link in links', active-class='is-active',
        :key='link.url', :exact='link.exact', :to='link.url') {{ link.name }}
</template>

<script>
  import * as config from '../../config'
  const exact = true

  export default {
    name: 'navigation',
    data: () => ({
      links: [
        { url: '/', name: config.TITLE, exact },
        { url: '/learn', name: 'Learn' },
        { url: '/exam', name: 'Exam' },
        { url: '/ranks', name: 'Ranks' }
      ]
    })
  }
</script>

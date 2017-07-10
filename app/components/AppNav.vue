<template lang="pug">
  #nav
    v-navigation-drawer(v-model='drawer', :mini-variant.sync='mini', clipped, persistent, absolute)
      v-list
        v-list-tile(avatar)
          v-list-tile-avatar
          v-list-tile-content
            v-list-tile-title {{ username }}
          v-list-tile-action
            v-btn(icon, @click.native.stop='mini = !mini')
              v-icon chevron_left

    v-toolbar.primary(dark, v-if='token')
      v-toolbar-side-icon(@click.native.stop='drawer = !drawer')
      router-link(to='/'): v-toolbar-title.white--text {{ title }}
      v-spacer
      router-link(v-for='link of links', :key='link.path', :to='link.path')
        v-btn(icon, v-tooltip:left='{ html: link.name }'): v-icon {{ link.icon }}

    v-toolbar.primary(v-else, extended)
      v-container.sign-in: v-toolbar-title.bottom.white--text Sign in to DIMI VOCA
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: ['title'],

    data: () => ({
      mini: false,
      drawer: false,

      links: [
        { path: '/learn', name: 'Learn', icon: 'book' },
        { path: '/exam', name: 'Exam', icon: 'assignment' }
      ]
    }),

    computed: mapState(['username'])
  }
</script>

<style lang="scss" scoped>
  .sign-in {
    margin: 0 auto !important;

    .bottom {
      position: absolute;
      bottom: 18px;
      margin-left: 0px;
    }
  }
</style>

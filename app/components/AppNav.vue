<template lang="pug">
  #nav
    v-navigation-drawer(v-model='drawer', persistent, overflow)
      v-list
        v-list-tile(avatar)
          v-list-tile-avatar
            img(:src='user.facePhoto')
          v-list-tile-content
            v-list-tile-title {{ user.name }}

    v-toolbar.primary(dark, v-if='token')
      v-toolbar-side-icon(@click.native.stop='drawer = !drawer')
      router-link(to='/'): v-toolbar-title.white--text {{ title }}
      v-spacer
      router-link(v-for='link of links', :key='link.path', :to='link.path')
        v-btn(icon, v-tooltip:left='{ html: link.name }'): v-icon {{ link.icon }}

    v-toolbar.primary(v-else, extended, dark)
      v-container.sign-in: v-toolbar-title.bottom Sign in to DIMI VOCA
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    props: ['title'],

    data: () => ({
      drawer: false,

      links: [
        { path: '/learn', name: 'Learn', icon: 'book' },
        { path: '/exam', name: 'Exam', icon: 'assignment' }
      ]
    }),

    computed: {
      ...mapState(['token']),
      ...mapGetters(['user'])
    }
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

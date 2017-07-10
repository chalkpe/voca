<template lang="pug">
  #nav
    v-navigation-drawer(v-model='drawer', persistent, overflow)
      v-container.primary.white--text
        img.big(:src='user.facePhoto')
        .subheading {{ user.serial }} {{ user.name }}
        .stat {{ user.email }}

      v-list
        v-list-tile
          v-list-tile-action: v-icon people
          v-list-tile-content
            v-list-tile-title New group
        v-list-tile
          v-list-tile-action: v-icon lock
          v-list-tile-content
            v-list-tile-title New secret chat
        v-divider
        v-list-tile
          v-list-tile-action: v-icon settings
          v-list-tile-content
            v-list-tile-title Settings

    v-toolbar.primary(v-if='token', dark)
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

  .big {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-bottom: 1.5em;
    display: block;
  }
</style>

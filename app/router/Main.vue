<template lang="pug">
  auth(v-if='!token')
  v-container(v-else)
    div Hello, {{ user.name }}!
</template>

<script>
  import Auth from './Auth.vue'
  import { mapState, mapGetters } from 'vuex'

  export default {
    components: { Auth },
    computed: {
      ...mapState(['token']),
      ...mapGetters(['user'])
    }
  }
</script>

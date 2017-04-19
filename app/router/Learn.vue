<template lang="pug">
  #learn
    .heading
      h1.title {{ book.name }}
      h2.subtitle {{ book.count }} days
    br
    #days
      a.button.is-large.is-primary(v-for='n in book.count', @click='toggle(n)',
        :class='list.includes(n) || `is-outlined`') {{ pad(n) }}
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'learn',
    data: () => ({ book: {}, list: [] }),

    async created () {
      this.book = (await axios.get(`/learn/${this.$route.params.book}`)).data
    },

    methods: {
      pad: (n) => '00'.concat(n).slice(-2),

      toggle (day) {
        const index = this.list.indexOf(day)

        if (index < 0) this.list.push(day)
        else this.list.splice(index, 1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  #days .button
    width: 4.4rem
    height: 4rem
    margin: 0 1rem 1rem 0
    transition: all 0.25s ease
</style>

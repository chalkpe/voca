<template lang="pug">
  #learn
    .heading
      h1.title {{ book.name }}
      h2.subtitle {{ book.count }} days

    .has-text-centered
      a.day.button.is-large.is-primary(v-for='n in book.count', @click='toggle(n)',
        :class='list.includes(n) || `is-outlined`') {{ '00'.concat(n).slice(-2) }}
      span.day.placeholder(v-for='n in 15')
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
      toggle (n) {
        const i = this.list.indexOf(n)
        if (i < 0) this.list.push(n)
        else this.list.splice(i, 1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .has-text-centered
    margin-top: 2rem

  .day
    width: 4.4rem
    margin: 0.5rem
    display: inline-flex
    transition: all 0.25s ease

    &.button
      height: 4rem
</style>

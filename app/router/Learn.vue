<template lang="pug">
  #learn.has-text-centered
    .heading
      h1.title {{ book.name }}
      h2.subtitle {{ num(book.count) }} days / {{ num(book.totalWords) }} words
    a.day.button.is-large.is-primary(v-for='n in book.count', @click='toggle(n)',
      :class='list.includes(n) || `is-outlined`') {{ '00'.concat(n).slice(-2) }}
    span.day.placeholder(v-for='n in 20')
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'learn',
    data: () => ({ book: {}, list: [] }),

    async created () {
      const book = this.$route.params.book
      this.book = (await axios.get(`/learn/${book}`)).data
    },

    methods: {
      num: (n) => Number(n).toLocaleString({ useGrouping: true }),
      toggle (n) {
        const i = this.list.indexOf(n);
        (i < 0) ? this.list.push(n) : this.list.splice(i, 1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .heading
    margin-bottom: 1.5rem

  .day
    width: 4rem
    margin: 0.5rem
    display: inline-flex
    transition: all 0.25s ease

    &.button
      height: 3.7rem
</style>

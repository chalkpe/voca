<template lang="pug">
  #learn.has-text-centered
    .heading
      h1.title {{ book.name }}
      h2.subtitle {{ num(book.count) }} days / {{ num(book.totalWords) }} words

    nav.level.is-mobile
      .level-item.is-narrow: a.button.is-medium(@click='toggleAll')
        | {{ list.length === book.count ? 'de' : '' }}select all
      .level-item.is-narrow: a.button.is-medium.is-primary start

    #days
      a.button.is-large.is-outlined(v-for='n in book.count', @click='toggle(n)',
        :class='list.includes(n) && `is-primary`') {{ '00'.concat(n).slice(-2) }}
      a.button.placeholder(v-for='n in 16')
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
      },
      toggleAll () {
        if (this.list.length === this.book.count) this.list = []
        else this.list = [...Array(this.book.count)].map((v, i) => ++i)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .level
    margin: 1.5rem 0
    justify-content: center

    .level-item
      margin: 0 0.5rem

      a.button
        text-transform: capitalize

  #days .button
    width: 4rem
    margin: 0.5rem
    transition: all 0.25s ease

    &.is-large
      height: 3.7rem

    &.placeholder
      height: 0
      visibility: hidden
</style>

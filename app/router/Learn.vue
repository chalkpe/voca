<template lang="pug">
  #learn.has-text-centered
    .heading
      h1.title {{ book.name }}
      h2.subtitle {{ num(book.count) }} days / {{ num(book.totalWords) }} words

    nav.level.is-mobile(v-show='!started')
      .level-item.is-narrow: a.button(@click='toggleAll')
        | {{ list.length === book.count ? 'de' : '' }}select all
      .level-item.is-narrow: a.button(@click='toggleLucky') I'm feeling lucky
      .level-item.is-narrow: a.button.is-primary(@click='start') start

    #days(v-show='!started')
      a.button.is-large.is-outlined(v-for='n in book.count', @click='toggle(n)',
        :class='list.includes(n) && `is-primary`') {{ '00'.concat(n).slice(-2) }}
      a.button.is-large.placeholder(v-for='n in 16')

    #words(v-show='started') Hello, world!
</template>

<script>
  import axios from 'axios'
  import Chance from 'chance'

  const chance = new Chance()

  export default {
    name: 'learn',
    data: () => ({ book: {}, list: [], started: false }),

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
      },

      toggleLucky () {
        const range = { min: 1, max: this.book.count }
        this.list = chance.unique(chance.integer, 4, range)
      },

      start () {
        this.started = true
      }
    }
  }
</script>

<style lang="sass" scoped>
  .heading, #days
    margin-bottom: 1.6rem

  nav.level
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

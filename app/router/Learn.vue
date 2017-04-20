<template lang="pug">
  #learn.has-text-centered
    #bookTitle.heading
      h1.title {{ book.name }}
      h2.subtitle {{ num(book.count) }} days / {{ num(book.totalWords) }} words
        span(v-show='started') &nbsp;/ learning {{ this.list.join(', ') }}

    #choose(v-show='!started')
      nav.level.is-mobile
        .level-item.is-narrow: a.button(@click='toggleAll')
          | {{ list.length === book.count ? 'de' : '' }}select all
        .level-item.is-narrow: a.button(@click='toggleLucky') I'm feeling lucky
        .level-item.is-narrow: a.button.is-primary(:disabled='!this.list.length', @click='start') start

      #days
        a.button.is-large.is-outlined(v-for='n in book.count', @click='toggle(n)',
          :class='list.includes(n) && `is-primary`') {{ '00'.concat(n).slice(-2) }}
        a.button.is-large.placeholder(v-for='n in 16')

    #learning(v-show='started')
      progress.progress(:value='wordIndex', :max='words.length') {{ wordIndex / words.length }}%

      .heading
        h1.title {{ word.id }}
        h2.subtitle
          span.icon(v-for='n in 3'): i.fa(:class='n > word.level ? `fa-star-o` : `fa-star`')
          span.day on day {{ word.day }}

        nav.level.is-mobile
          .level-item.is-narrow: a.button(@click='previousWord') &lt;
          .level-item.is-narrow: a.button.is-primary(@click='toggleMeaning') Show
          .level-item.is-narrow: a.button(@click='nextWord') &gt;
</template>

<script>
  import axios from 'axios'
  import Chance from 'chance'

  const chance = new Chance()

  export default {
    name: 'learn',

    data: () => ({
      book: {},
      list: [],
      started: false,

      words: [],
      wordIndex: 0
    }),

    async created () {
      const book = this.$route.params.book
      this.book = (await axios.get(`/learn/${book}`)).data
    },

    computed: {
      word () {
        return this.words[this.wordIndex] || {}
      }
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

      async start () {
        this.list.sort((a, b) => a - b)

        const getter = n => axios.get(`/learn/${this.book.id}/${n}`)
        const days = await Promise.all(this.list.map(getter))

        this.words = [].concat(...days
          .map(({ data }) => data)
          .map(({ id, words }) => words.map(word => ({ day: id, ...word }))))

        this.started = true
      },

      previousWord () {
        if (--this.wordIndex < 0) this.wordIndex = 0
      },

      nextWord () {
        if (++this.wordIndex >= this.word.length) this.wordIndex = this.word.length - 1
      },

      toggleMeaning () {
        // TODO: show/hide meaning
      }
    }
  }
</script>

<style lang="sass" scoped>
  #bookTitle, #days
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

  #learning
    .subtitle span
      &.icon
        width: unset
        height: unset
        font-size: unset
        line-height: 1.45rem

      &.day
        margin-left: 0.8rem
</style>

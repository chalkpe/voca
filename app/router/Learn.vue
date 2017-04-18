<template lang="pug">
  #learn
    .heading
      h1.title {{ book.name }}
      h2.subtitle {{ book.count }} days
    br

    .tags
      span.tag.is-large(v-for='n in book.count', @click='toggle(n)',
        :class='list.includes(n) && "is-primary"') {{ '00'.concat(n).slice(-2) }}
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
      toggle (day) {
        const index = this.list.indexOf(day)

        if (index < 0) this.list.push(day)
        else this.list.splice(index, 1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  span.tag
    margin: 0.5rem
    padding: 2rem 1.6rem
    transition: all 0.3s ease
</style>

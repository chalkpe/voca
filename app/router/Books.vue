<template lang="pug">
  v-list(two-line)
    v-subheader(inset) Available books
    template(v-for='(book, i) in books')
      v-divider(v-if='i > 0', inset)
      v-list-tile(avatar, :key='book.id')
        v-list-tile-avatar: img(:src='book.image')
        v-list-tile-content
          v-list-tile-title {{ book.name }}
          v-list-tile-sub-title {{ book.count }} days &ndash; {{ book.totalWords }} words
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'books',
    data: () => ({ books: [] }),

    async created () {
      this.books = (await axios.get('/learn')).data
    }
  }
</script>

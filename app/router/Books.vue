<template lang="pug">
  .columns: .column.is-one-quarter(v-for='book in books')
    router-link(:to='"/learn/" + book.id'): .card
      .card-header: p.card-header-title {{ book.name }}
      .card-image: img(:src='book.image')
</template>

<script>
  export default {
    name: 'learn',

    data: () => ({
      books: []
    }),

    async created () {
      this.books = await fetch('learn').then(res => res.json())
    }
  }
</script>

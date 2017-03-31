<template lang="pug">
  .columns
    .column.is-one-quarter(v-for='book in books')
      img(:src='book.image')
      span {{ book.name }}
</template>

<script>
  export default {
    name: 'learn',

    data: () => ({
      books: []
    }),

    async created(){
      this.books = await fetch('learn').then(res => res.json())
    }
  }
</script>

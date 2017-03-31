<template lang="pug">
  .box
    .card(v-for='book in books')
      .card-image
        figure.image
          img(src='book.image')
      .card-content: .content {{ book.name }}
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

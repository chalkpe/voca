<template lang="pug">
  footer.footer: .container
    .content.has-text-centered
      p
        a.button.is-medium.is-link(href='http://chalk.pe/voca')
          span.icon.is-medium: i.fa.fa-github-alt
      p
        strong voca
        | &nbsp;by&nbsp;
        a(href='http://chalk.pe') ChalkPE
        br
        | The source code is licensed under the&nbsp;
        a(href='http://opensource.org/licenses/mit-license.php') MIT License
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .icon {
    color: black;
  }
</style>

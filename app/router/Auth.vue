<template lang="pug">
  v-container
    v-text-field(v-model='username', label='Username', prepend-icon='person')
    v-text-field(v-model='password', label='Password', prepend-icon='lock',
      :append-icon='passwordToggleIcon',
      :append-icon-cb='togglePasswordVisibility',
      :type='passwordFormType')

    v-layout(row)
      v-btn(flat, @click.native.stop='resetPassword') Forgot password?
      v-spacer
      v-btn(primary, @click.native.stop='auth') Next
</template>

<script>
  export default {
    data: () => ({ hide: true, username: '', password: '' }),

    computed: {
      passwordFormType () {
        return this.hide ? 'password' : 'text'
      },

      passwordToggleIcon () {
        return this.hide ? 'visibility' : 'visibility_off'
      }
    },

    methods: {
      auth () {
        this.$store.dispatch('authenticate', {
          username: this.username,
          password: this.password
        })
      },

      resetPassword () {
        window.open('http://student.dimigo.hs.kr/site/request-password-reset')
      },

      togglePasswordVisibility () {
        this.hide = !this.hide
      }
    }
  }
</script>

<style lang="css">
</style>

import 'babel-polyfill'

import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(Vuetify)
console.log(new Vue({
  store,
  router,

  el: '#app',
  render: (h) => h(App)
}))

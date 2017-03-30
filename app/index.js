import 'whatwg-fetch'
import 'bulma/css/bulma.css'
import 'noto-sans-kr'

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './routes/Home.vue'
import Learn from './routes/Learn.vue'

import Navigation from './components/Navigation.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/learn', component: Learn }
  ]
})

const vm = new Vue({
  router,
  el: '#app',
  components: { Navigation }
})

console.log(vm)

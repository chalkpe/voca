import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './Main.vue'
import Books from './Books.vue'
import Learn from './Learn.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: 'Main', component: Main },
    { path: '/learn', name: 'Books', component: Books },
    { path: '/learn/:book', name: 'Learn', component: Learn }
  ]
})

export default router

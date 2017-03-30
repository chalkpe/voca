import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './Main.vue'
import Learn from './Learn.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Main },
    { path: '/learn', component: Learn }
  ]
})

export default router

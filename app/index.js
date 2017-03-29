import 'whatwg-fetch'
import 'bulma/css/bulma.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)

const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/app', component: App },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({ routes })
new Vue({ router }).$mount('#app')

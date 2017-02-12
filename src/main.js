// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import store from './store/store'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

import Login from './components/Login'
import Hello from './components/Hello'
import Home from './components/Home'
import HomeCards from './components/HomeCards'

Vue.use(ElementUI)
Vue.use(VueRouter)
/* eslint-disable no-new */

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/app', component: App },
  { path: '/login', component: Login },
  { path: '/',
    component: Home,
    children: [
      { path: 'tech', component: HomeCards }
    ] },
  {
    path: '/hello/:id',
    component: Hello,
    children: [
      { path: '', component: Bar },
      { path: 'bar', component: Foo }
    ]
  },
  { path: '/bar', component: Bar }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store
}).$mount('#app')
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })

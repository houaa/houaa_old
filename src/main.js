// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import store from './store/store'
import App from './App'

import AV from 'leancloud-storage'
var APP_ID = 'bbuNR4JPyRBbqYTFkPIripnW-gzGzoHsz'
var APP_KEY = 'Vld6ht18jVtJ9M9oAdPYpCzl'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
Vue.use(AV)

import ElementUI from 'element-ui'
import './assets/CustomTheme/index.css'
// import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import SelfNew from './components/SelfNew'
// import Hello from './components/Hello'
import SignupNew from './components/Signupnew'
import Home from './components/Home'
import TeachList from './components/Teacher/Teacher'
// import Learn from './components/Learn'
import Search from './components/Search'
import LoginNew from './components/Loginnew'
import Reserve from './components/Reserve'
import Leancloud from './components/leancloudDemo'

Vue.use(ElementUI)
Vue.use(VueRouter)
/* eslint-disable no-new */

const routes = [
  { path: '/app', component: App },
  { path: '/login', component: LoginNew },
  { path: '/signup', component: SignupNew },
  {
    path: '/',
    component: Home,
    children: [
      { path: 'teacher', component: TeachList },
      { path: 'student', component: TeachList },
      // { path: 'learn', component: Learn },
      { path: 'reserve', component: Reserve },
      { path: 'self', component: SelfNew }
    ],
    redirect: 'teacher'
  },
  { path: '/leancloud', component: Leancloud },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store
}).$mount('#app')

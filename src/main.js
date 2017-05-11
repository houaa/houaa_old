// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import store from './store/store'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

// import Login from './components/Login'
import Hello from './components/Hello'
import SignupNew from './components/Signupnew'
// import Home from './components/Home'
import HomeNew from './components/Homenew'
import Teach from './components/Teach'
// import Teacher from './components/Teacher'
import TeacherNew from './components/Teachernew'
import Learn from './components/Learn'
// import Signup from './components/Signup'
import LoginNew from './components/Loginnew'
import Reserve from './components/Reserve'
import Tereserve from './components/Tereserve'

Vue.use(ElementUI)
Vue.use(VueRouter)
/* eslint-disable no-new */

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/app', component: App },
  // { path: '/login', component: Login },
  { path: '/login', component: LoginNew },
  // { path: '/signup', component: Signup },
  { path: '/signup', component: SignupNew },
  {
    path: '/',
    // component: Home,
    component: HomeNew,
    children: [
      { path: 'teach', component: Teach },
      // { path: 'teacher', component: Teacher },
      { path: 'teacher', component: TeacherNew },
      { path: 'learn', component: Learn },
      { path: 'reserve', component: Reserve },
      { path: 'tereserve', component: Tereserve }
    ],
    redirect: 'teach'
  },
  {
    path: '/hello/:id',
    component: Hello,
    children: [
      { path: '', component: Bar },
      { path: 'bar', component: Foo }
    ]
  },
  { path: '/bar', component: Bar }
  // { path: '/', redirect: '/home' }
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

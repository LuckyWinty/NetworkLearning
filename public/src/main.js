// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import index from './components/Index.vue'
import subjectLearn from './components/SubjectLearn.vue'
import subjectSpots from './components/subjectSpots.vue'
import subjectDetail from './components/subjectDetail.vue'
import forum from './components/forum.vue'
import questions from './components/questions.vue'
import personalCenter from './components/personalCenter.vue'
import adminIndex from './components/admin/index.vue'
import login from './components/module/login.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
import resource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueQuillEditor)

Vue.use(resource)
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.http.options.xhr = {withCredentials: true}

const routes = [
  { path: '/', component: index },
  { path: '/subjectLearn', component: subjectLearn },
  { path: '/subjectSpots', component: subjectSpots },
  { path: '/subjectDetail', component: subjectDetail },
  { path: '/forum', component: forum },
  { path: '/questions', component: questions },
  { path: '/personalCenter', component: personalCenter },
  { path: '/adminIndex', component: adminIndex },
  {path: '/login', component: login}
]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  state: {
    basicUrl: 'http://localhost:3000'
  },
  mutations: {
    increment () {

    }
  }
})

const app = new Vue({
  router,
  store,
  ...App
}).$mount('#app')

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})

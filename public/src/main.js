// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import index from './components/Index.vue'
import subjectLearn from './components/SubjectLearn.vue'
import subjectSpots from './components/subjectSpots.vue'
import singleQuestion from './components/singleQuestion.vue'
import forum from './components/forum.vue'
import questions from './components/questions.vue'
import personalCenter from './components/personalCenter.vue'
import adminIndex from './components/admin/index.vue'
import subjectEdit from './components/admin/subjectEdit.vue'
import regist from './components/regist.vue'

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
  { path: '/singleQuestion', component: singleQuestion },
  { path: '/forum', component: forum },
  { path: '/questions', component: questions },
  { path: '/personalCenter', component: personalCenter },
  { path: '/adminIndex', component: adminIndex },
  { path: '/subjectEdit', component: subjectEdit },
  {path: '/regist', component: regist}
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

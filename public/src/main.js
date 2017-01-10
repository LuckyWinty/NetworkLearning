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

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: index },
  { path: '/subjectLearn', component: subjectLearn },
  { path: '/subjectSpots', component: subjectSpots },
  { path: '/subjectDetail', component: subjectDetail },
  { path: '/forum', component: forum },
  { path: '/questions', component: questions },
  { path: '/personalCenter', component: personalCenter },
  { path: '/adminIndex', component: adminIndex }

]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router,
  ...App
}).$mount('#app')

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})

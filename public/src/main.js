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
import editor from 'vue-html5-editor'
import resource from 'vue-resource'

Vue.use(editor, {
  name: 'vue-html5-editor',
  icons: {
    text: 'custom-icon text',
    color: 'custom-icon color',
    font: 'custom-icon font',
    align: 'custom-icon align',
    list: 'custom-icon list',
    link: 'custom-icon link',
    unlink: 'custom-icon unlink',
    tabulation: 'custom-icon table',
    image: 'custom-icon image',
    'horizontal-rule': 'custom-icon hr',
    eraser: 'custom-icon eraser',
    hr: 'custom-icon hr',
    undo: 'custom-icon undo',
    'full-screen': 'custom-icon full-screen',
    info: 'custom-icon info '
  },
  image: {
    server: null,
    fieldName: 'image',
    sizeLimit: 512 * 1024,
    compress: true,
    width: 1600,
    height: 1600,
    quality: 80,
    uploadHandler (responseText) {
      var json = JSON.parse(responseText)
      if (!json.ok) {
        console.log(json.msg)
      } else {
        return json.data
      }
    }
  },
  language: 'zh-cn',
  visibleModules: [
    'text',
    'color',
    'font',
    'align',
    'list',
    'link',
    'unlink',
    'tabulation',
    'image',
    'hr',
    'eraser',
    'undo',
    'full-screen',
    'info'
  ]
})
Vue.use(resource)
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

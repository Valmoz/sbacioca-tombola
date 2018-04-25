import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Load from '@/components/Load'
import Error404 from '@/components/Error404'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'main', component: Main },
    { path: '/load', name: 'load', component: Load },
    { path: '*', component: Error404 }
  ]
})

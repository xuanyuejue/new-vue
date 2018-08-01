import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index')
    },
    {
      path: '/counseloryy',
      name: 'counseloryy',
      component: () => import('@/views/counseloryy')
    },
    {
      path: '/questionyy/:uid',
      name: 'questionyy',
      component: () => import('@/views/questionyy')
    },
    {
      path: '/counselorsz',
      name: 'counselorsz',
      component: () => import('@/views/counselorsz')
    },
    {
      path: '/questionsz/:uid',
      name: 'questionsz',
      component: () => import('@/views/questionsz')
    },
    {
      path: '/end',
      name: 'end',
      component: () => import('@/views/end')
    },
  ]
})

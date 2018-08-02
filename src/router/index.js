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
      path: '/question/:uid',
      name: 'question',
      component: () => import('@/views/question')
    },
    {
      path: '/counselorsz',
      name: 'counselorsz',
      component: () => import('@/views/counselorsz')
    },
    {
      path: '/end',
      name: 'end',
      component: () => import('@/views/end')
    },
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Layout/Home')
      },
      {
        path: '/video',
        component: () =>
          import(/* webpackChunkName: 'base' */ '@/views/Layout/Video')
      },
      {
        path: '/qa',
        component: () =>
          import(/* webpackChunkName: 'base' */ '@/views/Layout/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/Layout/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import(/* webpackName: 'Search' */ '@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router

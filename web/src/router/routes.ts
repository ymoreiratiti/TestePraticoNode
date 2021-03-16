import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/Contas'
  },
  {
    path: '/Contas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/contas/Index.vue') },
      { path: ':id', component: () => import('pages/contas/Show.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

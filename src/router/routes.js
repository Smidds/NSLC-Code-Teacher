const routes = [{
  path: '/',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: 'step/:chapterIndex/:pageIndex',
    component: () => import('pages/Page.vue'),
    meta: {
      requiresStepCheck: true
    }
  },
  {
    path: '',
    redirect: 'step/0/0'
  }]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

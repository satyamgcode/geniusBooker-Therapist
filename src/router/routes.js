
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/user/signup',
    component: () => import('pages/customerSignup.vue'),
  },
  {
    path: '/owner/signup',
    component: () => import('pages/StoreOwnerSignup.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/CustomerDetail',
    component: () => import('pages/CustomerDetail.vue'),
  },
  {
    path: '/StoreOwnerDetail',
    component: () => import('pages/StoreOwnerDetail.vue'),
  },{
    path: '/therapyStores',
    component: () => import('pages/TherapyStores.vue'),
  }

]

export default routes

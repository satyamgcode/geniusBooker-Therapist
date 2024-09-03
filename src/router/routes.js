
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
    path: '/therapyStores',
    component: () => import('pages/TherapyStores.vue'),
  },
  { 
    path: '/therapistStore/:id',
    component: () => import('pages/TherapistDetail.vue'),
  },
  {
    path: '/createStore',
    component: () => import('pages/CreateStore.vue'),
  },
  {
    path: '/storeId',
    component: () => import('pages/ShowStoreById.vue'),
  },
  {
    path: '/StaffDetails',
    component: () => import('pages/StaffDetails.vue'),
  },
  {
    path : '/storePackages',
    component: () => import('pages/StorePackages.vue'),
  },
  {
    path : '/book-session',
    component: () => import('pages/BookSession.vue'),
  }


]

export default routes

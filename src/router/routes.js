
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
    component: () => import('src/pages/OwnerLogin.vue'),
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
  },
  {
    path : '/therapist-login',
    component: () => import('pages/TherapistLogin.vue'),
  },
  {
    path : '/manager-login',
    component: () => import('pages/ManagerLogin.vue'),
  },
  {
    path:'/therapist-dashboard',
    component: () => import('pages/TherapistDashboard.vue'),
  },
  {
    path : '/manager-dashboard',
    component: () => import('pages/ManagerDashboard.vue'),
  },
  {
    path : '/manage-store',
    component: () => import('pages/ManageStore.vue'),
  },
  {
    path : '/manage-staff',
    component: () => import('pages/ManageStaff.vue'),
  },
  {
    path : '/store/:id',
    component: () => import('pages/StoreDetails.vue'),
  },
  {
    path : '/owner-login',
    component: () => import('pages/OwnerLogin.vue'),
  }


]

export default routes

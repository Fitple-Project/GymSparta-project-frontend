import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import BusinessSignupPage from '@/views/BusinessSignupPage.vue';
import StoreSearchPage from '@/views/StoreSearchPage.vue';
import TrainerComparePage from '@/views/TrainerComparePage.vue';
import TrainerDetailPage from '@/views/TrainerDetailPage.vue';
import TrainerReviewsPage from '@/views/TrainerReviewsPage.vue';
import MembershipPage from '@/views/MembershipPage.vue';
import CartPage from '@/views/CartPage.vue';
import PaymentsPage from '@/views/PaymentsPage.vue';
import PaymentCompletePage from '@/views/PaymentCompletePage.vue';
import StoreDetailPage from '@/views/StoreDetailPage.vue';
import StoreReviewPage from '@/views/StoreReviewPage.vue';
import UserProfilePage from '@/views/UserProfilePage.vue';
import OwnerProfilePage from '@/views/OwnerProfilePage.vue';
import StoreEditPage from '@/views/StoreEditPage.vue';
import TrainerEditPage from '@/views/TrainerEditPage.vue';
import StoreManagementPage from '@/views/StoreManagementPage.vue';
import StoreUpdatePage from '@/views/StoreUpdatePage.vue';
import TrainerProfilePage  from "@/views/TrainerProfilePage.vue";


const routes = [
  {
    path: '/',
    name: 'main',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/store/:id',
    name: 'store-detail',
    component: StoreDetailPage,
  },
  {
    path: '/store/:id/reviews',
    name: 'store-reviews',
    component: StoreReviewPage,
  },
  {
    path: '/business/signup',
    name: 'business-signup',
    component: BusinessSignupPage,
    meta: { requiresGuest: true }
  },
  {
    path: '/store/search',
    name: 'store-search',
    component: StoreSearchPage,
  },
  {
    path: '/trainer/compare',
    name: 'trainer-compare',
    component: TrainerComparePage,
  },
  {
    path: '/trainer/detail/:id',
    name: 'trainer-detail',
    component: TrainerDetailPage,
  },
  {
    path: '/trainer/detail/:id/reviews',
    name: 'trainer-reviews',
    component: TrainerReviewsPage,
  },
  {
    path: "/store/management",
    name: "store-management",
    component: StoreManagementPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/membership',
    name: 'membership',
    component: MembershipPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/payments',
    name: 'payments',
    component: PaymentsPage
  },
  {
    path: '/payment/complete',
    name: 'payment-complete',
    component: PaymentCompletePage,
  },
  {
    path: '/profile/user/:userId',
    name: 'user-profile',
    component: UserProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/owner/:ownerId',
    name: 'owner-profile',
    component: OwnerProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/store/owner/:id',
    name: 'store-edit',
    component: StoreEditPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/store/owner/:id/edit',
    name: 'store-update',
    component: StoreUpdatePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/trainer/owner/:id',
    name: 'trainer-edit',
    component: TrainerEditPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/trainer',
    name: 'trainer-profile',
    component: TrainerProfilePage,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = !!accessToken;

  if (isLoggedIn) {
    console.log("Stored Token:", accessToken);
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next({ name: 'login' });
  } else if (to.matched.some(record => record.meta.requiresGuest) && isLoggedIn) {
    next({ name: 'main' });
  } else {
    next();
  }
});

export default router;
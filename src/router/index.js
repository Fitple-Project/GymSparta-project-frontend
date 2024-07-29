import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import BusinessSignupPage from '@/views/BusinessSignupPage.vue';
import StoreSearchPage from '@/views/StoreSearchPage.vue';
import TrainerComparePage from '@/views/TrainerComparePage.vue';
import TrainerDetailPage from '@/views/TrainerDetailPage.vue';
import TrainerReviewsPage from '@/views/TrainerReviewsPage.vue';
import StoreManagementPage from "@/views/StoreManagementPage.vue";
import MembershipPage from '@/views/MembershipPage.vue';

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
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage,
  },
  {
    path: '/business-signup',
    name: 'business-signup',
    component: BusinessSignupPage,
  },
  {
    path: '/store-search',
    name: 'store-search',
    component: StoreSearchPage,
  },
  {
    path: '/trainer-compare',
    name: 'trainer-compare',
    component: TrainerComparePage,
  },
  {
    path: '/trainer-detail/:id',
    name: 'trainer-detail',
    component: TrainerDetailPage,
  },
  {
    path: '/trainer-detail/:id/reviews',
    name: 'trainer-reviews',
    component: TrainerReviewsPage,
  },
  {
    path: "/store-management",
    name: "store-management",
    component: StoreManagementPage,
  },
  {
    path: '/membership',
    name: 'membership',
    component: MembershipPage
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
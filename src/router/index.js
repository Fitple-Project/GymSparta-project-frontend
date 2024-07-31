import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import StoreDetailPage from '@/views/StoreDetailPage.vue';
import ProfilePage from "@/views/ProfilePage.vue"; // Import the StoreDetailPage component

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
    path: '/store/:id', // Add a dynamic route for store details
    name: 'storeDetail',
    component: StoreDetailPage,
  },

  {
    path: '/profile', // Add a dynamic route for store details
    name: 'profile',
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
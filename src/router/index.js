import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';  // 로그인 페이지 임포트

const routes = [
  {
    path: '/',
    name: 'main',  // "main"으로 경로 이름 변경
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',  // 로그인 경로 확인
    component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
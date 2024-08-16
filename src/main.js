import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import eventBus from './eventBus';

const app = createApp(App);

// 플러그인 설치
app.use(router);
app.use(store);

// 스토어 초기화 후 애플리케이션 마운트
store.dispatch('initializeAuth').then(() => {
  const token = store.state.accessToken;
  if (token) {
    eventBus.emit('login');
  } else {
    eventBus.emit('logout');
  }
  app.mount('#app'); // 애플리케이션 마운트
});
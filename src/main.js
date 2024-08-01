import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import eventBus from './eventBus';

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');

const token = localStorage.getItem('accessToken');
if (token) {
  eventBus.emit('login');
} else {
  eventBus.emit('logout');
}
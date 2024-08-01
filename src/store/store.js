import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setLoggedIn', true);
      commit('setAccessToken', token);
      localStorage.setItem('accessToken', token);
    },
    logout({ commit }) {
      commit('setLoggedIn', false);
      commit('setAccessToken', null);
      localStorage.removeItem('accessToken');
    },
    initializeAuth({ commit }) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        commit('setAccessToken', token);
        commit('setLoggedIn', true);
      }
    },
  },
});

export default store;
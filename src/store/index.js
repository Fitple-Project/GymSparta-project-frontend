import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    currentUser: null,
    cart: [],
    order: null,
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    ADD_TO_CART(state, item) {
      state.cart.push(item);
    },
    REMOVE_FROM_CART(state, itemId) {
      state.cart = state.cart.filter(item => item.cartItemId !== itemId);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
  },
  actions: {
    login({ commit }, { token, user }) {
      try {
        commit('setLoggedIn', true);
        commit('setAccessToken', token);
        commit('setCurrentUser', user);
        localStorage.setItem('accessToken', token);
      } catch (error) {
        console.error('로그인 처리 중 오류:', error.message);
        commit('setLoggedIn', false);
        commit('setAccessToken', null);
        commit('setCurrentUser', null);
        localStorage.removeItem('accessToken');
      }
    },
    logout({ commit }) {
      commit('setLoggedIn', false);
      commit('setAccessToken', null);
      commit('setCurrentUser', null);
      localStorage.removeItem('accessToken');
    },
    async initializeAuth({ commit }) {
      const token = localStorage.getItem('accessToken');
      console.log('Stored Token:', token);

      if (token) {
        commit('setAccessToken', token);
        commit('setLoggedIn', true);

        try {
          const response = await fetch('http://localhost:8080/api/user/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          console.log('API Status:', response.status); // API 응답 상태 코드 확인

          if (response.ok) {
            const userData = await response.json();
            console.log('User Data:', userData);
            commit('setCurrentUser', userData);
          } else {
            const errorText = await response.text(); // 오류 메시지 확인
            console.error('API Error:', errorText);
            throw new Error('사용자 정보를 가져올 수 없습니다.');
          }
        } catch (error) {
          console.error('사용자 정보 가져오기 오류:', error.message);
          commit('setLoggedIn', false);
          commit('setAccessToken', null);
          localStorage.removeItem('accessToken');
        }
      } else {
        console.warn('토큰이 존재하지 않습니다.');
      }
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item);
    },
    removeFromCart({ commit }, itemId) {
      commit('REMOVE_FROM_CART', itemId);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    setOrder({ commit }, order) {
      commit('SET_ORDER', order);
    },
    initializeCart({ commit }) {
      // 임시 데이터를 장바구니에 추가
      const items = [
        {
          cartItemId: 1,
          isSelected: true, // 기본적으로 선택됨
          product: {
            id: 1,
            productName: 'PT 세션 10회',
            productDescription: '트레이너와 함께하는 PT 세션 10회권',
            productPrice: 100000,
            originalPrice: 120000,
            discountPrice: 100000,
            discountPercentage: 16.7,
            imageUrl: 'https://via.placeholder.com/100',
            paymentType: 'CREDIT_CARD',
            ptTimes: 'TEN_TIMES', // PT 세션의 경우
            trainer: {
              id: 1,
              name: '트레이너 A',
            }
          },
          quantity: 1
        },
        {
          cartItemId: 2,
          isSelected: true, // 기본적으로 선택됨
          product: {
            id: 2,
            productName: '헬스장 멤버십 3개월',
            productDescription: '3개월 간 헬스장 이용 가능',
            productPrice: 150000,
            originalPrice: 200000,
            discountPrice: 150000,
            discountPercentage: 25,
            imageUrl: 'https://via.placeholder.com/100',
            paymentType: 'CREDIT_CARD',
            isMembership: true, // 멤버십 표시
          },
          quantity: 1
        },
        {
          cartItemId: 3,
          isSelected: true, // 기본적으로 선택됨
          product: {
            id: 3,
            productName: 'PT 세션 5회',
            productDescription: '트레이너와 함께하는 PT 세션 5회권',
            productPrice: 50000,
            originalPrice: 60000,
            discountPrice: 50000,
            discountPercentage: 16.7,
            imageUrl: 'https://via.placeholder.com/100',
            paymentType: 'CREDIT_CARD',
            ptTimes: 'FIVE_TIMES', // PT 세션의 경우
            trainer: {
              id: 2,
              name: '트레이너 B',
            }
          },
          quantity: 1
        }
      ];
      items.forEach(item => commit('ADD_TO_CART', item));
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    currentUser: state => state.currentUser,
    cartItems: state => state.cart,
    order: state => state.order,
  }
});

export default store;
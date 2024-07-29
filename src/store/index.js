import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
    order: null
  },
  mutations: {
    ADD_TO_CART(state, membership) {
      state.cart.push(membership);
    },
    REMOVE_FROM_CART(state, itemId) {
      state.cart = state.cart.filter(item => item.id !== itemId);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    SET_ORDER(state, order) {
      state.order = order;
    }
  },
  actions: {
    addToCart({ commit }, membership) {
      commit('ADD_TO_CART', membership);
    },
    removeFromCart({ commit }, itemId) {
      commit('REMOVE_FROM_CART', itemId);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    setOrder({ commit }, order) {
      commit('SET_ORDER', order);
    }
  },
  getters: {
    cartItems: state => state.cart,
    order: state => state.order
  }
});
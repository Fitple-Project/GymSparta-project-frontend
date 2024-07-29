<template>
  <div class="cart-container">
    <div class="header">
      <button @click="goBack" class="back-button">&lt;</button>
      <h1 class="title">장바구니</h1>
    </div>
    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <img :src="require('@/assets/Gym_image/hm1.svg')" alt="product image" class="product-image" />
      <div class="product-info">
        <h2>{{ item.months }}개월 회원권</h2>
        <p>헬스 회원권</p>
        <p class="original-price">{{ item.originalPrice.toLocaleString() }}원</p>
        <p class="discount-price">{{ item.discountPercentage }}% {{ item.discountPrice.toLocaleString() }}원</p>
      </div>
      <button @click="removeItem(item.id)" class="remove-button">X</button>
    </div>
    <div class="price-info">
      <p>총 금액: {{ totalPrice.toLocaleString() }}원</p>
    </div>
    <div class="button-group">
      <button @click="goBack" class="browse-more-button">상품 더 둘러보기</button>
      <button @click="goToPaymentsPage" class="checkout-button">결제하기</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems']),
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.discountPrice, 0);
    }
  },
  methods: {
    ...mapActions(['removeFromCart', 'clearCart']),
    goBack() {
      this.$router.go(-1);
    },
    removeItem(itemId) {
      this.removeFromCart(itemId);
      alert('상품이 삭제되었습니다.');
    },
    goToPaymentsPage() {
      this.$router.push({ name: 'Payments' });
    }
  }
};
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'NanumGothic', sans-serif;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
}

.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 24px;
  margin: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #f1f1f1;
  border-radius: 30px;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  position: relative;
}

.product-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

.product-info {
  flex: 1;
  margin-left: 20px;
}

.original-price {
  text-decoration: line-through;
}

.discount-price {
  color: blue;
}

.remove-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.price-info {
  text-align: right;
  margin-top: 20px;
  width: 100%;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.browse-more-button, .checkout-button {
  background: blue;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 20px;
  font-size: 24px;
  cursor: pointer;
  flex: 1;
  text-align: center;
}
</style>
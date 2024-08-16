<template>
  <div class="cart-container">
    <div class="header">
      <button @click="goBack" class="back-button">&lt;</button>
      <h1 class="title">장바구니</h1>
    </div>
    <div v-if="cartItems.length === 0" class="empty-cart">
      장바구니에 담긴 상품이 없습니다.
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.cartItemId" class="cart-item">
        <input type="checkbox" v-model="item.isSelected" class="select-checkbox" />
        <img :src="item.product.imageUrl" alt="product image" class="product-image" />
        <div class="product-info">
          <h2>{{ item.product.productName }}</h2>
          <p>{{ item.product.productDescription }}</p>
          <p class="original-price">{{ item.product.originalPrice.toLocaleString() }}원</p>
          <p class="discount-price">{{ item.product.discountPercentage }}% {{ item.product.discountPrice.toLocaleString() }}원</p>
        </div>
        <button @click="removeItem(item.cartItemId)" class="remove-button">X</button>
      </div>
      <div class="price-info">
        <p>총 금액: {{ selectedTotalPrice.toLocaleString() }}원</p>
      </div>
      <div class="button-group">
        <button @click="goBack" class="browse-more-button">상품 더 둘러보기</button>
        <button @click="goToPaymentsPage" class="checkout-button">결제하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems', 'isLoggedIn']),
    selectedItems() {
      return this.cartItems.filter(item => item.isSelected);
    },
    selectedTotalPrice() {
      return this.selectedItems.reduce((total, item) => total + item.product.discountPrice * item.quantity, 0);
    }
  },
  methods: {
    removeItem(cartItemId) {
      this.$store.commit('REMOVE_FROM_CART', cartItemId);
      alert('상품이 삭제되었습니다.');
    },
    goBack() {
      this.$router.go(-1);
    },
    goToPaymentsPage() {
      if (this.selectedItems.length === 0) {
        alert('결제할 상품을 선택하세요.');
        return;
      }
      this.$router.push({
        name: 'Payments',
        query: {
          items: JSON.stringify(this.selectedItems),
          totalPrice: this.selectedTotalPrice
        }
      });
    }
  },
  created() {
    this.$store.dispatch('initializeCart'); // 장바구니 초기화
  }
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
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

.select-checkbox {
  margin-right: 10px;
  cursor: pointer;
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
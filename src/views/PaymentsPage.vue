<template>
  <div class="payment-container">
    <div class="header">
      <button @click="goBack" class="back-button">&lt;</button>
      <h1 class="title">결제</h1>
    </div>
    <div v-for="item in cartItems" :key="item.id" class="product-info">
      <img :src="require('@/assets/Gym_image/hm1.svg')" alt="product image" class="product-image" />
      <div>
        <h3>{{ item.months }}개월 회원권</h3>
        <p>헬스 회원권</p>
        <p class="price">{{ item.discountPrice.toLocaleString() }}원</p>
      </div>
    </div>
    <h2>구매자 정보</h2>
    <div class="form">
      <div class="input-group">
        <label for="name">이름</label>
        <input type="text" id="name" v-model="buyerName" />
      </div>
      <div class="input-group">
        <label for="phone">휴대폰 번호</label>
        <input type="text" id="phone" v-model="buyerPhone" />
      </div>
      <div class="input-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="buyerEmail" />
      </div>
    </div>
    <h2>결제 수단</h2>
    <div class="payment-methods">
      <div class="method">
        <input type="radio" id="credit-card" name="payment" v-model="paymentMethod" value="신용카드" />
        <label for="credit-card">신용카드</label>
      </div>
      <div class="method">
        <input type="radio" id="easy-payment" name="payment" v-model="paymentMethod" value="간편 결제" />
        <label for="easy-payment">간편 결제</label>
      </div>
      <div class="method">
        <input type="radio" id="bank-transfer" name="payment" v-model="paymentMethod" value="무통장 입금" />
        <label for="bank-transfer">무통장 입금</label>
      </div>
    </div>
    <div class="total">
      <h2>최종 결제 금액</h2>
      <p>{{ totalPrice.toLocaleString() }}원</p>
    </div>
    <button @click="completePayment" class="pay-button">결제하기</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      buyerName: '',
      buyerPhone: '',
      buyerEmail: '',
      paymentMethod: '신용카드'
    };
  },
  computed: {
    ...mapGetters(['cartItems']),
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.discountPrice, 0);
    }
  },
  methods: {
    ...mapActions(['setOrder', 'clearCart']),
    goBack() {
      this.$router.go(-1);
    },
    completePayment() {
      const order = {
        items: this.cartItems,
        total: this.totalPrice,
        buyer: {
          name: this.buyerName,
          phone: this.buyerPhone,
          email: this.buyerEmail
        },
        paymentMethod: this.paymentMethod,
        orderNumber: Math.floor(Math.random() * 100000) + 1 // 임의의 주문번호 생성
      };
      this.setOrder(order);
      this.clearCart();
      this.$router.push({ name: 'PaymentComplete' });
    }
  }
};
</script>

<style scoped>
.payment-container {
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

.product-info {
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

.product-info div {
  margin-left: 20px;
}

.price {
  font-size: 24px;
  color: blue;
}

.form {
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input[type="text"], input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.payment-methods {
  display: flex;
  flex-direction: column;
}

.method {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.method input[type="radio"] {
  margin-right: 10px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pay-button {
  margin-top: 20px;
  padding: 20px;
  background: blue;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 24px;
  cursor: pointer;
  width: 100%;
}
</style>
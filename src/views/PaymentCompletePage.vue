<template>
  <div class="complete-container">
    <h1>결제가 완료 되었습니다.</h1>
    <div v-if="order">
      <p>상품 명: {{ order.items[0].months }}개월 회원권</p>
      <p>주문번호: {{ order.orderNumber }}</p>
    </div>
    <button @click="goHome" class="home-button">홈으로 돌아가기</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['order']),
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'main' });
    }
  }
};
</script>

<style scoped>
.complete-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Inter', sans-serif;
}

h1 {
  font-weight: 800;
  font-size: 96px;
  color: #000;
}

p {
  font-weight: 800;
  font-size: 64px;
  color: #000;
}

.home-button {
  margin-top: 50px;
  padding: 20px 40px;
  background: #f1f1f1;
  border-radius: 30px;
  font-family: 'NanumGothic', sans-serif;
  font-weight: 700;
  font-size: 64px;
  color: #000;
  border: none;
  cursor: pointer;
}
</style>
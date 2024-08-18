<template>
  <div class="payment-container">
    <!-- 헤더 섹션 -->
    <div class="header">
      <button @click="goBack" class="back-button">&lt;</button>
      <h1 class="title">결제 페이지</h1>
    </div>

    <!-- 상품 목록 -->
    <div v-for="item in selectedItems" :key="item.cartItemId" class="product-info">
      <img :src="item.product.imageUrl" alt="product image" class="product-image" />
      <div>
        <h3>{{ item.product.productName }}</h3>
        <p>{{ item.product.productDescription }}</p>
        <p class="price">{{ (item.product.discountPrice || 0).toLocaleString() }}원</p>
      </div>
    </div>

    <!-- 구매자 정보 입력 -->
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

    <!-- 최종 결제 금액 -->
    <div class="total">
      <h2>최종 결제 금액</h2>
      <p>{{ totalPrice.toLocaleString() }}원</p>
    </div>

    <!-- 카카오페이 버튼 -->
    <button @click="kakaoPay" :disabled="isProcessing" class="pay-button kakao-pay-button">
      카카오페이로 결제하기
    </button>
  </div>
</template>

<script>

</script>


<style scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; /* 패딩을 줄여 전체 크기 축소 */
  width: 50%; /* 컨테이너 너비를 50%로 축소 */
  margin: 0 auto; /* 중앙 정렬 */
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
  font-size: 18px; /* 폰트 크기 축소 */
  cursor: pointer;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 18px; /* 폰트 크기 축소 */
  margin: 0;
}

.product-info {
  display: flex;
  align-items: center;
  background: #f1f1f1;
  border-radius: 15px; /* 라운드 크기 축소 */
  width: 100%;
  padding: 10px; /* 패딩을 줄여 전체 크기 축소 */
  margin-top: 10px; /* 마진을 줄여 간격 축소 */
  position: relative;
}

.product-image {
  width: 50px; /* 이미지 크기 축소 */
  height: 50px;
  border-radius: 5px; /* 라운드 크기 축소 */
}

.product-info div {
  margin-left: 10px; /* 마진을 줄여 간격 축소 */
}

.price {
  font-size: 18px; /* 폰트 크기 축소 */
  color: blue;
}

.form {
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px; /* 마진을 줄여 간격 축소 */
}

input[type="text"], input[type="email"] {
  width: 100%;
  padding: 5px; /* 패딩을 줄여 전체 크기 축소 */
  border: 1px solid #e0e0e0;
  border-radius: 5px; /* 라운드 크기 축소 */
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px; /* 마진을 줄여 간격 축소 */
}

.kakao-pay-button {
  background-color: #ffeb00;
  color: #181600;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.kakao-pay-button:disabled {
  background: grey;
  cursor: not-allowed;
}
</style>
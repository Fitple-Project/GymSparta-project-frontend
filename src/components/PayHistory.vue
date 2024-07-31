<script setup>
import { ref, onMounted } from 'vue';

const paymentHistory = ref([]);

const fetchPaymentHistory = async () => {
  try {
    const payments = [
      {
        storeName: '휴메이크휘트니스 논현점',
        trainerName: '김트레이너',
        membership: '1개월 이용권',
        pt: 'PT (10회)',
        amount: '100,000원',
        date: '2024.06.12',
        details: '결제 완료',
      },
      {
        storeName: '휴메이크휘트니스 논현점',
        trainerName: '이트레이너',
        membership: '3개월 이용권',
        pt: 'PT (20회)',
        amount: '200,000원',
        date: '2024.06.15',
        details: '결제 완료',
      },
    ];

    paymentHistory.value = payments;
  } catch (error) {
    console.error('Failed to fetch payment history:', error);
  }
};

onMounted(() => {
  fetchPaymentHistory();
});
</script>

<template>
  <div class="pay-history">
    <div class="header-container">
      <div class="header">
        <div class="category">
          <div class="line"></div>
          <div class="div">매장명/트레이너명</div>
          <div class="line"></div>
        </div>
        <div class="category">
          <div class="line"></div>
          <div class="p-t">회원권/P.T</div>
          <div class="line"></div>
        </div>
        <div class="category">
          <div class="line"></div>
          <div class="div2">결제금액</div>
          <div class="line"></div>
        </div>
        <div class="category">
          <div class="line"></div>
          <div class="div3">결제일</div>
          <div class="line"></div>
        </div>
        <div class="category">
          <div class="line"></div>
          <div class="div4">결재내역</div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div v-if="paymentHistory.length > 0" class="payment-container">
      <div v-for="payment in paymentHistory" :key="payment.date" class="payment">
        <div class="div">{{ payment.storeName }} / {{ payment.trainerName }}</div>
        <div class="p-t">{{ payment.membership }} / {{ payment.pt }}</div>
        <div class="div2">{{ payment.amount }}</div>
        <div class="div3">{{ payment.date }}</div>
        <div class="div4">{{ payment.details }}</div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/variables.css';

.pay-history {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 1292px;
}

.header-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1292px;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
}

.header > .category > div {
  margin-right: 2rem;
  padding-right: 1rem;
}

.header > .category:last-child > div {
  margin-right: 0;
  padding-right: 0;
}

.div, .p-t, .div2, .div3, .div4 {
  color: #000000;
  font-family: "Inter-Light", sans-serif;
  font-size: 32px;
  font-weight: 300;
}

.div4 {
  font-family: "Inter-Bold", sans-serif;
  font-weight: 700;
}

.payment-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.payment {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1rem;
}

.payment > div {
  margin-right: 2rem;
  padding-right: 1rem;
  border-right: 1px solid #ccc;
}

.payment > div:last-child {
  margin-right: 0;
  padding-right: 0;
  border-right: none;
}

@media (max-width: 768px) {
  .pay-history {
    max-width: 100%;
  }

  .div, .p-t, .div2, .div3, .div4 {
    font-size: 0.875rem;
  }
}
</style>
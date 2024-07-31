<template>
  <div class="membership-container">
    <div class="header">
      <button @click="goBack" class="back-button">&lt;</button>
      <h1 class="title">헬스 회원권</h1>
    </div>
    <p class="description">운동 기간을 선택하고 알차게 즐겨보소!</p>
    <p class="benefit">혜택: <span class="highlight">최대 0개월</span> 무이자 할부 안돼 돌아가</p>
    <div class="card-container">
      <div
          v-for="membership in memberships"
          :key="membership.id"
          :class="['card', { selected: membership === selectedMembership }]"
          @click="selectMembership(membership)"
      >
        <div class="card-header">
          <span class="months">{{ membership.months }}개월</span>
          <span class="badge" v-if="membership.recommended">추천</span>
        </div>
        <div class="card-body">
          <p class="label">현장가</p>
          <p class="original-price">{{ membership.originalPrice.toLocaleString() }}원</p>
          <p class="discount-price">{{ membership.discountPercentage }}% {{ membership.discountPrice.toLocaleString() }}원</p>
        </div>
      </div>
    </div>
    <button class="add-to-cart-button" @click="handleAddToCart">회원권 담기</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedMembership: null,
      memberships: [
        {
          id: 1,
          months: 1,
          originalPrice: 120000,
          discountPrice: 99000,
          discountPercentage: 18,
          recommended: true
        },
        {
          id: 2,
          months: 3,
          originalPrice: 165000,
          discountPrice: 155000,
          discountPercentage: 6,
          recommended: true
        },
        {
          id: 3,
          months: 6,
          originalPrice: 326700,
          discountPrice: 306700,
          discountPercentage: 6,
          recommended: true
        },
        {
          id: 4,
          months: 12,
          originalPrice: 495000,
          discountPrice: 455000,
          discountPercentage: 8,
          recommended: true
        }
      ]
    };
  },
  methods: {
    ...mapActions(['addToCart']),
    goBack() {
      this.$router.go(-1);
    },
    selectMembership(membership) {
      this.selectedMembership = membership;
    },
    handleAddToCart() {
      if (this.selectedMembership) {
        this.addToCart(this.selectedMembership);
        this.$router.push({ name: 'cart' });
      } else {
        alert('회원권을 선택해주세요.');
      }
    }
  }
};
</script>

<style scoped>
.membership-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
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

.description {
  font-size: 16px;
  margin: 20px 0;
}

.benefit {
  font-size: 14px;
  color: red;
}

.benefit .highlight {
  font-weight: bold;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.card {
  background: #f1f1f1;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.card.selected {
  border: 2px solid blue;
}

.card-header {
  display: flex;
  align-items: center;
}

.months {
  font-size: 24px;
  margin-right: 10px;
}

.badge {
  background: blue;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.card-body {
  text-align: right;
}

.label {
  font-size: 14px;
  color: gray;
}

.original-price {
  font-size: 16px;
  text-decoration: line-through;
}

.discount-price {
  font-size: 24px;
  color: red;
}

.add-to-cart-button {
  margin-top: 20px;
  padding: 15px 30px;
  background: blue;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}
</style>
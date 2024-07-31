<template>
  <div class="user-review-section">
    <div class="filter-group">
      <div class="filter-item" @click="selectCategory('전체')">전체</div>
      <div class="line"></div>
      <div class="filter-item" @click="selectCategory('매장')">매장</div>
      <div class="line"></div>
      <div class="filter-item" @click="selectCategory('트레이너')">트레이너</div>
    </div>
    <div v-for="review in filteredReviews" :key="review.id" class="review">
      <div class="rectangle-4240"></div>
      <img class="group-18379" src="group-183790.svg" />
      <div class="pt">{{ review.comment }}</div>
      <div class="_2024-06-12">{{ review.date }}</div>
      <div class="button-group">
        <div class="button">수정</div>
        <div class="button2">삭제</div>
      </div>
      <div class="pt-10">{{ review.user }} / {{ review.type }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userReviews: [
        { id: 1, comment: 'Great service!', date: '2024-06-12', user: 'User1', type: '매장' },
        { id: 2, comment: 'Very professional.', date: '2024-06-13', user: 'User2', type: '트레이너' },
        { id: 3, comment: 'Highly recommend.', date: '2024-06-14', user: 'User3', type: '매장' },
      ],
      selectedCategory: '전체',
    };
  },
  computed: {
    filteredReviews() {
      if (this.selectedCategory === '전체') {
        return this.userReviews;
      }
      return this.userReviews.filter(review => review.type === this.selectedCategory);
    },
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
  },
};
</script>

<style scoped>
@import '@/styles/variables.css';

.user-review-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 600px;
  padding: 1rem;
}

.review {
  background: #f1f1f1;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
}

.rectangle-4240 {
  width: 100%;
  height: 200px;
}

.group-18379 {
  width: 100%;
  height: auto;
}

.pt {
  color: #000000;
  font-family: "Inter-Bold", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1rem;
}

._2024-06-12 {
  color: #000000;
  font-family: "Inter-Light", sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  margin-top: 0.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.button, .button2 {
  background: #ffffff;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  padding: 0.5rem 1rem;
  color: #333333;
  font-family: "Inter-SemiBold", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

.pt-10 {
  color: #000000;
  font-family: "Inter-Bold", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1rem;
}

.filter-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center; /* Center the filter items */
  margin-top: 1rem;
}

.filter-item {
  position: relative;
  color: #000000;
  font-family: "Inter-Light", sans-serif;
  font-size: 2rem; /* h2 font size */
  font-weight: 300;
  text-align: center;
  margin: 0 1.5rem; /* spacing equivalent to three spaces of an h2 element */
  cursor: pointer;
}

.filter-item::before {
  content: '';
  position: absolute;
  left: -1.5rem; /* Adjust based on the margin */
  top: 0;
  bottom: 0;
  width: 2px; /* Increase the width to make the line thicker */
  background-color: #000000; /* Black color */
}

.filter-item:first-child::before {
  display: none; /* Hide the line for the first item */
}

@media (max-width: 768px) {
  .user-review-section {
    max-width: 100%;
  }

  .pt, .pt-10 {
    font-size: 1.25rem;
  }

  .button, .button2 {
    font-size: 0.875rem;
  }

  .filter-item {
    font-size: 1rem;
  }
}
</style>
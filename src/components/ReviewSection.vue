<template>
  <div class="review-section">
    <div class="heading">
      <div class="heading-text">{{ title }}</div>
      <div class="more-link" @click="$emit('more-click')">더보기</div>
    </div>
    <div class="review-list">
      <div v-for="review in reviews" :key="review.user" class="review-card">
        <img :src="review.image" alt="Review Image" class="review-image" />
        <p class="review-user">{{ review.user }}</p>
        <p class="review-rating">⭐ {{ review.rating }}</p>
        <p class="review-comment">{{ review.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewSection",
  props: {
    title: {
      type: String,
      required: true
    },
    reviews: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.review-section {
  width: 100%;
  margin: 20px 0;
}

.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.heading-text {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16.875px;
  color: #333333;
}

.review-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.review-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
}

.review-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.more-link {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13.125px;
  color: #1273E4;
  cursor: pointer;
}

.review-user,
.review-rating,
.review-comment {
  font-size: 1em;
  color: #666;
  margin: 8px 0;
}
</style>
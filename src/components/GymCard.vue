<template>
  <div class="gym-card">
    <img :src="gym.image" alt="Gym Image" class="gym-image" />
    <div class="gym-details">
      <div class="gym-category">{{ gym.category }}</div>
      <div class="gym-name">{{ gym.name }}</div>
      <div class="gym-location">{{ gym.location }}</div>
      <div class="gym-info">{{ gym.info }}</div>
      <div class="gym-price">{{ gym.price }}</div>
      <div v-if="gym.originalPrice" class="gym-original-price">{{ gym.originalPrice }}</div>
      <div class="gym-rating">
        <div class="background">
          <svg class="svg" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="6" fill="#FFAD0A" />
          </svg>
          <div class="rating">{{ gym.rating }}</div>
        </div>
        <div class="reviews">{{ gym.reviews }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GymCard",
  props: {
    gym: {
      type: Object,
      required: true,
    }
  }
};
</script>

<style scoped>
.gym-card {
  position: relative;
  width: 100%;
  max-width: 260px; /* 각 카드의 최대 너비 */
  margin-right: 10px;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
}

.gym-image {
  width: 100%;
  height: 120px; /* 이미지 높이 조정 */
  object-fit: cover; /* 이미지 비율 유지하면서 크기 조정 */
  border-bottom: 1px solid #ddd;
}

.gym-details {
  padding: 10px;
}

.gym-category, .gym-name, .gym-location, .gym-info, .gym-price, .gym-original-price, .gym-rating {
  margin-bottom: 5px; /* 요소 간격 조정 */
}

.gym-category {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem; /* 글씨 크기 조정 */
  color: #707070;
}

.gym-name {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 0.9rem; /* 글씨 크기 조정 */
  color: #333333;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략 기호(...) 표시 */
}

.gym-location {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem; /* 글씨 크기 조정 */
  color: #707070;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략 기호(...) 표시 */
}

.gym-info {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem; /* 글씨 크기 조정 */
  color: #707070;
}

.gym-price {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 0.9rem; /* 글씨 크기 조정 */
  color: #333333;
}

.gym-original-price {
  text-decoration: line-through;
  color: #707070;
}

.gym-rating {
  display: flex;
  align-items: center;
}

.background {
  display: flex;
  align-items: center;
  background: #FFAD0A;
  border-radius: 6px;
  padding: 0 5px;
  margin-right: 5px;
}

.svg {
  width: 12px;
  height: 12px;
}

.rating {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 0.75rem; /* 글씨 크기 조정 */
  color: #333333;
}

.reviews {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75rem; /* 글씨 크기 조정 */
  color: #707070;
}
</style>
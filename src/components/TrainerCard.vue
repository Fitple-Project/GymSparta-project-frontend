<template>
  <div class="trainer-card">
    <img :src="trainer.image" alt="Trainer Image" class="trainer-image" />
    <div class="trainer-details">
      <div class="trainer-name">{{ trainer.name }}</div>
      <div class="trainer-description">{{ trainer.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainerCard",
  props: {
    trainer: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.trainer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 200px; /* 트레이너 카드 최대 너비 */
  margin: 10px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.trainer-image {
  width: 100%;
  height: 200px; /* 고정된 높이 */
  object-fit: cover; /* 이미지 비율을 유지하면서 크기를 조절 */
}

.trainer-details {
  padding: 10px;
  text-align: center;
}

.trainer-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #333333;
}

.trainer-description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #707070;
}
</style>
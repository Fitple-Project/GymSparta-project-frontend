<template>
  <div class="gym-section">
    <div class="heading">
      <div class="heading-text">{{ title }}</div>
      <div class="more-link">더보기</div>
    </div>
    <div class="gym-list-container">
      <img v-if="startIndex > 0" src="@/assets/Card_Next_Button.svg" class="card-prev-button" @click="scrollPrev" />
      <div class="gym-list" ref="gymList">
        <GymCard
          v-for="gym in visibleGyms"
          :key="gym.id"
          :gym="gym"
          class="gym-card"
          @cardClicked="handleCardClick"
        />
      </div>
      <img v-if="startIndex + 5 < gyms.length" src="@/assets/Card_Next_Button.svg" class="card-next-button" @click="scrollNext" />
    </div>
  </div>
</template>

<script>
import GymCard from "@/components/GymCard.vue";

export default {
  name: "GymSection",
  components: {
    GymCard,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    gyms: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      startIndex: 0,
    };
  },
  computed: {
    visibleGyms() {
      return this.gyms.slice(this.startIndex, this.startIndex + 5);
    }
  },
  methods: {
    scrollNext() {
      if (this.startIndex + 5 < this.gyms.length) {
        this.startIndex += 1;
      }
    },
    scrollPrev() {
      if (this.startIndex > 0) {
        this.startIndex -= 1;
      }
    },
    handleCardClick(gymId) {
        console.log('GymSection received cardClicked event:', gymId);  // 이 로그가 출력되는지 확인
        this.$emit("cardClicked", gymId);  // 이 이벤트가 HomePage로 전달됨
      }
  }
};
</script>

<style scoped>
.gym-section {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
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

.more-link {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13.125px;
  color: #1273E4;
  cursor: pointer;
}

.gym-list-container {
  position: relative;
  padding: 0 20px; /* 패딩을 조정하여 버튼이 겹치지 않도록 합니다 */
  overflow: hidden; /* 넘치는 요소를 숨깁니다 */
}

.gym-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  justify-content: center; /* 카드가 5개 미만일 때 가운데 정렬 */
  width: 100%; /* 패딩을 뺀 너비 설정 */
  transition: transform 0.3s ease; /* 부드러운 스크롤 애니메이션 추가 */
}

.gym-card {
  flex: 0 0 calc(20% - 10px); /* 카드 크기를 고정하고 갭을 고려하여 크기 설정 */
  box-sizing: border-box;
}

.card-prev-button, .card-next-button {
  position: absolute;
  width: 30px;
  height: 30px;
  top: calc(50% - 15px);
  cursor: pointer;
  background: transparent;
  border: none;
  box-shadow: none;
  z-index: 1;
}

.card-prev-button {
  left: 0;
  transform: rotate(180deg); /* 이미지 반전 */
}

.card-next-button {
  right: 0;
}

@media (min-width: 1200px) {
  .gym-section {
    width: 70vw;
  }
}
</style>
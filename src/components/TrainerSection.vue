<template>
  <div class="trainer-section">
    <div class="heading">
      <div class="heading-text">{{ title }}</div>
      <div class="more-link">더보기</div>
    </div>
    <div class="trainer-list-container">
      <img v-if="startIndex > 0" src="@/assets/Card_Next_Button.svg" class="card-prev-button" @click="scrollPrev" />
      <div class="trainer-list" ref="trainerList">
        <TrainerCard
            v-for="trainer in visibleTrainers"
            :key="trainer.id"
            :trainer="trainer"
            class="trainer-card"
        />
      </div>
      <img v-if="startIndex + 5 < trainers.length" src="@/assets/Card_Next_Button.svg" class="card-next-button" @click="scrollNext" />
    </div>
  </div>
</template>

<script>
import TrainerCard from "@/components/TrainerCard.vue";

export default {
  name: "TrainerSection",
  components: {
    TrainerCard,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    trainers: {
      type: Array,
      default: () => []  // 기본값을 빈 배열로 설정
    }
  },
  data() {
    return {
      startIndex: 0,
    };
  },
  computed: {
    visibleTrainers() {
      if (!Array.isArray(this.trainers)) {
        return []; // trainers가 배열이 아닐 경우 빈 배열 반환
      }
      return this.trainers.slice(this.startIndex, this.startIndex + 5);
    }
  },
  methods: {
    scrollNext() {
      if (this.startIndex + 5 < this.trainers.length) {
        this.startIndex += 1;
      }
    },
    scrollPrev() {
      if (this.startIndex > 0) {
        this.startIndex -= 1;
      }
    }
  },
  mounted() {
    if (this.$refs.trainerList) {
      this.trainerListElement = this.$refs.trainerList;
    }
  }
};
</script>

<style scoped>
.trainer-section {
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.heading-text {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  color: #333333;
}

.more-link {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  color: #1273E4;
  cursor: pointer;
}

.trainer-list-container {
  position: relative;
  padding: 0 40px; /* 패딩을 조정하여 버튼이 겹치지 않도록 합니다 */
  overflow: hidden; /* 넘치는 요소를 숨깁니다 */
}

.trainer-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  justify-content: center; /* 카드가 5개 미만일 때 가운데 정렬 */
  width: calc(100% + 10px); /* 패딩을 뺀 너비 설정 */
  transition: transform 0.3s ease; /* 부드러운 스크롤 애니메이션 추가 */
}

.trainer-card {
  flex: 0 0 20%; /* 카드 크기를 고정합니다 */
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
  left: 10px;
  transform: rotate(180deg); /* 이미지 반전 */
}

.card-next-button {
  right: 10px;
}

@media (min-width: 1200px) {
  .trainer-section {
    width: 70vw;
  }
}
</style>

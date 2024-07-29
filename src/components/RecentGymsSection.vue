<template>
  <div class="gym-section">
    <div class="heading">
      <div class="heading-text">{{ title }}</div>
      <div class="more-link">더보기</div>
    </div>
    <div class="gym-list-container">
      <img src="../assets/Card_Next_Button.svg" class="card-prev-button" @click="scrollPrev" />
      <div class="gym-list" ref="gymList">
        <GymCard
            v-for="gym in visibleGyms"
            :key="gym.id"
            :gym="gym"
        />
      </div>
      <img src="../assets/Card_Next_Button.svg" class="card-next-button" @click="scrollNext" />
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
      cardPrevButtonLeft: 0, // 동적 위치
      cardNextButtonRight: 0 // 동적 위치
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
        this.updateButtonPositions();
      }
    },
    scrollPrev() {
      if (this.startIndex > 0) {
        this.startIndex -= 1;
        this.updateButtonPositions();
      }
    },
    updateButtonPositions() {
      const gymListWidth = this.$refs.gymList.clientWidth;
      this.cardPrevButtonLeft = -gymListWidth / 6 - 10;
      this.cardNextButtonRight = -gymListWidth / 6 - 10;
    }
  },
  mounted() {
    this.updateButtonPositions();
    window.addEventListener('resize', this.updateButtonPositions);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateButtonPositions);
  }
};
</script>

<style scoped>
.gym-section {
  width: 90vw;
  max-width: 900px; /* 최대 너비를 줄였습니다. */
  margin: 0 auto;
  padding: 10px; /* 패딩을 줄였습니다. */
  box-sizing: border-box;
}

.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* 여백을 줄였습니다. */
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

.gym-list-container {
  position: relative;
  padding: 0 20px; /* 패딩을 줄였습니다. */
}

.gym-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  gap: 5px; /* 카드 간격을 줄였습니다. */
}

.card-prev-button, .card-next-button {
  position: absolute;
  width: 30px;
  height: 30px;
  top: calc(50% - 15px);
  bottom: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  box-shadow: none;
}

.card-prev-button {
  left: calc(var(--card-prev-button-left, 0px));
  transform: rotate(180deg);
}

.card-next-button {
  right: calc(var(--card-next-button-right, 0px));
}

@media (min-width: 1200px) {
  .gym-section {
    width: 70vw;
  }
}
</style>
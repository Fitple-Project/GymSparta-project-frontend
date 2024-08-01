<template>
  <div class="membership-section">
    <div class="heading">
      <div class="heading-text">{{ title }}</div>
      <div class="more-link" @click="$emit('more-click')">더보기</div>
    </div>
    <div class="membership-list">
      <img v-if="startIndex > 0" src="@/assets/Card_Next_Button.svg" class="card-prev-button" @click="scrollPrev" />
      <div v-for="membership in displayedMemberships" :key="membership.name" class="membership-card">
        <p class="membership-name">{{ membership.name }}</p>
        <p class="membership-price">{{ membership.price ? `${membership.price}원` : 'N/A' }}</p>
      </div>
      <img v-if="startIndex + 5 < memberships.length" src="@/assets/Card_Next_Button.svg" class="card-next-button" @click="scrollNext" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MembershipSection",
  props: {
    title: {
      type: String,
      required: true
    },
    memberships: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      startIndex: 0
    };
  },
  computed: {
    displayedMemberships() {
      if (!Array.isArray(this.memberships)) {
        return [];
      }
      return this.memberships.slice(this.startIndex, this.startIndex + 5);
    }
  },
  methods: {
    scrollPrev() {
      if (this.startIndex > 0) {
        this.startIndex -= 1;
      }
    },
    scrollNext() {
      if (this.startIndex + 5 < this.memberships.length) {
        this.startIndex += 1;
      }
    }
  },
  mounted() {
    console.log('memberships:', this.memberships);
  }
};
</script>

<style scoped>
.membership-section {
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

.membership-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.membership-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
}

.membership-name {
  font-size: 1.2em;
  margin-bottom: 8px;
}

.membership-price {
  font-size: 1em;
  color: #666;
  text-align: right;
}

.more-link {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13.125px;
  color: #1273E4;
  cursor: pointer;
}
</style>
<template>
  <div id="app" class="container">
    <div class="background">
      <div class="search-bar">
        <div class="search-input">
          <input type="text" placeholder="원하시는 운동을 검색해보세요" />
          <button class="search-button">검색</button> <!--API 연결-->
        </div>
      </div>
      <div class="upper-section">
        <div class="search-info">1248 results • Jul 27 - 24</div>
        <div class="filters">
          <div class="filter-item">가격</div>
          <div class="filter-item">회원 할인가</div>
          <div class="filter-item">쿠폰</div>
          <div class="filter-item">More</div>
        </div>
      </div>
      <div class="main-content">
        <div class="cards">
          <div class="card" v-for="card in cards" :key="card.id" @click="cardClicked(card.id)">
            <img :src="card.image" alt="card image" class="card-image" />
            <div class="card-content">
              <div class="card-title">{{ card.title }}</div>
              <div class="card-location">{{ card.location }}</div>
              <div class="card-price">{{ card.price }}</div>
            </div>
          </div>
        </div>
        <MapComponent class="map" />
      </div>
    </div>
  </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';

export default {
  components: {
    MapComponent
  },
  data() {
    return {
      cards: [
        {
          id: 1,
          image: "image.png",
          title: "Fitple 헬스",
          location: "서울특별시 ㅇㅇ구",
          price: "40,000원~/월"
        },
        {
          id: 2,
          image: "image.png",
          title: "스파르타 짐",
          location: "서울특별시 ㅇㅇ구",
          price: "30,000원~/월"
        },
        {
          id: 3,
          image: "image.png",
          title: "배캠 헬스",
          location: "서울특별시 ㅇㅇ구",
          price: "50,000원~/월"
        },
        {
          id: 4,
          image: "image.png",
          title: "배캠 헬스",
          location: "서울특별시 ㅇㅇ구",
          price: "50,000원~/월"
        },
        {
          id: 5,
          image: "image.png",
          title: "배캠 헬스",
          location: "서울특별시 ㅇㅇ구",
          price: "50,000원~/월"
        }
      ]
    };
  },
  methods: {
    cardClicked(id) {
      this.$router.push({ name: 'storeDetail', params: { id } });
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.background {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.search-bar {
  height: 46px;
  width: 430px; /* 검색바의 너비를 카드 목록과 맞춤 */
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  margin-top: 10px; /* 줄임 */
  margin-left: -745px;
}

.search-input {
  display: flex;
  flex: 1;
}

.search-input input {
  flex: 1;
  border: none;
  background: none;
  font-family: 'Inter';
  font-size: 15px;
  color: #c2c2c2;
}

.search-button {
  background: #f26921;
  border-radius: 10px;
  padding: 10px 20px;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 15.125px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  margin-left: auto;
}

.upper-section {
  width: 430px;
  height: 40px; /* 높이를 40px로 줄임 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px; /* 줄임 */
  margin-left: -745px;
  margin-bottom: 10px; /* 카드 목록 위로 이동 */
}

.search-info {
  font-family: 'Roboto';
  font-size: 16px; /* 글꼴 크기를 줄임 */
  color: #a5a7a7;
  margin-bottom: 5px; /* 줄임 */
}

.filters {
  display: flex;
  gap: 8px; /* 간격을 줄임 */
}

.filter-item {
  border: 1px solid #a5a7a7;
  border-radius: 8px;
  padding: 4px 8px; /* 패딩을 줄임 */
  font-family: 'Roboto';
  font-size: 14px; /* 글꼴 크기를 줄임 */
  color: #a5a7a7;
}

.main-content {
  display: flex;
  width: 90%;
  max-width: 1200px;
  height: calc(100% - 100px); /* 줄임 */
  margin-top: 20px;
  gap: 20px;
}

.cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: 700px; /* 카드 목록의 높이를 제한 */
  width: 430px;
}

.card {
  width: 99%;
  height: 150px; /* 줄임 */
  background: #ffffff;
  border: 1px solid #d3d3d3; /* 테두리 추가 */
  border-radius: 20px;
  display: flex;
  gap: 20px;
  cursor: pointer;
}

.card-image {
  width: 100px;
  height: 100px;
  margin: 20px;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 20px;
  color: #000000;
}

.card-location {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 13px;
  color: #000000;
}

.card-price {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  color: #000000;
}

.map {
  width: calc(100% - 450px); /* 카드 목록의 너비를 뺀 나머지 */
  height: 800px; /* 변경 */
  flex: 1;
  background: #f4f7ff;
  border-radius: 20px;
  margin-top: -100px; /* 줄임 */
}
</style>
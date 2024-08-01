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
        <div class="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  width: 90%;
  max-width: 1200px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  margin-top: 20px;
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
}

.upper-section {
  width: 90%;
  max-width: 1200px;
  margin-top: 20px;
}

.search-info {
  font-family: 'Roboto';
  font-size: 20px;
  color: #a5a7a7;
  margin-bottom: 10px;
}

.filters {
  display: flex;
  gap: 16px;
}

.filter-item {
  border: 1px solid #a5a7a7;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: 'Roboto';
  font-size: 16px;
  color: #a5a7a7;
}

.main-content {
  display: flex;
  width: 90%;
  max-width: 1200px;
  height: calc(100% - 200px);
  margin-top: 20px;
  gap: 20px;
}

.cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
}

.card {
  width: 100%;
  height: 261px;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 20px;
  cursor: pointer;
}

.card-image {
  width: 182px;
  height: 221px;
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
  font-size: 24px;
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
  font-size: 20px;
  color: #000000;
}

.map {
  flex: 1;
  background: #f4f7ff;
  border-radius: 20px;
}
</style>
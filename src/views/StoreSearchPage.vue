<template>
  <div id="app" class="container">
    <div class="background">
      <div class="search-bar">
        <div class="search-input">
          <input
              type="text"
              v-model="searchQuery"
              placeholder="원하시는 운동을 검색해보세요"
          />
          <button class="search-button" @click="searchStores">검색</button>
        </div>
      </div>
      <div class="upper-section">
        <div class="search-info">{{ filteredCards.length }} results • {{ currentDate }}</div>
      </div>
      <div class="main-content">
        <div class="cards">
          <div class="card" v-for="card in filteredCards" :key="card.id" @click="cardClicked(card.id)">
            <img :src="card.image" alt="card image" class="card-image" />
            <div class="card-content">
              <div class="card-title">{{ card.title }}</div>
              <div class="card-location">{{ card.location }}</div>
              <div class="card-price">{{ card.price || '가격 정보 없음' }}원~/월</div>
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
      searchQuery: '',
      currentDate: new Date().toLocaleDateString(),
      cards: [],
      filteredCards: []
    };
  },
  methods: {
    cardClicked(id) {
      this.$router.push({ name: 'store-detail', params: { id } });
    },
    searchStores() {
      if (this.searchQuery.trim() === '') {
        // 위치 기반 검색
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            this.fetchStoresByLocation(latitude, longitude);
          }, () => {
            // 위치 권한 거부 시 모든 매장을 조회
            this.fetchAllStores();
          });
        } else {
          // 위치 기반을 사용할 수 없을 때 모든 매장을 조회
          this.fetchAllStores();
        }
      } else {
        // 검색어 기반 검색
        this.fetchStoresByKeyword(this.searchQuery);
      }
    },
    fetchStoresByKeyword(keyword) {
      fetch(`http://localhost:8080/api/stores/search?keyword=${encodeURIComponent(keyword)}`)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.data && responseData.data.length > 0) {
          this.filteredCards = responseData.data;
        } else {
          console.log("검색 결과가 없습니다.");
          this.filteredCards = []; // 빈 결과 처리
        }
      })
      .catch(error => {
        console.error('검색 중 오류가 발생했습니다:', error);
      });
    },
    fetchStoresByLocation(latitude, longitude) {
      fetch(`http://localhost:8080/api/stores/search?latitude=${latitude}&longitude=${longitude}`)
      .then(response => response.json())
      .then(responseData => {
        this.filteredCards = responseData.data;
      })
      .catch(error => {
        console.error('위치 기반 검색 중 오류가 발생했습니다:', error);
      });
    },
    fetchAllStores() {
      fetch('http://localhost:8080/api/stores')
      .then(response => response.json())
      .then(responseData => {
        this.filteredCards = responseData.data;
      })
      .catch(error => {
        console.error('모든 매장 조회 중 오류가 발생했습니다:', error);
      });
    }
  },
  mounted() {
    this.searchStores();
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
  width: 100%;
  max-width: 500px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  margin-top: 20px;
  margin-right: 320px;
}

.search-input {
  flex: 1;
}

.search-input input {
  width: 40%;
  border: none;
  background: none;
  font-family: 'Inter';
  font-size: 15px;
  color: #000000;
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
  margin-left: 20px;
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
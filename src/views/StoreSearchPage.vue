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
        <MapComponent ref="map" :markers="mapMarkers" class="map" />
      </div>
    </div>
  </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
import { getCoordinatesFromAddress, getCurrentLocation } from '@/utils/location';

export default {
  components: {
    MapComponent,
  },
  data() {
    return {
      searchQuery: '',
      currentDate: new Date().toLocaleDateString(),
      cards: [],
      filteredCards: [],
      mapMarkers: [],
    };
  },
  methods: {
      async fetchStores() {
        try {
          const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores`);
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('JSON 응답이 아닙니다');
          }

          const responseData = await response.json();
          const currentLocation = await getCurrentLocation();

          const storesWithCoordinates = await Promise.all(
            responseData.data.map(async (store) => {
              if (!store.storeAddress || store.storeAddress.trim() === "") {
                // 주소가 없거나 빈 값일 경우, 해당 매장을 제외합니다.
                return null;
              }

              const coordinates = await getCoordinatesFromAddress(store.storeAddress);
              if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
                const distance = this.getDistance(
                  currentLocation.latitude,
                  currentLocation.longitude,
                  coordinates.latitude,
                  coordinates.longitude
                );

                return {
                  id: store.storeId,
                  image: store.image || 'default_image.png',
                  title: store.storeName,
                  location: store.storeAddress,
                  price: store.storePrice || '가격 정보 없음',
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  distance,
                };
              } else {
                // 유효한 좌표를 찾을 수 없는 경우 해당 매장을 제외합니다.
                return null;
              }
            })
          );

          this.cards = storesWithCoordinates.filter((store) => store !== null);

          // 필터링 로직 적용
          this.searchStores();
        } catch (error) {
          console.error('매장 정보를 가져오거나 지오코딩하는 중 오류 발생:', error);
        }
      },

      async fetchNearbyGyms() {
        try {
          const currentLocation = await getCurrentLocation();

          const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores`, {
            method: 'GET',
            credentials: 'include',
          });

          const responseData = await response.json();
          console.log('Stores response data:', responseData);

          if (response.status !== 200) {
            console.error('서버 오류:', responseData.error || 'Unknown error');
            return;
          }

          const storesWithCoordinates = await Promise.allSettled(responseData.data.map(async store => {
            if (!store.storeAddress || store.storeAddress.trim() === "") {
              // 주소가 없거나 빈 값일 경우, 해당 매장을 제외합니다.
              return null;
            }

            console.log('Store image URL:', store.image); // 이미지 URL 확인
            try {
              const coordinates = await getCoordinatesFromAddress(store.storeAddress);
              if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
                const distance = this.getDistance(
                  currentLocation.latitude,
                  currentLocation.longitude,
                  coordinates.latitude,
                  coordinates.longitude
                );

                return {
                  id: store.storeId,
                  image: store.image,
                  category: store.category || '카테고리 정보 없음',
                  name: store.storeName,
                  location: store.storeAddress,
                  info: store.storeInfo || '정보 없음',
                  price: store.storePrice || '가격 정보 없음',
                  rating: store.rating || '평점 없음',
                  reviews: store.reviews || '리뷰 없음',
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  distance,
                };
              } else {
                // 유효한 좌표를 찾을 수 없는 경우 해당 매장을 제외합니다.
                return null;
              }
            } catch (error) {
              console.error(`매장 '${store.storeName}'의 지오코딩 실패:`, error);
              return null; // 오류가 발생한 경우 null을 반환
            }
          }));

          // null이 아닌 매장만 필터링
          this.gyms = storesWithCoordinates
            .filter(result => result.status === 'fulfilled' && result.value !== null)
            .map(result => result.value)
            .filter(store => store.distance <= 10);

          if (!this.gyms.length) {
            console.log('주변에 검색된 매장이 없습니다.');
          } else {
            console.log(`${this.gyms.length}개의 주변 매장이 검색되었습니다.`);
          }
        } catch (error) {
          console.error('매장 정보를 가져오거나 지오코딩하는 중 오류 발생:', error);
        }
      },

    cardClicked(id) {
      this.$router.push({ name: 'store-detail', params: { id } });
    },

    searchStores() {
      const searchQuery = this.searchQuery.trim();

      if (searchQuery) {
        // 검색어가 있을 때
        this.filteredCards = this.cards.filter(
          (store) =>
            store.title.includes(searchQuery) || store.location.includes(searchQuery)
        );
      } else {
        // 검색어가 없을 때 주변 매장만 필터링
        this.filteredCards = this.cards.filter((store) => store.distance <= 10);
      }

      this.mapMarkers = this.filteredCards.map((store) => ({
        lat: store.latitude,
        lng: store.longitude,
        title: store.title,
        address: store.location,
      }));
    },

    getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
  },
  mounted() {
    this.searchQuery = this.$route.query.search || '';
    this.fetchStores();
  },
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
  margin-right: 650px;
}

.search-input {
  display: flex;
  flex: 1;
}

.search-input {
  flex: 1;
}

.search-input input {
  width: 70%;
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
  margin-left: 70px;
}

.upper-section {
  width: 430px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: -745px;
  margin-bottom: 10px;
}

.search-info {
  font-family: 'Roboto';
  font-size: 16px;
  color: #a5a7a7;
  margin-bottom: 5px;
}

.filters {
  display: flex;
  gap: 8px;
}

.filter-item {
  border: 1px solid #a5a7a7;
  border-radius: 8px;
  padding: 4px 8px;
  font-family: 'Roboto';
  font-size: 14px;
  color: #a5a7a7;
}

.main-content {
  display: flex;
  width: 90%;
  max-width: 1200px;
  height: calc(100% - 100px);
  margin-top: 20px;
  gap: 20px;
}

.cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: 700px;
  width: 430px;
}

.card {
  width: 99%;
  height: 150px;
  background: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
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
  width: calc(100% - 450px);
  height: 800px;
  flex: 1;
  background: #f4f7ff;
  border-radius: 20px;
  margin-top: -100px;
}
</style>
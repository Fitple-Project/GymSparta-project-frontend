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
    async fetchNearbyGyms() {
      try {
        const currentLocation = await getCurrentLocation();
        console.log('현재 위치:', currentLocation);

        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores`, {
          method: 'GET',
          credentials: 'include',
        });

        const responseData = await response.json();

        if (response.status !== 200) {
          console.error('서버 오류:', responseData.error || 'Unknown error');
          return;
        }

        const storesWithCoordinates = await Promise.allSettled(
          responseData.data.map(async (store) => {
            if (!store.storeAddress || store.storeAddress.trim() === "") {
              return null;
            }

            try {
              const coordinates = await getCoordinatesFromAddress(store.storeAddress);
              if (coordinates && coordinates.latitude && coordinates.longitude) {
                const distance = this.getDistance(
                  currentLocation.latitude,
                  currentLocation.longitude,
                  coordinates.latitude,
                  coordinates.longitude
                );

                if (distance <= 5) {
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
                }
              } else {
                console.warn(`매장 '${store.storeName}'의 유효한 좌표를 찾을 수 없습니다.`);
                return null;
              }
            } catch (error) {
              console.error(`매장 '${store.storeName}'의 지오코딩 실패:`, error);
              return null;
            }
          })
        );

        this.cards = storesWithCoordinates
          .filter((result) => result.status === 'fulfilled' && result.value !== null && result.value.id)
          .map((result) => result.value);

        if (this.cards.length === 0) {
          console.warn('주변에 표시할 수 있는 매장이 없습니다.');
        } else {
          console.log(`${this.cards.length}개의 매장이 표시됩니다.`);
        }

        this.filteredCards = this.cards;
        this.updateMapMarkers();
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
        this.filteredCards = this.cards.filter(
          (store) =>
            store.title.includes(searchQuery) || store.location.includes(searchQuery)
        );
      } else {
        this.filteredCards = this.cards;
      }

      this.updateMapMarkers();
    },

    updateMapMarkers() {
      this.mapMarkers = this.filteredCards
        .filter(store => store.latitude && store.longitude)  // 유효한 좌표만 포함
        .map((store) => ({
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
    this.fetchNearbyGyms();
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
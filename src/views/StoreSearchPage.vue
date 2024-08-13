<template>
  <div id="app" class="container">
    <div class="background">
      <div class="search-bar">
        <div class="search-input">
          <input type="text" v-model="searchQuery" placeholder="원하시는 운동을 검색해보세요" />
          <button class="search-button" @click="searchStores">검색</button>
        </div>
      </div>
      <div class="upper-section">
        <div class="search-info">{{ filteredCards.length }} results • {{ currentDate }}</div>
        <div class="filters">
          <div class="filter-item">가격</div>
          <div class="filter-item">회원 할인가</div>
          <div class="filter-item">쿠폰</div>
          <div class="filter-item">More</div>
        </div>
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
/* global google */

import MapComponent from '@/components/MapComponent.vue';
import { getCoordinatesFromAddress, getCurrentLocation } from '@/utils/location';

export default {
  components: {
    MapComponent
  },
  data() {
    return {
      searchQuery: '',
      currentDate: new Date().toLocaleDateString(),
      cards: [],
      filteredCards: [],
      mapMarkers: []
    };
  },
  methods: {
      async fetchStores() {
        try {
          const currentLocation = await getCurrentLocation(); // 현재 위치 가져오기

          const response = await fetch('http://localhost:8080/api/stores');
          const responseData = await response.json();

          const storesWithCoordinates = await Promise.all(responseData.data.map(async store => {
            const coordinates = await getCoordinatesFromAddress(store.storeAddress);
            if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
              const distance = this.getDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                coordinates.latitude,
                coordinates.longitude
              );

              // 모든 매장에 대해 데이터를 저장
              return {
                id: store.storeId,
                image: store.image || 'default_image.png',
                title: store.storeName,
                location: store.storeAddress,
                price: store.storePrice || '가격 정보 없음',
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                distance
              };
            }
          }));

          this.cards = storesWithCoordinates.filter(store => store);

          // 현재 위치에서 10km 이내의 매장만 필터링하여 표시
          this.filteredCards = this.cards.filter(store => store.distance <= 10);

          // 모든 매장을 지도에 마커로 표시
          this.mapMarkers = this.cards.map(store => ({
            lat: store.latitude,
            lng: store.longitude,
            title: store.title,
            address: store.location
          }));

          this.updateMapMarkers();
        } catch (error) {
          console.error('매장 정보를 가져오거나 지오코딩하는 중 오류 발생:', error);
        }
      },

      cardClicked(id) {
          this.$router.push({ name: 'storeDetail', params: { id } });
        },

      updateMapMarkers() {
        // 지도에 표시될 모든 마커를 업데이트
        this.$refs.map.addMarkers(this.mapMarkers);
      },

    async searchStores() {
    if (!this.searchQuery.trim()) {
          // 검색어가 없을 때 initMap 호출하여 초기 상태로 돌아감
          await this.fetchStores();
          this.$refs.map.initMap();
          return;
        }

      this.filteredCards = this.cards.filter(card => {
        const titleMatch = card.title && card.title.includes(this.searchQuery);
        const locationMatch = card.location && card.location.includes(this.searchQuery);
        return titleMatch || locationMatch;
      });

      this.updateMapMarkers();

      if (this.filteredCards.length === 1) {
        const store = this.filteredCards[0];
        this.$refs.map.zoomToLocation(store.latitude, store.longitude, 18);
      } else if (this.filteredCards.length > 1) {
        const bounds = new google.maps.LatLngBounds();
        this.filteredCards.forEach(store => {
          bounds.extend({ lat: store.latitude, lng: store.longitude });
        });
        this.$refs.map.map.fitBounds(bounds);
      }
    },

    getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // 지구 반지름 (km)
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // 거리 (km)
    },

    deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  },
  mounted() {
    this.fetchStores();
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
  width: 430px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  margin-top: 10px;
  margin-left: -745px;
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
  margin-left: auto;
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
  width: calc(100% - 450px);
  height: 800px;
  flex: 1;
  background: #f4f7ff;
  border-radius: 20px;
  margin-top: -100px;
}
</style>
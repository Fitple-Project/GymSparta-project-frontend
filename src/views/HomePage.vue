<template>
  <div>
    <SearchContainer />
    <TrainerSection title="트레이너" :trainers="trainers" />
    <GymSection title="주변 운동시설" :gyms="gyms" @cardClicked="navigateToGymDetail" />
    <GymSection title="최근 둘러본 운동시설" :gyms="recentGyms" @cardClicked="navigateToGymDetail" />
    <AppFooter />
  </div>
</template>

<script>
import SearchContainer from "@/components/SearchContainer.vue";
import TrainerSection from "@/components/TrainerSection.vue";
import GymSection from "@/components/GymSection.vue";
import AppFooter from "@/components/AppFooter.vue";
import { getCurrentLocation, getCoordinatesFromAddress } from '@/utils/location';
import mk1 from '@/assets/Gym_image/mk1.svg';
import trainer1 from '@/assets/Trainer_image/kim.svg';
import trainer2 from '@/assets/Trainer_image/hcs.svg';
import trainer3 from '@/assets/Trainer_image/Ronnie.svg';
import trainer4 from '@/assets/Trainer_image/Bumstead.svg';

export default {
  name: "HomePage",
  components: {
    SearchContainer,
    TrainerSection,
    GymSection,
    AppFooter,
  },
  data() {
    return {
      gyms: [],
      recentGyms: [],
      trainers: [
        {
          id: 1,
          image: trainer1,
          name: '트레이너 1',
          description: '설명 1'
        },
        {
          id: 2,
          image: trainer2,
          name: '트레이너 2',
          description: '설명 2'
        },
        {
          id: 3,
          image: trainer3,
          name: '트레이너 3',
          description: '설명 3'
        },
        {
          id: 4,
          image: trainer4,
          name: '트레이너 4',
          description: '설명 4'
        },
      ],
    };
  },
  methods: {
    async fetchNearbyGyms() {
      try {
        const currentLocation = await getCurrentLocation();

        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores`);
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

            return {
              id: store.storeId,
              image: store.image || mk1,
              category: store.category || '카테고리 정보 없음',
              name: store.storeName,
              location: store.storeAddress,
              info: store.storeInfo || '정보 없음',
              price: store.storePrice || '가격 정보 없음',
              rating: store.rating || '평점 없음',
              reviews: store.reviews || '리뷰 없음',
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              distance
            };
          }
        }));

        this.gyms = storesWithCoordinates.filter(store => store && store.distance <= 10);

      } catch (error) {
        console.error('매장 정보를 가져오거나 지오코딩하는 중 오류 발생:', error);
      }
    },

    async fetchRecentGyms() {
        try {
            const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores/recent`, {
                method: 'GET',
                credentials: 'include'
            });
            const responseData = await response.json();

            console.log('최근 방문한 매장 응답 데이터:', responseData);

            if (responseData && responseData.data) {
                this.recentGyms = responseData.data.map(store => ({
                    id: store.storeId,
                    image: store.image || mk1,
                    category: store.category || '카테고리 정보 없음',
                    name: store.storeName,
                    location: store.storeAddress,
                    info: store.storeInfo || '정보 없음',
                    price: store.storePrice || '가격 정보 없음',
                    rating: store.rating || '평점 없음',
                    reviews: store.reviews || '리뷰 없음',
                }));
            }
        } catch (error) {
            console.error('최근 방문한 매장 정보를 가져오는 중 오류 발생:', error);
        }
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

    async navigateToGymDetail(gymId) {
        console.log('Navigating to gym detail for gymId:', gymId);

        try {
          const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores/${gymId}`, {
            method: 'GET',
            credentials: 'include'
          });
          const storeDetail = await response.json();

          console.log('상세 조회 응답 데이터:', storeDetail);

          console.log('Updated recentStores cookie value:', document.cookie);

          this.$router.push({ name: "storeDetail", params: { id: gymId } });

          if (this.$route.name === 'HomePage') {
              this.fetchRecentGyms();
          }
        } catch (error) {
          console.error('상세 조회 중 오류 발생:', error);
        }
    },
  },

  mounted() {
    this.fetchNearbyGyms();
    this.fetchRecentGyms();
  }
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
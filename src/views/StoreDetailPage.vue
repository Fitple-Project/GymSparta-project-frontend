<template>
  <div v-if="storeDetails" class="store-detail-page">
    <div class="store-header">
      <img :src="storeDetails.image || 'default_image.png'" alt="Store Image" class="store-image"/>
      <h1 class="store-name">{{ storeDetails.storeName }}</h1>
      <p class="store-rating">⭐ {{ averageRating }}</p>
      <p class="store-location">{{ storeDetails.address }}</p>
      <p class="store-phone">전화번호: {{ storeDetails.storeTel }}</p>
    </div>
    <div class="store-info">
    <div class="section">
            <h2>매장 소개</h2>
            <p>{{ storeDetails.storeInfo }}</p>
          </div>
      <h2>회원권</h2>
      <MembershipSection :memberships="storeDetails.memberships || []" @more-click="goToMembershipsPage" title="회원권"/>
      <h2>1:1 P.T 상담</h2>
      <TrainerSection :trainers="storeDetails.ptConsultations || []" title="PT 상담" @more-click="goToPtConsultationsPage"/>
      <h2>운영 시간</h2>
      <p class="operating-hours">{{ storeDetails.storeHour }}</p>
      <h2>부가 서비스</h2>
      <ul class="additional-services">
        <li v-for="service in storeDetails.services" :key="service">{{ service }}</li>
      </ul>
      <div class="review-header">
        <h2>리뷰</h2>
        <button class="view-all-reviews" @click="viewAllReviews">모든 리뷰 보기</button>
      </div>
      <div class="review-section">
        <div class="rating-distribution">
          <div class="rating-card" v-for="(count, rating) in ratingDistribution" :key="rating">
            <span>{{ rating }} stars: {{ count }}</span>
          </div>
        </div>
      </div>
      <div class="review-cards">
        <div class="review-card" v-for="review in reviews && reviews.length > 0 ? reviews.slice(0, 3) : []" :key="review.id">
          <div class="user-info">
            <img :src="review.userProfile" alt="user profile" class="user-profile" />
            <div>
              <h3>{{ review.user }}</h3>
              <p>{{ review.date }}</p>
            </div>
          </div>
          <div class="review-content">
            <div class="review-rating">
              <span class="star" v-for="n in review.rating" :key="n">★</span>
            </div>
            <p>{{ review.comment }}</p>
            <img v-if="review.image" :src="review.image" alt="review image" class="review-image" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import TrainerSection from '@/components/TrainerSection.vue';
import MembershipSection from '@/components/MembershipSection.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const storeDetails = ref(null);
const reviews = ref([]);
const averageRating = ref(0);
const ratingDistribution = ref({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

const fetchStoreDetails = async (id) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch store details');
    }
    const data = await response.json();
    storeDetails.value = {
      ...data.data,
      memberships: data.data.memberships.map(membership => ({
        name: membership,
        price: 'N/A'  // 가격을 지정할 수 없기 때문에 N/A로 설정
      })),
      reviews: data.data.reviews || []
    };
  } catch (error) {
    console.error('Error fetching store details:', error);
  }
};

const fetchReviews = async () => {
  try {
    const storeId = route.params.id;
    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/reviews/store/${storeId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    reviews.value = data.data.map((review, index) => ({
      ...review,
      user: `사용자${index + 1}`
    }));
    calculateRatingDistribution();
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
  }
};

const calculateRatingDistribution = () => {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.value.forEach(review => {
    distribution[review.rating]++;
  });
  ratingDistribution.value = distribution;
};

const fetchAverageRating = async () => {
  try {
    const storeId = route.params.id;
    const response = await fetch(`${process.env.VUE_APP_API_URL}/reviews/store/${storeId}/average-rating`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    averageRating.value = data.data;
  } catch (error) {
    console.error('Error fetching average rating:', error);
  }
};

const viewAllReviews = () => {
  router.push({ name: 'store-reviews', params: { id: route.params.id } });
};

const goToMembershipsPage = () => {
  router.push({ name: 'memberships', params: { id: route.params.id } });
};

const goToPtConsultationsPage = () => {
  router.push({ name: 'ptConsultations', params: { id: route.params.id } });
};

onMounted(() => {
  fetchStoreDetails(route.params.id);
  fetchReviews();
  fetchAverageRating();
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.background {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.store-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%; /* 폭을 80%로 늘려서 더 넓게 보이도록 조정 */
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  padding: 30px; /* 전체적인 padding을 늘려 여유를 줌 */
  margin: 0 auto;
}

.store-header, .store-info {
  width: 100%;
  text-align: center;
  margin-bottom: 20px; /* 섹션 간 간격 추가 */
}

.store-image {
  width: 70%; /* 이미지 크기를 적절히 조정 */
  height: auto;
  border-radius: 20px;
  margin-bottom: 20px;
}

.store-name, .store-location, .store-phone {
  font-family: 'Inter', sans-serif;
  color: #000000;
}

.store-name {
  font-weight: 700;
  font-size: 28.8px;
  margin-top: 20px;
}

.store-location, .store-phone, .store-rating {
  font-weight: 400;
  font-size: 19.2px;
  margin-top: 10px;
}

.section {
  margin-bottom: 40px;
  text-align: center; /* 모든 섹션의 텍스트 중앙 정렬 */
}

.section h2 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 15px;
}

.membership-section, .pt-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0; /* 섹션 내 여백 추가 */
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-section {
  margin-top: 20px;
}

.rating-distribution {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating-card {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ebebeb;
  border-radius: 10px;
}

.review-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.review-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-info h3 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
}

.user-info p {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}

.review-content {
  flex-grow: 1;
}

.review-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
}

.view-all-reviews {
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #0000EE;
  cursor: pointer;
  text-decoration: underline;
}
</style>
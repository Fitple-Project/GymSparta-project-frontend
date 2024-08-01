<template>
  <div v-if="storeDetails" class="store-detail-page">
    <div class="store-header">
      <img :src="storeDetails.image || 'default_image.png'" alt="Store Image" class="store-image" />
      <h1 class="store-name">{{ storeDetails.storeName }}</h1>
      <p class="store-rating">⭐ {{ storeDetails.rating }}</p>
      <p class="store-location">{{ storeDetails.address }}</p>
      <p class="store-phone">전화번호: {{ storeDetails.storeTel }}</p>
    </div>
    <div class="store-info">
      <h2>회원권</h2>
      <MembershipSection :memberships="storeDetails.memberships || []" @more-click="goToMembershipsPage"/>
      <h2>1:1 P.T 상담</h2>
      <TrainerSection :trainers="storeDetails.ptConsultations || []" title="PT 상담" @more-click="goToPtConsultationsPage"/>
      <h2>운영 시간</h2>
      <p class="operating-hours">{{ storeDetails.storeHour }}</p>
      <h2>부가 서비스</h2>
      <ul class="additional-services">
        <li v-for="service in storeDetails.services" :key="service">{{ service }}</li>
      </ul>
      <h2>리뷰</h2>
      <ReviewSection :reviews="(storeDetails.reviews || []).slice(0, 3)" @more-click="goToReviewsPage" />
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import TrainerSection from '@/components/TrainerSection.vue';
import MembershipSection from '@/components/MembershipSection.vue';
import ReviewSection from '@/components/ReviewSection.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const storeDetails = ref(null);

const fetchStoreDetails = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/stores/${id}`, {
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

onMounted(() => {
  fetchStoreDetails(route.params.id);
});

const goToReviewsPage = () => {
  router.push({ name: 'storeReviews', params: { id: route.params.id } });
};

const goToMembershipsPage = () => {
  // 여기에 회원권 페이지로 이동하는 로직을 추가합니다.
};

const goToPtConsultationsPage = () => {
  // 여기에 PT 상담 페이지로 이동하는 로직을 추가합니다.
};
</script>

<style scoped>
.store-detail-page {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #F5F6F8;
}

.store-header {
  text-align: center;
  padding: 20px;
}

.store-image {
  width: 100%;
  height: auto;
}

.store-name {
  font-size: 2em;
  margin: 10px 0;
}

.store-rating {
  font-size: 1.2em;
  color: #666;
}

.store-location,
.store-phone {
  font-size: 1em;
  color: #666;
}

.store-info {
  padding: 20px;
  font-size: 1.1em;
}

.membership-cards,
.pt-cards,
.reviews {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.membership-card,
.pt-card,
.review-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
}

.operating-hours {
  font-size: 1em;
  color: #666;
}

.additional-services {
  list-style: none;
  padding: 0;
}

.additional-services li {
  font-size: 1em;
  color: #666;
  margin-bottom: 8px;
}
</style>

<template>
  <div v-if="storeDetails" class="store-edit-page">
    <div class="store-header">
      <img :src="storeDetails.image" alt="Store Image" class="store-image" />
      <h1 class="store-name">{{ storeDetails.name }}</h1>
      <p class="store-rating">⭐ {{ storeDetails.rating }}</p>
      <p class="store-location">{{ storeDetails.location }}</p>
      <p class="store-phone">전화번호: {{ storeDetails.phone }}</p>
    </div>
    <div class="store-info">
      <h2>회원권</h2>
      <MembershipSection :memberships="storeDetails.memberships" @more-click="goToMembershipsPage"/>
      <h2>1:1 P.T 상담</h2>
      <TrainerSection :trainers="storeDetails.ptConsultations" title="PT 상담" @more-click="goToPtConsultationsPage"/>
      <h2>운영 시간</h2>
      <p class="operating-hours">{{ storeDetails.operatingHours }}</p>
      <h2>부가 서비스</h2>
      <ul class="additional-services">
        <li v-for="service in storeDetails.additionalServices" :key="service">{{ service }}</li>
      </ul>
      <h2>리뷰</h2>
      <ReviewSection :reviews="storeDetails.reviewscontents.slice(0, 3)" @more-click="goToReviewsPage" />
    </div>
    <div class="buttons">
      <button @click="editStore" class="edit-button">수정</button>
      <!-- 매장 수정 API 연결 예시 -->
      <!-- this.$axios.post('/api/store/edit', this.storeDetails) -->
      <button @click="deleteStore" class="delete-button">삭제</button>
      <!-- 매장 삭제 API 연결 예시 -->
      <!-- this.$axios.post('/api/store/delete', { storeId: this.storeDetails.id }) -->
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import dy1 from '@/assets/Gym_image/dy1.svg';
import hm1 from '@/assets/Gym_image/hm1.svg';
import trainer1 from '@/assets/Trainer_image/kim.svg';
import trainer2 from '@/assets/Trainer_image/hcs.svg';
import trainer3 from '@/assets/Trainer_image/Ronnie.svg';
import TrainerSection from '@/components/TrainerSection.vue';
import MembershipSection from '@/components/MembershipSection.vue';
import ReviewSection from '@/components/ReviewSection.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const storeDetails = ref(null);

const fetchStoreDetails = async (id) => {
  const stores = [
    {
      id: 1,
      name: '휴메이크휘트니스 논현점',
      location: '서울 강남구 강남대로 546 지하2층',
      phone: '02-123-4567',
      info: '헬스 이용권',
      price: '29,000~100,000원',
      originalPrice: '',
      rating: '4.6',
      reviews: '2,952명 평가',
      image: hm1,
      memberships: [
        { name: '1개월 이용권', price: '29,000원' },
        { name: '3개월 이용권', price: '80,000원' },
        { name: '6개월 이용권', price: '150,000원' },
      ],
      ptConsultations: [
        { id: 1, image: trainer1, name: '김트레이너', price: '100,000원' },
        { id: 2, image: trainer2, name: '이트레이너', price: '120,000원' },
        { id: 3, image: trainer3, name: '박트레이너', price: '150,000원' },
      ],
      operatingHours: '월-금: 06:00 - 22:00, 토-일: 08:00 - 20:00',
      additionalServices: ['라커', '수건', 'WiFi'],
      reviewscontents: [
        { user: '홍길동', rating: '5', comment: '매우 만족합니다!', image: dy1 },
        { user: '김철수', rating: '4', comment: '좋아요!', image: dy1 },
        { user: '이영희', rating: '3', comment: '괜찮아요.', image: dy1 },
      ],
    },
  ];

  storeDetails.value = stores.find(store => store.id === parseInt(id));
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

const editStore = () => {
  // 매장 수정 API 연결 예시
  // this.$axios.post('/api/store/edit', storeDetails.value)
  //   .then(response => {
  //     console.log('Store updated successfully');
  //   })
  //   .catch(error => {
  //     console.error('Error updating store:', error);
  //   });
};

const deleteStore = () => {
  // 매장 삭제 API 연결 예시
  // this.$axios.post('/api/store/delete', { storeId: storeDetails.value.id })
  //   .then(response => {
  //     console.log('Store deleted successfully');
  //   })
  //   .catch(error => {
  //     console.error('Error deleting store:', error);
  //   });
};
</script>

<style scoped>
.store-edit-page {
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

.current-location {
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
  color: #666;
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

.membership-name,
.pt-trainer {
  font-size: 1.2em;
  margin-bottom: 8px;
}

.membership-price,
.pt-price {
  font-size: 1em;
  color: #666;
  text-align: right;
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

.review-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.review-user,
.review-rating,
.review-comment {
  font-size: 1em;
  color: #666;
  margin: 8px 0;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

.edit-button,
.delete-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #333333;
}
</style>
<template>
  <div v-if="storeDetails" class="store-edit-page">
    <div class="store-header">
      <img :src="storeDetails.image || 'default-image-url'" alt="매장 이미지" class="store-image" />
      <div class="store-info-header">
        <h1 class="store-name">{{ storeDetails.storeName }}</h1>
        <p class="store-rating">⭐ {{ storeDetails.rating }}</p>
        <p class="store-location">{{ storeDetails.address }}</p>
        <p class="store-phone">전화번호: {{ storeDetails.storeTel }}</p>
      </div>
    </div>
    <div class="store-info">
      <!-- 매장 소개 섹션 추가 -->
      <div class="section">
        <h2>매장 소개</h2>
        <p>{{ storeDetails.storeInfo }}</p>
      </div>
      <!-- 기존 섹션 -->
      <div class="section">
        <h2>회원권</h2>
        <MembershipSection :title="'회원권'" :memberships="storeDetails.memberships" @more-click="goToMembershipsPage" />
      </div>
      <div class="section">
        <h2>1:1 P.T 상담</h2>
        <TrainerSection :trainers="storeDetails.ptConsultations" title="PT 상담" @more-click="goToPtConsultationsPage" />
      </div>
      <div class="section">
        <h2>운영 시간</h2>
        <p class="operating-hours">{{ storeDetails.storeHour }}</p>
      </div>
      <div class="section">
        <h2>부가 서비스</h2>
        <ul class="additional-services">
          <li v-for="service in storeDetails.services" :key="service">{{ service }}</li>
        </ul>
      </div>
      <div class="section">
        <h2>리뷰</h2>
        <ReviewSection :reviews="(storeDetails.reviews || []).slice(0, 3)" @more-click="goToReviewsPage" />
      </div>
    </div>
    <div class="buttons">
      <button @click="goToEditPage" class="edit-button">수정</button>
      <button @click="deleteStore" class="delete-button">삭제</button>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TrainerSection from '@/components/TrainerSection.vue';
import MembershipSection from '@/components/MembershipSection.vue';
import ReviewSection from '@/components/ReviewSection.vue';

const route = useRoute();
const router = useRouter();
const storeDetails = ref(null);

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

const fetchStoreDetails = async (id) => {
  try {
    console.log('Fetching store details for ID:', id);
    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores/owners/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched store details:', data);

    const memberships = data.data.memberships.map(membership => ({
      name: membership,
      price: 'N/A'  // 가격을 지정할 수 없기 때문에 N/A로 설정
    }));

    storeDetails.value = {
      ...data.data,
      memberships: memberships
    };

    console.log('Transformed store details:', storeDetails.value);
  } catch (error) {
    console.error('매장 정보를 가져오는 중 오류 발생:', error);
  }
};

onMounted(() => {
  const id = route.params.id;
  if (id) {
    fetchStoreDetails(id);
  } else {
    console.error('매장 ID가 존재하지 않습니다.');
  }
});

const goToReviewsPage = () => {
  router.push({ name: 'storeReviews', params: { id: route.params.id } });
};

const goToMembershipsPage = () => {
  // 회원권 페이지로 이동하는 코드 작성
};

const goToPtConsultationsPage = () => {
  // PT 상담 페이지로 이동하는 코드 작성
};

const goToEditPage = () => {
  router.push({ name: 'store-update', params: { id: route.params.id } });
};

const deleteStore = async () => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores/owners/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      console.log('매장 삭제 성공');
      alert('매장이 성공적으로 삭제되었습니다.');
      router.push({ name: 'store-management' }).then(() => {
        const storeManagementPage = router.currentRoute.value.matched.find(
          route => route.name === 'store-management'
        )?.instances.default;
        if (storeManagementPage) {
          storeManagementPage.changeSection('storeList');
        }
      });
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('매장 삭제 중 오류 발생:', error);
    alert('매장 삭제 중 오류가 발생했습니다.');
  }
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

.edit-form {
  margin-top: 20px;
}

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  margin-bottom: 8px;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.save-button,
.cancel-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover,
.cancel-button:hover {
  background-color: #333333;
}
</style>
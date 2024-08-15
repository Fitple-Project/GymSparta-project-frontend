<template>
  <div v-if="storeDetails" class="store-update-page">
    <div class="store-header">
      <h1 class="store-name">매장 정보 수정</h1>
    </div>
    <div class="store-info">
      <form @submit.prevent="updateStore">
        <div class="form-field">
          <label for="storeName">매장명</label>
          <input type="text" id="storeName" v-model="storeDetails.storeName" />
        </div>
        <div class="form-field">
          <label for="storeAddress">주소</label>
          <input type="text" id="storeAddress" v-model="storeDetails.address" />
        </div>
        <div class="form-field">
          <label for="storeInfo">소개</label>
          <textarea id="storeInfo" v-model="storeDetails.storeInfo"></textarea>
        </div>
        <div class="form-field">
          <label for="storeHour">운영 시간</label>
          <input type="text" id="storeHour" v-model="storeDetails.storeHour" />
        </div>
        <div class="form-field">
          <label for="storeTel">전화번호</label>
          <input type="text" id="storeTel" v-model="storeDetails.storeTel" />
        </div>
        <div class="form-field">
          <label for="price">가격</label>
          <input type="text" id="price" v-model="storeDetails.price" />
        </div>
        <div class="form-field">
          <label for="memberships">회원권 (세미콜론으로 구분)</label>
          <input type="text" id="memberships" v-model="storeDetails.memberships" />
        </div>
        <div class="form-field">
          <label for="services">부가 서비스 (세미콜론으로 구분)</label>
          <input type="text" id="services" v-model="storeDetails.services" />
        </div>
        <div class="form-field">
          <label for="image">이미지 URL</label>
          <input type="text" id="image" v-model="storeDetails.image" />
        </div>
        <div class="button-group">
          <button type="submit" class="save-button">저장</button>
          <button type="button" @click="cancelEdit" class="cancel-button">취소</button>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const storeDetails = ref({
  storeName: '',
  address: '',
  storeInfo: '',
  storeHour: '',
  storeTel: '',
  price: '',
  memberships: '',
  services: '',
  image: ''
});

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

    // Convert arrays to semicolon-separated strings
    storeDetails.value = {
      ...data.data,
      memberships: data.data.memberships.join('; '),
      services: data.data.services.join('; ')
    };

    console.log('Transformed store details:', storeDetails.value);
  } catch (error) {
    console.error('매장 정보를 가져오는 중 오류 발생:', error);
  }
};

const updateStore = async () => {
  try {
    // Split semicolon-separated strings into arrays
    const memberships = storeDetails.value.memberships.split(';').map(item => item.trim());
    const services = storeDetails.value.services.split(';').map(item => item.trim());

    const payload = {
      ...storeDetails.value,
      memberships,
      services
    };

    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores/owners/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Store updated successfully:', data);

    alert('매장이 성공적으로 수정되었습니다.');
    router.push({ name: 'store-management' });
  } catch (error) {
    console.error('매장 정보를 수정하는 중 오류 발생:', error);
    alert('매장 정보를 수정하는 중 오류가 발생했습니다.');
  }
};

const cancelEdit = () => {
  router.push({ name: 'store-management' });
};

onMounted(() => {
  const id = route.params.id;
  if (id) {
    fetchStoreDetails(id);
  } else {
    console.error('매장 ID가 존재하지 않습니다.');
  }
});
</script>

<style scoped>
.store-update-page {
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

.store-name {
  font-size: 2em;
  margin: 10px 0;
}

.store-info {
  padding: 20px;
  font-size: 1.1em;
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
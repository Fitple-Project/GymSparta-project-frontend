<template>
  <div id="app" class="container">
    <aside class="sidebar">
      <div class="menu-item" :class="{ active: activeSection === 'storeList' }" @click="changeSection('storeList')">
        <div class="icon search"></div>
        <span class="menu-text">매장 목록</span>
      </div>
      <div class="menu-item" :class="{ active: activeSection === 'trainerList' }" @click="changeSection('trainerList')">
        <div class="icon search"></div>
        <span class="menu-text">트레이너 목록</span>
      </div>
      <div class="menu-item" :class="{ active: activeSection === 'storeRegister' }" @click="changeSection('storeRegister')">
        <div class="icon search"></div>
        <span class="menu-text">매장 등록</span>
      </div>
    </aside>
    <main class="main-content">
      <section v-if="activeSection === 'storeList'" class="store-list">
        <h1 class="page-title">매장 목록</h1>
        <div class="store-card" v-for="store in stores" :key="store.id" @click="storeClicked(store.id)">
          <img :src="store.image" alt="store image" class="store-image" />
          <div class="store-info">
            <h3>{{ store.store_name }}</h3>
            <p>{{ store.store_address }}</p>
            <p class="store-price">{{ store.price }}원~/월</p>
          </div>
        </div>
      </section>
      <section v-if="activeSection === 'trainerList'" class="trainer-list">
        <div class="trainer-list-header">
          <h1 class="page-title">트레이너 목록</h1>
          <div class="trainer-buttons">
            <button @click="openTrainerModal('register')" class="register-button">트레이너 등록</button>
            <button @click="openTrainerModal('unregister')" class="unregister-button">트레이너 해지</button>
          </div>
        </div>
        <div class="trainer-card" v-for="trainer in trainers" :key="trainer.id" @click="goToTrainerDetail(trainer.id)">
          <img :src="trainer.image" alt="trainer image" class="trainer-image" />
          <div class="trainer-info">
            <h3>{{ trainer.name }}</h3>
            <p>{{ trainer.location }}</p>
            <p>{{ trainer.price }}</p>
          </div>
        </div>
      </section>
      <section v-if="activeSection === 'storeRegister'" class="store-register">
        <h1 class="page-title">매장 등록</h1>
        <div class="store-photo">
          <div class="photo-placeholder">매장 사진 등록</div>
          <div class="photo-icon"></div>
        </div>
        <div class="form-field">
          <label for="storeName">매장명</label>
          <input type="text" id="storeName" v-model="storeName" placeholder="매장명을 입력하세요" />
        </div>
        <div class="form-field">
          <label for="storeAddress">매장 주소 (우편번호)</label>
          <input type="text" id="storeAddress" v-model="storeAddress" placeholder="매장 주소를 입력하세요" />
        </div>
        <div class="form-field">
          <label for="storeIntro">매장 소개</label>
          <textarea id="storeIntro" v-model="storeIntro" placeholder="매장 소개를 입력하세요"></textarea>
        </div>
        <div class="form-field">
          <label for="services">부가 서비스</label>
          <textarea id="services" v-model="services" placeholder="부가 서비스를 입력하세요"></textarea>
        </div>
        <div class="form-field">
          <label for="operatingHours">운영 시간</label>
          <textarea id="operatingHours" v-model="operatingHours" placeholder="운영 시간을 입력하세요"></textarea>
        </div>
        <div class="form-field">
          <label for="phoneNumber">전화번호</label>
          <input type="text" id="phoneNumber" v-model="phoneNumber" placeholder="전화번호를 입력하세요" />
        </div>
        <h2 class="section-title">상품 관리</h2>
        <div class="form-field">
          <label for="membership">회원권</label>
          <textarea id="membership" v-model="membership" placeholder="등록할 회원권의 기간과 가격을 입력하세요"></textarea>
        </div>
        <div class="form-field">
          <label for="price">가격</label>
          <input type="text" id="price" v-model="price" placeholder="가격을 입력하세요" />
        </div>
        <div class="form-field">
          <label for="ptSession">PT 세션</label>
          <textarea id="ptSession" v-model="ptSession" placeholder="등록할 PT 세션의 내용을 입력하세요"></textarea>
        </div>
        <h2 class="section-title">트레이너 목록</h2>
        <div class="form-field">
          <label for="trainerList">트레이너 추가</label>
          <input type="text" id="trainerList" v-model="trainerList" placeholder="매장에 등록할 트레이너를 추가하세요" />
        </div>
        <div class="button-group">
          <button @click="registerStore" class="register-button">등록</button>
          <button @click="cancelStoreRegistration" class="cancel-button">취소</button>
        </div>
      </section>
    </main>
    <TrainerModal v-if="isTrainerModalVisible" :visible="isTrainerModalVisible" :type="trainerModalType" @close="closeTrainerModal" />

    <!-- 오류 메시지 모달 -->
    <div v-if="errorDialog" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">오류 발생</h5>
          <button type="button" class="close" @click="errorDialog = false">&times;</button>
        </div>
        <div class="modal-body">
          <p>{{ errorMessage }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="errorDialog = false">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrainerModal from '../components/TrainerModal.vue';

export default {
  components: {
    TrainerModal
  },
  data() {
    return {
      activeSection: 'storeList',
      isTrainerModalVisible: false,
      trainerModalType: 'register',
      stores: [],
      trainers: [],
      storeName: '',
      storeAddress: '',
      storeIntro: '',
      services: '',
      operatingHours: '',
      phoneNumber: '',
      membership: '',
      ptSession: '',
      trainerList: '',
      price: '',
      errorMessage: '', // 오류 메시지 저장
      errorDialog: false // 모달 상태 저장
    };
  },
  methods: {
    getAuthToken() {
      return localStorage.getItem('accessToken');
    },
    changeSection(section) {
      this.activeSection = section;
    },
    openTrainerModal(type) {
      this.trainerModalType = type;
      this.isTrainerModalVisible = true;
    },
    closeTrainerModal() {
      this.isTrainerModalVisible = false;
    },
    storeClicked(storeId) {
      console.log('Store ID:', storeId); // 디버그용 로그 추가
      if (!storeId) {
        console.error('Store ID is undefined or null');
        return;
      }
      this.$router.push({ name: 'storeedit', params: { id: storeId } });
    },
    goToTrainerDetail(trainerId) {
      this.$router.push({ name: 'trainer-detail', params: { id: trainerId } });
    },
    registerStore() {
      const payload = {
        storeName: this.storeName || null,
        address: this.storeAddress || null,
        storeInfo: this.storeIntro || null,
        storeHour: this.operatingHours || null,
        storeTel: this.phoneNumber || null,
        services: this.services ? this.services.split(',') : [],
        memberships: this.membership ? this.membership.split('\n') : [],
        ptConsultations: this.ptSession ? this.ptSession.split('\n') : [],
        trainerList: this.trainerList ? this.trainerList.split(',') : [],
        price: this.price || null,
      };

      fetch('${process.env.VUE_APP_API_URL}/api/stores/owners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(errorData => {
              throw new Error(errorData.message || '알 수 없는 오류가 발생했습니다.');
            });
          }
          return response.json();
        })
        .then(() => {
          alert('매장 등록이 완료되었습니다');
          this.clearStoreForm();
          this.changeSection('storeList');
          this.fetchStores();
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.errorDialog = true;
          console.error(error);
        });
    },
    clearStoreForm() {
      this.storeName = '';
      this.storeAddress = '';
      this.storeIntro = '';
      this.services = '';
      this.operatingHours = '';
      this.phoneNumber = '';
      this.membership = '';
      this.ptSession = '';
      this.trainerList = '';
      this.price = '';
    },
    fetchStores() {
      console.log('Fetching stores...');

      fetch(`${process.env.VUE_APP_API_URL}/api/stores/owners`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(errorData => {
              throw new Error(errorData.message || 'HTTP error! status: ' + response.status);
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched stores:', data); // 서버 응답 데이터 로그 출력

          if (data.data && Array.isArray(data.data)) {
            // 서버에서 반환된 데이터를 Vue 상태에 저장
            this.stores = data.data.map(store => {
              console.log('Store:', store); // 각 매장 데이터 로그 출력
              console.log('Store price:', store.price); // 가격 속성 로그 출력
              return {
                id: store.storeId, // 서버에서 반환된 데이터 속성 이름 확인
                store_name: store.storeName, // 서버에서 반환된 데이터 속성 이름 확인
                store_address: store.storeAddress, // 서버에서 반환된 데이터 속성 이름 확인
                price: store.storePrice || 'N/A', // 가격 속성 매핑 확인
                image: store.image || 'default-image-url' // 이미지가 없을 경우 기본 이미지 사용
              };
            });
            console.log('Mapped stores:', this.stores);
          } else {
            console.error('Unexpected data format:', data);
          }
        })
        .catch(error => {
          this.errorMessage = error.message;
          this.errorDialog = true;
          console.error('There has been a problem with your fetch operation:', error);
        });
    }
  },
  mounted() {
    this.fetchStores();
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}

.sidebar {
  width: 200px;
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
  padding-top: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
}

.menu-item.active {
  background: #f7f7f7;
  border-radius: 8px;
}

.menu-item .icon {
  margin-right: 10px;
}

.search {
  background: url('@/assets/search_icon.svg') no-repeat center center;
  background-size: cover;
}

.menu-text {
  font-family: 'Inter';
  font-size: 16px;
  color: #000000;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.page-title {
  font-family: 'Inter';
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 20px;
}

.store-card,
.trainer-card {
  display: flex;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
}

.store-card .store-image,
.trainer-card .trainer-image {
  width: 164px;
  height: 153px;
  border-radius: 8px;
  margin-right: 20px;
}

.store-card .store-info,
.trainer-card .trainer-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.store-card .store-info h3,
.trainer-card .trainer-info h3 {
  font-family: 'Inter';
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}

.store-card .store-info p,
.trainer-card .trainer-info p {
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
  color: #000000;
}

.store-register {
  max-width: 800px;
}

.store-photo {
  position: relative;
  margin-bottom: 20px;
}

.photo-placeholder,
.photo-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter';
  font-size: 32px;
  font-weight: 500;
  color: #000000;
}

.photo-placeholder {
  height: 186px;
  background: #d9d9d9;
}

.photo-icon {
  width: 104px;
  height: 104px;
  border: 4px solid #1e1e1e;
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
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.section-title {
  font-family: 'Inter';
  font-size: 32px;
  font-weight: 500;
  color: #000000;
  margin-top: 40px;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 16px;
}

.register-button,
.cancel-button {
  padding: 16px 32px;
  font-family: 'Inter';
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  background: #000000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.cancel-button {
  background: #e0e0e0;
}

.trainer-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.trainer-buttons {
  display: flex;
  gap: 10px;
}

.register-button,
.unregister-button {
  padding: 8px 16px;
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  background: #000000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.unregister-button {
  background: #ff6b6b;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  color: #F26921;
}

.modal-body {
  margin-top: 10px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.close {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 24px;
}

.close:hover {
  color: red;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>

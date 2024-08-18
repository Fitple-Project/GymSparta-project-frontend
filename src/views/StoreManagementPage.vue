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
        <div class="header-with-buttons">
          <h1 class="page-title">매장 목록</h1>
          <button @click="openWriteModal" class="btn">공지사항 작성</button>
          <button @click="openListModal" class="btn">공지사항 목록</button>
        </div>

        <!-- 예시 매장 카드 -->
        <div class="store-card" @click="storeClicked(exampleStore.id)">
          <img :src="exampleStore.image" alt="store image" class="store-image" />
          <div class="store-info">
            <h3>{{ exampleStore.store_name }}</h3>
            <p>{{ exampleStore.store_address }}</p>
            <p class="store-price">{{ exampleStore.price }}원~/월</p>
          </div>
        </div>

        <!-- 실제 매장 데이터가 로드되면 이 부분이 사용됩니다 -->
        <div class="store-card" v-for="store in stores" :key="store.id" @click="storeClicked(store.id)">
          <img :src="store.image" alt="store image" class="store-image" />
          <div class="store-info">
            <h3>{{ store.store_name }}</h3>
            <p>{{ store.store_address }}</p>
            <p class="store-price">{{ store.price }}원~/월</p>
          </div>
        </div>
      </section>

      <!-- 공지사항 작성 모달 -->
      div v-if="isWriteModalVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">공지사항 작성</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-content">
          <form @submit.prevent="submitNotice">
            <label for="title">제목:</label><br>
            <input type="text" id="title" v-model="noticeRiteTitle" required><br>

            <label for="content">내용:</label><br>
            <textarea id="content" v-model="noticeRiteContent" rows="4" required></textarea><br>

            <!-- 동적 카테고리 선택박스 (스토어 ID와 이름 표시) -->
            <label for="category">스토어 선택:</label><br>
            <select id="category" v-model="selectedStoreId" required>
              <option value="">스토어를 선택하세요</option>
              <!-- 스토어 ID와 이름을 동시에 표시 -->
              <option v-for="store in stores" :key="store.id" :value="store.id">
                {{ store.id }} - {{ store.store_name }}
              </option>
            </select><br><br>

            <!-- 등록 버튼을 클릭하면 `handleSubmit` 메서드가 실행됩니다. -->
            <button type="button" class="btn" @click="handleSubmit">등록</button>
          </form>
        </div>
      </div>

      <!-- 공지사항 목록 모달 -->
      <div v-if="isListModalVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">공지사항 목록</h2>
            <!-- 동적 카테고리 선택박스 (스토어 ID와 이름 표시) -->
            <label for="category">스토어 선택:</label><br>
            <select id="category" v-model="selectedStoreId" required>
              <option value="">스토어를 선택하세요</option>
              <!-- 스토어 ID와 이름을 동시에 표시 -->
              <option v-for="store in stores" :key="store.id" :value="store.id">
                {{ store.id }} - {{ store.store_name }}
              </option>
            </select><br><br>
            <button class="close-button" @click="closeModal">&times;</button>
          </div>
          <div class="modal-content">
            <ul id="noticeList">
              <li v-for="(notice) in notices" :key="notice" @click="openDetailModal(notice.allNotificationId)">
                <strong>{{ notice.title }}</strong>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="fetchNotices">조회</button>
            <button class="btn btn-primary" @click="closeModal">닫기</button>
          </div>
        </div>
      </div>

      <!-- 공지사항 상세 모달 -->
      <div v-if="isDetailModalVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">{{ detailNotice.title }}</h2>
            <button class="close-button" @click="closeDetailModal">&times;</button>
          </div>
          <div class="modal-content">
            <h3>{{ detailNotice.title }}</h3>
            <p>{{ detailNotice.message }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="closeDetailModal">뒤로가기</button>
          </div>
        </div>
      </div>

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
      exampleStore: {
        id: 1,
        store_name: '스파르타 피트니스',
        store_address: '서울특별시 강남구 역삼동 123-45',
        price: '100,000',
        image: 'https://example.com/store-image.jpg' // 예시 이미지 URL
      },
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
      // 공지사항 관련 데이터
      isWriteModalVisible: false,
      isListModalVisible: false,
      isDetailModalVisible: false,
      notices: [
        {
          title: '',
          allNotificationId: ''
        }
      ],
      noticeTitle: '',
      noticeContent: '',
      noticeRiteTitle: this.noticeRiteTitle,
      noticeRiteContent: this.noticeRiteContent,
      detailNotice: {}
    };
  },
  methods: {
    async fetchNotices() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`http://localhost:8080/api/notification/${this.selectedStoreId}/allNotification`, {   // 서버에서 공지사항 목록 가져오기
          method: 'GET',                                 // HTTP GET 요청
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`// JSON 형식으로 데이터 수신
          }
        });

        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다.');
        }

        const data = await response.json();               // 서버에서 받은 JSON 데이터를 파싱
        this.notices = data;                              // 공지사항 목록을 Vue 데이터에 저장

      } catch (error) {
        console.error('공지사항 목록을 가져오는 중 오류가 발생했습니다.', error);
        alert('공지사항 목록을 가져오는 중 오류가 발생했습니다.');
      }
    },
    handleSubmit() {
      // handleSubmit 메서드에서 submitNotice 메서드를 호출합니다.
      this.submitNotice();
    },
    async submitNotice() {
        const postData = {
          noticeTitle: this.noticeRiteTitle,
          noticeContent: this.noticeRiteContent
        };
      const token = localStorage.getItem('accessToken');
      // POST 요청을 통해 서버에 데이터 전송
      try {
        // POST 요청 전송
        const response = await fetch(`http://localhost:8080/api/notification/${this.selectedStoreId}/allNotification`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData),
        });

        // 서버로부터 응답이 성공적으로 돌아온 경우
        console.log('공지사항이 성공적으로 제출되었습니다:', response.data);

        // 필요 시 성공적인 제출 후 추가 작업 (예: 알림 표시, 모달 닫기 등)
        this.closeModal();
      } catch (error) {
        // 오류가 발생한 경우
        console.error('공지사항 제출 중 오류가 발생했습니다:', error);
      }
    },
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
      console.log('Store ID:', storeId);
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

      fetch('http://localhost:8080/api/stores/owners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('매장 등록 중 오류가 발생했습니다.');
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
        console.error(error);
        alert('매장 등록 중 오류가 발생했습니다.');
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

      fetch(`http://localhost:8080/api/stores/owners`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched stores:', data);

        if (data.data && Array.isArray(data.data)) {
          this.stores = data.data.map(store => {
            console.log('Store:', store);
            console.log('Store price:', store.price);
            return {
              id: store.storeId,
              store_name: store.storeName,
              store_address: store.storeAddress,
              price: store.storePrice || 'N/A',
              image: store.image || 'default-image-url'
            };
          });
          console.log('Mapped stores:', this.stores);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    },
    // 공지사항 모달 관련 메서드
    openWriteModal() {
      this.isWriteModalVisible = true;
    },
    async openListModal() {
      this.isListModalVisible = true;
    },
    async openDetailModal(allNotificationId) {
      const token = localStorage.getItem('accessToken');
      try {
        // 공지사항의 상세 정보를 가져오는 API 요청
        const response = await fetch(`http://localhost:8080/api/notification/allNotification/${allNotificationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다.');
        }

        const data = await response.json();
        this.detailNotice = data;

        // 모달을 닫고 상세보기 모달을 열기
        this.isListModalVisible = false;
        this.isDetailModalVisible = true;
      } catch (error) {
        console.error('공지사항 상세 정보를 가져오는 중 오류가 발생했습니다.', error);
        alert('공지사항 상세 정보를 가져오는 중 오류가 발생했습니다.');
      }
    },
    closeModal() {
      this.isWriteModalVisible = false;
      this.isListModalVisible = false;
      this.isDetailModalVisible = false;
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

.header-with-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.page-title {
  font-family: 'Inter';
  font-size: 32px;
  font-weight: 700;
  color: #000000;
}

.btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  animation: modalAppear 0.3s ease-out;
}

.modal-header {
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.2em;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}

.modal-content {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e0e0e0;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
</style>
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
      <!-- 매장 목록 섹션 -->
      <section v-if="activeSection === 'storeList'" class="store-list">
        <h1 class="page-title">매장 목록</h1>
        <div class="store-buttons">
          <button @click="openWriteModal" class="register-button">공지사항 작성</button>
          <button @click="openListModal" class="register-button">공지사항 목록</button>
        </div>
        <div class="store-card" v-for="store in stores" :key="store.id" @click="storeClicked(store.id)">
          <img :src="store.image || defaultImage" alt="store image" class="store-image" />
          <div class="store-info">
            <h3>{{ store.store_name || '이름 없음' }}</h3>
            <p>{{ store.store_address || '주소 없음' }}</p>
            <p class="store-price">{{ store.price ? `${store.price}원~/월` : '가격 정보 없음' }}</p>
          </div>
        </div>
      </section>

      <!-- 공지사항 작성 모달 -->
      <div v-if="isWriteModalVisible" class="modal-overlay" @click.self="closeModal('write')">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">공지사항 작성</h2>
            <button class="close-button" @click="closeModal('write')">&times;</button>
          </div>
          <div class="modal-content">
            <form @submit.prevent="submitNotice">
              <label for="title">제목:</label><br>
              <input type="text" id="title" v-model="noticeRiteTitle" required><br>
              <label for="content">내용:</label><br>
              <textarea id="content" v-model="noticeRiteContent" rows="4" required></textarea><br>
              <label for="category">스토어 선택:</label><br>
              <select id="category" v-model="selectedStoreId" required>
                <option value="">스토어를 선택하세요</option>
                <option v-for="store in stores" :key="store.id" :value="store.id">
                  {{ store.id }} - {{ store.store_name }}
                </option>
              </select><br><br>
              <button type="button" class="btn" @click="handleSubmit">등록</button>
            </form>
          </div>
        </div>
      </div>

      <!-- 공지사항 목록 모달 -->
      <div v-if="isListModalVisible" class="modal-overlay" @click.self="closeModal('list')">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">공지사항 목록</h2>
            <label for="category">스토어 선택:</label><br>
            <select id="category" v-model="selectedStoreId" required>
              <option value="">스토어를 선택하세요</option>
              <option v-for="store in stores" :key="store.id" :value="store.id">
                {{ store.id }} - {{ store.store_name }}
              </option>
            </select><br><br>
            <button class="close-button" @click="closeModal('list')">&times;</button>
          </div>
          <div class="modal-content">
            <ul id="noticeList">
              <li v-for="(notice) in notices" :key="notice.allNotificationId" @click="openDetailModal(notice.allNotificationId)">
                <strong>{{ notice.title }}</strong>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="fetchNotices">조회</button>
            <button class="btn btn-primary" @click="closeModal('list')">닫기</button>
          </div>
        </div>
      </div>

      <!-- 공지사항 상세 모달 -->
      <div v-if="isDetailModalVisible" class="modal-overlay" @click.self="closeModal('detail')">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">{{ detailNotice.title }}</h2>
            <button class="close-button" @click="closeModal('detail')">&times;</button>
          </div>
          <div class="modal-content">
            <h3>{{ detailNotice.title }}</h3>
            <p>{{ detailNotice.message }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="closeModal('detail')">뒤로가기</button>
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
          <img :src="trainer.image || defaultImage" alt="trainer image" class="trainer-image" />
          <div class="trainer-info">
            <h3>{{ trainer.name || '이름 없음' }}</h3>
            <p>{{ trainer.location || '위치 정보 없음' }}</p>
            <p>{{ trainer.price ? `${trainer.price}원~/회` : '가격 정보 없음' }}</p>
          </div>
        </div>
      </section>

      <!-- 매장 등록 섹션 -->
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

    <!-- 트레이너 모달 -->
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
      noticeRiteTitle: '',
      noticeRiteContent: '',
      detailNotice: {},
      defaultImage: 'path/to/default/image.jpg', // 기본 이미지 경로 설정
      errorMessage: '', // 오류 메시지 저장
      errorDialog: false // 모달 상태 저장
    };
  },
  methods: {
    // 공지사항 작성 모달을 여는 메서드
    openWriteModal() {
      this.isWriteModalVisible = true;
    },
    // 공지사항 목록 모달을 여는 메서드
    openListModal() {
      this.isListModalVisible = true;
    },
    // 모달을 닫는 메서드
    closeModal(modalType) {
      if (modalType === 'write') {
        this.isWriteModalVisible = false;
      } else if (modalType === 'list') {
        this.isListModalVisible = false;
      } else if (modalType === 'detail') {
        this.isDetailModalVisible = false;
      }
    },
    // 공지사항 작성 제출 메서드
    handleSubmit() {
      this.submitNotice();
    },
    // 공지사항 작성 서버 요청
    async submitNotice() {
      const postData = {
        noticeTitle: this.noticeRiteTitle,
        noticeContent: this.noticeRiteContent
      };
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/notification/${this.selectedStoreId}/allNotification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(postData),
        });
        const data = await response.json();
        this.closeModal('write');
        if (response.ok) {
          alert(`공지 작성: ${data.message}`);
        } else {
          alert(`오류: ${data.message}`);
        }
      } catch (error) {
        console.error('공지사항 제출 중 오류가 발생했습니다:', error);
        alert('공지 작성 중 오류가 발생하였습니다');
      }
    },
    // 공지사항 목록 조회 메서드
    async fetchNotices() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/notification/${this.selectedStoreId}/allNotification`, {
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
        this.notices = data;
      } catch (error) {
        console.error('공지사항 목록을 가져오는 중 오류가 발생했습니다.', error);
        alert('공지사항 목록을 가져오는 중 오류가 발생했습니다.');
      }
    },
    // 공지사항 상세 모달 열기
    async fetchNoticeDetail(noticeId) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/notification/${noticeId}`, {
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
        this.isListModalVisible = false;
        this.isDetailModalVisible = true;
      } catch (error) {
        console.error('공지사항 상세 정보를 가져오는 중 오류가 발생했습니다.', error);
        alert('공지사항 상세 정보를 가져오는 중 오류가 발생했습니다.');
      }
    },
    closeDetailModal() {
      this.isDetailModalVisible = false;
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
      if (storeId) {
        this.$router.push({ name: 'store-edit', params: { id: storeId } });
      } else {
        console.error('Store ID is undefined or null');
      }
    },
    goToTrainerDetail(trainerId) {
      this.$router.push({ name: 'trainer-detail', params: { id: trainerId } });
    },
    registerStore() {
      const payload = {
        storeName: this.storeName,
        address: this.storeAddress,
        storeInfo: this.storeIntro,
        storeHour: this.operatingHours,
        storeTel: this.phoneNumber,
        services: this.services ? this.services.split(',') : [],
        memberships: this.membership ? this.membership.split('\n') : [],
        ptConsultations: this.ptSession ? this.ptSession.split('\n') : [],
        trainerList: this.trainerList ? this.trainerList.split(',') : [],
        price: this.price,
      };

      fetch(`${process.env.VUE_APP_API_URL}/api/stores/owners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        credentials: 'include',
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
    async fetchStores() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/stores/owners`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다.');
        }

        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          this.stores = data.data.map(store => ({
            id: store.storeId || null,
            store_name: store.storeName || '이름 없음',
            store_address: store.storeAddress || '주소 없음',
            price: store.storePrice || 'N/A',
            image: store.image || this.defaultImage,
          }));
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        this.errorMessage = error.message;
        this.errorDialog = true;
        console.error('There has been a problem with your fetch operation:', error);
      }
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
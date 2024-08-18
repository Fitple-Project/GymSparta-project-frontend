<template>
  <div class="trainer-profile-page">
    <aside class="sidebar">
      <nav class="list">
        <div class="menu-item" @click="changeView('profile')">
          <div class="home-icon"></div>
          <div class="menu-text">Home</div>
        </div>
        <div class="menu-item" @click="changeView('payments')">
          <div class="search-icon"></div>
          <div class="menu-text">결제 내역</div>
        </div>
        <div class="menu-item" @click="changeView('reviews')">
          <div class="bell-icon"></div>
          <div class="menu-text">리뷰</div>
        </div>
      </nav>
    </aside>
    <main class="form">
      <div v-if="currentView === 'profile'" class="profile-view">
        <div class="profile">
          <div class="avatar"></div>
          <div class="frame">
            <div class="nickname">{{profileData.nickname}}</div>
            <div class="batch">Java_5기</div>
          </div>
        </div>
        <div class="input-group">
          <div class="username">Username</div>
          <div class="field">
            <input v-model="profileData.trainerName" class="label" placeholder="Enter trainerName" />
          </div>
        </div>
        <div class="input-group">
          <div class="nickname">Nickname</div>
          <div class="field">
            <input v-model="profileData.nickname" class="label" placeholder="Enter Nickname" />
          </div>
        </div>
        <div class="input-group">
          <div class="input-title">Email</div>
          <div class="field">
            <input v-model="profileData.email" class="label" placeholder="Enter Email" />
          </div>
        </div>
        <div class="input-group">
          <div class="phone-number">Phone Number</div>
          <div class="field">
            <input v-model="profileData.trainerPhoneNumber" class="label" placeholder="Enter Phone Number" />
          </div>
        </div>
        <div class="input-group">
          <div class="phone-number">info</div>
          <div class="field">
            <input v-model="profileData.trainerInfo" class="label" placeholder="Enter info" />
          </div>
        </div>
        <div class="input-list">
          <div class="address">Address</div>
          <div class="field">
            <input v-model="profileData.address" class="label" placeholder="Enter Address" />
          </div>
          <div class="field">
            <input v-model="profileData.detailAddress" class="label" placeholder="Enter Detail Address" />
          </div>
        </div>
        <div class="input-group">
          <div class="confirm-password">Confirm Password</div>
          <div class="confirm-password-field">
<!--            <input type="password" v-model="profileData.password" class="label" placeholder="Enter Password" />-->
            <input type="password" v-model="profileData.confirmPassword" class="label" placeholder="Confirm Password" />
            <button @click="showPasswordModal = true" class="change-button">변경</button>
          </div>
        </div>
        <div class="buttons">
          <button @click="editProfile" class="edit-button">수정</button>
          <button @click="showDeleteModal = true" class="delete-button">회원탈퇴</button>
        </div>
      </div>
      <div v-if="currentView === 'payments'" class="payments-view">
        <h1>헬스장 결제 내역 관리</h1>
        <div class="search-container">
          <input type="text" v-model="searchTerm" placeholder="검색어를 입력하세요..." />
          <button @click="searchPayments">검색</button>
        </div>
        <table>
          <thead>
          <tr>
            <th>매장명</th>
            <th>트레이너명</th>
            <th>회원권</th>
            <th>PT</th>
            <th>결제 금액</th>
            <th>결제일</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="payment in filteredPayments" :key="payment.id">
            <td>{{ payment.storeName }}</td>
            <td>{{ payment.trainerName }}</td>
            <td>{{ payment.membership }}</td>
            <td>{{ payment.pt }}</td>
            <td>{{ payment.amount }}</td>
            <td>{{ payment.date }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="currentView === 'reviews'" class="reviews-view">
        <h1>내 헬스장 리뷰 관리</h1>
        <div class="tab-container">
          <button class="tab active" @click="filterReviews('all')">전체</button>
          <button class="tab" @click="filterReviews('gym')">매장</button>
          <button class="tab" @click="filterReviews('trainer')">트레이너</button>
        </div>
        <div id="reviewContainer">
          <ul class="review-list">
            <li class="review-item" v-for="review in filteredReviews" :key="review.id">
              <strong>{{ review.target }}</strong> - {{ review.date }}
              <p>{{ review.content }}</p>
              <div class="review-actions">
                <button class="btn btn-edit" @click="editReview(review)">수정</button>
                <button class="btn btn-delete" @click="deleteReview(review.id)">삭제</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <div v-if="showPasswordModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">비밀번호 변경</div>
          <button @click="showPasswordModal = false" class="close-button">×</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <div class="existing-password">기존 비밀번호</div>
            <div class="field">
              <input type="password" v-model="oldPassword" class="label" placeholder="기존 비밀번호 입력" />
            </div>
          </div>
          <div class="input-group">
            <div class="new-password">새 비밀번호</div>
            <div class="field">
              <input type="password" v-model="newPassword" class="label" placeholder="새 비밀번호 입력" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showPasswordModal = false" class="cancel-button">취소</button>
          <button @click="confirmPasswordChange" class="confirm-button">확인</button>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content delete-modal-content">
        <div class="modal-header">
          <div class="modal-title">정말로 탈퇴하시겠습니까?</div>
          <button @click="showDeleteModal = false" class="close-button">×</button>
        </div>
        <div class="modal-body">
          <div class="polygon"></div>
        </div>
        <div class="modal-footer">
          <button @click="showDeleteModal = false" class="cancel-button">취소</button>
          <button @click="confirmDeleteAccount" class="confirm-button">확인</button>
        </div>
      </div>
    </div>
    <div id="editModal" class="modal" v-if="showEditModal">
      <div class="modal-content">
        <span class="close" @click="showEditModal = false">&times;</span>
        <h2>리뷰 수정</h2>
        <textarea v-model="currentEditContent"></textarea>
        <button @click="saveEdit" class="btn btn-edit">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfilePage',
  data() {
    return {
      showPasswordModal: false,
      showDeleteModal: false,
      showEditModal: false,
      profileData: {
        trainerName: '',
        nickname: '',
        email: '',
        trainerInfo: '',
        trainerPhoneNumber: '',
        address: '',
        detailAddress: '',
        confirmPassword: '',
      },
      userId: 1,
      currentView: 'profile',
      oldPassword: '',
      newPassword: '',
      searchTerm: '',
      currentEditId: null,
      currentEditContent: '',
      payments: [],
      reviews: [
        { id: 1, type: 'gym', target: '파워짐', content: '시설이 깨끗하고 넓어서 좋아요.', date: '2023-05-01' },
        { id: 2, type: 'trainer', target: '김철수 트레이너', content: '친절하고 전문적인 지도를 해주십니다.', date: '2023-05-02' },
        { id: 3, type: 'gym', target: '헬스월드', content: '24시간 운영이라 편리해요.', date: '2023-05-03' },
        { id: 4, type: 'trainer', target: '박영희 트레이너', content: '맞춤형 운동 프로그램을 짜주셔서 효과적이에요.', date: '2023-05-04' },
        { id: 5, type: 'gym', target: '피트니스팩토리', content: '다양한 운동기구가 있어서 좋아요.', date: '2023-05-05' }
      ],
      filteredReviews: [],
    };
  },
  computed: {
    filteredPayments() {
      return this.payments.filter((payment) => {
        return Object.values(payment).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    },
  },
  created() {
    this.fetchTrainerProfile();
  },
  methods: {
    async fetchTrainerProfile() {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await fetch('${process.env.VUE_APP_API_URL}/api/profile/trainer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.profileData = await response.json();

      }catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    changeView(view) {
      this.currentView = view;
      if (view === 'payments') {
        this.fetchPayments();
      }
      if (view === 'reviews') {
        this.filterReviews('all');
      }
    },
    fetchPayments() {
      // 백엔드에서 결제 내역을 불러오는 API 예시
      // this.$axios.get('/api/payments')
      //   .then(response => {
      //     this.payments = response.data;
      //   })
      //   .catch(error => {
      //     console.error('Error fetching payments:', error);
      //   });
    },
    searchPayments() {
      // 필터링은 computed를 통해 이미 수행되고 있으므로 추가 로직 불필요
    },
    async editProfile() {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await fetch('${process.env.VUE_APP_API_URL}/api/profile/trainer', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          credentials: 'include'
          // TODO 사진 변경 추가
          body: JSON.stringify({
            trainerName: this.profileData.trainerName,
            nickname: this.profileData.nickname,
            trainerInfo: this.profileData.trainerInfo,
            email: this.profileData.email,
            trainerPhoneNumber: this.profileData.trainerPhoneNumber,
            password:this.profileData.confirmPassword
          }),
        });

        if (response.ok) {
          this.currentSection = 'complete';
        }
      } catch (error) {
        this.showModalMessage('프로필 수정 중 오류가 발생했습니다.');
      }
    },
    deleteAccount() {
      fetch('${process.env.VUE_APP_API_URL}/api/profile/users/signout', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.$store.getters.accessToken}`,
        },
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          alert('회원탈퇴가 완료되었습니다.');
          this.$store.dispatch('logout');
          this.$router.push({ name: 'main' });
        } else {
          response.json().then(data => {
            alert(`회원탈퇴 실패: ${data.message}`);
          });
        }
      })
      .catch(error => {
        alert(`회원탈퇴 실패: ${error.message}`);
      });
    },
    async confirmPasswordChange() {
      try {
        const token = localStorage.getItem('Authorization');
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/profile/users/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          credentials: 'include'
          body: JSON.stringify({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          }),
        });

        if (response.ok) {
          this.currentSection = 'complete';
        }
      } catch (error) {
        this.showModalMessage('비밀번호 변경 중 오류가 발생했습니다.');
      }
      this.showPasswordModal = false;
    },
    confirmDeleteAccount() {
      this.deleteAccount();
      this.showDeleteModal = false;
    },
    filterReviews(type) {
      this.filteredReviews = type === 'all' ? this.reviews : this.reviews.filter(review => review.type === type);
    },
    editReview(review) {
      this.currentEditId = review.id;
      this.currentEditContent = review.content;
      this.showEditModal = true;
    },
    saveEdit() {
      const reviewIndex = this.reviews.findIndex(r => r.id === this.currentEditId);
      this.reviews[reviewIndex].content = this.currentEditContent;
      this.showEditModal = false;
      this.filterReviews('all');
    },
    deleteReview(id) {
      if (confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
        const index = this.reviews.findIndex(r => r.id === id);
        this.reviews.splice(index, 1);
        this.filterReviews('all');
      }
    },
  },
  mounted() {
    this.filteredReviews = this.reviews;
  }
};
</script>

<style scoped>
.trainer-profile-page {
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
  background: #FFFFFF;
}

.sidebar {
  box-sizing: border-box;
  width: 205px;
  background: #FFFFFF;
  border-right: 1px solid #E0E0E0;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  margin-top: 78px;
}

.menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  box-sizing: border-box;
}

.menu-item:hover {
  background: #F7F7F7;
}

.menu-item .home-icon,
.menu-item .search-icon,
.menu-item .bell-icon {
  width: 24px;
  height: 24px;
  background: #000;
  border-radius: 50%;
}

.menu-item .menu-text {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.form {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
}

.profile-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.profile .avatar {
  width: 64px;
  height: 64px;
  background: #F7F7F7;
  border-radius: 1000px;
}

.profile .frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile .nickname {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.profile .batch {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.input-group .username,
.input-group .nickname,
.input-group .input-title,
.input-group .phone-number,
.input-list .address,
.input-group .confirm-password {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

.field {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 16px;
  width: 600px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
}

.field .label {
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  border: none;
  outline: none;
}

.confirm-password-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
}

.change-button {
  background: #000000;
  border: none;
  border-radius: 8px;
  color: #FFFFFF;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
}

.input-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

.edit-button,
.delete-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  height: 40px;
  background: #000000;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  cursor: pointer;
}

.delete-button {
  white-space: nowrap;
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
  position: relative;
  width: 802px;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.modal-title {
  font-family: 'NanumGothic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 31px;
  color: #F26921;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.modal-body .input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-body .field {
  width: 613px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.cancel-button,
.confirm-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  height: 40px;
  background: #000000;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  cursor: pointer;
}

.delete-modal-content .modal-title {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  line-height: 72px;
  color: #000000;
}

.delete-modal-content .modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.delete-modal-content .polygon {
  width: 55px;
  height: 51px;
  background: #D9D9D9;
  border-radius: 8px;
}

.delete-modal-content .cancel-button {
  background: #D2D2D2;
  color: #000000;
}

.delete-modal-content .confirm-button {
  background: #FF6363;
  color: #FFFFFF;
}

.payments-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
}

.payment-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  width: 100%;
}

.payment-detail {
  display: flex;
  justify-content: space-between;
}

.payment-detail .label {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #828282;
}

.payment-detail .value {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
}

.search-container {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.search-container input {
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-container button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.search-container button:hover {
  background-color: #333333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #F26921;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}

.reviews-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
}

.review-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.review-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
}

.review-actions {
  margin-top: 10px;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px;
}

.btn-edit {
  background-color: #f39c12;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.tab-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #ecf0f1;
  border: none;
  border-radius: 5px 5px 0 0;
  margin: 0 5px;
}

.tab.active {
  background-color: #3498db;
  color: white;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
</style>
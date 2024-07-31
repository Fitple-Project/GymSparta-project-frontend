<template>
  <div class="user-profile-page">
    <aside class="sidebar">
      <nav class="list">
        <div class="menu-item" @click="changeView('profile')">
          <div class="home-icon"></div>
          <div class="menu-text">Home</div>
        </div>
      </nav>
    </aside>
    <main class="form">
      <div v-if="currentView === 'profile'" class="profile-view">
        <div class="profile">
          <div class="avatar"></div>
          <div class="frame">
            <div class="nickname">닉네임</div>
            <div class="batch">Java_5기</div>
          </div>
        </div>
        <div class="input-group">
          <div class="username">Username</div>
          <div class="field">
            <div class="label">Label</div>
          </div>
        </div>
        <div class="input-group">
          <div class="nickname">Nickname</div>
          <div class="field">
            <div class="label">Label</div>
          </div>
        </div>
        <div class="input-group">
          <div class="input-title">Input title</div>
          <div class="field">
            <div class="label">Label</div>
          </div>
        </div>
        <div class="input-group">
          <div class="phone-number">Phone Number</div>
          <div class="field">
            <div class="label">Label</div>
          </div>
        </div>
        <div class="input-list">
          <div class="address">Address</div>
          <div class="field">
            <div class="label">Label</div>
          </div>
          <div class="field">
            <div class="label">Label</div>
          </div>
        </div>
        <div class="input-group">
          <div class="confirm-password">Confirm Password</div>
          <div class="field confirm-password-field">
            <div class="label">Label</div>
            <button @click="showPasswordModal = true" class="change-button">변경</button>
          </div>
        </div>
        <div class="buttons">
          <button @click="editProfile" class="edit-button">수정</button>
          <!-- 프로필 수정 API 연결 예시 -->
          <!-- this.$axios.post('/api/profile/edit', this.profileData) -->
          <button @click="showDeleteModal = true" class="delete-button">회원탈퇴</button>
          <!-- 회원탈퇴 API 연결 예시 -->
          <!-- this.$axios.post('/api/profile/delete', { userId: this.userId }) -->
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
          <!-- 비밀번호 변경 API 연결 예시 -->
          <!-- this.$axios.post('/api/password/change', { oldPassword: this.oldPassword, newPassword: this.newPassword }) -->
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
          <!-- 회원탈퇴 API 연결 예시 -->
          <!-- this.$axios.post('/api/profile/delete', { userId: this.userId }) -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OwnerProfilePage',
  data() {
    return {
      showPasswordModal: false,
      showDeleteModal: false,
      profileData: {},
      userId: 1, // 예시로 사용자 ID를 설정
      currentView: 'profile', // 초기 뷰 설정
      oldPassword: '',
      newPassword: ''
    };
  },
  methods: {
    changeView(view) {
      this.currentView = view;
    },
    editProfile() {
      // 프로필 수정 로직
      // this.$axios.post('/api/profile/edit', this.profileData)
      //   .then(response => {
      //     console.log('Profile updated successfully');
      //   })
      //   .catch(error => {
      //     console.error('Error updating profile:', error);
      //   });
    },
    deleteAccount() {
      // 회원탈퇴 로직
      // this.$axios.post('/api/profile/delete', { userId: this.userId })
      //   .then(response => {
      //     console.log('Account deleted successfully');
      //   })
      //   .catch(error => {
      //     console.error('Error deleting account:', error);
      //   });
    },
    confirmPasswordChange() {
      // 비밀번호 변경 로직
      // this.$axios.post('/api/password/change', { oldPassword: this.oldPassword, newPassword: this.newPassword })
      //   .then(response => {
      //     console.log('Password changed successfully');
      //   })
      //   .catch(error => {
      //     console.error('Error changing password:', error);
      //   });
      this.showPasswordModal = false;
    },
    confirmDeleteAccount() {
      // 회원탈퇴 로직
      // this.$axios.post('/api/profile/delete', { userId: this.userId })
      //   .then(response => {
      //     console.log('Account deleted successfully');
      //   })
      //   .catch(error => {
      //     console.error('Error deleting account:', error);
      //   });
      this.showDeleteModal = false;
    }
  }
};
</script>

<style scoped>
.user-profile-page {
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

.menu-item .home-icon {
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
}

.confirm-password-field {
  display: flex;
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
</style>
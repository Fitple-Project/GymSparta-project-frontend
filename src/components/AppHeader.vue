<template>
  <div class="header">
    <div class="container">
      <div class="logo" @click="goToMainPage">
        <div class="div">GymSparta</div>
      </div>
      <div v-if="showLocation" class="location-wrapper">
        <LocationOn class="location-on" @click="confirmLocationUpdate" />
        <div class="text-wrapper-2">{{ locationText }}</div>
      </div>
      <div class="auth-menu">
        <div v-if="isLoggedIn">
        </div>
        <div v-if="isLoggedIn">
          <!-- 알림 버튼 -->
          <img class="button-popper notif-button" src="../assets/Header/notif(b).svg" alt="Notification" @click="handleNotifications" />
        </div>
        <div v-if="!isLoggedIn" class="button" @click="goToLoginPage">
          <img class="login-signup-button" src="../assets/Header/login_signup_Button.svg" />
        </div>
        <div v-else class="button" @click="handleLogout">
          <img class="login-signup-button" src="../assets/Header/logout_button.svg" />
        </div>
        <img class="button-popper" alt="Button popper" src="../assets/button-popper-element-button.svg" @click="toggleTab" />
      </div>
    </div>
    <div
        v-if="showTab"
        class="tab-container"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
        :style="{ left: tabLeft + 'px', top: tabTop + 'px' }"
    >
      <div class="tab-item" @click="handleMyPage">마이페이지</div>
      <div class="tab-item" @click="handlePayment">결제내역</div>
      <div class="tab-item" @click="handleStoreManagement">매장 관리</div>
    </div>

    <!-- 알림 목록 탭 -->
    <div
        v-if="showNotificationTab"
        class="notification-tab-container"
        @mouseover="handleMouseOverNotifications"
        @mouseleave="handleMouseLeaveNotifications"
        :style="{ top: notificationTabTop + 'px', left: notificationTabLeft + 'px' }"
    >
      <div v-for="(notification, index) in notifications" :key="index" class="notification-item" @click="showNotification(notification)">
        {{ notification.title }}
      </div>
    </div>

    <!-- 모달 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ modalTitle }}</h2>
        <p>{{ modalContent }}</p>
        <button @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import LocationOn from './LocationOn.vue';
import router from '@/router';
import eventBus from '@/eventBus';
import { getCurrentLocation, getAddressFromCoordinates } from '@/utils/location';

export default {
  name: "AppHeader",
  components: {
    LocationOn,
  },
  data() {
    return {
      showTab: false,
      showNotificationTab: false,
      notifications: [],
      hideTabTimeout: null,
      hideNotifTimeout: null,
      tabLeft: 0,
      tabTop: 0,
      notificationTabTop: 0,
      notificationTabLeft: 0,
      locationText: '위치 불러오는 중...',
      isLoggedIn: false,
      tokenCheckInterval: null,
      showModal: false,
      modalTitle: '',
      modalContent: ''
    };
  },
  computed: {
    showLocation() {
      const excludedPages = ['login', 'signup', 'business-signup', 'store-management'];
      return !excludedPages.includes(this.$route.name);
    }
  },
  methods: {
    async fetchNotifications(){
      const token = localStorage.getItem('accessToken');
      try {
        // /user/notification API 호출
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/notification`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // 응답을 JSON 형태로 변환
        this.notifications = await response.json();

      } catch (error) {
      console.error('Error fetching notifications:', error);
      }
    },
    toggleTab() {
      this.showTab = !this.showTab;
      this.updateTabPosition();
    },
    handleNotifications() {
      this.showNotificationTab = !this.showNotificationTab;
      this.updateNotificationTabPosition();
    },
    handleMouseOverNotifications() {
      if (this.hideNotifTimeout) {
        clearTimeout(this.hideNotifTimeout);
        this.hideNotifTimeout = null;
      }
    },
    handleMouseLeaveNotifications() {
      this.hideNotifTimeout = setTimeout(() => {
        this.showNotificationTab = false;
      }, 1500);
    },
    async showNotification(notification) {
          this.modalTitle = notification.title;
          this.modalContent = notification.message;
          this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    updateNotificationTabPosition() {
      const notifButton = this.$el.querySelector('.notif-button');
      if (notifButton) {
        const rect = notifButton.getBoundingClientRect();
        this.notificationTabTop = rect.bottom + window.scrollY;
        this.notificationTabLeft = rect.left + window.scrollX;
      }
    },
    updateTabPosition() {
      const button = this.$el.querySelector('.button-popper');
      if (button) {
        const rect = button.getBoundingClientRect();
        this.tabLeft = rect.left + window.scrollX;  // X 좌표 보정
        this.tabTop = rect.bottom + window.scrollY;  // Y 좌표 보정
      }
    },
    async fetchUserProfile() {
      const token = localStorage.getItem('accessToken');
      const userRole = localStorage.getItem('userRole');
      if (token) {
        try {
          let response;
          if (userRole === 'OWNER') {
            // 점주의 경우
            response = await fetch(`${process.env.VUE_APP_API_URL}/api/profile/owner`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
          } else {
            // 일반 사용자의 경우
            response = await fetch(`${process.env.VUE_APP_API_URL}/api/profile/user`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
          }

          if (response.ok) {
            const data = await response.json();
            this.userProfile = data; // 유저 정보를 상태에 저장
            this.isLoggedIn = true;
          } else if (response.status === 401) {
            await this.refreshToken(); // 토큰 만료 시 재발급 시도
          } else {
            this.performLogout();
          }
        } catch (error) {
          console.error("User profile request failed:", error);
          this.performLogout();
        }
      } else {
        this.performLogout();
      }
    },
    async refreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await fetch(`${process.env.VUE_APP_API_URL}/api/refresh-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.data.accessToken);
            this.fetchUserProfile(); // 새 토큰으로 유저 정보를 다시 가져옴
          } else {
            this.performLogout(); // 리프레시 토큰이 유효하지 않으면 로그아웃
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          this.performLogout();
        }
      } else {
        this.performLogout(); // 리프레시 토큰이 없으면 로그아웃
      }
    },
    checkTokenValidity() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000;

        if (Date.now() >= expiry) {
          this.refreshToken(); // 토큰 만료 시 재발급 시도
        } else {
          this.isLoggedIn = true;
          this.fetchUserProfile(); // 유효한 토큰이 있을 때 유저 정보를 가져옴
        }
      } else {
        this.isLoggedIn = false;
        this.performLogout(); // 토큰이 없으면 로그아웃 처리
      }
    },
    performLogout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      this.isLoggedIn = false;
      clearInterval(this.tokenCheckInterval);
      eventBus.emit('logout');
      if (this.$route.name !== 'main') {
        this.$router.push({ name: 'main' });
      }
    },
    startTokenCheckInterval() {
      clearInterval(this.tokenCheckInterval);
      this.tokenCheckInterval = setInterval(this.checkTokenValidity.bind(this), 10000);
    },
    handleMyPage() {
      if (!this.isLoggedIn) {
        if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
          this.goToLoginPage();
        }
      } else {
        this.goToPage('mypage');
      }
    },
    handlePayment() {
      if (!this.isLoggedIn) {
        if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
          this.goToLoginPage();
        }
      } else {
        this.goToPage('payments');
      }
    },
    handleStoreManagement() {
      if (!this.isLoggedIn) {
        if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
          this.goToLoginPage();
        }
      } else {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'OWNER') {
          this.goToPage('store-management');
        } else {
          alert('매장 관리 페이지는 점주만 접근 가능합니다.');
        }
      }
    },
    goToPage(page) {
      const userId = this.getUserId();
      const userRole = localStorage.getItem('userRole');

      if (!userId || !userRole) {
        console.error('User ID 또는 User Role이 누락되었습니다.');
        return;
      }

      if (page === 'mypage') {
        if (userRole === 'OWNER') {
          this.$router.push({name: 'owner-profile', params: {ownerId: userId}});
        } else {
          this.$router.push({name: 'user-profile', params: {userId}});
        }
      } else if (page === 'payments') {
        this.$router.push({name: 'payments'});
      } else if (page === 'store-management') {
        if (userRole === 'OWNER') {
          this.$router.push({name: 'store-management'});
        } else {
          alert('매장 관리 페이지는 점주만 접근 가능합니다.');
        }
      }
      this.showTab = false;
    },
    goToLoginPage() {
      router.push({name: 'login'});
    },
    goToMainPage() {
      router.push({name: 'main'});
    },
    goToCartPage() {
      router.push({name: 'cart'});
    },
    handleMouseOver() {
      if (this.hideTabTimeout) {
        clearTimeout(this.hideTabTimeout);
        this.hideTabTimeout = null;
      }
    },
    handleMouseLeave() {
      this.hideTabTimeout = setTimeout(() => {
        this.showTab = false;
      }, 1500);
    },
    async fetchLocation() {
      try {
        const {latitude, longitude} = await getCurrentLocation();
        const address = await getAddressFromCoordinates(latitude, longitude);
        this.locationText = address;
      } catch (error) {
        this.locationText = '위치 불러오기 실패';
      }
    },
    confirmLocationUpdate() {
      if (confirm('위치를 다시 조회하시겠습니까?')) {
        this.fetchLocation();
      }
    },
    async handleLogout() {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("이미 로그아웃 상태입니다.");
        return;
      }

      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          alert("로그아웃 성공");
        } else {
          const errorData = await response.json();
          console.error(`로그아웃 실패: ${errorData.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        console.error(`로그아웃 오류: ${error.message}`);
      } finally {
        this.performLogout();
      }
    },
    getUserId() {
      return localStorage.getItem('userId');
    }
  },
  created() {
    this.checkTokenValidity();
    this.startTokenCheckInterval();

    eventBus.on('login', () => {
      this.isLoggedIn = true;
    });

    eventBus.on('logout', () => {
      this.isLoggedIn = false;
    });
  },
  mounted() {
    this.updateTabPosition();
    window.addEventListener('resize', this.updateTabPosition);
    this.fetchLocation();
    this.fetchNotifications();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateTabPosition);
    clearInterval(this.tokenCheckInterval);
  }
};
</script>

<style scoped>
@font-face {
  font-family: "NanumGothic";
  src: url("@/assets/fonts/NanumGothic.ttf") format("truetype");
}

.header {
  background-color: #ffffff;
  border-bottom: 2.5px solid #F26921;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.div {
  color: #f26921;
  font-family: "NanumGothic", sans-serif;
  font-size: 20px;
  font-weight: 800;
  white-space: nowrap;
}

.location-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}

.location {
  display: flex;
  align-items: center;
  margin-left: -8px;
}

.text-wrapper-2 {
  color: #000000;
  font-family: "NanumGothic", sans-serif;
  font-size: 16px;
  font-weight: 800;
  white-space: nowrap;
  margin-left: 4px;
}

.location-on {
  height: 30px;
  width: 30px;
  margin-right: -10px;
  margin-top: 5px;
  cursor: pointer;
}

.auth-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 1000;
}

.button {
  background-color: #ffffff;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  cursor: pointer;
}

.button-popper {
  height: 40px;
  width: 40px;
  cursor: pointer;
  z-index: 1;
  position: relative;
}

.login-signup-button {
  height: 40px;
  width: 120px;
}

.tab-container {
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  width: max-content; /* 탭 메뉴의 크기 조절 */
  margin-left: 187px;
}

.tab-item {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
}

.tab-item:last-child {
  border-bottom: none;
}

.tab-item:hover {
  background-color: #f5f5f5;
}

.notif-button {
  height: 40px;
  width: 40px;
  cursor: pointer;
  z-index: 1;
  position: relative;
}

.cart-button {
  height: 40px;
  width: 40px;
  margin-right: -9px;
  cursor: pointer;
  z-index: 1001;
}

.notification-tab-container {
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
}

.notification-item {
  padding: 10px 20px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  cursor: pointer;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: #f5f5f5;
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
  z-index: 2000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
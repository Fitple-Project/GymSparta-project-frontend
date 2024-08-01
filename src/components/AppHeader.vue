<template>
  <div class="header">
    <div class="container">
      <div class="logo" @click="goToMainPage">
        <div class="div">Fitple</div>
      </div>
      <div v-if="showLocation" class="location-wrapper">
        <LocationOn class="location-on" @click="confirmLocationUpdate"/>
        <div class="text-wrapper-2">{{ locationText }}</div>
      </div>
      <div class="auth-menu">
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
        :style="{ left: tabLeft + 'px' }"
    >
      <div class="tab-item" @click="goToPage('mypage')">마이페이지</div>
      <div class="tab-item" @click="goToPage('payment')">결제내역</div>
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
      hideTabTimeout: null,
      tabLeft: 0,
      locationText: '위치 불러오는 중...',
      isLoggedIn: false,
    };
  },
  computed: {
    showLocation() {
      return this.$route.name === 'main';
    }
  },
  methods: {
    toggleTab() {
      this.showTab = !this.showTab;
      this.updateTabPosition();
    },
    goToPage(page) {
      if (page === 'mypage') {
        alert('마이페이지로 이동합니다.');
      } else if (page === 'payment') {
        alert('결제내역 페이지로 이동합니다.');
      }
      this.showTab = false;
    },
    goToLoginPage() {
      router.push({ name: 'login' });
    },
    goToMainPage() {
      router.push({ name: 'main' });
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
    updateTabPosition() {
      const button = this.$el.querySelector('.button-popper');
      if (button) {
        this.tabLeft = button.getBoundingClientRect().left;
      }
    },
    async fetchLocation() {
      try {
        const { latitude, longitude } = await getCurrentLocation();
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
        alert("로그인 먼저 해주세요.");
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          localStorage.removeItem('accessToken');
          this.isLoggedIn = false;
          eventBus.emit('logout');
          router.push({ name: 'main' });
          alert("로그아웃 성공");
        } else {
          const errorData = await response.json();
          alert(`로그아웃 실패: ${errorData.message || '알 수 없는 오류'}`);
        }
      } catch (error) {
        alert(`로그아웃 오류: ${error.message}`);
      }
    }
  },
  created() {
    const token = localStorage.getItem('accessToken');
    this.isLoggedIn = !!token;

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
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateTabPosition);
  },
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
  top: 50px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
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

@media (max-width: 768px) {
  .tab-container {
    width: auto;
    right: 0;
  }
}
</style>
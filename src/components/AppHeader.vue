<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="logo" @click="goToMainPage">
          <div class="div">Fitple</div>
        </div>
        <div class="location-wrapper">
          <LocationOn class="location-on" />
          <div class="text-wrapper-2">강남구 논현동</div>
        </div>
        <div class="auth-menu">
          <div class="button" @click="goToLoginPage">
            <img class="login-signup-button" src="../assets/login_signup_Button.svg" />
          </div>
          <img class="button-popper" alt="Button popper" src="../assets/button-popper-element-button.svg" @click="toggleTab" />
        </div>
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
import router from '@/router'; // router를 임포트합니다.

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
    };
  },
  methods: {
    toggleTab() {
      this.showTab = !this.showTab;
      this.updateTabPosition();
    },
    goToPage(page) {
      if (page === 'mypage') {
        // 마이페이지로 이동하는 로직 추가
        alert('마이페이지로 이동합니다.');
      } else if (page === 'payment') {
        // 결제내역 페이지로 이동하는 로직 추가
        alert('결제내역 페이지로 이동합니다.');
      }
      this.showTab = false; // 탭을 숨깁니다.
    },
    goToLoginPage() {
      // 로그인 페이지로 이동하는 로직 추가
      router.push({ name: 'login' });
    },
    goToMainPage() {
      // 메인 페이지로 이동하는 로직 추가
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
      }, 1500); // 마우스를 뗀 후 1.5초 후에 탭을 숨깁니다.
    },
    updateTabPosition() {
      const button = this.$el.querySelector('.button-popper');
      if (button) {
        this.tabLeft = button.getBoundingClientRect().left;
      }
    },
  },
  mounted() {
    this.updateTabPosition();
    window.addEventListener('resize', this.updateTabPosition);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateTabPosition);
  },
};
</script>

<style scoped>
.header {
  background-color: #ffffff;
  border-bottom: 2.5px solid #F26921;
  width: 100%;
  position: fixed; /* 고정 위치 */
  top: 0;
  left: 0;
  z-index: 1000; /* 상위 컴포넌트가 위에 있도록 설정 */
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* 컨테이너 너비를 줄입니다 */
  margin: 0 auto;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative; /* 부모 컨테이너를 상대 위치로 설정 */
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer; /* 클릭 가능하도록 커서를 포인터로 설정 */
}

.div {
  color: #f26921;
  font-family: "NanumGothic-ExtraBold", Helvetica;
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
  margin-left: -8px; /* LocationOn 컴포넌트를 왼쪽으로 옮깁니다 */
}

.text-wrapper-2 {
  color: #000000;
  font-family: "NanumGothic-ExtraBold", Helvetica;
  font-size: 16px; /* 글씨 크기를 증가합니다 */
  font-weight: 800;
  white-space: nowrap;
  margin-left: 4px; /* 글씨와 LocationOn 컴포넌트 간의 간격을 조정합니다 */
}

.location-on {
  height: 26px;
  width: 26px;
  margin-right: -10px; /* LocationOn 컴포넌트를 오른쪽으로 옮깁니다 */
  margin-top: 3px; /* 이미지의 위치를 조정합니다 */
}

.auth-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 오른쪽 정렬 */
  position: relative; /* 상대 위치 설정 */
}

.button {
  background-color: #ffffff;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  cursor: pointer; /* 클릭 이벤트를 작동하게 하기 위해 커서를 포인터로 설정합니다. */
}

.button-popper {
  height: 40px;
  width: 40px;
  cursor: pointer;
  z-index: 1; /* 버튼이 다른 요소 위에 나타날 수 있도록 설정 */
  position: relative; /* 버튼 위치를 상대적으로 설정 */
}

.login-signup-button {
  height: 40px;
  width: 120px;
}

.tab-container {
  position: absolute;
  top: 50px; /* 버튼 바로 밑으로 위치를 조정합니다 */
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 상위 컴포넌트가 위에 있도록 설정 */
  overflow: hidden; /* 탭 목록이 화면을 벗어나지 않도록 숨김 */
}

.tab-item {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  white-space: nowrap; /* 텍스트가 잘리지 않도록 설정 */
}

.tab-item:last-child {
  border-bottom: none; /* 마지막 아이템의 경계선을 제거 */
}

.tab-item:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .tab-container {
    width: auto; /* 탭 컨테이너가 화면에 맞게 자동 조정되도록 설정 */
    right: 0; /* 오른쪽에 고정 */
  }
}
</style>
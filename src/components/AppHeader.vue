<!-- src/components/AppHeader.vue -->
<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="logo">
          <div class="div">Fitple</div>
        </div>
        <div class="location">
          <LocationOn class="location-on" />
          <div class="text-wrapper-2">강남구 논현동</div>
        </div>
        <div class="auth-menu">
          <div class="button" @click="handleClick">
            <img class="login-signup-button" src="../assets/login_signup_Button.svg" />
          </div>
          <img class="button-popper" alt="Button popper" src="../assets/button-popper-element-button.svg" @click="showListTab" />
          <div class="list-tab" v-if="isListTabShown">
            <div class="profile-tab">프로필</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocationOn from './LocationOn.vue';

export default {
  name: "AppHeader",
  components: {
    LocationOn,
  },
  data() {
    return {
      isListTabShown: false
    }
  },
  methods: {
    showListTab() {
      this.isListTabShown =!this.isListTabShown;
    },
    handleClick() {
      console.log('클릭 이벤트 발생!');
    }
  }
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
  max-width: 800px; /* 컨테이너 너비를 줄입니다 */
  margin: 0 auto;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  flex: 1; /* 남은 공간을 차지하도록 설정 */
}

.div {
  color: #f26921;
  font-family: "NanumGothic-ExtraBold", Helvetica;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
}

.location {
  display: flex;
  align-items: center;
  flex: 2; /* 더 많은 공간을 차지하도록 설정 */
  justify-content: center; /* 가운데 정렬 */
  margin-left: -8px; /* LocationOn 컴포넌트를 왼쪽으로 옮깁니다 */
}

.text-wrapper-2 {
  color: #000000;
  font-family: "NanumGothic-ExtraBold", Helvetica;
  font-size: 16px; /* 글씨 크기를 증가합니다 */
  font-weight: 800;
  text-align: center;
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
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  justify-content: flex-end; /* 오른쪽 정렬 */
}

.button {
  background-color: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  margin-right: 8px;
  cursor: pointer; /* 클릭 이벤트를 작동하게 하기 위해 커서를 포인터로 설정합니다. */
}

.button-popper {
  height: 40px;
  width: 40px;
}

.list-tab {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  padding: 10px;
}

.profile-tab {
  padding: 10px;
  cursor: pointer;
}

.login-signup-button {
  height: 40px;
  width: 120px;
}

</style>
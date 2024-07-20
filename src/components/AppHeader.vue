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
          <button class="button">
            <div class="text-wrapper">로그인/회원가입</div>
          </button>
          <img class="button-popper" alt="Button popper" src="button-popper-element-button.svg" />
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
};
</script>

<style scoped>
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
}

.text-wrapper-2 {
  color: #000000;
  font-family: "NanumGothic-ExtraBold", Helvetica;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
  margin-left: 8px;
}

.location-on {
  height: 24px;
  width: 24px;
}

.auth-menu {
  display: flex;
  align-items: center;
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  justify-content: flex-end; /* 오른쪽 정렬 */
}

.button {
  all: unset;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  margin-right: 8px;
}

.text-wrapper {
  color: #333333;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 10px;
  font-weight: 600;
}

.button-popper {
  height: 40px;
  width: 40px;
}
</style>
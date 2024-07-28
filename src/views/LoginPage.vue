<template>
  <div class="login-page">
    <div class="login-section">
      <h1>로그인</h1>
      <div class="input-field">
        <label for="user-id">User ID</label>
        <input type="text" id="user-id" placeholder="User ID" />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Password" />
      </div>
      <div class="additional-options">
        <div class="checkbox-wrapper">
          <input type="checkbox" id="remember-me" />
          <label for="remember-me">자동 로그인</label>
        </div>
      </div>
      <button class="login-button">로그인</button>
      <div class="links">
        <a href="#">아이디/비밀번호 찾기</a>
        <a href="#">회원 가입</a>
      </div>
    </div>
    <div class="spacer">
      <span>소셜 로그인/회원가입</span>
    </div>
    <div class="social-login-buttons">
      <img src="@/assets/Login_Button/Kakao_Button.svg" alt="카카오 로그인" class="social-button" />
      <img src="@/assets/Login_Button/Naver_Button.svg" alt="네이버 로그인" class="social-button" />
      <img src="@/assets/Login_Button/Google_Button.svg" alt="구글 로그인" class="social-button" />
    </div>
    <div class="business-login">
      <a href="#" class="business-login-link">비즈니스 로그인/회원가입</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-section {
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  margin-bottom: 20px; /* 로그인 섹션과 소셜 로그인 섹션 사이의 간격 */
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.input-field {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #b0b0b0;
  border-radius: 5px;
}

.additional-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* 위로 조금 이동 */
  margin-top: -10px; /* 위로 조금 이동 */
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  font-family: 'NanumGothic';
  font-weight: 700;
  font-size: 13px; /* 폰트 크기 조정 */
  line-height: 13px;
  color: #FF8500;
  text-decoration: none;
}

.checkbox-wrapper input {
  margin-right: 5px; /* 위치 조정 */
}

.checkbox-wrapper label {
  white-space: nowrap; /* 텍스트 한 줄로 유지 */
}

.login-button {
  background: #ff8500;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px; /* 로그인 버튼과 아래 링크 사이의 간격 */
  margin-top: 20px; /* 로그인 버튼과 아래 링크 사이의 간격 */
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.links a {
  font-size: 12px;
  color: #000000;
  text-decoration: none;
}

.spacer {
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
  color: #FF8500;
}

.social-login-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 소셜 로그인 버튼 사이의 간격 */
}

.social-button {
  width: 300px; /* 로그인 박스와 동일한 너비 */
  cursor: pointer;
}

.business-login {
  margin-top: 20px;
}

.business-login-link {
  font-size: 14px;
  color: #0000EE;
  text-decoration: none;
}
</style>
<template>
  <div class="login-page">
    <div class="login-section">
      <h1>로그인</h1>
      <div class="input-field">
        <label for="user-id">User ID</label>
        <input type="text" id="user-id" v-model="userId" placeholder="User ID" />
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Password" />
      </div>
      <div class="additional-options">
        <div class="checkbox-wrapper">
          <input type="checkbox" id="remember-me" v-model="rememberMe" />
          <label for="remember-me">자동 로그인</label>
        </div>
      </div>
      <button class="login-button" @click="handleLogin">로그인</button>
      <div class="links">
        <a href="#">아이디/비밀번호 찾기</a>
        <router-link to="/signup" class="signup-link">회원가입</router-link>
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
      <button @click="goToBusinessSignupPage" class="business-login-link">비즈니스 회원가입</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      userId: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    handleLogin() {
      if (this.userId && this.password) {
        alert(`로그인 시도: ID - ${this.userId}, 비밀번호 - ${this.password}, 자동 로그인 - ${this.rememberMe}`);
      } else {
        alert("아이디와 비밀번호를 입력해주세요.");
      }
    },
    goToBusinessSignupPage() {
      this.$router.push({ name: 'business-signup' });
    }
  },
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
  margin-bottom: 20px;
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
  margin-bottom: 10px;
  margin-top: -10px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  font-family: 'NanumGothic';
  font-weight: 700;
  font-size: 13px;
  line-height: 13px;
  color: #FF8500;
}

.checkbox-wrapper input {
  margin-right: 5px;
}

.checkbox-wrapper label {
  white-space: nowrap;
}

.login-button {
  background: #ff8500;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.links a,
.signup-link {
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
  gap: 15px;
}

.social-button {
  width: 300px;
  cursor: pointer;
}

.business-login {
  margin-top: 20px;
}

.business-login-link {
  background: none;
  border: none;
  font-size: 14px;
  color: #0000EE;
  cursor: pointer;
  text-decoration: none;
}
</style>
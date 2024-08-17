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
      <!-- 카카오 로그인 버튼 -->
      <img src="@/assets/Login_Button/Kakao_Button.svg" alt="카카오 로그인" class="social-button" />
      <!-- 네이버 로그인 버튼 -->
      <img src="@/assets/Login_Button/Naver_Button.svg" alt="네이버 로그인" class="social-button" />
      <!-- 구글 로그인 버튼, 클릭 시 handleGoogleLogin 메서드 호출 -->
      <img src="@/assets/Login_Button/Google_Button.svg" alt="구글 로그인" class="social-button" />
    </div>
    <div class="business-login">
      <button @click="goToBusinessSignupPage" class="business-login-link">비즈니스 회원가입</button>
    </div>
  </div>
</template>

<script>
import eventBus from '@/eventBus';

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
    async handleLogin() {
      if (this.userId && this.password) {
        try {
          const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accountId: this.userId,
              password: this.password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            alert("로그인 성공");

            // JWT 토큰 저장
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken); // 추가
            localStorage.setItem('userId', data.data.userId);
            localStorage.setItem('userRole', data.data.role);

            this.$router.push({ name: 'main' });

            eventBus.emit('login');
            const redirectPath = this.$route.query.redirect || '/';
            this.$router.push(redirectPath);
          } else {
            const errorData = await response.json();
            alert("로그인 실패: " + (errorData.message || '알 수 없는 오류'));
          }
        } catch (error) {
          console.error("Login request failed:", error);
          alert("로그인 오류: " + error.message);
        }
      } else {
        alert("아이디와 비밀번호를 입력해주세요.");
      }
    },
    goToBusinessSignupPage() {
      this.$router.push({ name: 'business-signup' });
    }
  },
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const response = await fetch('http://localhost:8080/api/refresh-token', {
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
  async checkTokenValidity() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;

      if (Date.now() >= expiry) {
        await this.refreshToken(); // 토큰이 만료된 경우 재발급 시도
      } else {
        this.isLoggedIn = true;
      }
    } else {
      this.isLoggedIn = false;
    }
  },
  beforeRouteEnter(to, from, next) {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (isLoggedIn) {
      next({ name: 'main' });
    } else {
      next();
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
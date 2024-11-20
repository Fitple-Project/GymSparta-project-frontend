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
      <img src="@/assets/Login_Button/Kakao_Button.svg" alt="카카오 로그인" class="social-button" @click="handleKakaoLogin"/>
      <img src="@/assets/Login_Button/Naver_Button.svg" alt="네이버 로그인" class="social-button" @click="handleNaverLogin"/>
      <img src="@/assets/Login_Button/Google_Button.svg" alt="구글 로그인" class="social-button" @click="handleGoogleLogin" />
    </div>
    <div class="business-login">
      <button @click="goToBusinessSignupPage" class="business-login-link">비즈니스 회원가입</button>
    </div>
  </div>
</template>

<script>
import { Client } from '@stomp/stompjs';
import eventBus from '@/eventBus';
import SockJS from 'sockjs-client';


export default {
  name: "LoginPage",
  data() {
    return {
      userId: "",
      password: "",
      rememberMe: false,
      subscriberId: "",  // 로그인한 사용자의 ID를 구독에 사용
      stompClient: null,  // stompClient 인스턴스를 저장할 변수
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
            localStorage.setItem('accessToken', data.data.accessToken);
            eventBus.emit('login');
            this.subscriberId = this.userId; // 로그인한 사용자 ID를 구독에 사용
            this.$router.push({ path: '/' });
            this.connectWebSocket(); // 로그인 후 WebSocket 연결
            this.subscribeToUser(); // 로그인 후 자동으로 구독 요청
          } else {
            const errorData = await response.json();
            alert("로그인 실패: " + (errorData.message || '알 수 없는 오류'));
          }
        } catch (error) {
          alert("로그인 오류: " + error.message);
        }
      } else {
        alert("아이디와 비밀번호를 입력해주세요.");
      }
    },

    // WebSocket 연결 및 구독 기능
    connectWebSocket() {
      const socket = new SockJS("/ws");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        console.log("WebSocket 연결 성공: " + frame);
      });
    },

    subscribeToUser() {
      if (this.subscriberId && this.stompClient) {
        const destination = `/user/${this.subscriberId}/queue/messages`;

        // 구독을 추가
        this.stompClient.subscribe(destination, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("Received message: ", receivedMessage);
          alert(`Received message from ${this.subscriberId}: ${receivedMessage.text}`);
        });

        console.log(`Subscribed to: ${destination}`);
      } else {
        alert("수신자 ID를 입력하고 로그인 후 다시 시도해주세요.");
      }
    },

    handleGoogleLogin() {
      const clientId = '638690197100-smpr5ac8dh75pnnevkspenic03ufgiau.apps.googleusercontent.com';
      const redirectUri = 'http://localhost:8080/api/user/social/google/callback';
      const scope = 'email profile';
      const responseType = 'code';
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

      window.location.href = authUrl;
    },
    handleNaverLogin() {
      window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=lCrwGp5COA3B9pAbLbba&redirect_uri=http://localhost:8080/api/user/social/naver/callback&state=1234';
    },
    handleKakaoLogin() {
      window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=008f89eefe38bdd7187a1020453c8498&redirect_uri=http://localhost:8080/api/user/social/kakao/callback&response_type=code';
    },
    goToBusinessSignupPage() {
      this.$router.push({ name: 'business-signup' });
    }
  },

  beforeRouteEnter (to, from, next) {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (isLoggedIn) {
      next({ name: 'main' });
    } else {
      next();
    }
  }
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

.subscription-section {
  margin-top: 20px;
  text-align: center;
}

.subscribe-button {
  background: #FF8500;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<template>
  <div class="signup-page">
    <div v-if="currentSection === 'terms'" class="title-container">
      <div class="title">약관 동의</div>
      <div class="subtitle">회원가입</div>
      <div class="subtitle-complete">가입 완료</div>
    </div>
    <div v-if="currentSection === 'signup'" class="title-container">
      <div class="subtitle-terms">약관 동의</div>
      <div class="title">회원가입</div>
      <div class="subtitle-complete">가입 완료</div>
    </div>
    <div v-if="currentSection === 'complete'" class="title-container complete-title-container">
      <div class="subtitle-terms">약관 동의</div>
      <div class="subtitle">회원가입</div>
      <div class="title">가입 완료</div>
    </div>

    <div v-if="currentSection === 'terms'" class="form terms-form">
      <div class="fieldset">
        <div class="horizontal-border"></div>
        <div class="label-wrapper">
          <input type="checkbox" id="agree-all" class="checkbox" v-model="agreeAll" @change="toggleAll" />
          <label for="agree-all" class="label">회원가입 약관에 모두 동의합니다</label>
        </div>
      </div>
      <div class="section terms-section">
        <div class="label-wrapper">
          <input type="checkbox" id="agree-terms" class="checkbox" v-model="agreeTerms" />
          <label for="agree-terms" class="label">이용 약관 동의 <span class="required">(필수)</span></label>
        </div>
        <textarea class="textarea no-input" readonly></textarea>
      </div>
      <div class="section terms-section">
        <div class="label-wrapper">
          <input type="checkbox" id="agree-privacy" class="checkbox" v-model="agreePrivacy" />
          <label for="agree-privacy" class="label">개인정보 수집 및 이용 동의 <span class="required">(필수)</span></label>
        </div>
        <textarea class="textarea no-input" readonly></textarea>
      </div>
      <div class="buttons">
        <div class="extended-fab gray" @click="goToLoginPage">
          <div class="state-layer">
            <div class="label-text">뒤로</div>
          </div>
        </div>
        <div class="extended-fab orange" @click="handleNext">
          <div class="state-layer">
            <div class="label-text">다음</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentSection === 'signup'" class="form signup-form">
      <div class="fieldset">
        <div v-if="currentSection === 'terms'" class="horizontal-border"></div>
        <div class="input-group">
          <label for="user-id">아이디 <span class="required">*</span></label>
          <div class="id-input-wrapper">
            <input type="text" id="user-id" placeholder="아이디 입력 (6~20자)" maxlength="20" v-model="userId" />
            <button class="black-button">아이디 확인</button>
          </div>
        </div>
      </div>
      <div class="section signup-section">
        <div class="input-group">
          <label for="password">비밀번호 <span class="required">*</span></label>
          <input type="password" id="password" v-model="password" placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" @input="checkPasswords" />
        </div>
        <div class="input-group">
          <label for="password-confirm">비밀번호 확인 <span class="required">*</span></label>
          <input type="password" id="password-confirm" v-model="passwordConfirm" placeholder="비밀번호 재입력" @input="checkPasswords" />
        </div>
        <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
      </div>
      <div class="section signup-section">
        <div class="input-group">
          <label for="name">이름 <span class="required">*</span></label>
          <input type="text" id="name" v-model="name" placeholder="이름을 입력해주세요." />
        </div>
      </div>
      <div class="section signup-section">
        <div class="input-group">
          <label for="email">이메일 <span class="required">*</span></label>
          <input type="email" id="email" v-model="email" placeholder="이메일을 입력해주세요." />
        </div>
      </div>
      <div class="section signup-section">
        <div class="input-group">
          <label for="phone">전화번호</label>
          <div class="phone-input-wrapper">
            <input type="tel" id="phone" v-model="phone" placeholder="‘-’ 제외 11자리 입력" maxlength="13" />
            <button class="black-button">인증번호 발송</button>
          </div>
        </div>
      </div>
      <div class="section signup-section">
        <div class="input-group">
          <label for="phone-verification">인증번호 확인</label>
          <div class="phone-input-wrapper">
            <input type="text" id="phone-verification" placeholder="인증번호 입력" />
            <button class="black-button">인증번호 확인</button>
          </div>
        </div>
      </div>
      <div v-if="formError" class="error-message">{{ formError }}</div>
      <div class="buttons">
        <div class="extended-fab gray" @click="goToTerms">
          <div class="state-layer">
            <div class="label-text">뒤로</div>
          </div>
        </div>
        <div class="extended-fab orange" @click="goToComplete" :disabled="formError">
          <div class="state-layer">
            <div class="label-text">가입 완료</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentSection === 'complete'" class="complete-section">
      <p>{{ name }}님의 회원가입이 완료되었습니다.<br />지금 바로 운동 시설을 이용해보세요!</p>
      <div class="buttons">
        <div class="extended-fab home-button" @click="goToHomePage">
          <div class="state-layer">
            <div class="label-text">홈으로</div>
          </div>
        </div>
        <div class="extended-fab orange" @click="goToLoginPage">
          <div class="state-layer">
            <div class="label-text">로그인</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 메시지 모달 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ modalMessage }}</p>
        <button @click="closeModal">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      currentSection: 'terms',
      agreeAll: false,
      agreeTerms: false,
      agreePrivacy: false,
      showModal: false,
      modalMessage: '',
      userId: '',
      password: '',
      passwordConfirm: '',
      passwordError: '',
      name: '',
      email: '',
      phone: '',
      formError: '',
    };
  },
  methods: {
    toggleAll() {
      const newValue = this.agreeAll;
      this.agreeTerms = newValue;
      this.agreePrivacy = newValue;
    },
    handleNext() {
      if (!this.agreeTerms && !this.agreePrivacy) {
        this.showModalMessage('회원가입 약관에 모두 동의 해주세요.');
      } else if (!this.agreeTerms) {
        this.showModalMessage('이용 약관 동의 해주세요.');
      } else if (!this.agreePrivacy) {
        this.showModalMessage('개인정보 수집 및 이용 동의 해주세요.');
      } else {
        this.currentSection = 'signup';
      }
    },
    goToTerms() {
      this.currentSection = 'terms';
    },
    goToComplete() {
      if (this.password !== this.passwordConfirm) {
        this.passwordError = '비밀번호가 일치하지 않습니다.';
        return;
      }
      if (!this.userId || !this.password || !this.passwordConfirm || !this.name || !this.email) {
        this.formError = '모든 필수 항목을 입력해주세요.';
        return;
      }
      this.formError = '';
      this.name = document.getElementById('name').value; // 이름을 저장
      this.currentSection = 'complete';
    },
    goToHomePage() {
      this.$router.push({ name: 'main' }); // 'home' 대신 'main'으로 변경
    },
    showModalMessage(message) {
      this.modalMessage = message;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    goToLoginPage() {
      this.$router.push({ name: 'login' });
    },
    checkPasswords() {
      if (this.password !== this.passwordConfirm) {
        this.passwordError = '비밀번호가 일치하지 않습니다.';
      } else {
        this.passwordError = '';
      }
    },
  },
  watch: {
    agreeTerms(val) {
      if (!val) {
        this.agreeAll = false;
      } else if (this.agreePrivacy) {
        this.agreeAll = true;
      }
    },
    agreePrivacy(val) {
      if (!val) {
        this.agreeAll = false;
      } else if (this.agreeTerms) {
        this.agreeAll = true;
      }
    },
  },
};
</script>

<style scoped>
.signup-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  height: 100vh;
  background-color: #f7f7f7;
  overflow: hidden; /* 스크롤 비활성화 */
}

.title-container {
  box-sizing: border-box;
  width: 470px;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #3D435F;
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 100px;
}

.complete-title-container {
  position: static; /* 고정된 위치를 초기화 */
}

.title,
.title-signup,
.title-complete {
  font-family: 'NanumGothic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  color: #525252;
  margin-top: 5px;
}

.subtitle,
.subtitle-terms,
.subtitle-complete {
  font-family: 'NanumGothic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #525252;
  margin-top: 15px;
}

.title-terms.active,
.title-complete.active,
.subtitle.active,
.subtitle-terms.active,
.subtitle-complete.active {
  font-weight: 700;
}

.form {
  position: relative;
  width: 470px;
  background: #ffffff;
  border: 1px solid #dddddd;
  padding: 20px;
  border-radius: 10px;
  margin-top: 40px;
}

.terms-form {
  height: auto;
}

.signup-form {
  height: auto;
}

.fieldset {
  position: relative;
  height: 58.23px;
  margin-bottom: 20px;
}

.horizontal-border {
  position: absolute;
  height: 58.23px;
  left: 0;
  right: 0;
  top: 0;
  border-bottom: 1px solid #d8d9df;
}

.label-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 55px;
}

.label {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  line-height: 55px;
  letter-spacing: -0.28px;
  color: #2d2f43;
}

.required {
  color: #e5433e;
}

.checkbox {
  position: absolute;
  right: 0;
  width: 18px;
  height: 18px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 9px;
}

.section {
  position: relative;
  margin-bottom: 20px;
}

.terms-section {
  height: 200px;
  margin-bottom: 55px;
}

.textarea {
  box-sizing: border-box;
  position: absolute;
  height: 150px;
  left: 0;
  right: 0;
  top: 56.77px;
  background: #ffffff;
  border: 1px solid #d8d9df;
  border-radius: 5px;
  padding: 10px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #2d2f43;
  pointer-events: none; /* 입력 비활성화 */
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%; /* 너비를 100%로 설정 */
}

.input-group label {
  font-family: 'NanumGothic', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #828282;
  margin-bottom: 8px;
}

.input-group input {
  width: 100%;
  padding: 13px 10px;
  border: 1px solid #b0b0b0;
  border-radius: 5px;
  font-family: 'NanumGothic', sans-serif;
  font-size: 14px;
  color: #b0b0b0;
  outline: none; /* outline 제거 */
  box-shadow: none; /* box-shadow 제거 */
}

.id-input-wrapper,
.phone-input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px; /* 버튼과 입력 필드 사이에 공간을 만듭니다 */
}

.id-input-wrapper input,
.phone-input-wrapper input {
  flex: 1;
}

.black-button {
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 13px 20px;
  border-radius: 5px;
  cursor: pointer;
  height: 46px; /* 입력칸 세로 비율에 맞춤 */
  white-space: nowrap; /* 텍스트가 한 줄로 유지되도록 함 */
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: -10px;
}

.extended-fab {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 46px; /* 입력칸 세로 비율에 맞춤 */
  background: #f26921; /* 버튼 색 복구 */
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  cursor: pointer;
}

.extended-fab.gray {
  background: #6a6a6a;
  cursor: pointer;
}

.extended-fab.home-button {
  background: #525252;
  cursor: pointer;
}

.state-layer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.label-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.1px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal-content p {
  margin-bottom: 20px;
}

.modal-content button {
  background: #f26921;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
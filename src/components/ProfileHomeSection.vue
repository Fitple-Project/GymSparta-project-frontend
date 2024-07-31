<template>
  <div class="form">
    <div class="profile">
      <div class="avatar">
        <div class="rectangle-1"></div>
      </div>
      <div class="frame-2610465">
        <div class="div2">닉네임</div>
        <div class="java-5">Java_5기</div>
      </div>
    </div>
    <div class="input" v-for="(field, index) in fields" :key="index">
      <div class="input-title">{{ field.title }}</div>
      <div class="field">
        <input type="text" v-model="field.value" class="input-field" />
        <button v-if="field.title === 'Confirm Password'" class="confirm-button">확인</button>
      </div>
    </div>
    <div class="button-group">
      <div class="button">
        <div class="div3">수정</div>
      </div>
      <div class="button2">
        <div class="div3">회원탈퇴</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileHomeSection",
  data() {
    return {
      fields: [
        { title: "Username", value: "익명 (수정불가)" },
        { title: "Nickname", value: "닉네임" },
        { title: "Email", value: "email@domain.com" },
        { title: "Phone Number", value: "01024242424" },
        { title: "Address", value: "서울특별시 ㅇㅇ구 (주소)" },
        { title: "Address", value: "oo로 22-22 (상세 주소)" },
        { title: "Confirm Password", value: "confirmPassword" }
      ]
    };
  }
};
</script>

<style scoped>
@import '@/styles/variables.css';

.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 600px;
}

.profile {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}

.avatar {
  background: #f7f7f7;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
}

.rectangle-1 {
  width: 100%;
  height: 100%;
}

.frame-2610465 {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.div2, .java-5, .input-title {
  color: #000000;
  font-family: var(--small-text-font-family);
  font-size: var(--small-text-font-size);
  line-height: var(--small-text-line-height);
  font-weight: var(--small-text-font-weight);
}

.field {
  background: #ffffff;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  width: 700px;
  height: 40px;
  position: relative;
}

.input-field {
  width: 100%;
  border: none;
  outline: none;
  font-family: var(--presets-body2-font-family);
  font-size: var(--presets-body2-font-size);
  line-height: var(--presets-body2-line-height);
  font-weight: var(--presets-body2-font-weight);
}

.confirm-button {
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-family: var(--small-text-font-family);
  font-size: var(--small-text-font-size);
  line-height: var(--small-text-line-height);
  font-weight: var(--small-text-font-weight);
  cursor: pointer;
  margin-left: 1rem;
  position: absolute;
  right: -5rem;
}

.button, .button2 {
  background: #000000;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: var(--small-text-font-family);
  font-size: var(--small-text-font-size);
  line-height: var(--small-text-line-height);
  font-weight: var(--small-text-font-weight);
  height: 40px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}
</style>
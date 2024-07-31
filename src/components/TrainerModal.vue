<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <h2>{{ type === 'register' ? '트레이너 등록' : '트레이너 해지' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-field">
          <label for="name">이름</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-field">
          <label for="id">아이디</label>
          <input type="text" id="id" v-model="trainerId" required />
        </div>
        <div class="form-field">
          <label for="email">이메일 주소</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="button-group">
          <button type="submit">{{ type === 'register' ? '등록' : '해지' }}</button>
          <button type="button" @click="closeModal">취소</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'register'
    }
  },
  data() {
    return {
      name: '',
      trainerId: '',
      email: ''
    };
  },
  methods: {
    handleSubmit() {
      // 주석 처리하여 나중에 API 연결 시 사용할 수 있도록 함
      // const payload = {
      //   name: this.name,
      //   trainerId: this.trainerId,
      //   email: this.email
      // };
      // if (this.type === 'register') {
      //   // 트레이너 등록 API 연결 부분
      //   axios.post('/api/trainers/register', payload)
      //     .then(response => {
      //       // 성공 처리
      //     })
      //     .catch(error => {
      //       // 에러 처리
      //     });
      // } else {
      //   // 트레이너 해지 API 연결 부분
      //   axios.post('/api/trainers/unregister', payload)
      //     .then(response => {
      //       // 성공 처리
      //     })
      //     .catch(error => {
      //       // 에러 처리
      //     });
      // }
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  margin-bottom: 8px;
}

.form-field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.button-group button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-group button[type="submit"] {
  background: #007bff;
  color: white;
}

.button-group button[type="button"] {
  background: #ccc;
}
</style>
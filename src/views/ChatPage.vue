<template>
  <div class="container">
    <div class="col-6">
      <label><b>채팅방</b></label>
    </div>
    <div>
      <div id="msgArea" class="col">
        <!-- 메시지 표시 영역 -->
        <div v-for="(message, index) in messages" :key="index">
          <div :class="message.senderId === username ? 'alert alert-secondary' : 'alert alert-warning'">
            <b>{{ message.senderId }}: {{ message.messageText }}</b>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="input-group mb-3">
          <input
              type="text"
              v-model="msg"
              class="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              placeholder="메시지를 입력하세요"
          />
          <div class="input-group-append">
            <button
                class="btn btn-outline-secondary"
                type="button"
                @click="sendMessage"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem('accessToken'),
      username: localStorage.getItem('username'),  // 현재 사용자의 이름
      receiver: localStorage.getItem('reader'),  // 메시지를 보낼 수신자
      msg: "",  // 입력 메시지
      websocket: null,  // WebSocket 연결
      messages: []  // 메시지 목록
    };
  },
  created() {
    // WebSocket 연결 (서버에서 지정한 URL로 연결)
    this.websocket = new WebSocket(`ws://localhost:8080/ws/chat?token=${this.token}`);
    this.websocket.onmessage = this.onMessage;

    // 초기 메시지 로드
    this.loadMessages();
  },
  methods: {
    // 메시지 목록을 가져오는 API 호출
    async loadMessages() {
      try {
        const response = await fetch(`http://localhost:8080/api/chat?receiverId=${this.receiver}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        if (response.ok) {
          const messages = await response.json();

          // 서버에서 받아온 메시지가 배열 형태로 올 경우 처리
          if (Array.isArray(messages)) {
            this.messages = messages.map(message => ({
              senderId: message.senderId,
              receiverId: message.receiverId,
              messageText: message.messageText
            }));
          } else {
            console.error('Received data is not in the expected format.');
          }
        } else {
          console.error('Failed to load messages');
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    },

    // WebSocket 메시지 수신 처리
    onMessage(msg) {
      try {
        const data = JSON.parse(msg.data);

        // 서버에서 받은 메시지가 배열이면
        if (Array.isArray(data)) {
          data.forEach(message => {
            this.messages.push({
              senderId: message.senderId,
              receiverId: message.receiverId,
              messageText: message.messageText
            });
          });
        } else {
          // 단일 메시지 처리
          this.messages.push({
            senderId: data.senderId,
            receiverId: data.receiverId,
            messageText: data.messageText
          });
        }
      } catch (error) {
        console.error("Failed to process incoming message", error);
      }
    },

    // 메시지 전송 (기존의 전송 로직)
    sendMessage() {
      if (this.msg) {
        const chatMessage = {
          senderId: this.username,    // 보내는 사용자 ID
          receiverId: this.receiver,  // 받는 사용자 ID
          messageText: this.msg       // 메시지 내용
        };
        this.websocket.send(JSON.stringify(chatMessage));  // WebSocket을 통해 메시지 전송

        // 메시지 목록에 추가 (클라이언트 화면에 보여주기 위한 용도)
        this.messages.push({
          senderId: this.username,
          receiverId: this.receiver,
          messageText: this.msg
        });

        // 메시지 전송 후 초기화
        this.msg = "";
      }
    }
  },
  beforeUnmount() {
    // 컴포넌트가 파괴되기 전에 WebSocket 연결 종료
    if (this.websocket) {
      this.websocket.close();
    }
  }
};
</script>

<style scoped>
/* 스타일 추가 (필요한 경우) */
</style>
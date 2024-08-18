<template>
  <div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">공지사항</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-content">
          <h3>2023년 하반기 시스템 업데이트 안내</h3>
          <p>안녕하세요, 고객 여러분.</p>
          <p>당사는 더 나은 서비스 제공을 위해 2023년 9월 15일부터 9월 17일까지 시스템 업데이트를 진행할 예정입니다.</p>
          <p>업데이트 기간 동안 일부 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.</p>
          <h4>주요 업데이트 내용:</h4>
          <ul>
            <li>사용자 인터페이스 개선</li>
            <li>보안 시스템 강화</li>
            <li>새로운 기능 추가</li>
          </ul>
          <p>업데이트 완료 후 더욱 향상된 서비스로 찾아뵙겠습니다.</p>
          <p>감사합니다.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="closeModal">확인</button>
          <button class="btn btn-secondary" @click="closeForOneDay">오늘 하루 동안 그만보기</button>
        </div>
      </div>
    </div>

    <SearchContainer />
    <TrainerSection title="트레이너" :trainers="trainers" />
    <GymSection title="주변 운동시설" :gyms="gyms" />
    <GymSection title="최근 둘러본 운동시설" :gyms="recentGyms" />
    <AppFooter />
  </div>
</template>

<script>
import SearchContainer from "@/components/SearchContainer.vue";
import TrainerSection from "@/components/TrainerSection.vue";
import GymSection from "@/components/GymSection.vue";
import AppFooter from "@/components/AppFooter.vue";
import mk1 from '@/assets/Gym_image/mk1.svg';
import dy1 from '@/assets/Gym_image/dy1.svg';
import h1 from '@/assets/Gym_image/h1.svg';
import hm1 from '@/assets/Gym_image/hm1.svg';
import trainer1 from '@/assets/Trainer_image/kim.svg';
import trainer2 from '@/assets/Trainer_image/hcs.svg';
import trainer3 from '@/assets/Trainer_image/Ronnie.svg';
import trainer4 from '@/assets/Trainer_image/Bumstead.svg';

export default {
  name: "HomePage",
  components: {
    SearchContainer,
    TrainerSection,
    GymSection,
    AppFooter,
  },
  data() {
    return {
      showModal: !this.isModalSuppressed(), // 모달 표시 여부
      gyms: [
        {
          id: 1,
          image: mk1,
          category: '헬스장 · 필라테스',
          name: 'MK휘트니스',
          location: '서울 강남구 봉은사로 129-1 751빌딩 지하2층',
          info: '헬스 (1개월)',
          price: '150,000원',
          originalPrice: '200,000원',
          rating: '4.9',
          reviews: '7,185명 평가'
        },
        {
          id: 2,
          image: dy1,
          category: '헬스장 · 재활',
          name: '데일리앤핏 24시',
          location: '서울 강남구 도곡로 323 지하1층',
          info: '헬스 (1개월)',
          price: '158,500원',
          originalPrice: '200,000원',
          rating: '4.1',
          reviews: '5,263명 평가'
        },
        {
          id: 3,
          image: h1,
          category: '헬스장 · PT',
          name: '하와이짐 논현프라이빗점',
          location: '서울 강남구 언주로122길 35',
          info: 'PT 10 Session(L1~L3)',
          price: '700,000~900,000원',
          originalPrice: '',
          rating: '5',
          reviews: '731명 평가'
        },
        {
          id: 4,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
        {
          id: 5,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
        {
          id: 6,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
        {
          id: 7,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
        {
          id: 8,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
      ],
      recentGyms: [
        {
          id: 9,
          image: mk1,
          category: '헬스장 · 필라테스',
          name: 'MK휘트니스',
          location: '서울 강남구 봉은사로 129-1 751빌딩 지하2층',
          info: '헬스 (1개월)',
          price: '150,000원',
          originalPrice: '200,000원',
          rating: '4.9',
          reviews: '7,185명 평가'
        },
        {
          id: 10,
          image: dy1,
          category: '헬스장 · 재활',
          name: '데일리앤핏 24시',
          location: '서울 강남구 도곡로 323 지하1층',
          info: '헬스 (1개월)',
          price: '158,500원',
          originalPrice: '200,000원',
          rating: '4.1',
          reviews: '5,263명 평가'
        },
        {
          id: 11,
          image: h1,
          category: '헬스장 · PT',
          name: '하와이짐 논현프라이빗점',
          location: '서울 강남구 언주로122길 35',
          info: 'PT 10 Session(L1~L3)',
          price: '700,000~900,000원',
          originalPrice: '',
          rating: '5',
          reviews: '731명 평가'
        },
        {
          id: 12,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
        {
          id: 13,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
        {
          id: 14,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
        {
          id: 15,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
        {
          id: 16,
          image: hm1,
          category: '헬스장 · PT',
          name: '휴메이크휘트니스 논현점',
          location: '서울 강남구 강남대로 546 지하2층',
          info: '헬스 이용권',
          price: '29,000~100,000원',
          originalPrice: '',
          rating: '4.6',
          reviews: '2,952명 평가'
        },
      ],
      trainers: [
        {
          id: 1,
          image: trainer1,
          name: '트레이너 1',
          description: '설명 1'
        },
        {
          id: 2,
          image: trainer2,
          name: '트레이너 2',
          description: '설명 2'
        },
        {
          id: 3,
          image: trainer3,
          name: '트레이너 3',
          description: '설명 3'
        },
        {
          id: 4,
          image: trainer4,
          name: '트레이너 4',
          description: '설명 4'
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    closeForOneDay() {
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 현재 시간 + 24시간
      localStorage.setItem("suppressModalUntil", tomorrow.getTime());
      this.closeModal();
    },
    isModalSuppressed() {
      const suppressUntil = localStorage.getItem("suppressModalUntil");
      if (suppressUntil) {
        const now = new Date().getTime();
        return now < suppressUntil; // suppressUntil 시간이 현재 시간보다 크면 true 반환
      }
      return false; // suppressUntil 값이 없으면 false 반환
    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 높게 설정하여 상단에 표시 */
}

.modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  animation: modalAppear 0.3s ease-out;
  z-index: 1001; /* 높게 설정하여 상단에 표시 */
}

.modal-header {
  background-color: #F26921;
  color: white;
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.2em;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}

.modal-content {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e0e0e0;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #F26921;
  color: white;
}

.btn-secondary {
  background-color: #ddd;
  color: black;
  margin-left: 10px;
}

.btn-primary:hover {
  background-color: #d1551a;
}

.btn-secondary:hover {
  background-color: #bbb;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
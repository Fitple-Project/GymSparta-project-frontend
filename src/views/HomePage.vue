<template>
  <div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">공지사항</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-content">
          <h3>📢 공지</h3>
          <p>안녕하세요, 고객 여러분.</p>
          <p>
            현재 제공되는 서비스에는 일부 기능(결제 등)이 아직 미구현된 상태입니다.
            시간적 제약으로 인해 우선 배포를 진행하게 된 점에 대해
            사과드리며, 빠른 시일 내에 기능을 추가하고 업데이트를 진행할
            예정입니다.
          </p>
          <p>
            피드백을 주신 분들 중에서 추첨을 통해 선물을 드릴 예정입니다. 여러분의 소중한 피드백과 의견을 바탕으로 더욱 개선된 서비스를 제공할 수 있도록 최선을 다하겠습니다. 불편을 드려 죄송하며, 지속적인 업데이트와 개선을 통해 더 나은 서비스로 보답하겠습니다.
          </p>
          <h4>📝 설문 참여 안내</h4>
          <p>
            저희 서비스에 대한 설문에 참여해 주시면, 추첨을 통해 다양한 경품을 드립니다. 여러분의 의견이 큰 도움이 되니, 꼭 참여 부탁드립니다!
          </p>
          <p>
            <strong>📑 참여 링크:</strong> <a href="https://forms.gle/aEFQPCPzFgaxpTHR7" target="_blank">설문조사 참여하기</a>
          </p>
          <p>
            <strong>☑️ 응모 기간:</strong> 8/19(월) ~ 8/23(금) 23:59까지
          </p>
          <p>
            <strong>🗓️ 당첨자 발표 및 발송:</strong> 8/26(월)
          </p>
          <p><strong>🎁 제공되는 경품:</strong></p>
          <ul>
            <li>배달의 민족 3만원 상품권 (1명)</li>
            <li>배달의 민족 2만원 상품권 (2명)</li>
            <li>메가커피 또는 컴포즈커피 아메리카노 쿠폰 (10명)</li>
          </ul>
          <p>업데이트가 완료되면 더 나은 서비스로 찾아뵙겠습니다.</p>
          <p>감사합니다.</p>

          <h4>🌐 주요 서비스 페이지 안내</h4>
          <ul>
            <li><strong>메인 페이지:</strong> <a href="https://gymsparta.shop" target="_blank">https://gymsparta.shop</a></li>
            <li><strong>로그인 페이지:</strong> <a href="https://gymsparta.shop/login" target="_blank">https://gymsparta.shop/login</a></li>
            <li><strong>회원가입 페이지:</strong> <a href="https://gymsparta.shop/signup" target="_blank">https://gymsparta.shop/signup</a></li>
            <li><strong>비즈니스 회원가입 페이지:</strong> <a href="https://gymsparta.shop/business/signup" target="_blank">https://gymsparta.shop/business/signup</a></li>
            <li><strong>운동 시설 검색 페이지:</strong> <a href="https://gymsparta.shop/store/search" target="_blank">https://gymsparta.shop/store/search</a></li>
            <li><strong>트레이너 비교 페이지:</strong> <a href="https://gymsparta.shop/trainer/compare" target="_blank">https://gymsparta.shop/trainer/compare</a></li>
            <li><strong>트레이너 상세 페이지:</strong> <a href="https://gymsparta.shop/trainer/detail/:id" target="_blank">https://gymsparta.shop/trainer/detail/:id</a></li>
            <li><strong>장바구니 페이지:</strong> <a href="https://gymsparta.shop/cart" target="_blank">https://gymsparta.shop/cart</a></li>
            <li><strong>결제 페이지:</strong> <a href="https://gymsparta.shop/payments" target="_blank">https://gymsparta.shop/payments</a></li>
            <li><strong>사용자 프로필 페이지:</strong> <a href="https://gymsparta.shop/profile/user/:userId" target="_blank">https://gymsparta.shop/profile/user/:userId</a></li>
            <li><strong>점주 프로필 페이지:</strong> <a href="https://gymsparta.shop/profile/owner/:ownerId" target="_blank">https://gymsparta.shop/profile/owner/:ownerId</a></li>
          </ul>
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
    <AppFooter @show-modal="openModal" />
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
    openModal() {
      this.showModal = true; // 모달 표시
    },
    closeModal() {
      this.showModal = false; // 모달 닫기
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
  z-index: 1000;
}

.modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  height: 90%; /* 모달의 전체 높이를 90%로 설정 */
  animation: modalAppear 0.3s ease-out;
  z-index: 1001;
  display: flex;
  flex-direction: column; /* 버튼을 모달 하단에 배치하기 위해 추가 */
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
  flex-grow: 1; /* 콘텐츠가 남은 공간을 차지하도록 설정 */
  overflow-y: auto;
}

.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e0e0e0;
  background-color: #f9f9f9; /* 버튼 섹션의 배경색을 추가 */
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
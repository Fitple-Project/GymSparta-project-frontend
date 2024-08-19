<template>
  <div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">공지사항</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <div class="modal-content">
          <!-- 공지사항 내용 -->
          <h3>📢 공지</h3>
          <p>안녕하세요, 고객 여러분.</p>
          <p>
            현재 제공되는 서비스에는 일부 기능(결제 등)이 아직 연결이 안된 상태입니다.
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
    <GymSection title="주변 운동시설" :gyms="gyms" @cardClicked="navigateToGymDetail" />
    <GymSection title="최근 둘러본 운동시설" :gyms="recentGyms" @cardClicked="navigateToGymDetail" />
    <AppFooter />
  </div>
</template>

<script>
import SearchContainer from "@/components/SearchContainer.vue";
import GymSection from "@/components/GymSection.vue";
import AppFooter from "@/components/AppFooter.vue";
import { getCurrentLocation, getCoordinatesFromAddress } from '@/utils/location';
import mk1 from '@/assets/Gym_image/mk1.svg';

export default {
  name: "HomePage",
  components: {
    SearchContainer,
    GymSection,
    AppFooter,
  },
  data() {
    return {
      showModal: !this.isModalSuppressed(),
      gyms: [],
      recentGyms: [],
      searchQuery: '',
    };
  },
  computed: {
      filteredGyms() {
        // 검색어가 비어있으면 모든 체육관을 반환하고, 아니면 검색어로 필터링
        if (!this.searchQuery.trim()) {
          return this.gyms;
        }
        return this.gyms.filter(gym =>
          gym.name.includes(this.searchQuery) ||
          gym.location.includes(this.searchQuery)
        );
      }
    },
  methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      closeForOneDay() {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        localStorage.setItem("suppressModalUntil", tomorrow.getTime());
        this.closeModal();
      },
      isModalSuppressed() {
        const suppressUntil = localStorage.getItem("suppressModalUntil");
        if (suppressUntil) {
          const now = new Date().getTime();
          return now < suppressUntil;
        }
        return false;
      },
      async fetchNearbyGyms() {
        try {
          const currentLocation = await getCurrentLocation();

          const response = await fetch(`http://localhost:8080/api/stores`, {
            method: 'GET',
            credentials: 'include' // 쿠키 포함하여 요청
          });
          const responseData = await response.json();

          if (response.status !== 200) {
            console.error('서버 오류:', responseData.error || 'Unknown error');
            return;
          }

          const storesWithCoordinates = await Promise.all(responseData.data.map(async store => {
            const coordinates = await getCoordinatesFromAddress(store.storeAddress);
            if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
              const distance = this.getDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                coordinates.latitude,
                coordinates.longitude
              );

              return {
                id: store.storeId,
                image: store.image || mk1,
                category: store.category || '카테고리 정보 없음',
                name: store.storeName,
                location: store.storeAddress,
                info: store.storeInfo || '정보 없음',
                price: store.storePrice || '가격 정보 없음',
                rating: store.rating || '평점 없음',
                reviews: store.reviews || '리뷰 없음',
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                distance
              };
            }
          }));

          this.gyms = storesWithCoordinates.filter(store => store && store.distance <= 10);

        } catch (error) {
          console.error('매장 정보를 가져오거나 지오코딩하는 중 오류 발생:', error);
        }
      },

      async fetchRecentGyms() {
        try {
          const response = await fetch(`http://localhost:8080/api/stores/recent`, {
            method: 'GET',
            credentials: 'include',
          });
          const responseData = await response.json();

          if (responseData && responseData.data) {
            this.recentGyms = responseData.data.map(store => ({
              id: store.storeId,
              image: store.image || mk1,
              category: store.category || '카테고리 정보 없음',
              name: store.storeName,
              location: store.storeAddress,
              info: store.storeInfo || '정보 없음',
              price: store.storePrice || '가격 정보 없음',
              rating: store.rating || '평점 없음',
              reviews: store.reviews || '리뷰 없음',
            }));
          }
        } catch (error) {
          console.error('최근 방문한 매장 정보를 가져오는 중 오류 발생:', error);
        }
      },

      searchStores() {
            this.$router.push({ name: 'store-search', query: { search: this.searchQuery } });
          },

      async navigateToGymDetail(gymId) {
        try {
          const response = await fetch(`http://localhost:8080/api/stores/${gymId}`, {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
          const storeDetail = await response.json();

            console.log('상세 조회 응답 데이터:', storeDetail);

          this.$router.push({ name: "store-detail", params: { id: gymId } });

          if (this.$route.name === 'HomePage') {
            this.fetchRecentGyms();
          }
        } catch (error) {
          console.error('상세 조회 중 오류 발생:', error);
        }
      },
    },

    mounted() {
      this.fetchNearbyGyms();
      this.fetchRecentGyms();
    }
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
  height: 90%;
  animation: modalAppear 0.3s ease-out;
  z-index: 1001;
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e0e0e0;
  background-color: #f9f9f9;
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
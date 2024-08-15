<template>
  <div id="app" class="container">
    <div class="background">
      <div class="trainer-detail">
        <img :src="trainer.image" alt="trainer image" class="trainer-image" />
        <div class="trainer-info">
          <div class="trainer-name">{{ trainer.name }}</div>
          <div class="trainer-location">{{ trainer.location }}</div>
          <div class="trainer-price">{{ trainer.price }}</div>
          <div class="trainer-description">{{ trainer.description }}</div>
        </div>
      </div>
      <div class="sections">
        <div class="section">
          <h2>트레이너 소개</h2>
          <p>{{ trainer.introduction }}</p>
        </div>
        <div class="section">
          <h2>경력 사항</h2>
          <ul>
            <li v-for="career in trainer.careers" :key="career">{{ career }}</li>
          </ul>
        </div>
        <div class="section">
          <h2>1:1 PT</h2>
          <div class="pt-cards">
            <div class="pt-card" v-for="pt in trainer.ptPrograms" :key="pt.id" @click="navigateToPayment(pt.id)">
              <h3>{{ pt.name }}</h3>
              <p>{{ pt.price }}</p>
              <p>{{ pt.sessionPrice }}</p>
            </div>
          </div>
        </div>
        <div class="section reviews">
          <h2>리뷰</h2>
          <button class="view-all-reviews" @click="viewAllReviews">리뷰 전체 보기</button>
          <div class="review-cards">
            <div class="review-card" v-for="review in trainer.reviews" :key="review.id">
              <img :src="review.userProfile" alt="User profile" class="user-profile"/>
              <div class="review-content">
                <div class="user-info">
                  <h3>{{ review.username }}</h3>
                  <p>{{ review.score }}점</p>
                </div>
                <p>{{ review.content }}</p>
                <img v-if="review.image" :src="review.image" alt="Review image" class="review-image"/>
              </div>
            </div>
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
      trainer: {
        id: null,
        image: "",
        name: "",
        location: "",
        price: "",
        description: "",
        introduction: "",
        careers: [],
        ptPrograms: [],
        reviews: []
      }
    };
  },
  created() {
    const trainerId = this.$route.params.id;
    this.fetchTrainerDetails(trainerId);
  },
  methods: {
    async fetchTrainerDetails(trainerId) {
      try {
        const url = '${process.env.VUE_APP_API_URL}/api/trainers/' + trainerId;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.trainer = await response.json();
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    },
    navigateToPayment(ptId) {
      console.log("Navigate to payment for PT Program ID:", ptId);
      // 여기서 결제 페이지로 이동하는 로직을 추가할 수 있습니다.
      // this.$router.push({ name: 'payment', params: { ptId } });
    },
    viewAllReviews() {
      this.$router.push({ name: 'trainer-reviews', params: { id: this.trainer.id } });
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.background {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.trainer-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  background: #fff;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.trainer-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
}

.trainer-info {
  margin-top: 20px;
  width: 100%;
}

.trainer-name {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 28.8px; /* 40% 줄임 */
  color: #000000;
  text-align: center;
}

.trainer-location {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 19.2px; /* 40% 줄임 */
  color: #000000;
  text-align: center;
}

.trainer-price {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 28.8px; /* 40% 줄임 */
  color: #000000;
  text-align: center;
  margin-top: 10px;
}

.trainer-description {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  text-align: center;
  margin-top: 20px;
}

.sections {
  width: 100%;
  margin-top: 20px;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 10px;
}

.pt-cards {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.pt-card {
  width: 200px;
  padding: 20px;
  background: #fff;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  text-align: center;
}

.pt-card h3 {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  margin-bottom: 10px;
}

.pt-card p {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  margin: 5px 0;
}

.reviews {
  position: relative;
}

.view-all-reviews {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  color: #0000EE;
  cursor: pointer;
  text-decoration: underline;
}

.review-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.review-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #fff;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
}

.user-profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.review-content {
  display: flex;
  flex-direction: column;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info h3 {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  color: #000000;
}

.user-info p {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}

.review-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
}
</style>

<!--// 여기서 id를 이용해 백엔드 API 호출을 추가할 수 있습니다.-->
<!--// axios.get(`/api/trainer/${trainerId}`).then(response => {-->
<!--//   this.trainer = response.data;-->
<!--// });-->
<!--// 예시 데이터를 사용합니다.-->
<!--this.trainer = {-->
<!--id: trainerId,-->
<!--image: "example-image.png",-->
<!--name: "이민수 선생님",-->
<!--location: "서울특별시 ㅇㅇ구",-->
<!--price: "40,000원~/회당",-->
<!--description: "트레이너 설명 예시입니다.",-->
<!--introduction: "트레이너 소개 예시입니다.",-->
<!--careers: [-->
<!--"경력 사항 1",-->
<!--"경력 사항 2",-->
<!--"경력 사항 3"-->
<!--],-->
<!--ptPrograms: [-->
<!--{ id: 1, name: "PT 10회", price: "600,000원", sessionPrice: "회당 60,000원" },-->
<!--{ id: 2, name: "PT 20회", price: "1,200,000원", sessionPrice: "회당 60,000원" },-->
<!--{ id: 3, name: "PT 30회", price: "1,800,000원", sessionPrice: "회당 60,000원" }-->
<!--],-->
<!--reviews: [-->
<!--{ id: 1, userProfile: "user1.png", username: "User1", score: 5, content: "리뷰 내용 예시 1", image: "review1.png" },-->
<!--{ id: 2, userProfile: "user2.png", username: "User2", score: 4, content: "리뷰 내용 예시 2" }-->
<!--]-->
<!--};-->
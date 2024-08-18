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
          <div class="review-cards">
            <div class="review-card" v-for="review in reviews && reviews.length > 0 ? reviews.slice(0, 3) : []" :key="review.id">
              <div class="user-info">
                <img :src="review.userProfile" alt="user profile" class="user-profile" />
                <div>
                  <h3>{{ review.user }}</h3>
                  <p>{{ review.date }}</p>
                </div>
              </div>
              <div class="review-content">
                <div class="review-rating">
                  <span class="star" v-for="n in review.rating" :key="n">★</span>
                </div>
                <p>{{ review.comment }}</p>
                <img v-if="review.image" :src="review.image" alt="review image" class="review-image" />
              </div>
            </div>
          </div>
          <button class="view-all-reviews" @click="viewAllReviews">모든 리뷰 보기</button>
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
      },
      reviews: []
    };
  },
  created() {
    const trainerId = this.$route.params.id;
    this.fetchTrainerDetails(trainerId);
    this.fetchTrainerReviews(trainerId);
  },
  methods: {
    async fetchTrainerDetails(trainerId) {
      try {
        const url = 'http://localhost:8080/api/trainers/' + trainerId;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
    async fetchTrainerReviews(trainerId) {
      try {
        const response = await fetch(`http://localhost:8080/api/reviews/trainer/${trainerId}/reviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        this.reviews = data.data.map((review, index) => ({
          ...review,
          user: `사용자${index + 1}`
        }));
        this.calculateRatingDistribution();
      } catch (error) {
        console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
      }
    },
    calculateRatingDistribution() {
      const distribution = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
      this.reviews.forEach(review => {
        distribution[review.rating]++;
      });
      this.ratingDistribution = distribution;
    },
    navigateToPayment(ptId) {
      console.log("Navigate to payment for PT Program ID:", ptId);
      // 여기서 결제 페이지로 이동하는 로직을 추가할 수 있습니다.
      // this.$router.push({ name: 'payment', params: { ptId } });
    },
    viewAllReviews() {
      this.$router.push({name: 'trainer-reviews', params: {id: this.trainer.id}});
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
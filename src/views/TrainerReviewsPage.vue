<template>
  <div id="app" class="container">
    <div class="background">
      <h1 class="title">리뷰</h1>
      <div class="review-list">
        <div class="review-card" v-for="review in reviews" :key="review.id">
          <img :src="review.userProfile" alt="User profile" class="user-profile" />
          <div class="review-content">
            <div class="user-info">
              <h3>{{ review.username }}</h3>
              <p>{{ review.score }}점</p>
            </div>
            <p class="review-text">{{ review.content }}</p>
            <img v-if="review.image" :src="review.image" alt="Review image" class="review-image" />
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
      reviews: []
    };
  },
  created() {
    const trainerId = this.$route.params.id;
    // 여기서 id를 이용해 백엔드 API 호출을 추가할 수 있습니다.
    // axios.get(`/api/trainer/${trainerId}/reviews`).then(response => {
    //   this.reviews = response.data;
    // });

    // trainerId 변수를 사용하지 않을 경우 주석 처리
    console.log("Trainer ID:", trainerId);

    // 예시 데이터를 사용합니다.
    this.reviews = [
      {
        id: 1,
        userProfile: "user1.png",
        username: "User1",
        score: 5,
        content: "리뷰 내용 예시 1",
        image: "review1.png"
      },
      {id: 2, userProfile: "user2.png", username: "User2", score: 4, content: "리뷰 내용 예시 2"},
      {
        id: 3,
        userProfile: "user3.png",
        username: "User3",
        score: 5,
        content: "리뷰 내용 예시 3",
        image: "review3.png"
      }
    ];
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow-y: scroll;
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

.title {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 48px;
  color: #000000;
  margin-bottom: 20px;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
}

.review-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #f1f1f1;
  border: 1px solid #ebebeb;
  border-radius: 20px;
}

.user-profile {
  width: 164px;
  height: 153px;
  border-radius: 50%;
  background: #d9d9d9;
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
  font-size: 24px;
  color: #000000;
}

.user-info p {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 20px;
  color: #000000;
}

.review-text {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 20px;
  color: #000000;
  margin-top: 10px;
}

.review-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
}
</style>
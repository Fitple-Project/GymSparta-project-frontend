<template>
  <div class="store-review-page">
    <h1>트레이너 리뷰</h1>
    <!-- 리뷰 섹션 -->
    <div class="review-section">
      <div class="overall-rating">
        <div class="rating-text">{{ averageRating }} ({{ totalReviews }}개)</div>
        <div class="stars">
          <span class="star" v-for="n in 5" :key="n">★</span>
        </div>
      </div>
      <div class="rating-distribution">
        <p>5점 ---- {{ ratingDistribution[5] }}개</p>
        <p>4점 ---- {{ ratingDistribution[4] }}개</p>
        <p>3점 ---- {{ ratingDistribution[3] }}개</p>
        <p>2점 ---- {{ ratingDistribution[2] }}개</p>
        <p>1점 ---- {{ ratingDistribution[1] }}개</p>
      </div>
    </div>
    <div class="review-form">
      <h2>리뷰 작성</h2>
      <form @submit.prevent="submitReview">
        <div class="form-field">
          <label for="rating">평점</label>
          <div class="stars">
            <span
                v-for="n in 5"
                :key="n"
                class="star"
                :class="{ filled: n <= newReview.rating }"
                @click="setRating(n)"
            >★</span>
          </div>
        </div>
        <div class="form-field">
          <label for="comment">댓글</label>
          <textarea id="comment" v-model="newReview.comment" required></textarea>
        </div>
        <button type="submit">리뷰 등록</button>
      </form>
    </div>
    <div class="review-list">
      <div class="review" v-for="(review, index) in reviews" :key="review.id">
        <div class="user-info">
          <div class="user-avatar"></div>
          <div class="user-name">{{ `사용자${index + 1}` }}</div>
          <div class="review-date">{{ review.date }}</div>
        </div>
        <div class="review-rating">
          <span class="star" v-for="n in review.rating" :key="n">★</span>
        </div>
        <div class="review-text">{{ review.comment }}</div>
      </div>
      <div ref="loadMoreTrigger" class="load-more-trigger"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainerReviewPage',
  data() {
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      page: 1,
      newReview: {
        rating: 0,
        comment: ''
      }
    };
  },
  mounted() {
    this.fetchReviews();
    this.fetchAverageRating();
    this.setupInfiniteScroll();
  },
  methods: {
    setupInfiniteScroll() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.loadMoreReviews();
        }
      }, options);
      observer.observe(this.$refs.loadMoreTrigger);
    },
    fetchReviews() {
      const trainerId = this.$route.params.id;
      fetch(`${process.env.VUE_APP_API_URL}/api/reviews/trainer/${trainerId}/reviews`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => response.json())
          .then(data => {
            this.reviews = data.data.map((review, index) => ({
              ...review,
              user: `사용자${index + 1}`
            }));
            this.calculateRatingDistribution();
          })
          .catch(error => {
            console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
          });
    },
    calculateRatingDistribution() {
      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      this.reviews.forEach(review => {
        distribution[review.rating]++;
      });
      this.ratingDistribution = distribution;
    },
    fetchAverageRating() {
      const trainerId = this.$route.params.id;
      fetch(`${process.env.VUE_APP_API_URL}/api/reviews/trainer/${trainerId}/average-rating`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => response.json())
          .then(data => {
            this.averageRating = data.data;
          })
          .catch(error => {
            console.error('평균 평점을 가져오는 중 오류가 발생했습니다.', error);
          });
    },
    loadMoreReviews() {
      // 추가 리뷰 로드 로직
    },
    setRating(rating) {
      this.newReview.rating = rating;
    },
    submitReview() {
      const trainerId = this.$route.params.id;
      const payload = {
        trainerId: trainerId,
        rating: this.newReview.rating,
        comment: this.newReview.comment
      };

      fetch('${process.env.VUE_APP_API_URL}/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payload)
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('리뷰 등록 중 오류가 발생했습니다.');
            }
            return response.json();
          })
          .then(() => {
            alert('리뷰가 성공적으로 등록되었습니다.');
            this.newReview.rating = 0;
            this.newReview.comment = '';
            this.fetchReviews(); // 리뷰 목록 갱신
          })
          .catch(error => {
            console.error(error);
            alert('리뷰 등록 중 오류가 발생했습니다.');
          });
    }
  }
}
</script>

<style scoped>
.store-review-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  transform: translateY(-100px); /* 상단으로 이동 */
  transform: scale(0.8); /* 전체적인 크기를 80%로 줄임 */
  transform-origin: top; /* 상단 기준으로 크기 조정 */
}

.review-section {
  background: #F1F1F1;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.overall-rating {
  display: flex;
  align-items: center;
}

.rating-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 48px;
  margin-right: 20px;
}

.stars {
  display: flex;
}

.star {
  font-size: 48px;
  color: #FF8500;
  cursor: pointer;
}

.star.filled {
  color: #FF8500;
}

.rating-distribution {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin-top: 20px;
}

.review-list {
  background: #F1F1F1;
  border-radius: 6px;
  padding: 20px;
}

.review {
  border-bottom: 1px solid #000;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 119px;
  height: 119px;
  background: #D9D9D9;
  border-radius: 50%;
  margin-right: 20px;
}

.user-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 32px;
}

.review-date {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 32px;
  margin-left: auto;
}

.review-rating {
  display: flex;
  margin: 10px 0;
}

.review-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 32px;
}

.load-more-trigger {
  height: 1px;
}
</style>
<template>
  <div class="store-review-page">
    <h1>매장 리뷰</h1>
    <!-- 리뷰 섹션 -->
    <div class="review-section">
      <div class="overall-rating">
        <div class="rating-text">5.0 (3개)</div>
        <div class="stars">
          <span class="star" v-for="n in 5" :key="n">★</span>
        </div>
      </div>
      <div class="rating-distribution">
        <p>5점 ---- 3개</p>
        <p>4점 ---- 0개</p>
        <p>3점 ---- 0개</p>
        <p>2점 ---- 0개</p>
        <p>1점 ---- 0개</p>
      </div>
    </div>
    <div class="review-list">
      <div class="review" v-for="review in reviews" :key="review.id">
        <div class="user-info">
          <div class="user-avatar"></div>
          <div class="user-name">{{ review.user }}</div>
          <div class="review-date">{{ review.date }}</div>
        </div>
        <div class="review-rating">
          <span class="star" v-for="n in review.rating" :key="n">★</span>
        </div>
        <div class="review-text">{{ review.text }}</div>
      </div>
      <div ref="loadMoreTrigger" class="load-more-trigger"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreReviewPage',
  data() {
    return {
      reviews: this.getInitialReviews(),
      page: 1,
    };
  },
  mounted() {
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
    loadMoreReviews() {
      const newReviews = this.getMoreReviews(this.page);
      this.reviews = [...this.reviews, ...newReviews];
      this.page++;
    },
    getMoreReviews(page) {
      // 실제 데이터로 교체
      return [
        { id: page * 3 + 1, user: '사용자', date: '2024.01.01', rating: 5, text: '매장이 깔끔하고 좋아요' },
        { id: page * 3 + 2, user: '사용자', date: '2024.01.01', rating: 5, text: '매장이 깔끔하고 좋아요' },
        { id: page * 3 + 3, user: '사용자', date: '2024.01.01', rating: 5, text: '매장이 깔끔하고 좋아요' },
      ];
    },
    getInitialReviews() {
      return [
        { id: 1, user: '홍길동', date: '2024.01.01', rating: 5, text: '매우 만족합니다!' },
        { id: 2, user: '김철수', date: '2024.01.01', rating: 4, text: '좋아요!' },
        { id: 3, user: '이영희', date: '2024.01.01', rating: 3, text: '괜찮아요.' },
      ];
    }
  }
};
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
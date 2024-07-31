<script setup>
import { ref } from 'vue';
import HomeSection from '@/components/ProfileHomeSection.vue';
import PayHistory from '@/components/PayHistory.vue';
import UserReviewSection from '@/components/UserReviewSection.vue';

const currentSection = ref('home');

const showHomeSection = () => {
  currentSection.value = 'home';
};

const showPayHistory = () => {
  currentSection.value = 'payHistory';
};

const showUserReviewSection = () => {
  currentSection.value = 'userReview';
};
</script>

<template>
  <div class="profile-page">
    <div v-if="currentSection === 'home'">
      <HomeSection />
    </div>
    <div v-else-if="currentSection === 'payHistory'">
      <PayHistory />
    </div>
    <div v-else-if="currentSection === 'userReview'">
      <UserReviewSection />
    </div>
    <div class="sidebar">
      <div class="list">
        <div class="menu-item" @click="showHomeSection">
          <img class="home" src="@/assets/Home.svg"/>
          <div class="home2">Home</div>
        </div>
        <div class="menu-item2" @click="showPayHistory">
          <img class="search" src="@/assets/Card.svg" />
          <div class="div4">결제 내역</div>
        </div>
        <div class="menu-item2" @click="showUserReviewSection">
          <img class="bell" src="@/assets/bell.svg" />
          <div class="div4">리뷰</div>
        </div>
      </div>
      <div class="div5">프로필</div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/variables.css';

.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #F5F6F8;
}

.sidebar {
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
  width: 12.8125rem;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding-top: 4.8125rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  width: 100%;
}

.menu-item, .menu-item2 {
  background: none; /* Remove background color */
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  width: 100%;
}

.home, .search, .bell {
  width: 1.5rem;
  height: 1.5rem;
}

.home2, .div4 {
  color: #000000;
  font-family: var(--small-text-font-family);
  font-size: var(--small-text-font-size);
  line-height: var(--small-text-line-height);
  font-weight: var(--small-text-font-weight);
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.div5 {
  color: #000000;
  font-family: "Inter-SemiBold", sans-serif;
  font-size: 1.75rem;
  line-height: 1.1;
  font-weight: 600;
  position: absolute;
  left: 2.625rem;
  top: 1.875rem;
}

@media (max-width: 768px) {
  .form {
    max-width: 100%;
  }

  .avatar {
    width: 3rem;
    height: 3rem;
  }

  .div2, .java-5, .username, .nickname, .input-title, .phone-number, .address, .confirm-password {
    font-size: 0.875rem;
  }

  .label {
    font-size: 0.875rem;
  }

  .button, .button2, .button3, .button4, .button5 {
    font-size: 0.875rem;
  }

  .home, .search, .bell {
    width: 1.25rem;
    height: 1.25rem;
  }

  .home2, .div4 {
    font-size: 0.875rem;
  }

  .div5 {
    font-size: 1.25rem;
  }
}
</style>
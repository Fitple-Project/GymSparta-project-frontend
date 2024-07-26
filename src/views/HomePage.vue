<template>
  <div>
    <TrainerSection title="트레이너" :trainers="trainers" />
    <GymSection title="주변 운동시설" :gyms="gyms" />
    <GymSection title="최근 둘러본 운동시설" :gyms="recentGyms" />
  </div>
</template>

<script>
import TrainerSection from "@/components/TrainerSection.vue";
import GymSection from "@/components/GymSection.vue";
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
    TrainerSection,
    GymSection
  },
  data() {
    return {
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
  }
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
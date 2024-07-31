<template>
  <div id="app" class="container">
    <div class="background">
      <div class="trainer-card" v-for="trainer in trainers" :key="trainer.id" @click="trainerClicked(trainer.id)">
        <img :src="trainer.image" alt="trainer image" class="card-image" />
        <div class="card-content">
          <div class="trainer-info">
            <div class="trainer-name">{{ trainer.name }}</div>
            <div class="trainer-location">{{ trainer.location }}</div>
          </div>
          <div class="trainer-price">{{ trainer.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trainers: [
        {
          id: 1,
          image: "image1.png", // 트레이너 이미지 경로
          name: "이민수 선생님",
          location: "서울특별시 ㅇㅇ구",
          price: "40,000원~/회당"
        },
        {
          id: 2,
          image: "image2.png", // 트레이너 이미지 경로
          name: "김창수 선생님",
          location: "서울특별시 ㅇㅇ구",
          price: "50,000원~/회당"
        },
        {
          id: 3,
          image: "image3.png", // 트레이너 이미지 경로
          name: "박철수 선생님",
          location: "서울특별시 ㅇㅇ구",
          price: "35,000원~/회당"
        },
        {
          id: 4,
          image: "image4.png", // 트레이너 이미지 경로
          name: "최승욱 선생님",
          location: "서울특별시 ㅇㅇ구",
          price: "60,000원~/회당"
        }
      ]
    };
  },
  methods: {
    trainerClicked(id) {
      console.log("Trainer clicked:", id);
      // 상세 페이지로 이동
      this.$router.push({ name: 'trainer-detail', params: { id } });
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
  overflow-y: scroll;
}

.background {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.trainer-card {
  position: relative;
  width: 45%;
  height: 60%; /* 원하는 비율로 변경 가능 */
  margin: 20px;
  padding: 20px;
  background: #fff;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card-image {
  width: 30%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
}

.card-content {
  width: 70%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.trainer-info {
  margin-bottom: 20px;
}

.trainer-name {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 25px;
  color: #000000;
}

.trainer-location {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 19px;
  color: #000000;
}

.trainer-price {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 25px;
  color: #000000;
  text-align: right;
}
</style>
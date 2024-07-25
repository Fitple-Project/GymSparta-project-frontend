<template>
  <div class="search-container">
    <div class="background-shadow">
      <div class="search">
        <div class="background-wrapper">
          <div class="background">
            <img class="SVG" alt="Svg" src="../assets/Reading_glasses.svg" />
            <div class="input">
              <input type="text" v-model="searchKeyword" placeholder="원하시는 운동을 검색해보세요" />
            </div>
          </div>
          <div class="button" @click="handleSearch">
            <img class="main-search-button" src="../assets/Main_Search_Button.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchContainer",
  data() {
    return {
      searchKeyword: ""
    };
  },
  methods: {
    handleSearch() {
      console.log("검색 버튼 클릭!");
      console.log("검색어:", this.searchKeyword);
    }
  }
};
</script>

<style scoped>
.search-container {
  margin-top: 60px; /* 헤더의 높이만큼 마진을 줘서 서치바가 헤더 아래에 위치하도록 합니다 */
  padding: 20px; /* 추가적인 패딩을 줄 수도 있습니다 */
  display: flex;
  justify-content: center; /* 가운데 정렬 */
}

.background-shadow {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 2px 16px #00000014;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%; /* 화면에 맞게 조정 */
  max-width: 800px; /* 헤더와 맞추기 위한 최대 너비 설정 */
}

.search {
  display: flex;
  align-items: center; /* 수직 정렬 */
  gap: 10px; /* 좌우 간격 설정 */
  width: 100%; /* 전체 너비를 사용하도록 설정 */
}

.background-wrapper {
  display: flex;
  align-items: center; /* 수직 정렬 */
  gap: 10px; /* 간격 설정 */
  width: 100%; /* 전체 너비 사용 */
}

.background {
  background-color: #f5f5f5;
  border-radius: 8px;
  height: 46px;
  overflow: hidden;
  position: relative;
  flex: 1; /* 남은 공간을 차지하도록 설정 */
}

.SVG {
  height: 20px;
  left: 14px;
  position: absolute;
  top: 14px;
  width: 20px;
}

.input {
  height: 19px;
  left: 42px;
  overflow: hidden;
  position: absolute;
  top: 14px;
  width: calc(100% - 142px); /* 남은 공간을 차지하도록 설정 */
}

.input input[type="text"] {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  font-family: "Inter-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  color: #c2c2c2;
}

.button {
  all: unset;
  background-color: #1273e4;
  border-radius: 10px;
  box-sizing: border-box;
  height: 48px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 15.1px;
  font-weight: 600;
  cursor: pointer; /* 클릭 이벤트를 작동하게 하기 위해 커서를 포인터로 설정합니다. */
}

.main-search-button {
  height: 40px;
  width: 120px;
}

</style>
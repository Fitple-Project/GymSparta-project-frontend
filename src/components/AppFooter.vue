<template>
  <footer class="footer">
    <div class="container">
      <!-- 기존 Footer HTML 구조 -->
      <div class="section customer-service">
        <h2 class="heading">고객센터</h2>
        <p class="operation-hours">운영 안함</p>
        <div class="buttons">
          <div class="button">
            <svg class="icon"><rect width="20" height="20" fill="#C2C2C2" /></svg>
            <span class="button-text">0000-0000</span>
          </div>
          <div class="button">
            <svg class="icon"><rect width="20" height="20" fill="#C2C2C2" /></svg>
            <span class="button-text">카카오 문의 하지마</span>
          </div>
        </div>
      </div>
      <div class="sections-wrapper">
        <div class="section">
          <h3 class="heading">회사</h3>
          <div class="links">
            <a href="#" class="link">회사소개</a>
          </div>
        </div>
        <div class="section">
          <h3 class="heading">서비스</h3>
          <div class="links">
            <a href="#" class="link" @click.prevent="showNotice">공지사항</a>
            <a href="#" class="link">자주 묻는 질문</a>
          </div>
        </div>
        <div class="section">
          <h3 class="heading">혜택</h3>
          <div class="links">
            <a href="#" class="link">이벤트</a>
            <a href="#" class="link">멤버십 혜택 안내</a>
          </div>
        </div>
      </div>
      <div class="horizontal-border"></div>
      <div class="company-info">
        <p>GymSparta 주소 : 서울 강남구 테헤란로44길 8 12층 (아이콘역삼빌딩) | 대표이사 : 이인빈 | 사업자등록번호 : 등록안함  <a href="#" class="link">사업자정보확인</a></p>
        <p>전자우편주소 : GymSparta@gmail.com | 통신판매번호 : 000-무허가-등록안함 | 관광사업자 등록번호 : 등록안함 | 전화번호 : 0000-0000 | 호스팅서비스제공자의 상호 표시 : GymSparta <br>GymSparta는 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</p>
        <div class="legal-links">
          <a href="#" class="link">이용약관</a>
          <a href="#" class="link">개인정보처리방침</a>
          <a href="#" class="link">소비자 분쟁해결 기준</a>
          <a href="#" class="link">콘텐츠산업진흥법에 의한 표시</a>
        </div>
        <p class="copyright">Copyright GymSparta Corp. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  methods: {
    showNotice() {
      this.$emit('show-modal');
    }
  }
};
</script>

<style scoped>
.footer {
  width: 100%;
  background: #FAFAFA;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.horizontal-border {
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  background: #F5F5F5;
  margin: 20px 0;
}

.sections-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.section {
  flex: 1; /* 각 섹션이 동일한 너비를 가지도록 설정 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

.heading {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16.875px;
  line-height: 20px;
  color: #707070;
  margin-bottom: 10px;
}

.operation-hours {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 13.2344px;
  line-height: 16px;
  color: #999999;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center; /* 버튼 가운데 정렬 */
}

.button {
  box-sizing: border-box;
  width: 142px;
  height: 48px;
  background: #FFFFFF;
  border: 2px solid #EBEBEB;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.button-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 15.375px;
  line-height: 19px;
  color: #333333;
}

.links {
  display: flex;
  flex-direction: column;
  align-items: center; /* 링크 가운데 정렬 */
}

.link {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 13.125px;
  line-height: 16px;
  color: #999999;
  margin-bottom: 8px;
}

.company-info {
  position: relative;
}

.company-info p {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 11.25px;
  line-height: 16px;
  color: #999999;
  margin-bottom: 8px;
  text-align: center; /* 가운데 정렬 추가 */
}

.legal-links {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  justify-content: center; /* 법적 링크 가운데 정렬 */
}

.copyright {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 11.25px;
  line-height: 16px;
  color: #999999;
  text-align: center; /* 저작권 텍스트 가운데 정렬 */
}

.icon {
  display: block; /* 아이콘 블록 요소로 설정 */
  margin: 0 auto 8px; /* 가운데 정렬 및 아래 여백 */
}
</style>
<html><head><base href="https://websim.creation.engine/" />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>공지 내용 상세 모달창</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 80%;
      max-width: 600px;
      animation: modalAppear 0.3s ease-out;
    }

    .modal-header {
      background-color: #F26921;
      color: white;
      padding: 15px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      margin: 0;
      font-size: 1.2em;
    }

    .close-button {
      background: none;
      border: none;
      color: white;
      font-size: 1.5em;
      cursor: pointer;
    }

    .modal-content {
      padding: 20px;
      max-height: 400px;
      overflow-y: auto;
    }

    .modal-footer {
      padding: 15px;
      text-align: right;
      border-top: 1px solid #e0e0e0;
    }

    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.3s;
    }

    .btn-primary {
      background-color: #F26921;
      color: white;
    }

    .btn-primary:hover {
      background-color: #F26921;
    }

    @keyframes modalAppear {
      from {
        opacity: 0;
        transform: translateY(-50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>
<body>
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">공지사항</h2>
      <button class="close-button">&times;</button>
    </div>
    <div class="modal-content">
      <h3>2023년 하반기 시스템 업데이트 안내</h3>
      <p>안녕하세요, 고객 여러분.</p>
      <p>당사는 더 나은 서비스 제공을 위해 2023년 9월 15일부터 9월 17일까지 시스템 업데이트를 진행할 예정입니다.</p>
      <p>업데이트 기간 동안 일부 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.</p>
      <h4>주요 업데이트 내용:</h4>
      <ul>
        <li>사용자 인터페이스 개선</li>
        <li>보안 시스템 강화</li>
        <li>새로운 기능 추가</li>
      </ul>
      <p>업데이트 완료 후 더욱 향상된 서비스로 찾아뵙겠습니다.</p>
      <p>감사합니다.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" id="confirmBtn">확인</button>
    </div>
  </div>
</div>

<script>
  document.querySelector('.close-button').addEventListener('click', closeModal);
  document.getElementById('confirmBtn').addEventListener('click', closeModal);

  function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.style.animation = 'fadeOut 0.3s';
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 300);
  }

  // 페이드 아웃 애니메이션을 위한 키프레임
  const style = document.createElement('style');
  style.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
  document.head.appendChild(style);
</script>
</body>
</html>
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 8080;

// MySQL 연결 설정
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'fitple_project'
});

// CORS 설정 - 특정 도메인에서만 요청 허용
app.use(cors({
  origin: '*', // 요청을 허용할 도메인
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // 자격 증명(쿠키 등)을 포함한 요청 허용
}));

// JSON 파싱
app.use(bodyParser.json());

// 헬스 체크 엔드포인트 추가
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.post('/api/stores/owners', async (req, res) => {
  const {
    store_name,
    store_address,
    intro,
    services,
    operating_hours,
    phone_number,
    memberships,
    ptConsultations,
    trainerList,
    ownerId
  } = req.body;

  // 요청 본문 출력
  console.log('Received payload:', req.body);

  // ownerId 필드가 있는지 확인
  if (ownerId === undefined) {
    return res.status(400).json({ error: 'ownerId is required' });
  }

  // 값이 undefined인 경우 null로 변환
  const params = [
    store_name || null,
    store_address || null,
    intro || null,
    services ? JSON.stringify(services) : null,
    operating_hours || null,
    phone_number || null,
    memberships ? JSON.stringify(memberships) : null,
    ptConsultations ? JSON.stringify(ptConsultations) : null,
    trainerList ? JSON.stringify(trainerList) : null,
    ownerId
  ];

  // 매개변수 출력
  console.log('Parameters:', params);

  try {
    const [result] = await db.execute(
      `INSERT INTO store (store_name, store_address, store_intro, services, operating_hours, phone_number, membership, pt_session, trainer_list, owner_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params
    );

    // 삽입 결과 출력
    console.log('Insert result:', result);

    res.status(201).json({ message: 'Store registered successfully!' });
  } catch (error) {
    console.error('Error during store registration:', error);
    res.status(500).json({ error: 'Store registration failed: ' + error.message });
  }
});

// /api/stores 엔드포인트 정의
app.get('/api/stores', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM store');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ error: 'Error fetching stores: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

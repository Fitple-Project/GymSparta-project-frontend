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

// CORS 설정
app.use(cors());

// JSON 파싱
app.use(bodyParser.json());

app.post('/stores/owners', async (req, res) => {
  const { name, address, intro, services, operatingHours, phoneNumber, membership, ptSession, trainerList } = req.body;

  // 요청 본문 출력
  console.log('Received payload:', req.body);

  try {
    const [result] = await db.execute(
      `INSERT INTO store (store_name, store_address, store_intro, services, operating_hours, phone_number, membership, pt_session, trainer_list)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, address, intro, services, operatingHours, phoneNumber, membership, ptSession, trainerList]
    );

    // 삽입 결과 출력
    console.log('Insert result:', result);

    res.status(201).send('Store registered successfully!');
  } catch (error) {
    console.error('Error during store registration:', error);
    res.status(500).send('Store registration failed: ' + error.message);
  }
});

app.get('/stores', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM store');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).send('Error fetching stores: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

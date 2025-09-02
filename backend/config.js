const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a pooled connection to MySQL. Pooling is important for serverless
// environments and high‑throughput APIs, as it avoids the overhead of
// establishing a new connection for every request.
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rodela_brand',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
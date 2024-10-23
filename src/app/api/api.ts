// src/lib/db.ts
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'moonrayz',
  database: 'students_db'
});

export default db;

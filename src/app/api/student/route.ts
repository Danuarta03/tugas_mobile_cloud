// src/app/api/students/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'students_db'
});

export async function GET(req: NextRequest) {
  const [rows] = await db.query('SELECT * FROM students');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, age, major } = body;
  await db.query('INSERT INTO students (name, age, major) VALUES (?, ?, ?)', [name, age, major]);
  return NextResponse.json({ message: 'Student created successfully' }, { status: 201 });
}

// src/app/api/students/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '../api';

export async function GET(_: NextRequest) {
  const [rows] = await db.query('SELECT * FROM students');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, age, major } = body;
  await db.query('INSERT INTO students (name, age, major) VALUES (?, ?, ?)', [name, age, major]);
  return NextResponse.json({ message: 'Student created successfully' }, { status: 201 });
}

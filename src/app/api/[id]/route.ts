// src/app/api/students/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'students_db'
});

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await db.query('DELETE FROM students WHERE id = ?', [id]);
  return NextResponse.json({ message: 'Student deleted successfully' });
}

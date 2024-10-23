// src/app/api/students/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '../api';

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await db.query('DELETE FROM students WHERE id = ?', [id]);
  return NextResponse.json({ message: 'Student deleted successfully' });
}

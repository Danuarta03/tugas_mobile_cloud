// src/components/dashboard.tsx
"use client";
import { useEffect, useState } from 'react';

interface Student {
  nim: number;
  name: string;
  age: number;
  major: string;
}

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', major: '' });

  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const createStudent = async () => {
    await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });
    setNewStudent({ name: '', age: '', major: '' });
    const res = await fetch('/api/students');
    setStudents(await res.json());
  };

  const deleteStudent = async (id: number) => {
    await fetch(`/api/students/${id}`, {
      method: 'DELETE',
    });
    const res = await fetch('/api/students');
    setStudents(await res.json());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Student Dashboard</h1>
      
      <div className="mb-4">
        <h2 className="text-xl">Create New Student</h2>
        <input
          style={{ color: 'black' }}
          className="border p-2 mb-2"
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          style={{ color: 'black' }}
          className="border p-2 mb-2"
          type="text"
          placeholder="Age"
          value={newStudent.age}
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
        />
        <input
          style={{ color: 'black' }}
          className="border p-2 mb-2"
          type="text"
          placeholder="Major"
          value={newStudent.major}
          onChange={(e) => setNewStudent({ ...newStudent, major: e.target.value })}
        />
        <button className="bg-blue-500 text-white p-2" onClick={createStudent}>
          Create
        </button>
      </div>

      <h2 className="text-xl mb-2">Students List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.nim} className="mb-2">
            {student.name}, {student.age}, {student.major}
            <button className="bg-red-500 text-white p-1 ml-2" onClick={() => deleteStudent(student.nim)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

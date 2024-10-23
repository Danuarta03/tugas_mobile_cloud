'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Definisikan tipe Mahasiswa untuk memastikan konsistensi data
type Mahasiswa = {
  nim: string;
  nama: string;
  umur: string;
  fakultas: string;
  jurusan: string;
  prodi: string;
};

export default function Dashboard() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [formData, setFormData] = useState<Mahasiswa>({
    nim: '',
    nama: '',
    umur: '',
    fakultas: '',
    jurusan: '',
    prodi: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get('/api/mahasiswa');
    setMahasiswa(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/mahasiswa', formData);
    fetchData();
  };

  const handleDelete = async (nim: string) => {
    await axios.delete(`/api/mahasiswa?id=${nim}`);
    fetchData();
  };

  const handleUpdate = async (mahasiswa: Mahasiswa) => {
    await axios.put('/api/mahasiswa', mahasiswa);
    fetchData();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Mahasiswa</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
      {['nim', 'nama', 'umur', 'fakultas', 'jurusan', 'prodi'].map((field) => (
  <input
    key={field}
    name={field}
    placeholder={field.toUpperCase()}
    value={formData[field as keyof Mahasiswa]} // Gunakan indexing yang benar
    onChange={handleChange}
    className="w-full p-2 border rounded"
  />
))}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Tambah</button>
      </form>

      <table className="w-full mt-6 border">
        <thead>
          <tr>
            <th>NIM</th><th>Nama</th><th>Umur</th><th>Fakultas</th><th>Jurusan</th><th>Prodi</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mhs) => (
            <tr key={mhs.nim} className="border-b">
              {Object.values(mhs).map((val, idx) => (
                <td key={idx} className="p-2">{val}</td>
              ))}
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleDelete(mhs.nim)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
                <button
                  onClick={() => handleUpdate(mhs)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

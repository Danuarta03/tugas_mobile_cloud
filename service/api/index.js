import db from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const [rows] = await db.query('SELECT * FROM mahasiswa');
      res.status(200).json(rows);
      break;
    case 'POST':
      const { nim, nama, umur, fakultas, jurusan, prodi } = req.body;
      await db.query('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?, ?)', [
        nim, nama, umur, fakultas, jurusan, prodi
      ]);
      res.status(201).json({ message: 'Data mahasiswa berhasil ditambahkan' });
      break;
    case 'DELETE':
      const { id } = req.query;
      await db.query('DELETE FROM mahasiswa WHERE nim = ?', [id]);
      res.status(200).json({ message: 'Data berhasil dihapus' });
      break;
    case 'PUT':
      const data = req.body;
      await db.query(
        'UPDATE mahasiswa SET nama = ?, umur = ?, fakultas = ?, jurusan = ?, prodi = ? WHERE nim = ?',
        [data.nama, data.umur, data.fakultas, data.jurusan, data.prodi, data.nim]
      );
      res.status(200).json({ message: 'Data berhasil diperbarui' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

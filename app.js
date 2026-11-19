const express = require('express');
const mysql = require('mysql2');
const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'db_crud_express'
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, hasil) => {
    if (err) throw err;
    res.render('index', { mahasiswa: hasil });
  });
});

app.post('/tambah', (req, res) => {
  const { nim, nama, jurusan } = req.body;
  db.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?, ?, ?)', [nim, nama, jurusan], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.get('/edit/:id', (req, res) => {
  db.query('SELECT * FROM mahasiswa WHERE id = ?', [req.params.id], (err, hasil) => {
    if (err) throw err;
    res.render('edit', { m: hasil[0] });
  });
});

app.post('/edit/:id', (req, res) => {
  const { nim, nama, jurusan } = req.body;
  db.query('UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ? WHERE id = ?', [nim, nama, jurusan, req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.get('/hapus/:id', (req, res) => {
  db.query('DELETE FROM mahasiswa WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));
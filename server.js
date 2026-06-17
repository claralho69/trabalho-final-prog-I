const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/filmes', (req, res) => {
    db.all('SELECT * FROM filmes ORDER BY titulo', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/filmes', (req, res) => {
    const { titulo, genero, nota } = req.body;
    if (!titulo || !genero || !nota) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    
    db.run('INSERT INTO filmes(titulo, genero, nota) VALUES(?, ?, ?)',
    [titulo, genero, nota],
    function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

app.put('/filmes/:id', (req, res) => {
    const { titulo, genero, nota } = req.body;
    db.run('UPDATE filmes SET titulo=?, genero=?, nota=? WHERE id=?',
    [titulo, genero, nota, req.params.id],
    function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ ok: true });
    });
});

app.delete('/filmes/:id', (req, res) => {
    db.run('DELETE FROM filmes WHERE id=?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ ok: true });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

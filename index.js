const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

// 🔒 Conexão com banco de dados usando variáveis de ambiente
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.pass,
  database: process.env.dbname
});

// 🌐 Testa a conexão
db.connect(err => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
  } else {
    console.log('🔗 Conectado ao MySQL com sucesso');
  }
});

// 📦 Rota para buscar tarefas
app.get('/tarefas', (req, res) => {
  const query = 'SELECT id, title, description FROM tasks ORDER BY id DESC LIMIT 10';

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Erro ao buscar tarefas:', err.message);
      return res.status(500).json({ erro: 'Erro no servidor' });
    }
    res.json(results);
  });
});

// 🚀 Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌍 API rodando na porta ${PORT}`);
});
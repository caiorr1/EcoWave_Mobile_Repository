const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Importar modelos
const db = require('./models');

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor EcoWave está rodando!');
});

// Endpoint para registrar um novo usuário
app.post('/api/register', async (req, res) => {
  try {
    const { nome_usuario, senha_hash, email, localizacao, foto_perfil } = req.body;
    const user = await db.User.create({
      nome_usuario,
      senha_hash,
      email,
      data_registro: new Date(),
      localizacao,
      foto_perfil
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha no registro do usuário' });
  }
});

// Endpoint para login de usuário
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha_hash } = req.body;
    const user = await db.User.findOne({ where: { email, senha_hash } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha no login' });
  }
});

// Conectar ao banco e iniciar o servidor
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}).catch(error => {
  console.error('Erro ao conectar ao banco de dados:', error);
});

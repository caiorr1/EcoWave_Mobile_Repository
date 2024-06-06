const express = require('express');
const bodyParser = require('body-parser');
const { Usuario, ItemReciclado } = require('./models/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para registro
app.post('/api/register', async (req, res) => {
  try {
    const { nome_usuario, email, senha_hash } = req.body;
    const novoUsuario = await Usuario.create({
      nome_usuario,
      email,
      senha_hash,
      data_registro: new Date()
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// Rota para login
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha_hash } = req.body;
    const usuario = await Usuario.findOne({ where: { email, senha_hash } });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(401).json({ message: 'Dados inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// Rota para adicionar item reciclado
app.post('/api/recycled-items', async (req, res) => {
  try {
    const { tipo_item, data_coleta, localizacao, quantidade } = req.body;
    const novoItem = await ItemReciclado.create({
      tipo_item,
      data_coleta,
      localizacao,
      quantidade
    });
    res.status(201).json(novoItem);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { sequelize, Usuario } = require('./models/db');
const Coleta = require('./models/coleta'); // Certifique-se de que o caminho está correto

const app = express();
const port = 3000;
const SECRET_KEY = '123';

app.use(cors());
app.use(bodyParser.json());

// Middleware para verificar o token
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do cabeçalho
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); // Log de erro detalhado
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Rota de registro com verificação de e-mail único
app.post('/api/register', async (req, res) => {
  const { nome_usuario, email, senha_hash } = req.body;
  try {
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('E-mail já está em uso.');
    }

    const hashedPassword = bcrypt.hashSync(senha_hash, 8);
    const newUser = await Usuario.create({ nome_usuario, email, senha_hash: hashedPassword });
    const token = jwt.sign({ id: newUser.usuario_id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error during registration:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// Rota para apagar usuário por ID
app.delete('/api/users/:id', verificarToken, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Error deleting user:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro ao excluir o usuário', error });
  }
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, senha_hash } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }
    const passwordIsValid = bcrypt.compareSync(senha_hash, user.senha_hash);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user.usuario_id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ auth: true, token });
  } catch (error) {
    console.error('Error during login:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// Rota para obter informações do usuário autenticado
app.get('/api/user', verificarToken, async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }
    const { usuario_id, nome_usuario, email } = user;
    res.status(200).json({ usuario_id, nome_usuario, email });
  } catch (error) {
    console.error('Error fetching user:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// Endpoint para adicionar coleta
app.post('/api/coletas', verificarToken, async (req, res) => {
  const { tipo_item, quantidade } = req.body;
  try {
    const novaColeta = await Coleta.create({
      tipo_item,
      quantidade,
      usuario_id: req.userId,
    });
    res.status(201).json(novaColeta);
  } catch (error) {
    console.error('Error adding collection:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro ao adicionar coleta', error });
  }
});

// Endpoint para atualizar uma coleta
app.put('/api/coletas/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { tipo_item, quantidade } = req.body;
  try {
    const coleta = await Coleta.findByPk(id);
    if (!coleta) {
      return res.status(404).json({ message: 'Coleta não encontrada' });
    }
    coleta.tipo_item = tipo_item;
    coleta.quantidade = quantidade;
    await coleta.save();
    res.status(200).json(coleta);
  } catch (error) {
    console.error('Error updating collection:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro ao atualizar coleta', error });
  }
});

// Endpoint para deletar uma coleta
app.delete('/api/coletas/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    const coleta = await Coleta.findByPk(id);
    if (!coleta) {
      return res.status(404).json({ message: 'Coleta não encontrada' });
    }
    await coleta.destroy();
    res.status(200).json({ message: 'Coleta deletada com sucesso' });
  } catch (error) {
    console.error('Error deleting collection:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro ao deletar coleta', error });
  }
});

// Endpoint para listar todos os itens coletados por usuário
app.get('/api/itens', verificarToken, async (req, res) => {
  try {
    const coletas = await Coleta.findAll({ where: { usuario_id: req.userId } });
    res.status(200).json(coletas);
  } catch (error) {
    console.error('Error fetching collections:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro ao buscar itens coletados', error });
  }
});

// Endpoint para listar todos os usuários
app.get('/api/users', verificarToken, async (req, res) => {
  try {
    const users = await Usuario.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Log de erro detalhado
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
});

sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});

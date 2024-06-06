const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { sequelize, Usuario } = require('./models/db');

const app = express();
const port = 3000;
const SECRET_KEY = '123';

app.use(cors());
app.use(bodyParser.json());

// Middleware para verificar o token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
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
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// Rota para apagar usuário por ID
app.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
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
    // Retornar informações do usuário, excluindo a senha
    const { usuario_id, nome_usuario, email } = user;
    res.status(200).json({ usuario_id, nome_usuario, email });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// Rota para listar todos os usuários
app.get('/api/users', async (req, res) => {
  try {
    const users = await Usuario.findAll({
      attributes: ['usuario_id', 'nome_usuario', 'email'] // Exclui o campo senha_hash
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

// Rota para atualizar um usuário
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { nome_usuario, email, senha_hash } = req.body;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const hashedPassword = senha_hash ? bcrypt.hashSync(senha_hash, 8) : user.senha_hash;

    await user.update({ nome_usuario, email, senha_hash: hashedPassword });
    res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
  }
});

sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});

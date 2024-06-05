const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Dados de usuário mockados
let users = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password123'
  }
];

// Middleware
app.use(bodyParser.json());

// Rota para login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    res.status(200).send({ message: 'Login realizado com sucesso', user });
  } else {
    res.status(401).send({ message: 'Dados inválidos' });
  }
});

// Rota para registro
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    res.status(400).send({ message: 'Usuário já registrado' });
  } else {
    const newUser = {
      id: users.length + 1,
      email,
      password
    };
    users.push(newUser);
    res.status(201).send({ message: 'Registro realizado com sucesso', user: newUser });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

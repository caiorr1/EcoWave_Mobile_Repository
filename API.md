
# API Documentation

## Base URL
`http://localhost:3000`

## Authentication
All endpoints (except for register and login) require a Bearer Token for authentication.

### Register User
**Endpoint:** `/api/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
```json
{
  "nome_usuario": "string",
  "email": "string",
  "senha_hash": "string"
}
```
- **Response:**
```json
{
  "token": "string",
  "user": {
    "usuario_id": "number",
    "nome_usuario": "string",
    "email": "string",
    "senha_hash": "string"
  }
}
```

### Login
**Endpoint:** `/api/login`
- **Method:** `POST`
- **Description:** Log in a user.
- **Request Body:**
```json
{
  "email": "string",
  "senha_hash": "string"
}
```
- **Response:**
```json
{
  "auth": true,
  "token": "string"
}
```

### Get Authenticated User
**Endpoint:** `/api/user`
- **Method:** `GET`
- **Description:** Get details of the authenticated user.
- **Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```
- **Response:**
```json
{
  "usuario_id": "number",
  "nome_usuario": "string",
  "email": "string"
}
```

### Add Collection
**Endpoint:** `/api/coletas`
- **Method:** `POST`
- **Description:** Add a new collection item.
- **Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```
- **Request Body:**
```json
{
  "tipo_item": "string",
  "quantidade": "number"
}
```
- **Response:**
```json
{
  "id": "number",
  "usuario_id": "number",
  "tipo_item": "string",
  "quantidade": "number"
}
```

### Update Collection
**Endpoint:** `/api/coletas/:id`
- **Method:** `PUT`
- **Description:** Update an existing collection item.
- **Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```
- **Request Body:**
```json
{
  "tipo_item": "string",
  "quantidade": "number"
}
```
- **Response:**
```json
{
  "id": "number",
  "usuario_id": "number",
  "tipo_item": "string",
  "quantidade": "number"
}
```

### Delete Collection
**Endpoint:** `/api/coletas/:id`
- **Method:** `DELETE`
- **Description:** Delete a collection item.
- **Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```
- **Response:**
```json
{
  "message": "Coleta deletada com sucesso"
}
```

### List User's Collections
**Endpoint:** `/api/itens`
- **Method:** `GET`
- **Description:** Get all collection items of the authenticated user.
- **Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```
- **Response:**
```json
[
  {
    "id": "number",
    "usuario_id": "number",
    "tipo_item": "string",
    "quantidade": "number"
  }
]
```

### List All Users
**Endpoint:** `/api/users`
- **Method:** `GET`
- **Description:** Get all registered users.
- **Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```
- **Response:**
```json
[
  {
    "usuario_id": "number",
    "nome_usuario": "string",
    "email": "string",
    "senha_hash": "string"
  }
]
```

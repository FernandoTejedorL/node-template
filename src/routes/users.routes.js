/*
GET -> Obtiene info
POST -> envía info
PATCH -> Actualiza info
DELETE -> Borra info

CRUD -> Create, Read, Update & Delete
*/
const express = require('express');
const usersRoutes = express.Router();

const usersController = require('../controllers/users.controller');

usersRoutes.post('/', usersController.createNewUser);

usersRoutes.get('/', usersController.getAllUsers);

usersRoutes.get('/:id', usersController.getUserById);

usersRoutes.patch('/:id', usersController.updateUser);

usersRoutes.delete('/:id', usersController.deleteUser);

module.exports = usersRoutes; // equivalente a export default

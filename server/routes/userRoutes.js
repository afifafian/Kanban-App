const routes = require('express').Router();
const UserController = require('../controllers/UserController')

//ROUTING TASK
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/googleSignIn', UserController.googleSignIn)

module.exports = routes
const routes = require('express').Router();
const TaskController = require('../controllers/TaskController')
const {authentication, authorization} = require('../middlewares/auth')

//ROUTING TASK
routes.get('/', authentication, TaskController.showTask)
routes.post('/', authentication, TaskController.addTask)
routes.get('/:id', authentication, authorization, TaskController.getTaskId)
routes.put('/:id', authentication, authorization, TaskController.editTask)
routes.delete('/:id', authentication, authorization, TaskController.deleteTask)

module.exports = routes
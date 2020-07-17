const routes = require('express').Router();
const taskRouter = require('./taskRoutes');
const userRouter = require('./userRoutes');

routes.use('/tasks', taskRouter);
routes.use('/users', userRouter);


module.exports = routes;
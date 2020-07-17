const routes = require('express').Router();
const taskRouter = require('./taskRoutes');
const userRouter = require('./userRoutes');

routes.get('/', function(req, res){
    res.send('lalala')
})
routes.use('/tasks', taskRouter);
routes.use('/users', userRouter);


module.exports = routes;
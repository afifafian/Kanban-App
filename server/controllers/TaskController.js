"use strict"

const {Task, User} = require('../models')

class TaskController {
    static showTask (req, res, next) {
        Task.findAll({
            order:[['createdAt', 'ASC']],
            include: [User]
        })
        .then(function(data){
            return res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
            next(err)
        })
    }
    static addTask (req, res, next) {
        const userId = req.userData.id
        let newTask =  {
            title: req.body.title,
            category: req.body.category,
            UserId: userId
        }
        Task.create(newTask)
        .then(function(data){
            return res.status(201).json(data)
        })
        .catch(function(err){
            next(err)
        })
    }
    static getTaskId (req, res, next) {
        const id = +req.params.id
        Task.findByPk(id)
        .then(function(data){
            if (!data) {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Task with ID: ${id} is not found!`
                }
            } else {
                return res.status(200).json(data)
            }
        })
        .catch(function(err){
            next(err)
        })
    }
    static editTask (req, res, next) {
        const id = +req.params.id
        let updateTask =  {
            title: req.body.title,
            category: req.body.category
        }
        Task.update(updateTask, {where: {id}})
        .then(function(data){
            if (data[0] === 1) {
                return res.status(200).json({message: 'Succesfully Updated Task!'})
            } else {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Task is not found!`
                }
            }
        })
        .catch(function(err){
            next(err)
        })
    }
    static deleteTask (req, res, next) {
        const id = +req.params.id
        Task.destroy({ where: {id} })
        .then(function(data){
            if (data) {
                return res.status(200).json({message: 'Succesfully Deleted Task!'})
            } else {
                throw {
                    name: "Validation_error",
                    statusCode: 404,
                    message: `Task with ID: ${id} is not found!`
                }
            }
        })
        .catch(function(err){
            next(err)
        })
    }
}

module.exports = TaskController
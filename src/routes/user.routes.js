const express = require('express')
const userRoutes = express()
const UserControllers = require('../controllers/usersControllers')
const userController = new UserControllers()

userRoutes.use(express.json())

userRoutes.delete('/delete', userController.deleteUsers)

userRoutes.put('/updateUser' , userController.updatePassword)

userRoutes.put('/updateEmailUsername', userController.updateEmailUsername)

userRoutes.post('/create', userController.createUser)

module.exports = userRoutes
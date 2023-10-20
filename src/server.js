require('express-async-errors')

const express = require('express')
const app = express()
const PORT = 4444

const userRoutes = require('./routes/user.routes')

const AppError = require('./utils/AppError')

app.use(userRoutes)

app.use(express.json())

app.use((error , request, response, next) =>{

    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status : "error",
            message: error.message
        })

    }
    console.error(error)

    return response.status(500).json({
        status : "500",
        message : "internal server Error",

    })
})

app.listen(PORT, console.log(`server is running on port: ${PORT}`))

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routes)
app.use(errorHandler)

app.listen(port, function(){
    console.log(`This app is listening on port: ${port}`)
})
const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const { config } = require ('dotenv')
config ()

const carRoutes = require('./routes/car.routes.js')

//Usamos express para los middlewares
const app = express()
app.use(bodyParser.json()) //Parseador de bodies

//Conectamos las base de datos
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection;

app.use('/car', carRoutes)

const port = process.env.PORT || 3000

app.listen( port, () => {
    console.log(`Servidor iniciado en el puerto: ${port}`)
})
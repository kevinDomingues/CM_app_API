// Configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
var cors = require('cors')

// Leitura do ficheiro JSON / MiddleWares
app.use(cors())

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// EndPoint
app.get('/', (req,res)=>{

    // Mostrar a requisição

    res.json({mensagem: 'Getting signal!' })

})

// Rotas da API              MELHORAR ISTO
const userRoutes = require('./routes/userRoutes')

app.use('/user', userRoutes)

const typologyRoutes = require('./routes/typologyRoutes')

app.use('/typology', typologyRoutes)

const typeRoutes = require('./routes/typeRoutes')

app.use('/type', typeRoutes)

// Entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.kfp5y.mongodb.net/CM?retryWrites=true&w=majority`
        )
    .then( () => {
        console.log('Connected to MongoDB!')
        app.listen(3000)
    })
    .catch( (err) => console.log(err) )


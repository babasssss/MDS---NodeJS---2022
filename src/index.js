
const express = require('express')
const app = express()
//On importe la BD
const connect = require('./data/helpers/db')
const User = require('./data/models/User')
//On importe le logger
const logger = require('./middlewares/logger')

//On dit à Express d'utiliser le logger en tant que Middleware
app.use(logger)
connect()

const port = 3000
app.get('/' , (req,res)=>{
    res.send('Hello world Express LOLILOU !')
})

app.post('/user' , (req,res)=>{

    //Creer un User 
    const user = new User({
    firstName : 'Michel',
    lastName : 'Toto',
    phone: '0123456789',
    email: 'michel.toto@gmail.com',
    password : 'totoMicheldu49'
    })

    //Inserer un User en BDDD
    user.save()
    .then((result) => console.log(result))
    .then((error) => console.log(error))

    res.send()
    
})

app.listen(port,()=>{
    console.log('Server is running on port '+port)
})
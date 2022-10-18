
const express = require('express')
const app = express()

//On importe le logger
const logger = require('./middlewares/logger')
//On dit à Ecprss d'utiliser le logger en tant que Middleware
app.use(logger)

const port = 3000

app.get('/' , (req,res)=>{
    res.send('Hello world Express LOLILOU !')
})

app.listen(port,()=>{
    console.log('Server is running on port '+port)
})
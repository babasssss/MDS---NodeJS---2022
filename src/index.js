
const express = require('express')
const app = express()
const port = 3000
// On importe la BD
const connect = require('./data/helpers/db')
connect()

// Paraametrage de Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// On importe le logger
const logger = require('./middlewares/logger')

// On dit à Express d'utiliser le logger en tant que Middleware
app.use(logger)

app.use('/users', require('./routes/users'))

app.get('/', (req, res) => {
  res.send('Hello world Express LOLILOU !')
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})

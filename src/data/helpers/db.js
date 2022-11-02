
const mongoose = require('mongoose')
const connect = () => {
    mongoose.connect('mongodb+srv://soreau:BastSor1$mongodb@cluster0.ui2ib8e.mongodb.net/NodeJS?retryWrites=true&w=majority')
    .then(()=>{
        console.log('Database connected')
    })
    .catch((error)=>{
        console.error('Error while connecting to database : ' +JSON.stringify(error))
    })
}


module.exports = connect
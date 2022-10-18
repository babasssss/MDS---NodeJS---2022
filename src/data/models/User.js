const mongoose = require('mongoose')

const  { Schema } = mongoose

const userSchema = new Schema({

    firstName: { 
        type:String 
    },
    lastName: { 
        type:String 
    },
    phone: { 
        type:String 
    },
    email: { 
        type:String, unique:true, match:/.+\@.+\..+/, require:true
    }, 
    password: { 
        type:String, 
        require: true 
    },

}, {timestamps:true})





module.exports = mongoose.models.User || mongoose.model('User',userSchema)
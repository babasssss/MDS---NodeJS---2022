const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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


//Remplace le mot de passe de l'utilisateur par un équivalaent crypté avant l'enregistrelent dans la BDD
userSchema.pre('save',function(next) {
    
    //Récup User
    const user = this
    //On look si le mdp à changer ou si l'utilisateur est nouveau
    if(this.isModified('password')|| this.isNew)
    {
        //ON génére du "sel" = une clé aléatoire pour haser le mot de passe
        bcrypt.genSalt(10,(error,salt)=>{
            if(error){
                throw new Error(error)
            }
            //On hash le mot de passe avec le "sel", PUIS on le remplace dans l'user que l'on n'a sauvgarder
            bcrypt.hash(user.password,salt,(error,hash)=>{
                if(error){
                    throw new Error(error)
                }
                user.password = hash
                //console.log(user)
                return next()
            })
        })
    }
})



module.exports = mongoose.models.User || mongoose.model('User',userSchema)
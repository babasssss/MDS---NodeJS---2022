const User = require('../../data/models/User')

const router = require('express').Router()


router.route('/users/:id')
.delete(async(req,res)=>{

   
    //const users = await User.deleteOne({"_id":user_id})
    

})










router.route('/')
.get(async(req,res)=>{
    const users = await User.find().select('-password')
    return res.send(users)
})
//CReate USERS
.post(async (req,res)=>{
    //return res.send()
    //REcuperation des paramètres de la requête 
    const user = req.body
    //Verif de la présence de l'email et password
    if (!user.email || !user.password){
        //si il manque une donnée, on renvoit une erreur 400 (Bad Request)
        return res.status(400).send('Missing data')
    }
    //console.log(user)


    try {

        //Creer un User SI les paramètre sont OK -> on continue
        const _user = new User({
            firstName : user.firstName,
            lastName : user.lastName,
            phone: user.phone,
            email: user.email,
            password : user.password,
            })
        
        // On enregistre l'utilisateur
        const savedUser = await _user.save()

        //On transfome le résultat en objet
        let saveUserObjet = savedUser.toObject()
        delete saveUserObjet.password
        //On renvoit l'utilisateur dans la reponce de l'API
        return res.send(saveUserObjet)
        
    } catch (error) {
        //En cas d'error on envoit une error 500 + le détail de l'error
        return res.status(500).send(error)
    }


})



module.exports = router
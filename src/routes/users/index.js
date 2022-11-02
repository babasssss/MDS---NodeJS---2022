const User = require('../../data/models/User')

const router = require('express').Router()





router.route('/:id')
//Select USERS via ID
.get(async(req,res)=>{
    const params=req.params
    

    if(!params.id){
        return res.status(400).send('Missing ID')
    }

    try {
        //On recuper les infos de users dans la BDD
        const user = await User.findById(params.id).select('-password')
        const userObjet = user.toObject()
    
        return res.send(userObjet)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }

})

//Delect User
.delete(async(req,res)=>{
    const params=req.params
    // On verif la présence de l'id dans l'url/requete
    if(!params.id){
        return res.status(400).send('Missing ID')
    }
    try {
        //On supprime l'user grace a la méthode findByIdAndDelete
        await User.findByIdAndDelete(params.id)
        return res.send(`User with ID ${params.id} as been deleted`)
        
    } catch (error) {
        //Renvoi error serveur
        console.error(error)
        return res.status(500).send(error)
    }

})

//Update User
.patch(async(req,res)=>{
    const params=req.params
    const user = req.body
    // On verif la présence de l'id dans l'url/requete
    if(!params.id){
        return res.status(400).send('Missing ID')
    }
    // On verif la présence d'un body dans l'url/requete
    if(!user){
        return res.status(400).send('Missing user')
    }


    try {
        //On met a jour l'user grace a la méthode findByIdAndUpdate
        const userUpdated = await User.findByIdAndUpdate(params.id, user, {new: true}).select('-password')
        const userObjet = userUpdated.toObject()
        return res.send(userObjet)
        
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }

})



//Route standard
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
const User = require('../data/models/User')

const getUsers = async () => {
  const users = await User.find().select('-password')
  return users
}
const createUsers = async (user) => {
// Verif de la présence de l'email et password
  if (!user.email || !user.password) {
  // si il manque une donnée, on renvoit une erreur 400 (Bad Request)
    // return res.status(400).send('Missing data')
    throw new Error('Missing data')
  }
  // console.log(user)

  // Creer un User SI les paramètre sont OK -> on continue
  const _user = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password
  })

  // On enregistre l'utilisateur
  const savedUser = await _user.save()

  // On transfome le résultat en objet
  const saveUserObjet = savedUser.toObject()
  delete saveUserObjet.password
  // On renvoit l'utilisateur dans la reponce de l'API
  return saveUserObjet
}

const getUserById = async (id) => {
  if (!id) {
    throw new Error('Missing ID')
  }

  // On recuper les infos de users dans la BDD
  const user = await User.findById(id).select('-password')
  const userObjet = user.toObject()
  return userObjet
}

const updateUserById = async (id, user) => {
  if (!id) {
    throw new Error('Missing ID')
  }
  if (!user) {
    throw new Error('Missing user')
  }

  // On met a jour l'user grace a la méthode findByIdAndUpdate
  const userUpdated = await User.findByIdAndUpdate(id, user, { new: true }).select('-password')
  const userObjet = userUpdated.toObject()
  return userObjet
}

const deleteUserById = async (id) => {
  // On verif la présence de l'id dans l'url/requete
  if (!id) {
    throw new Error('Missing ID')
  }
  // On supprime l'user grace a la méthode findByIdAndDelete
  await User.findByIdAndDelete(id)
}

module.exports = {
  getUsers,
  createUsers,
  getUserById,
  updateUserById,
  deleteUserById
}

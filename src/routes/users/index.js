const { getUsers, createUsers, getUserById, updateUserById, deleteUserById } = require('../../controller/users.controller')
const User = require('../../data/models/User')

const router = require('express').Router()

router.route('/:id')
// Select USERS via ID
  .get(async (req, res) => {
    const params = req.params

    if (!params.id) {
      return res.status(400).send('Missing ID')
    }

    try {
      const user = getUserById(req.params.id)
      return res.send(user)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

// Delect User
  .delete(async (req, res) => {
    try {
      await deleteUserById(req.params.id)
      return res.send(`User with ID ${req.params.id} as been deleted`)
    } catch (error) {
      // Renvoi error serveur
      console.error(error)
      return res.status(500).send(error)
    }
  })

// Update User
  .patch(async (req, res) => {
    try {
      const user = await updateUserById(req.params.id, req.body)
      return res.send(user)
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  })

// Route standard
router.route('/')
  .get(async (req, res) => {
    const users = await getUsers()
    return res.send(users)
  })
// CReate USERS
  .post(async (req, res) => {
    // return res.send()
    // REcuperation des paramètres de la requête

    try {
      const userCreated = await createUsers(req.body)
      return res.send(userCreated)
    } catch (error) {
      // En cas d'error on envoit une error 500 + le détail de l'error
      return res.status(500).send(error)
    }
  })

module.exports = router

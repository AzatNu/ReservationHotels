const express = require('express')
const router = express.Router({ mergeParams: true })
const { getUser, deleteUser, editRole } = require('../controllers/user')
const hasRole = require('../middlewares/hasRole')
const authenticated = require('../middlewares/authenticated')
const ROLES = require('../constants/role')
const  mapUser  = require('../helper/mapUser')

router.get('/:id', authenticated, hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const user = await getUser(req.params.id)
    res.send({ data: mapUser(user) })
})

router.get('/', authenticated, hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const users = await getUser()
    res.send({ data: users.map(mapUser) })
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id)
    res.send({})
})

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const newUser = await editRole(req.params.id, { role_id: req.body.role_id })
    res.send({ data: mapUser(newUser) })
})

module.exports = router

const express = require('express')
const router = express.Router({ mergeParams: true })
const { getRooms, getRoomById, deleteRoom, postRoom } = require('../controllers/room')
const hasRole = require('../middlewares/hasRole')
const authenticated = require('../middlewares/authenticated')
const ROLES = require('../constants/role')

router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    try {
        const room = await postRoom(req.body);
        res.send({ data: room })
    } catch (err) {
        res.send({
            error: "При попытке создать комнату произошла ошибка"
        })
    }
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    await deleteRoom(req.params.id)
    res.send({})
})

router.get('/:id', authenticated, hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const room = await getRoomById(req.params.id)
    res.send({ data: room })
})

router.get('/', authenticated, hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const rooms = await getRooms()
    res.send({ data: rooms })
})

module.exports = router

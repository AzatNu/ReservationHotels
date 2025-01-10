const express = require('express')
const router = express.Router({ mergeParams: true })
const { getRservations, getReservationByRoomId, postReservation, deleteReservationById, editReservationById } = require('../controllers/reservation')
const hasRole = require('../middlewares/hasRole')
const authenticated = require('../middlewares/authenticated')
const ROLES = require('../constants/role')


router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        const reservation = await postReservation(req.body)
        res.send({ data: reservation })
    } catch (err) {
        res.send({
            error: "При попытке создать бронь произошла ошибка"
        })
    }
})
router.patch('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        const reservation = await editReservationById(req.params.id, req.body)
        res.send({ data: reservation })
    } catch (err) {
        res.send({
            error: "При попытке изменить бронь произошла ошибка"
        })
    }
})

router.get('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        const reservations = await getReservationByRoomId(req.params.id)
        res.send({ data: reservations })
    } catch (err) {
        res.send({
            error: "При попытке получить бронь произошла ошибка"
        })
    }
})

router.get('/', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        const reservations = await getRservations()
        res.send({ data: reservations })
    } catch (err) {
        res.send({
            error: err.message
        })
    }
})
router.delete('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    await deleteReservationById(req.params.id)
    res.send({})
})
module.exports = router;


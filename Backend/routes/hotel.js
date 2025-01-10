const express = require('express')
const router = express.Router( { mergeParams: true } )
const { getHotels, getHotelById } = require('../controllers/hotel')
const  hasRole   = require('../middlewares/hasRole')
const authenticated = require('../middlewares/authenticated')
const ROLES = require('../constants/role')


router.get('/:id', authenticated, hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const hotel = await getHotelById(req.params.id)
    res.send({ data: hotel })
})

router.get('/', authenticated, hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const hotels = await getHotels()
    res.send({ data: hotels })
})


module.exports = router
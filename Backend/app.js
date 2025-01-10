const express = require('express');
const mongoose = require('mongoose');
const mapUser = require('./helper/mapUser');
const mapReservation = require('./helper/mapReservation');
const cookieParser = require('cookie-parser');
const authenticated = require('./middlewares/authenticated');
const hasRole = require('./middlewares/hasRole');
const ROLES = require('./constants/role');
const { register, login, getUser, getRoles, deleteUser, editRole } = require('./controllers/user');
const { getHotels, getHotelById } = require('./controllers/hotel');
const { getRservations, getReservationByRoomId, postReservation, deleteReservationById, editReservationById } = require('./controllers/reservation')
const { getRooms, getRoomById, deleteRoom, postRoom } = require('./controllers/room');
const port = 3005
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`../Fronted/build`))
app.use(cookieParser())
app.use(express.json())

app.post("/login", async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password);
        res.cookie("token", token, {
            httpOnly: true
        }).send({
            error: null,
            user: mapUser(user)
        });
    } catch (error) {
        res.send({
            error: error.message || "Произошла неизвестная ошибка"
        });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { user, token } = await register(req.body.login, req.body.password);
        res.cookie("token", token, {
            httpOnly: true
        });
        res.send({
            error: null,
            user: mapUser(user)
        });
    }
    catch (error) {
        res.send({
            error: "Логин занят"
        });
    }
});
app.post('/logout', (req, res) => {
    res.cookie("token", "", {
        httpOnly: true
    })
    res.send({})
})
app.use(authenticated);

app.post('/reservations', hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        const reservation = await postReservation(req.body)
        res.send({ data: reservation })
    } catch (err) {
        res.send({
            error: "При попытке создать бронь произошла ошибка"
        })
    }
})
app.patch('/reservations/:id', hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        const reservation = await editReservationById(req.params.id, req.body)
        res.send({ data: mapReservation(reservation) })
    } catch (err) {
        res.send({
            error: "При попытке изменить бронь произошла ошибка"
        })
    }
})

app.get('/reservations/:id', hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        const reservations = await getReservationByRoomId(req.params.id)
        res.send({ data: reservations })
    } catch (err) {
        res.send({
            error: "При попытке получить бронь произошла ошибка"
        })
    }
})

app.get('/reservations', hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    try {
        const reservations = await getRservations( )
        res.send({ data: reservations })
    } catch (err) {
        res.send({
            error: "При попытке получить бронь произошла ошибка"
        })
    }
})
app.post('/rooms', hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    try {
        const room = await postRoom(req.body);
        res.send({ data: room })
    } catch (err) {
        res.send({
            error: "При попытке создать комнату произошла ошибка"
        })
    }
});

app.delete('/rooms/:id', hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    await deleteRoom(req.params.id)
    res.send({})
})

app.get('/rooms/:id', hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const room = await getRoomById(req.params.id)
    res.send({ data: room })
})

app.get('/rooms', hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const rooms = await getRooms()
    res.send({ data: rooms })
})

app.get('/hotels/:id', hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const hotel = await getHotelById(req.params.id)
    res.send({ data: hotel })
})

app.get('/hotels', hasRole([ROLES.USER, ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const hotels = await getHotels()
    res.send({ data: hotels })
})


app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUser()
    res.send({ data: users.map(mapUser) })
})

app.delete('/reservations/:id', hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
    await deleteReservationById(req.params.id)
    res.send({})
})

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id)
    res.send({})
})

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newUser = await editRole(req.params.id, { role_id: req.body.role_id })
    res.send({ data: mapUser(newUser) })
})

mongoose.connect('mongodb+srv://azattix:Azattix12@cluster0.oebxh.mongodb.net/easyReservation?retryWrites=true&w=majority').then(() => {
    app.listen(port, () => {
        console.log(`База данных подключена на порту ${port}`)
    })
}).catch((err) => {
    console.error(err);
    res.status(500).send({
        error: "Произошла ошибка на сервере"
    });

})


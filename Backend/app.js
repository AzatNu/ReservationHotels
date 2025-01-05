const express = require('express');
const mongoose = require('mongoose');
const mapUser = require('./helper/mapUser');
const cookieParser = require('cookie-parser');
const { register, login } = require('./controllers/user');

const port = 3005
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.post('/register', async (req, res) => {
    try {
        const { user, token } = await register(req.body.login, req.body.password)
        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) })
    } catch (err) {
        res.send({
            error: err.message || 'Упс, при регистрации произошла ошибка. Попробуйте позже'
        })
    }
})


app.post('/login', async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password,)
        res.cookie('token', token, { httpOnly: true })
        res.send({ error: null, user })
    } catch (err) {
        res.send({
            error: err.message || 'Упс, при регистрации произошла ошибка. Попробуйте позже'
        })
    }
})
app.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true })
    res.send({})
})


mongoose.connect('mongodb+srv://azattix:Azattix12@cluster0.oebxh.mongodb.net/easyReservation?', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(port, () => {
        console.log(`База данных подключена на порту ${port}`)
    })
}).catch((err) => {
    console.log(err)
})



const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const port = 3005
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static(`../Fronted/build`))
app.use(cookieParser())
app.use(express.json())

app.use('/', routes);

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


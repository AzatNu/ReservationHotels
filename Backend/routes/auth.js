const express = require("express");
const mapUser = require("../helper/mapUser");
const router = express.Router({ mergeParams: true });
const { login, register } = require("../controllers/user");
router.post("/login", async (req, res) => {
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
router.post("/register", async (req, res) => {
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
router.post('/logout', (req, res) => {
    res.cookie("token", "", {
        httpOnly: true
    })
    res.send({})
})
module.exports = router;
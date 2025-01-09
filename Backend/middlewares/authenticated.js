const User = require("../models/user");
const { verify } = require("../helper/token");

module.exports = async (req, res, next) => {
    try {
        const tokenData = verify(req.cookies.token);
        const user = await User.findById({ _id: tokenData._id });
        if (!user) {
            res.status(401).send({ error: "Пользователь не авторизован" });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Неверный токен" });
    }
};
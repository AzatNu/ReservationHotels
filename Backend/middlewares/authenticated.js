
const User = require('../models/user');
const { verify } = require('../helper/token');

module.exports = async (req, res, next) => {
    const tokenData = verify(req.cookies.token);
    const user = await User.findById({ _id: tokenData.id });
    if (!user) {
        res.send({
            error: 'Пользователь не найден'
        });
        return
    }
    req.user = user;
    next();
}
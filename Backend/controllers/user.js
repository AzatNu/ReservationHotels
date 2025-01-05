const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generate } = require('../helper/token');
const register = async (login, password) => {
    if (!login || !password) {
        throw new Error('Пароль или логин не может быть пустым');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ login, password: hashedPassword });
    const token = generate({ id: user._id });
    return {
        user,
        token
    }
}
const login = async (login, password) => {
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error('Пользователь не найден');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Неверный пароль');
    }

    const token = generate({ id: user._id });
    return {
        user,
        token
    }
}
const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
        throw new Error('Пользователь не найден');
    }
}

module.exports = {
    register,
    login,
    deleteUser
}

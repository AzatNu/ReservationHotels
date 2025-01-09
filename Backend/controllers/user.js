const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generate } = require('../helper/token');
const ROLES = require('../constants/role');
const register = async (login, password) => {
    if (!password) {
        throw new Error("Пароль пустой");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ login, password: passwordHash });
    const token = generate({ _id: user._id });
    return { user, token };

}
const login = async (login, password) => {
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error("Пользователь c таким логином не зарегистрирован");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Неверный пароль");
    }
    const token = generate({ _id: user._id });
    return { user, token };
}
const getUser = async () => {
    return User.find()
}
const getRoles = () => {
    return [
        { id: ROLES.ADMIN, name: 'admin' },
        { id: ROLES.MODERATOR, name: 'moderator' },
        { id: ROLES.USER, name: 'user' },
        { id: ROLES.GUEST, name: 'guest' },]
}
const deleteUser = async (id) => {
    return User.deleteOne({ _id: id })
}
const editRole = async (id, role) => {
    return User.findByIdAndUpdate(id, role, { returnDocument: 'after' })
}

module.exports = {
    register,
    login,
    getUser,
    getRoles,
    deleteUser,
    editRole
}

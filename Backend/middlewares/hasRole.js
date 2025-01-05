
module.exports = async (roles) => {

    return async (req, res, next) => {
        if (!roles.includes(req.user.role_id)) {
            res.send({ error: "Доступ запрещен" });
            return;
        }
        next();
    }
}
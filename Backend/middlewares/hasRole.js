module.exports = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role_id)) {
            return res.status(403).send({ error: "Доступ запрещен" });
        }
        next();
    };
};

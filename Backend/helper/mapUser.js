module.exports = (user) => {
    return {
        id: user._id,
        login: user.login,
        role_id: user.role_id,
        registration_at: user.createdAt
    };
};


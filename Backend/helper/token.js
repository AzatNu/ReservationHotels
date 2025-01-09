const jwt = require("jsonwebtoken");
const sign = "azattix";


module.exports.generate = (data) => {
    return jwt.sign(data, sign, { expiresIn: "12d" })
}

module.exports.verify = (token) => {
    return jwt.verify(token, sign) 
}


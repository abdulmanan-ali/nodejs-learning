const jwt = require("jsonwebtoken");
const secret = "1234$abc";

const setUser = (user) => {
    return jwt.sign(
        {
            _id: user.id,
            email: user.email,
        },
        secret
    );
};

const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { setUser, getUser };

const { validateToken } = require("../utils/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) return next();

        try {
            const payload = validateToken(tokenCookieValue); 
            req.user = payload;
            res.locals.user = req.user;
        } catch (error) {
            console.error("Invalid token:", error);
        }

        return next();
    };
}

module.exports = { checkForAuthenticationCookie };
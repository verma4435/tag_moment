const jwt = require('jsonwebtoken');
const authService = require('../service/auth.service');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @class AuthMiddleware
 */
class AuthMiddleware {

    async authToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({ data: null, msg: 'Un-Authorized Access(Missing accessToken)' });
        }
        try {
            let userData = await jwt.verify(accessToken, JWT_SECRET);
            if (userData && userData.id) {
                let userMetaData = await authService.authUser(userData.id);
                if (userMetaData) {
                    req.user = userMetaData;
                    next();
                } else {
                    return res.status(401).json({ data: null, msg: 'Invalid token' });
                }
            } else {
                return res.status(401).json({ data: null, msg: 'Invalid token or expired token' });
            }
        } catch (err) {
            return res.status(401).json({ data: null, msg: 'Auth failed' });
        }
    }
}

module.exports = new AuthMiddleware;
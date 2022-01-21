const jwt = require('jsonwebtoken');
const authService = require('../service/auth.service');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @class AuthController
 */
class AuthController {

    /**
     * login - function to handle login of a user
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     * @author Amit Verma<verma4435@gmail.com>
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await authService.login({ email, password });
            const token = jwt.sign({ id: user.id }, JWT_SECRET);

            return res.status(200).json({ data: token, msg: 'success' });
        } catch (err) {
            console.log(err);
            return res.status(404).json({ data: null, msg: err.message });
        }
    }

    /**
     * register - function to handle user register
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     * @author Amit Verma<verma4435@gmail.com>
     */
    async register(req, res) {
        try {

            const { email, password, city, fullname } = req.body;

            const userRegiser = await authService.register({ email, password, city, fullname });

            return res.status(201).json({ data: userRegiser, msg: 'success' });
        } catch (err) {
            return res.status(404).json({ data: null, msg: err.message });
        }
    }
}

module.exports = new AuthController();
const userModel = require('../model/user.model');

/**
 * @class AuthService
 */
class AuthService {
    /**
     * login -  function for login logic
     * 
     * @param {*} param0 
     * @returns 
     * @author Amit Verma <verma4435@gmail.com>
     */
    async login({ email, password }) {
        try {
            const user = await userModel.getUserByEmail({ email });
            if (!user) throw new Error('user not found');
            if (user.password != password) throw new Error('Invalid cred');

            return user;
        } catch (err) {
            throw err;
        }
    }

    /**
     * register -  function for register logic
     * 
     * @param {*} param0 
     * @returns 
     * @author Amit Verma <verma4435@gmail.com>
     */
    async register({ email, password, fullname, city }) {
        try {
            const isUserExistsObj = await userModel.getUserByEmail({ email });
            if (isUserExistsObj) throw new Error('user already exists');

            const userCreateStatus = await userModel.create({ email, password, fullname, city });

            return userCreateStatus;
        } catch (err) {
            throw err;
        }
    }

    /**
     * authUser -  function for authUser logic
     * 
     * @param {*} id 
     * @returns 
     * @author Amit Verma <verma4435@gmail.com>
     */
    async authUser(id) {
        try {
            const userData = await userModel.getUserById(id);
            if (!userData) throw new Error('user not found');
            return userData;
        } catch (err) {
            throw err;
        }
    }
}
module.exports = new AuthService();
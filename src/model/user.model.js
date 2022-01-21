const userMongoModel = require('../schema/user.schema');

/**
 * @class UserModel
 */
class UserModel {
    /**
     * create - function to create a user
     * 
     * @param {*} param0 
     * @returns
     * @author Amit Verma<verma4435@gmail.com> 
     */
    async create({ ...userData }) {
        return await userMongoModel.create({ ...userData });
    }

    /**
     * getUserByEmail - function to get user by email
     * 
     * @param {*} param0 
     * @returns 
     * @author Amit Verma<verma4435@gmail.com>
     */
    async getUserByEmail({ email }) {
        return await userMongoModel.findOne({ email });
    }

    /**
     * getUserById - function to get the user by id
     * 
     * @param {*} id 
     * @returns 
     * @author Amit Verma<verma4435@gmail.com>
     */
    async getUserById(id) {
        return await userMongoModel.findOne({ _id: id });
    }
}

module.exports = new UserModel;
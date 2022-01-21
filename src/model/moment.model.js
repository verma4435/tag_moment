const momentMongoModel = require('../schema/moment.schema');

/**
 * @class MomentModel
 */
class MomentModel {

    /**
     * create - function to create a moment
     * 
     * @param {*} param0 
     * @returns
     * @author Amit Verma<verma4435@gmail.com> 
     */
    async create({ ...userData }) {
        return await momentMongoModel.create({ ...userData });
    }

    /**
     * getMoments - funtion to get the moment from mongo
     * 
     * @param {*} param0 
     * @returns 
     * @author Amit Verma<verma4435@gmail.com>
     */
    async getMoments({ user_id }) {
        return await momentMongoModel.find({ user_id }).lean();
    }
}

module.exports = new MomentModel;
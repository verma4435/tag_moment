const userModel = require('../model/user.model');
const momentModel = require('../model/moment.model');

class MomentService {

    /**
     * getMoments - function to get moments
     * 
     * @param {*} param0 
     * @returns
     * @author Amit Verma<verma4435@gmail.com> 
     */
    async getMoments({ user_id }) {
        try {
            const momentData = await momentModel.getMoments({ user_id });
            if (!momentData || momentData && !momentData.length) throw Error('No data');
            return momentData;
        } catch (err) {
            throw err;
        }
    }

    /**
     * createMoment - function to create a moment
     * 
     * @param {*} param0 
     * @returns
     * @author Amit Verma<verma4435@gmail.com> 
     */
    async createMoment({ comments, tags, user_id, filepath }) {
        try {
            const momentCreateStatus = await momentModel.create({ comments, tags, user_id, filepath });

            return momentCreateStatus;
        } catch (err) {
            throw err;
        }
    }
}
module.exports = new MomentService();
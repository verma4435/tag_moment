const path = require('path');
const utils = require('util')
const multer = require('multer');
const momentService = require('../service/moment.service');

const API_BASE_URL = process.env.API_BASE_URL || 'localhost:3001';
// multer setup
const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, path.join(__dirname.split('src')[0], 'public/'));
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname.toLowerCase().split(' ').join('-'));
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true);
    }
}).single('file');

// promisify the upload
const fileUpload = utils.promisify(upload);

/**
 * @class MomentController
 */
class MomentController {

    /**
     * getMoments - function to handle get moment request
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     * @author Amit Verma<verma4435@gmail.com>
     */
    async getMoments(req, res) {
        try {
            const { _id } = req.user;

            let moments = await momentService.getMoments({ user_id: _id });

            if (!moments.length) return res.status(404).json({ data: [], msg: 'no records found' });

            moments = moments.map(m => ({ ...m, donwloadLink: API_BASE_URL + m.filepath ? m.filepath.split('public')[1] : '' }))

            return res.status(200).json({ data: moments, msg: 'success' });
        } catch (err) {
            console.log(err);
            return res.status(404).json({ data: null, msg: err.message });
        }
    }

    /**
     * postMoment - function to handle post moment request
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     * @author Amit Verma<verma4435@gmail.com>
     */
    async postMoment(req, res) {
        try {

            const { _id } = req.user;

            // file upload
            await fileUpload(req, res);
            if (req.file == undefined) {
                return res.json({ code: 400, message: 'please upload file.', error: "please upload file.", data: null });
            }

            // file related variables
            const file = req.file;
            const filepath = file.path;

            const { comment, tags } = JSON.parse(req.body.data);
            const momentCreate = await momentService.createMoment({ comment, tags, user_id: _id, filepath });

            return res.status(201).json({ data: momentCreate, msg: 'success' });
        } catch (err) {
            return res.status(404).json({ data: null, msg: err.message });
        }
    }
}

module.exports = new MomentController();
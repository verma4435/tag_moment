const express = require('express');
const AuthRoutes = require('./src/route/auth.routes');
const authMiddleware = require('./src/middleware/auth.middleware');
const MomentRoutes = require('./src/route/moment.routes');
class MainRouters {
    constructor() {
        this.router = express.Router();
        this.core();
    }

    core() {

        this.router.use('/auth', new AuthRoutes().getRoutes());

        this.router.use(authMiddleware.authToken);
        // middleware for auth
        this.router.use('/moment', new MomentRoutes().getRoutes());
        this.router.use('/user', (req, res) => { res.send('user') });
        this.router.use('/tag', (req, res) => { res.send('tags') });


        /**
         * router to handle unwanted routes
         */
        this.router.all('*', (req, res) => {
            return res.status(404).json({
                msg: 'routes no found'
            });
        });

    }

    getRoutes() {

        return this.router;
    }
}

module.exports = MainRouters;
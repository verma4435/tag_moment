const express = require('express');
const momentController = require('../controller/moment.controller');

/**
 * @class MomentRoutes
 */
class MomentRoutes {
    constructor() {
        this.routes = express.Router();
        this.core();
    }

    core() {
        this.routes.get('/', momentController.getMoments);
        this.routes.post('/', momentController.postMoment);
    }
    getRoutes() {
        return this.routes;
    }
}

module.exports = MomentRoutes;
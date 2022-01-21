const express = require('express');
const authController = require('../controller/auth.controller');

/**
 * @class AuthRoutes
 */
class AuthRoutes {
    constructor() {
        this.routes = express.Router();
        this.core();
    }

    core() {
        this.routes.post('/login', authController.login);
        this.routes.post('/register', authController.register);
    }
    getRoutes() {
        return this.routes;
    }
}

module.exports = AuthRoutes;
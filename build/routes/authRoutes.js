"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var AuthRoutes;
(function (AuthRoutes) {
    AuthRoutes.router = (0, express_1.Router)();
    AuthRoutes.router.post('/register', authController_1.AuthController.register);
    AuthRoutes.router.post('/login', authController_1.AuthController.login);
})(AuthRoutes || (exports.AuthRoutes = AuthRoutes = {}));
//# sourceMappingURL=authRoutes.js.map
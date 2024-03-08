"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
/**
 * AuthMiddleware
 */
var AuthMiddleware;
(function (AuthMiddleware) {
    function verifyToken(req, res, next) {
        var token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            req.userId = decoded.userId;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
    AuthMiddleware.verifyToken = verifyToken;
})(AuthMiddleware || (exports.AuthMiddleware = AuthMiddleware = {}));
//# sourceMappingURL=authMiddleware.js.map
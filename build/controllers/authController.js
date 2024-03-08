"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var User_1 = require("../entity/User");
var data_source_1 = require("../data-source");
var JWT_SECRET = process.env.JWT_SECRET;
/**
 * User repository
 * @type {Repository<User>}
 */
var userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
/**
 * AuthController
 */
var AuthController;
(function (AuthController) {
    /**
     * Register a new user
     * @param {e.Request} req
     * @param {e.Response} res
     * @returns {Promise<void | e.Response>}
     */
    function register(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, username, plainPassword, existingEmailUser, existingUser, password, newUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, email = _a.email, username = _a.username, plainPassword = _a.password;
                        return [4 /*yield*/, userRepository.findOneBy({ email: email })];
                    case 1:
                        existingEmailUser = _b.sent();
                        if (existingEmailUser) {
                            return [2 /*return*/, res.status(400).json({ message: 'Email address already exists' })];
                        }
                        return [4 /*yield*/, userRepository.findOneBy({ username: username })];
                    case 2:
                        existingUser = _b.sent();
                        if (existingUser) {
                            return [2 /*return*/, res.status(400).json({ message: 'Username already exists' })];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(plainPassword, 10)];
                    case 3:
                        password = _b.sent();
                        return [4 /*yield*/, userRepository.create({ username: username, password: password, email: email })];
                    case 4:
                        newUser = _b.sent();
                        return [4 /*yield*/, userRepository.save(newUser)];
                    case 5:
                        _b.sent();
                        res.status(201).json({ message: 'Registration successful' });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        console.error(error_1);
                        res.status(500).json({ message: 'Internal server error' });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    AuthController.register = register;
    /**
     * Login a user
     * @param {e.Request} req
     * @param {e.Response} res
     * @returns {Promise<void | e.Response>}
     */
    function login(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, email, password, user, passwordMatch, token, userData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { username: username, email: email } })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).json({ message: 'Invalid username or password' })];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        passwordMatch = _b.sent();
                        if (!passwordMatch) {
                            return [2 /*return*/, res.status(401).json({ message: 'Invalid username or password' })];
                        }
                        token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET);
                        userData = user;
                        res.json({
                            userData: userData,
                            "authorization": { token: token }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.error(error_2);
                        res.status(500).json({ message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    AuthController.login = login;
    /**
     * Logout a user
     * @param {e.Request} req
     * @param {e.Response} res
     * @returns {Promise<void | e.Response>}
     */
    function logout(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    //  implement logout functionality if needed
                    res.json({ message: 'Logout successful' });
                }
                catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Internal server error' });
                }
                return [2 /*return*/];
            });
        });
    }
    AuthController.logout = logout;
})(AuthController || (exports.AuthController = AuthController = {}));
//# sourceMappingURL=authController.js.map
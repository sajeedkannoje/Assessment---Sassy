"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var dotenv_1 = __importDefault(require("dotenv"));
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Task_1 = require("./entity/Task");
dotenv_1.default.config();
/**
 * DB Details
 * @type {string}
 */
var DB_HOST = process.env.DB_HOST;
var DB_USER = process.env.DB_USER;
var DB_NAME = process.env.DB_NAME;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_PORT = parseInt(process.env.DB_PORT);
/**
 * AppDataSource
 * @type {DataSource}
 */
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    migrationsTableName: "migrations",
    entities: [User_1.User, Task_1.Task],
    migrations: ["src/migration/**/*.js"],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map
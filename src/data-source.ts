import "reflect-metadata"
import dotenv         from 'dotenv';
import { DataSource } from "typeorm"
import { User }       from "./entity/User"
import { Task }       from "./entity/Task"

dotenv.config();

/**
 * DB Details
 * @type {string}
 */
const DB_HOST : string = process.env.DB_HOST
const DB_USER : string = process.env.DB_USER
const DB_NAME : string = process.env.DB_NAME
const DB_PASSWORD : string = process.env.DB_PASSWORD
const DB_PORT : number = parseInt( process.env.DB_PORT )

/**
 * AppDataSource
 * @type {DataSource}
 */
export const AppDataSource : DataSource = new DataSource( {
	type : "mysql",
	host : DB_HOST,
	port : DB_PORT,
	username : DB_USER,
	password : DB_PASSWORD,
	database : DB_NAME,
	synchronize : true,
	logging : false,
	migrationsTableName : "migrations",
	entities : [ User, Task ],
	migrations : [ "src/migration/**/*.ts" ],
	subscribers : [],
} )

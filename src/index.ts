import { AppDataSource } from "./data-source";
import express           from "express";
import cors              from 'cors';

import { AuthRoutes } from './routes/authRoutes';
import { TaskRoutes } from "./routes/taskRoutes";

/**
 * Initialize the application
 */
AppDataSource.initialize().then( async () => {
	
	const app : express.Application = express();
	app.use( express.json() );
	app.use( cors() );
	
	app.use( '/auth', AuthRoutes.router );
	app.use( '/task', TaskRoutes.router );
	
	app.listen( 3000, () => {
		console.log( 'Server is running on port 3000' );
	} );
	
} ).catch( error => console.log( error ) )

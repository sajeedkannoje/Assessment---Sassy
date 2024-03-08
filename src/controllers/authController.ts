import jwt                   from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt                from 'bcryptjs';
import { Repository }        from "typeorm";
import { User }              from '../entity/User';

import { AppDataSource } from '../data-source';
import { UserInterface } from '../interfaces/userInterface';

const JWT_SECRET : string = process.env.JWT_SECRET

/**
 * User repository
 * @type {Repository<User>}
 */
const userRepository : Repository<User> = AppDataSource.getRepository( User );

/**
 * AuthController
 */
export namespace AuthController {
	/**
	 * Register a new user
	 * @param {e.Request} req
	 * @param {e.Response} res
	 * @returns {Promise<void | e.Response>}
	 */
	export async function register( req : Request, res : Response ) : Promise<void | Response> {
		try {
			const { email, username, password : plainPassword } = req.body;
			
			// Check if the email already exists
			const existingEmailUser : User = await userRepository.findOneBy( { email } );
			
			if ( existingEmailUser ) {
				return res.status( 400 ).json( { message : 'Email address already exists' } );
			}
			// Check if the username already exists
			const existingUser : User = await userRepository.findOneBy( { username } );
			if ( existingUser ) {
				return res.status( 400 ).json( { message : 'Username already exists' } );
			}
			const password : string = await bcrypt.hash( plainPassword, 10 );
			
			const newUser : User = await userRepository.create( { username, password, email } );
			await userRepository.save( newUser )
			
			res.status( 201 ).json( { message : 'Registration successful' } );
			
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { message : 'Internal server error' } );
		}
	}
	
	/**
	 * Login a user
	 * @param {e.Request} req
	 * @param {e.Response} res
	 * @returns {Promise<void | e.Response>}
	 */
	export async function login( req : Request, res : Response ) : Promise<void | Response> {
		try {
			const { username, email, password } = req.body;
			const user : User = await userRepository.findOneOrFail( { where : { username, email } } )
			if ( !user ) {
				return res.status( 401 ).json( { message : 'Invalid username or password' } );
			}
			const passwordMatch : boolean = await bcrypt.compare( password, user.password );
			if ( !passwordMatch ) {
				return res.status( 401 ).json( { message : 'Invalid username or password' } );
			}
			const token : string = jwt.sign( { userId : user.id }, JWT_SECRET );
			const userData : UserInterface = user as UserInterface;
			
			res.json( {
				userData,
				"authorization" : { token }
			} );
			
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { message : 'Internal server error' } );
		}
	}
	
	/**
	 * Logout a user
	 * @param {e.Request} req
	 * @param {e.Response} res
	 * @returns {Promise<void | e.Response>}
	 */
	export async function logout( req : Request, res : Response ) : Promise<void | Response> {
		try {
			//  implement logout functionality if needed
			res.json( { message : 'Logout successful' } );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { message : 'Internal server error' } );
		}
	}
} 
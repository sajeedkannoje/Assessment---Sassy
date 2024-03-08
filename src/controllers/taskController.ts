import { Request, Response }    from 'express';
import { Repository }           from "typeorm";
import { Task }                 from '../entity/Task';
import { AppDataSource }        from '../data-source';
import { AuthenticatedRequest } from '../interfaces/authenticated-request';


const taskRepository : Repository<Task> = AppDataSource.getRepository( Task );

export namespace TaskController {
	
	/**
	 * Get all tasks
	 * @param {AuthenticatedRequest} req
	 * @param {e.Response} res
	 * @returns {Promise<e.Response | void>}
	 */
	export async function getAllTasks( req : AuthenticatedRequest, res : Response ) : Promise<Response | void> {
		try {
			const id : number = parseInt( req.params.id );
			
			const tasks : Task[] = await taskRepository.find( {
				where : { user : { id } },
				relations : [ 'user' ],
			} );
			res.json( tasks );
			
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { message : 'Internal server error' } );
		}
	}
	
	/**
	 * Create a new task
	 * @param {AuthenticatedRequest} req
	 * @param {e.Response} res
	 * @returns {Promise<e.Response | void>}
	 */
	export async function createTask( req : AuthenticatedRequest, res : Response ) : Promise<Response | void> {
		try {
			const { title, description, due_date } = req.body;
			const user : string = req.userId;
			
			const newTask : Task = taskRepository.create( { title, description, due_date, user } );
			const newTaskData : Task = await taskRepository.save( newTask );
			
			res.status( 201 ).json( newTaskData );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { message : 'Internal server error' } );
		}
	}
	
	/**
	 * Get a task by ID
	 * @param {AuthenticatedRequest} req
	 * @param {e.Response} res
	 * @returns {Promise<e.Response | void>}
	 */
	
	export async function getTaskById( req : AuthenticatedRequest, res : Response ) : Promise<Response | void> {
		try {
			const id : number = parseInt( req.params.id );
			
			const task : Task = await taskRepository.findOne( {
				where : { id, user : { id } }, // Filter by both ID and user
			} );
			
			if ( !task ) {
				return res.status( 404 ).json( { message : 'Task not found' } );
			}
			res.json( task );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { message : 'Internal server error' } );
		}
	}
	
	/**
	 * Update a task
	 * @param {AuthenticatedRequest} req
	 * @param {e.Response} res
	 * @returns {Promise<e.Response | void>}
	 */
	
	export async function updateTask( req : AuthenticatedRequest, res : Response ) : Promise<Response | void> {
		try {
			
			const { title, description, due_date, status } = req.body;
			const id : number = parseInt( req.params.id );
			
			const task : Task = await taskRepository.findOne( {
				where : { id, user : { id } }, // Filter by both ID and user
			} );
			
			if ( !task ) {
				return res.status( 404 ).json( { message : 'Task not found' } );
			}
			task.title = title;
			task.description = description;
			task.due_date = due_date;
			task.status = status;
			
			const updatedTask : Task = await taskRepository.save( task ); // Save the updated task
			res.json( updatedTask );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { message : 'Internal server error' } );
		}
	}
	
	/**
	 * Delete a task
	 * @param {AuthenticatedRequest} req
	 * @param {e.Response} res
	 * @returns {Promise<e.Response | void>}
	 */
	export async function deleteTask( req : AuthenticatedRequest, res : Response ) : Promise<Response | void> {
		try {
			const id : number = parseInt( req.params.id );
			
			const task : Task = await taskRepository.findOne( {
				where : { id, user : { id } }, // Filter by both ID and user
			} );
			
			if ( !task ) {
				return res.status( 404 ).json( { message : 'Task not found' } );
			}
			
			await taskRepository.softDelete( task );
			
			res.json( { message : 'Task deleted successfully' } );
		} catch ( error ) {
			console.error( error );
			res.status( 500 ).json( { message : 'Internal server error' } );
		}
	}
	
}
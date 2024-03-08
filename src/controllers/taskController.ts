
import { Request, Response } from 'express';
import { Task } from '../entity/Task';
import { AppDataSource } from '../data-source';
import { AuthenticatedRequest } from '../interfaces/authenticated-request';


const taskRepository = AppDataSource.getRepository(Task);

export namespace TaskController {

    export async function getAllTasks(req: AuthenticatedRequest, res: Response) {
        try {
            const tasks = await taskRepository.find({ relations: ['user'] });
            res.json(tasks);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    export async function createTask(req: AuthenticatedRequest, res: Response) {
        try {
            const { title, description, due_date } = req.body;
            const user = req.userId; 
            const newTask = await taskRepository.create({ title, description, due_date , user });
            const newTaskData = await taskRepository.save(newTask);
            res.status(201).json(newTaskData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    export async function getTaskById(req: AuthenticatedRequest, res: Response) {
        try {
            const id : number = parseInt( req.params.id ); 
            const task = await taskRepository.findOneBy({ id });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // export async function updateTask(req: AuthenticatedRequest, res: Response) {
    //     try {
    //         const taskId = req.params.id;
    //         const { title, description, dueDate, status } = req.body;
    //         const task = await taskRepository.findOne(taskId);
    //         if (!task) {
    //             return res.status(404).json({ message: 'Task not found' });
    //         }
    //         task.title = title;
    //         task.description = description;
    //         task.dueDate = dueDate;
    //         task.status = status;
    //         await taskRepository.save();
    //         res.json(task);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }

    // export async function deleteTask(req: AuthenticatedRequest, res: Response) {
    //     try {
    //         const taskId = req.params.id;
    //         const task = await taskRepository.findOne(taskId);
    //         if (!task) {
    //             return res.status(404).json({ message: 'Task not found' });
    //         }
    //         await taskRepository.remove();
    //         res.json({ message: 'Task deleted successfully' });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }

}
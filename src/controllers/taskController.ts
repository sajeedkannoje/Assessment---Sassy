
import { Request, Response } from 'express';
import { Task } from '../entity/Task';
import { AppDataSource } from '../data-source';

const taskRepository = AppDataSource.getRepository(Task);

export namespace TaskController {

    export async function getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await taskRepository.find({ relations: ['user'] });
            res.json(tasks);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // export async function createTask(req: Request, res: Response) {
    //     try {
    //         const { title, description, dueDate, status } = req.body;
    //         const newTask = await taskRepository.create({ title, description, dueDate, status }).save();
    //         res.status(201).json(newTask);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }

    // export async function getTaskById(req: Request, res: Response) {
    //     try {
    //         const taskId = req.params.id;
    //         const task = await taskRepository.findOne(taskId);
    //         if (!task) {
    //             return res.status(404).json({ message: 'Task not found' });
    //         }
    //         res.json(task);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }

    // export async function updateTask(req: Request, res: Response) {
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

    // export async function deleteTask(req: Request, res: Response) {
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
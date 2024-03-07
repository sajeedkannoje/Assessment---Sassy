import express from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { TaskController } from '../controllers/taskController';
const router = express.Router();

router.use(AuthMiddleware.verifyToken);

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
router.get('/:id', TaskController.getTaskById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
var express_1 = require("express");
var authMiddleware_1 = require("../middleware/authMiddleware");
var taskController_1 = require("../controllers/taskController");
var TaskRoutes;
(function (TaskRoutes) {
    TaskRoutes.router = (0, express_1.Router)();
    TaskRoutes.router.use(authMiddleware_1.AuthMiddleware.verifyToken);
    TaskRoutes.router.get('/', taskController_1.TaskController.getAllTasks);
    TaskRoutes.router.post('/', taskController_1.TaskController.createTask);
    TaskRoutes.router.get('/:id', taskController_1.TaskController.getTaskById);
    TaskRoutes.router.put('/:id', taskController_1.TaskController.updateTask);
    TaskRoutes.router.delete('/:id', taskController_1.TaskController.deleteTask);
})(TaskRoutes || (exports.TaskRoutes = TaskRoutes = {}));
//# sourceMappingURL=taskRoutes.js.map
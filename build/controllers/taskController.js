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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
var Task_1 = require("../entity/Task");
var data_source_1 = require("../data-source");
/**
 * Task repository
 * @type {Repository<Task>}
 */
var taskRepository = data_source_1.AppDataSource.getRepository(Task_1.Task);
/**
 * TaskController
 */
var TaskController;
(function (TaskController) {
    /**
     * Get all tasks
     * @param {AuthenticatedRequest} req
     * @param {e.Response} res
     * @returns {Promise<e.Response | void>}
     */
    function getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, tasks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, taskRepository.find({
                                where: { user: { id: id } },
                                relations: ['user'],
                            })];
                    case 1:
                        tasks = _a.sent();
                        res.json(tasks);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        res.status(500).json({ message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    TaskController.getAllTasks = getAllTasks;
    /**
     * Create a new task
     * @param {AuthenticatedRequest} req
     * @param {e.Response} res
     * @returns {Promise<e.Response | void>}
     */
    function createTask(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, description, due_date, user, newTask, newTaskData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, title = _a.title, description = _a.description, due_date = _a.due_date;
                        user = req.userId;
                        newTask = taskRepository.create({ title: title, description: description, due_date: due_date, user: user });
                        return [4 /*yield*/, taskRepository.save(newTask)];
                    case 1:
                        newTaskData = _b.sent();
                        res.status(201).json(newTaskData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.error(error_2);
                        res.status(500).json({ message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    TaskController.createTask = createTask;
    /**
     * Get a task by ID
     * @param {AuthenticatedRequest} req
     * @param {e.Response} res
     * @returns {Promise<e.Response | void>}
     */
    function getTaskById(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, task, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, taskRepository.findOne({
                                where: { id: id, user: { id: id } }, // Filter by both ID and user
                            })];
                    case 1:
                        task = _a.sent();
                        if (!task) {
                            return [2 /*return*/, res.status(404).json({ message: 'Task not found' })];
                        }
                        res.json(task);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        res.status(500).json({ message: 'Internal server error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    TaskController.getTaskById = getTaskById;
    /**
     * Update a task
     * @param {AuthenticatedRequest} req
     * @param {e.Response} res
     * @returns {Promise<e.Response | void>}
     */
    function updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, description, due_date, status, id, task, updatedTask, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, title = _a.title, description = _a.description, due_date = _a.due_date, status = _a.status;
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, taskRepository.findOne({
                                where: { id: id, user: { id: id } }, // Filter by both ID and user
                            })];
                    case 1:
                        task = _b.sent();
                        if (!task) {
                            return [2 /*return*/, res.status(404).json({ message: 'Task not found' })];
                        }
                        task.title = title;
                        task.description = description;
                        task.due_date = due_date;
                        task.status = status;
                        return [4 /*yield*/, taskRepository.save(task)];
                    case 2:
                        updatedTask = _b.sent();
                        res.json(updatedTask);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        console.error(error_4);
                        res.status(500).json({ message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    TaskController.updateTask = updateTask;
    /**
     * Delete a task
     * @param {AuthenticatedRequest} req
     * @param {e.Response} res
     * @returns {Promise<e.Response | void>}
     */
    function deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, task, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, taskRepository.findOne({
                                where: { id: id, user: { id: id } }, // Filter by both ID and user
                            })];
                    case 1:
                        task = _a.sent();
                        if (!task) {
                            return [2 /*return*/, res.status(404).json({ message: 'Task not found' })];
                        }
                        return [4 /*yield*/, taskRepository.softDelete(task)];
                    case 2:
                        _a.sent();
                        res.json({ message: 'Task deleted successfully' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error(error_5);
                        res.status(500).json({ message: 'Internal server error' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    TaskController.deleteTask = deleteTask;
})(TaskController || (exports.TaskController = TaskController = {}));
//# sourceMappingURL=taskController.js.map
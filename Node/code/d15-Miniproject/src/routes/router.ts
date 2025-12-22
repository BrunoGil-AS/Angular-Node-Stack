import { Router } from "express";
import { taskController } from "../controllers/TaskController.js";

const router = Router();

// GET all tasks
router.get("/", taskController.getAllTasks);

// POST create task
router.post("/", taskController.createTask);

// GET task by ID
router.get("/:id", taskController.getTaskById);

// PUT update task
router.put("/:id", taskController.updateTask);

// PATCH partial update
router.patch("/:id", taskController.partialUpdateTask);

// DELETE task
router.delete("/:id", taskController.deleteTask);

export default router;

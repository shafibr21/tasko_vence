import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { createTask, deleteTask, getTaskById, getUserTasks, updateTask } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/create", requireAuth, createTask);
taskRouter.get("/user", requireAuth, getUserTasks);
taskRouter.get("/:id", requireAuth, getTaskById);
taskRouter.put("/:id", requireAuth, updateTask);
taskRouter.delete("/:id", requireAuth, deleteTask);

export default taskRouter;
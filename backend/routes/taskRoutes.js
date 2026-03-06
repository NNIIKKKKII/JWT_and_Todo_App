import express from "express";
import {
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";
const router = express.Router();






router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTasksById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router

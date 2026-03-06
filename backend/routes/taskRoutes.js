import express from "express";
import {
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";
import verifyToken from "../middleware/authMiddleware.js"
const router = express.Router();






router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.get("/:id", verifyToken, getTasksById);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router

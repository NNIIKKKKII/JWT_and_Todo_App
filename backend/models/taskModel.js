import mongoose from "mongoose";



const taskSchema = mongoose.Schema({
    title: {
        required: true,
        type: String

    },
    description: String,
    status: {
        type: String,
        enum: ["todo", "in-progress", "completed"],
        default: "todo"
    },
    dueDate: Date,
    priority: {
        type: String,
        enum: ["medium", "high", "low"],
        default: "medium"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


export default mongoose.model("Task", taskSchema)
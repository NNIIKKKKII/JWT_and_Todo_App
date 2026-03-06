import Task from "../models/taskModel.js"

export const createTask = async (req, res, next) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user._id
        })
        res.status(201).json(task)
    } catch (err) {
        next(err)
    }

}


export const getTasks = async (req, res, next) => {
    try {
        console.log("User:", req.user);
        const { status, priority, sort = "dueDate", page = 1, limit = 10, } = req.query;

        const query = {
            createdBy: req.user._id,
            isDeleted: false
        }

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }



        const task = await Task.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        if (!task) {
            return res.status(404).json({ message: "Task Not Found" })
        }
        res.status(200).json(task)
    } catch (err) {
        next(err)
    }
}


export const getTasksById = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
            isDeleted: false
        });

        if (!task) {
            return res.status(404).json({ message: "Task Not Found" })
        }

        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
}


export const updateTask = async (req, res, next) => {
    try {
        console.log("Update body:", req.body)
        console.log("Task ID:", req.params.id)
        console.log("User ID: ", req.user._id)
        const result = await Task.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id, isDeleted: false }, //This is query
            req.body, //This is update data
            { new: true }) // this is option that says return updated value


        if (!result) {
            return res.status(404).json({ message: "Task Not Found" })
        }
        res.json(result);
    } catch (err) {
        next(err)
    }
}





export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            { _id: req.params.id, created_By: req.user._id }, //This is query
            { isDeleted: true }, // This is update  
            { new: true }) //this is optional


        if (!task) {
            return res.status(404).json({ message: "Task Not Found" })
        }

        res.status(200).json({ message: "Task Deleted" })
    } catch (err) {
        next(err)
    }
}
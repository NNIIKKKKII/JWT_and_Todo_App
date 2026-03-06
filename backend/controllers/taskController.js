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
        const res = Task.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id, isDeleted: false }, req.body, { new: true })


        if (!res) {
            return res.status(404).json({ message: "Task Not Found" })
        }
        res.json(res);
    } catch (err) {
        next(err)
    }
}





export const DeleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            { _id: req.params.id, created_By: req.user._id },
            { isDeleted: true },
            { new: true })


        if (!task) {
            return res.status(404).json({ message: "Task Not Found" })
        }

        res.status(200).json({ message: "Task Deleted" })
    } catch (err) {
        next(err)
    }
}
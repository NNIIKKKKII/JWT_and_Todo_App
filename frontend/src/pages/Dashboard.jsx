import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../api/taskApi";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "medium",
        status: "todo"
    })

    const fetchTasks = async () => {
        try {

            const res = await getTasks();
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }
    const handleCreate = async () => {
        await createTask(form);
        setForm({
            title: "",
            description: "",
            priority: "medium",
            status: "todo"
        })
        await fetchTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        await fetchTasks();
    };

    const handleUpdate = async (task) => {

        let newStatus;

        if (task.status === "todo") {
            newStatus = "in-progress";
        }
        else if (task.status === "in-progress") {
            newStatus = "completed";
        }
        else {
            newStatus = "todo";
        }

        await updateTask(task._id, {
            status: newStatus
        });

        await fetchTasks();
    };

    return (
        <div>

            <Navbar />

            <h2>Create Task</h2>

            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter Title"
            />




            <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter Description"
            />



            <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
            >
                <option value="low">Low</option>
                <option value="medium" >Medium</option>
                <option value="high">High</option>
            </select>



            <select
                name="status"
                value={form.status}
                onChange={handleChange}
            >
                <option value="todo">todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>


            <button onClick={handleCreate}>
                Add
            </button>

            <h2 className="text-center">Tasks</h2>
            <div className="p-3">
                {tasks.length === 0 ? <p>No Tasks</p> : tasks.map(task => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onDelete={handleDelete}
                        update={handleUpdate}
                    />
                ))}
            </div>

        </div>
    )
}

export default Dashboard
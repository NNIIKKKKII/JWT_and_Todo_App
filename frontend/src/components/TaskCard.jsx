const TaskCard = ({ task, onDelete, update }) => {

    return (
        <div>
            <p>{task.title}</p>
            <p>{task.description}</p>

            <p>{task.status}</p>
            <p>{task.priority}</p>

            <button onClick={() => onDelete(task._id)}>
                Delete
            </button>

            <button onClick={() => update(task)}>Update</button>
        </div>
    )


}

export default TaskCard;
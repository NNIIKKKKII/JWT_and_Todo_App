import API from "./axios"


export const getTasks = (params) => { return API.get("/tasks", params); }
export const createTask = (data) => { return API.post("/tasks", data); }



export const updateTask = (id, data) => { return API.put(`/tasks/${id}`, data); }
export const deleteTask = (id) => { return API.delete(`/tasks/${id}`); }
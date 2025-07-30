import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendUrl = "https://tasko-vence.vercel.app/api";

  // Fetch all tasks on load
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(backendUrl + "/api/task/user");
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const res = await axios.post(backendUrl + "/api/task/create", taskData);
      await fetchTasks(); // refresh tasks
      return res.data;
    } catch (err) {
      console.error("Error creating task", err.response?.data || err);
    }
  };

  const getTaskById = async (id) => {
    try {
      const res = await axios.get(backendUrl + `/api/task/${id}`);
      return res.data.task;
    } catch (err) {
      console.error("Error fetching task by ID", err.response?.data || err);
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
        console.log("Updating task with ID:", id, "and data:", updatedData); // 👈 Add this
      const res = await axios.put(backendUrl + `/api/task/${id}`, updatedData);
      await fetchTasks(); // refresh tasks
      return res.data;
    } catch (err) {
      console.error("Error updating task", err.response?.data || err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(backendUrl + `/api/task/${id}`);
      await fetchTasks(); // refresh tasks
    } catch (err) {
      console.error("Error deleting task", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        createTask,
        getTaskById,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export default TaskProvider;

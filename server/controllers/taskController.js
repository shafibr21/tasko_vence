import Task from "../models/taskModel.js";

// POST /api/tasks/create
export const createTask = async (req, res) => {
  try {
    const { title, description, category, status, dueDate, type, collaborators } = req.body;

    const newTask = await Task.create({
      title,
      description,
      category,
      status,
      dueDate,
      type,
      createdBy: req.user._id,
      collaborators,
    });

    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create task", error: error.message });
  }
};

// GET /api/tasks/user
export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [{ createdBy: req.user._id }, { collaborators: req.user._id }],
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tasks", error: error.message });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('createdBy').populate('collaborators');

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Check if user has access
    const isOwner = task.createdBy._id.toString() === req.user._id.toString();
    const isCollaborator = task.collaborators.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch task", error: error.message });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Only creator can update
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Only the creator can update the task" });
    }

    const updates = req.body;
    Object.assign(task, updates);
    const updatedTask = await task.save();

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update task", error: error.message });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Only the creator can delete the task" });
    }

    await task.deleteOne();
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete task", error: error.message });
  }
};

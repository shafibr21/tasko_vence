import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import useTask from "../hooks/useTask";
import deleteIcon from "../assets/delete.svg";

const TaskModal = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask } = useTask();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
    type: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          setLoading(true);
          const taskData = await getTaskById(taskId);
          setTask(taskData);
          setStatus(taskData?.status || "Pending");
          setEditedTask({
            title: taskData?.title || "",
            description: taskData?.description || "",
            dueDate: taskData?.dueDate
              ? new Date(taskData.dueDate).toISOString().split("T")[0]
              : "",
            category: taskData?.category || "",
            type: taskData?.type || "",
          });
        } catch (error) {
          console.error("Error fetching task:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [taskId, getTaskById]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Get category color for icon
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "arts and craft":
        return "bg-purple-500";
      case "nature":
        return "bg-green-500";
      case "family":
        return "bg-pink-500";
      case "sport":
        return "bg-red-500";
      case "friends":
        return "bg-yellow-500";
      case "meditation":
        return "bg-indigo-500";
      case "work":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    if (task) {
      await updateTask(task._id, { status: newStatus });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...editedTask,
        status,
        dueDate: new Date(editedTask.dueDate).toISOString(),
      };
      await updateTask(task._id, updatedData);
      setIsEditing(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTask(task._id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleInputChange = (field, value) => {
    setEditedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading task...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Task not found</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 z-10 -translate-y-10 bg-amber-50 rounded-xl ">
        {/* Header with buttons */}
        <div className="flex items-center justify-between mb-6 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Task Details</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <span>✏️</span>
              <span>Edit Task</span>
            </button>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Back
            </button>
          </div>
        </div>

        {/* Task Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mx-6">
          {/* Task Header */}
          <div className="flex items-start space-x-4 mb-6">
            <div
              className={`w-16 h-16 ${getCategoryColor(
                task.category
              )} rounded-full flex items-center justify-center text-white text-2xl font-bold`}
            >
              {task.category?.charAt(0) || "T"}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full text-2xl font-bold border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Task title"
                  />
                  <textarea
                    value={editedTask.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
                    placeholder="Task description"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {task.title}
                  </h1>
                  <p className="text-gray-600 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Task Meta Information */}
          <div className="space-y-4">
            {/* Due Date and Status */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  End Date
                </h3>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) =>
                      handleInputChange("dueDate", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <span>📅</span>
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status === "Pending"
                      ? "bg-pink-100 text-pink-600"
                      : status === "Ongoing"
                      ? "bg-orange-100 text-orange-600"
                      : status === "Collaborative Task"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  • {status}
                </span>
              </div>
            </div>

            {/* Category and Type */}
            {isEditing && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Category
                  </label>
                  <select
                    value={editedTask.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Arts and Craft">Arts and Craft</option>
                    <option value="Nature">Nature</option>
                    <option value="Family">Family</option>
                    <option value="Sport">Sport</option>
                    <option value="Friends">Friends</option>
                    <option value="Meditation">Meditation</option>
                    <option value="Work">Work</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Type
                  </label>
                  <select
                    value={editedTask.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Team">Team</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
              </div>
            )}

            {/* Status Change */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Change Status
              </h3>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Collaborative Task">Collaborative Task</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              Delete Task
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
            <div className="text-center">
              {/* Delete Icon */}
              <div className="mb-6">
                <img
                  src={deleteIcon}
                  alt="Delete"
                  className="w-16 h-16 mx-auto"
                />
              </div>

              {/* Confirmation Text */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Task
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this task? This action cannot be
                undone.
              </p>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskModal;

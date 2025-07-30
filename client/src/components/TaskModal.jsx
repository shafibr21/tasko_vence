import React, { useState, useEffect } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import useTask from "../hooks/useTask";
import deleteIcon from "../assets/delete.svg";
import calenderIcon from "../assets/calendar-edit.svg";
import completeIcon from "../assets/complete.svg";

const TaskModal = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask } = useTask();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
    type: "",
  });
  // Custom dropdown state
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusDropdownHover, setStatusDropdownHover] = useState("");

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

      // Show congratulations modal if status is changed to "Done"
      if (newStatus === "Done") {
        setShowCongratulationsModal(true);
      }
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

  const handleCloseCongratulations = () => {
    setShowCongratulationsModal(false);
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
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-7xl bg-white rounded-2xl shadow-sm -translate-y-10 z-10">
        {/* Header with buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 lg:p-8 gap-4 sm:gap-0">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
            Task Details
          </h1>
          <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-6">
            <span className="text-sm lg:text-base font-medium text-purple-600">
              20 Points
            </span>
            <div className="flex gap-2 lg:gap-3">
              <button
                onClick={handleEdit}
                className="bg-orange-100 text-orange-500 border border-orange-200 hover:bg-orange-200  text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg transition-colors font-semibold"
              >
                ✏️ Edit Task
              </button>
              <button
                onClick={handleBack}
                className="bg-teal-400 hover:bg-teal-500 text-black text-xs lg:text-sm px-3 lg:px-10 py-1.5 lg:py-2 rounded-lg transition-colors font-semibold"
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <hr className="border-gray-300 my-1 md:mx-8" />
        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Task Header */}
          <div className="flex gap-4 lg:gap-6">
            <div
              className={`w-12 h-12 lg:w-16 lg:h-16 ${getCategoryColor(
                task.category
              )} rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 lg:w-4 lg:h-4 bg-current rounded-sm"></div>
              </div>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full text-xl lg:text-2xl font-semibold border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Task title"
                  />
                  <textarea
                    value={editedTask.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none text-sm lg:text-base text-gray-600"
                    placeholder="Task description"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2 lg:mb-3">
                    {task.title}
                  </h2>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* End Date and Status */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-15">
            {/* End Date */}
            <div className=" md:border-r sm:px-22 border-gray-300">
              <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-3 lg:mb-4">
                End Date
              </h3>
              {isEditing ? (
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="m-1">
                    <img
                      src={calenderIcon}
                      alt="Calendar"
                      className="w-5 h-5 mx-auto"
                    />
                  </div>
                  <span className="text-sm lg:font lg:text-xl">
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-4 mt-4">
              <div
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${
                  status === "Pending"
                    ? "bg-pink-500"
                    : status === "Ongoing"
                    ? "bg-orange-500"
                    : status === "Collaborative Task"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              ></div>
              <span
                className={`font-medium text-md lg:text-2xl ${
                  status === "Pending"
                    ? "text-pink-600"
                    : status === "Ongoing"
                    ? "text-orange-600"
                    : status === "Collaborative Task"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                {status}
              </span>
            </div>
          </div>

          {/* Category and Type */}
          {isEditing && (
            <div className="grid grid-cols-2 gap-4">
              <div className="md:px-22">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Category
                </label>
                <select
                  value={editedTask.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className=" border border-gray-300 rounded-lg px-3 py-2"
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
                  <option value="Collaborative">Collaborative</option>
                </select>
              </div>
            </div>
          )}

          {/* Change Status - Custom Dropdown */}
          <div className="mt-2 overflow-x-clip lg:px-22 relative">
            <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-3 lg:mb-4 ">
              Change Status
            </h3>
            <button
              type="button"
              className="w-full md:w-100 flex justify-between items-center p-3 bg-gray-50 border border-gray-300 rounded-2xl text-sm lg:text-base text-teal-700 hover:bg-teal-300 transition-colors focus:outline-none"
              onClick={() => setStatusDropdownOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={statusDropdownOpen}
            >
              <span className="flex items-center">
                {status || "Select status"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${
                  statusDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {statusDropdownOpen && (
              <ul
                className="absolute z-20 mt-2 w-full md:w-100 bg-white border border-gray-200 rounded-2xl shadow-lg py-2"
                tabIndex={-1}
                role="listbox"
                onMouseLeave={() => setStatusDropdownHover("")}
              >
                {["Pending", "Ongoing", "Collaborative Task", "Done"].map(
                  (option) => (
                    <li
                      key={option}
                      role="option"
                      aria-selected={status === option}
                      className={`flex items-center px-4 py-2 cursor-pointer text-sm lg:text-base text-gray-400 select-none transition-colors
                      ${
                        status === option
                          ? "bg-teal-50 font-semibold text-teal-700"
                          : "hover:bg-teal-400 hover:text-black"
                      }
                    `}
                      onClick={() => {
                        handleStatusChange(option);
                        setStatusDropdownOpen(false);
                      }}
                      onMouseEnter={() => setStatusDropdownHover(option)}
                    >
                      <span className="mr-2 text-lg">
                        {status === option || statusDropdownHover === option ? (
                          <MdCheckBox className="text-teal-600" size={22} />
                        ) : (
                          <MdCheckBoxOutlineBlank
                            className="text-gray-400"
                            size={22}
                          />
                        )}
                      </span>
                      {option}
                    </li>
                  )
                )}
              </ul>
            )}
            {/* Click outside to close dropdown */}
            {statusDropdownOpen && (
              <div
                className="fixed inset-0 z-10"
                onClick={() => setStatusDropdownOpen(false)}
                aria-hidden="true"
              ></div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 p-4 sm:p-6 lg:p-8 pt-0 lg:pl-200">
          <button
            onClick={handleDelete}
            className="flex-1 font-bold bg-red-100 text-red-500 hover:bg-red-200 py-2 lg:py-3 text-sm lg:text-base rounded-lg transition-colors"
          >
            Delete Task
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 lg:py-3 text-sm lg:text-base rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              {/* Delete Icon */}
              <div className="mb-6">
                <img
                  src={deleteIcon}
                  alt="Delete"
                  className="w-100 h-80 mx-auto"
                />
              </div>

              {/* Confirmation Text */}
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Are you Sure !!
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this task?
              </p>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 lg:py-3 text-sm lg:text-base rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 font-bold bg-red-100 text-red-500 hover:bg-red-200 py-2 lg:py-3 text-sm lg:text-base rounded-lg transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Congratulations Modal */}
      {showCongratulationsModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              {/* Complete Icon */}
              <div className="mb-6">
                <img
                  src={completeIcon}
                  alt="Complete"
                  className="w-100 h-80 mx-auto"
                />
              </div>

              {/* Close Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleCloseCongratulations}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 lg:py-3 px-8 text-sm lg:text-base rounded-lg transition-colors"
                >
                  Awesome!
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

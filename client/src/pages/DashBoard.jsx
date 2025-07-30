import React, { useState } from "react";
import deleteIcon from "../assets/delete.svg";
import completeIcon from "../assets/complete.svg";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import noTaskImage from "../assets/no_task.svg";

import useTask from "../hooks/useTask";

const DashBoard = () => {
  const { user } = useAuth();
  const { tasks, loading, error, deleteTask } = useTask();
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  // Delete logic
  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTaskId) {
      await deleteTask(deleteTaskId);
      setShowDeleteModal(false);
      setDeleteTaskId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTaskId(null);
  };
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  // Custom dropdowns state
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categoryDropdownHover, setCategoryDropdownHover] = useState("");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusDropdownHover, setStatusDropdownHover] = useState("");

  // Filter tasks based on selected category and status
  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      !selectedCategory || task.category === selectedCategory;
    const statusMatch = !selectedStatus || task.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const handleAddNewTask = () => {
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Header />

      <div className="mx-auto max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-7xl bg-white rounded-2xl shadow-sm -translate-y-10 z-10 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 p-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">
            All Task List
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Category Dropdown */}
            <div className="relative min-w-[180px]">
              <button
                type="button"
                className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onClick={() => setCategoryDropdownOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={categoryDropdownOpen}
              >
                <span>{selectedCategory || "All Categories"}</span>
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    categoryDropdownOpen ? "rotate-180" : "rotate-0"
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
              {categoryDropdownOpen && (
                <ul
                  className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                  tabIndex={-1}
                  role="listbox"
                  onMouseLeave={() => setCategoryDropdownHover("")}
                >
                  {[
                    "",
                    "Arts and Craft",
                    "Nature",
                    "Family",
                    "Sport",
                    "Friends",
                    "Meditation",
                    "Work",
                  ].map((option) => (
                    <li
                      key={option || "all"}
                      role="option"
                      aria-selected={selectedCategory === option}
                      className={`flex items-center px-4 py-2 cursor-pointer text-sm select-none transition-colors text-gray-500
                        ${
                          selectedCategory === option
                            ? "bg-teal-50 font-semibold text-teal-700"
                            : "hover:bg-teal-400 hover:text-black"
                        }
                      `}
                      onClick={() => {
                        setSelectedCategory(option);
                        setCategoryDropdownOpen(false);
                      }}
                      onMouseEnter={() => setCategoryDropdownHover(option)}
                    >
                      <span className="mr-2 text-lg">
                        {selectedCategory === option ||
                        categoryDropdownHover === option ? (
                          <MdCheckBox className="text-teal-600" size={20} />
                        ) : (
                          <MdCheckBoxOutlineBlank
                            className="text-gray-400"
                            size={20}
                          />
                        )}
                      </span>
                      {option || "All Categories"}
                    </li>
                  ))}
                </ul>
              )}
              {categoryDropdownOpen && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setCategoryDropdownOpen(false)}
                  aria-hidden="true"
                ></div>
              )}
            </div>
            {/* Status Dropdown */}
            <div className="relative min-w-[150px]">
              <button
                type="button"
                className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onClick={() => setStatusDropdownOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={statusDropdownOpen}
              >
                <span>{selectedStatus || "All Tasks"}</span>
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
                  className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                  tabIndex={-1}
                  role="listbox"
                  onMouseLeave={() => setStatusDropdownHover("")}
                >
                  {["", "Pending", "Ongoing", "Collaborative Task", "Done"].map(
                    (option) => (
                      <li
                        key={option || "all"}
                        role="option"
                        aria-selected={selectedStatus === option}
                        className={`flex items-center px-4 py-2 cursor-pointer text-sm select-none transition-colors text-gray-500
                        ${
                          selectedStatus === option
                            ? "bg-teal-50 font-semibold text-teal-700"
                            : "hover:bg-teal-400 hover:text-black"
                        }
                      `}
                        onClick={() => {
                          setSelectedStatus(option);
                          setStatusDropdownOpen(false);
                        }}
                        onMouseEnter={() => setStatusDropdownHover(option)}
                      >
                        <span className="mr-2 text-lg">
                          {selectedStatus === option ||
                          statusDropdownHover === option ? (
                            <MdCheckBox className="text-teal-600" size={20} />
                          ) : (
                            <MdCheckBoxOutlineBlank
                              className="text-gray-400"
                              size={20}
                            />
                          )}
                        </span>
                        {option || "All Tasks"}
                      </li>
                    )
                  )}
                </ul>
              )}
              {statusDropdownOpen && (
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setStatusDropdownOpen(false)}
                  aria-hidden="true"
                ></div>
              )}
            </div>
            <button
              onClick={handleAddNewTask}
              className="flex items-center bg-green-400 hover:bg-green-500 text-black font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M9 12h6M12 9v6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Add New Task
            </button>
          </div>
        </div>
        {/* Show loading state */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-12">
            <p className="text-red-600">Error: {error}</p>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteClick}
              />
            ))}
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                  <div className="text-center">
                    {/* Delete Icon */}
                    <div className="mb-6">
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        className="w-100 h-80 mx-auto "
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Are you Sure !!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Are you sure you want to delete this task?
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleCancelDelete}
                        className="flex-1 bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmDelete}
                        className="flex-1 font-bold bg-red-100 text-red-500 hover:bg-red-200 py-2 rounded-lg transition-colors"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <img src={noTaskImage} alt="No tasks" className=" h-130 mb-4" />
          </div>
        )}
      </div>

      {/* Add New Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <TaskForm onClose={handleCloseTaskForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import noTaskImage from "../assets/no_task.svg";
import useTask from "../hooks/useTask";

const DashBoard = () => {
  const { user } = useAuth();
  const { tasks, loading, error } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 z-10 -translate-y-10 bg-amber-50 rounded-xl ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">
            All Task List
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-gray-700"
            >
              <option value="">All Categories</option>
              <option value="Arts and Craft">Arts and Craft</option>
              <option value="Nature">Nature</option>
              <option value="Family">Family</option>
              <option value="Sport">Sport</option>
              <option value="Friends">Friends</option>
              <option value="Meditation">Meditation</option>
              <option value="Work">Work</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-gray-700"
            >
              <option value="">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Collaborative Task">Collaborative Task</option>
              <option value="Done">Done</option>
            </select>
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
        ) : tasks && tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
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

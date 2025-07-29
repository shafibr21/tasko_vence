import React from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/task/${task._id}`);
  };
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

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-pink-500 bg-pink-50";
      case "in progress":
        return "text-blue-500 bg-blue-50";
      case "completed":
        return "text-green-500 bg-green-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  // Get category color for left border
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "work":
        return "border-l-blue-500";
      case "personal":
        return "border-l-green-500";
      case "family":
        return "border-l-pink-500";
      case "education":
        return "border-l-purple-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 cursor-pointer ${getCategoryColor(
        task.category
      )}`}
    >
      <div className="p-4">
        {/* Header with title and status */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-medium">
                {task.category?.charAt(0) || "T"}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {task.type} • {task.category}
              </p>
            </div>
          </div>

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              task.status
            )}`}
          >
            • {task.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {task.description}
        </p>

        {/* Date */}
        <div className="text-sm text-gray-500">
          <span className="font-medium">Due:</span> {formatDate(task.dueDate)}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

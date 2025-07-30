import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import calenderIcon from "../assets/calendar-edit.svg";
import taskIcon from "../assets/task_pic.svg";

const TaskCard = ({ task, onDelete }) => {
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
      case "ongoing":
        return "text-orange-500 bg-orange-50";
      case "collaborative task":
        return "text-blue-500 bg-blue-50";
      default:
        return "text-green-500 bg-green-50";
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
      <div className="p-4 flex flex-col h-full justify-between">
        {/* Header with title and delete icon */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <img src={taskIcon} alt="Task Icon" className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {task.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {task.type} • {task.category}
              </p>
            </div>
          </div>
          <button
            className="text-red-400 hover:text-red-600 p-1 rounded-full transition-colors"
            title="Delete Task"
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(task._id);
            }}
          >
            <MdDelete size={22} />
          </button>
        </div>

        {/* Description */}
        <div className="ml-15">
          <p className="text-gray-800 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
        </div>

        {/* Date and Status at bottom */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <div className="m-1">
              <img
                src={calenderIcon}
                alt="Calendar"
                className="w-5 h-5 mx-auto"
              />
            </div>
            {formatDate(task.dueDate)}
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
              task.status
            )}`}
          >
            • {task.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

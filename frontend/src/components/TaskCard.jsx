import { useState } from "react";
import { Edit, Trash2, Calendar, Clock } from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await onDelete();
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "in-progress":
        return "status-in-progress";
      case "pending":
        return "status-pending";
      default:
        return "status-pending";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return "Pending";
    }
  };

  return (
    <div className={`task-card ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button
            className="action-btn edit-btn"
            onClick={onEdit}
            title="Edit task"
          >
            <Edit size={16} />
          </button>
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-footer">
        <div className="task-meta">
          <div className="meta-item">
            <Calendar size={14} />
            <span>Due: {formatDate(task.duedate)}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} />
            <span>Created: {formatDate(task.createdate)}</span>
          </div>
        </div>

        <div className={`task-status ${getStatusClass(task.status)}`}>
          {getStatusLabel(task.status)}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

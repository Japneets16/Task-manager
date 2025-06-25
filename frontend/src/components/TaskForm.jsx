import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

const TaskForm = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    duedate: "",
    createdate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      // Editing existing task
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
        duedate: task.duedate ? task.duedate.split("T")[0] : "",
        createdate: task.createdate ? task.createdate.split("T")[0] : "",
      });
    } else {
      // Creating new task
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        createdate: today,
        duedate: today,
      }));
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Format dates as YYYY-MM-DD for backend
      const submitData = {
        ...formData,
        duedate: formData.duedate,
        createdate: formData.createdate,
      };

      await onSubmit(submitData);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      const validationErrors = error.response?.data?.error;

      if (validationErrors) {
        const errorMessages = validationErrors
          .map((err) => err.message)
          .join(", ");
        setError(`Validation error: ${errorMessages}`);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? "Edit Task" : "Create New Task"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
              maxLength={15}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              required
              minLength={5}
              maxLength={50}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duedate">Due Date</label>
              <input
                type="date"
                id="duedate"
                name="duedate"
                value={formData.duedate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="createdate">Create Date</label>
            <input
              type="date"
              id="createdate"
              name="createdate"
              value={formData.createdate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              <Save size={16} />
              {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

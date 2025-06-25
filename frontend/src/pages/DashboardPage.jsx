import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { taskAPI } from "../services/api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Header from "../components/Header";
import { Plus, Filter, Search } from "lucide-react";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks(statusFilter);
      setTasks(response.tasks || []);
      setError("");
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  useEffect(() => {
    // Filter tasks based on search query
    let filtered = tasks;

    if (searchQuery.trim()) {
      filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      if (response.task) {
        setTasks((prev) => [...prev, response.task]);
        setShowTaskForm(false);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await taskAPI.updateTask(editingTask._id, taskData);
      if (response.task) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === editingTask._id ? response.task : task,
          ),
        );
        setEditingTask(null);
        setShowTaskForm(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const statusCounts = {
    all: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    "in-progress": tasks.filter((task) => task.status === "in-progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name || "User"}!</h1>
            <p>Here's an overview of your tasks</p>
          </div>

          <button
            className="create-task-btn"
            onClick={() => setShowTaskForm(true)}
          >
            <Plus size={20} />
            New Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <div className="stat-number">{statusCounts.all}</div>
          </div>
          <div className="stat-card pending">
            <h3>Pending</h3>
            <div className="stat-number">{statusCounts.pending}</div>
          </div>
          <div className="stat-card in-progress">
            <h3>In Progress</h3>
            <div className="stat-number">{statusCounts["in-progress"]}</div>
          </div>
          <div className="stat-card completed">
            <h3>Completed</h3>
            <div className="stat-number">{statusCounts.completed}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="controls-section">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-wrapper">
            <Filter size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="tasks-section">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default DashboardPage;

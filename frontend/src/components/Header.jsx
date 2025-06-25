import { useAuth } from "../context/AuthContext";
import { LogOut, CheckSquare } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <CheckSquare size={28} />
            <span className="logo-text">TaskManager</span>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="user-name">{user?.name || "User"}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

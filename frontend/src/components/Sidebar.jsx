import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // We will create this next!

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Destroy the VIP wristband
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. Kick them back to the login screen
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>HRMS Portal</h2>
      </div>
      
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard" className="menu-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/attendance" className="menu-link">Attendance</Link>
        </li>
        <li>
          <Link to="/timeoff" className="menu-link">Time Off</Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
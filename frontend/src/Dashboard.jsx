import Sidebar from './components/Sidebar';

const Dashboard = () => {
  // Let's pull the user's name from local storage to personalize it!
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { name: "Employee" };

  return (
    <div style={{ display: 'flex' }}>
      {/* The Sidebar takes up the left 250px */}
      <Sidebar /> 

      {/* The Main Content area takes up the rest of the space */}
      <div style={{ marginLeft: '250px', padding: '40px', width: '100%', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
        
        <h1>Welcome back, {user.name}!</h1>
        <p>This is your HRMS Dashboard overview.</p>
        
        {/* We will build summary cards here later */}
      </div>
    </div>
  );
};

export default Dashboard;
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  // 1. Get the VIP Wristband
  const token = localStorage.getItem('token');
  
  // Setup Axios headers to automatically include the token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 2. Fetch history when the page loads
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance/my-history', config);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // 3. Clock In Function
  const handleClockIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/attendance/clock-in', {}, config);
      setMessage(response.data.message);
      fetchHistory(); // Refresh the table
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error clocking in');
    }
  };

  // 4. Clock Out Function
  const handleClockOut = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/attendance/clock-out', {}, config);
      setMessage(response.data.message);
      fetchHistory(); // Refresh the table
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error clocking out');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      
      <div style={{ marginLeft: '250px', padding: '40px', width: '100%', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
        
        <h2>Attendance Tracker</h2>
        <p style={{ color: '#aaa', marginBottom: '30px' }}>Log your daily hours here.</p>

        {/* Status Message */}
        {message && (
          <div style={{ padding: '15px', backgroundColor: '#333', borderLeft: '4px solid #646cff', marginBottom: '20px' }}>
            {message}
          </div>
        )}

        {/* The Giant Buttons */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
          <button 
            onClick={handleClockIn}
            style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            CLOCK IN
          </button>
          
          <button 
            onClick={handleClockOut}
            style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            CLOCK OUT
          </button>
        </div>

        {/* History Table */}
        <h3>My History</h3>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th style={{ padding: '10px' }}>Date</th>
              <th style={{ padding: '10px' }}>Clock In</th>
              <th style={{ padding: '10px' }}>Clock Out</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record._id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '10px' }}>{record.date}</td>
                <td style={{ padding: '10px' }}>{record.clockInTime}</td>
                <td style={{ padding: '10px' }}>{record.clockOutTime || '---'}</td>
                <td style={{ padding: '10px' }}>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Attendance;
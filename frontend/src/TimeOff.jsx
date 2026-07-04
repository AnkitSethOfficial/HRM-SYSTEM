import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';

const TimeOff = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    leaveType: 'Sick Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Get the VIP Wristband
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch history when page loads
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/timeoff/my-requests', config);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    try {
      const response = await axios.post('http://localhost:5000/api/timeoff/request', formData, config);
      setMessage(response.data.message);
      fetchRequests(); // Refresh the table
      setFormData({ leaveType: 'Sick Leave', startDate: '', endDate: '', reason: '' }); // Clear the form
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting request');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      
      <div style={{ marginLeft: '250px', padding: '40px', width: '100%', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
        
        <h2>Time Off Requests</h2>
        <p style={{ color: '#aaa', marginBottom: '30px' }}>Request vacation or sick leave.</p>

        {message && (
          <div style={{ padding: '15px', backgroundColor: '#333', borderLeft: '4px solid #646cff', marginBottom: '20px' }}>
            {message}
          </div>
        )}

        {/* The Request Form */}
        <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', marginBottom: '40px', maxWidth: '600px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <label>Leave Type</label>
            <select name="leaveType" value={formData.leaveType} onChange={handleChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation">Vacation</option>
              <option value="Personal">Personal</option>
            </select>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label>Start Date</label>
                <input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label>End Date</label>
                <input type="date" name="endDate" required value={formData.endDate} onChange={handleChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }} />
              </div>
            </div>

            <label>Reason</label>
            <textarea name="reason" required rows="3" value={formData.reason} onChange={handleChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}></textarea>

            <button type="submit" style={{ padding: '12px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
              Submit Request
            </button>
          </form>
        </div>

        {/* History Table */}
        <h3>My Leave History</h3>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th style={{ padding: '10px' }}>Type</th>
              <th style={{ padding: '10px' }}>Start</th>
              <th style={{ padding: '10px' }}>End</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '10px' }}>{req.leaveType}</td>
                <td style={{ padding: '10px' }}>{req.startDate.split('T')[0]}</td>
                <td style={{ padding: '10px' }}>{req.endDate.split('T')[0]}</td>
                <td style={{ padding: '10px', color: req.status === 'Pending' ? '#ffc107' : 'white' }}>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default TimeOff;
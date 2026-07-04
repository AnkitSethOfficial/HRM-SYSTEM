import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Attendance from './Attendance';
import TimeOff from './TimeOff'; // <-- 1. Import the final page!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        
        {/* 2. Add the final route! */}
        <Route path="/timeoff" element={<TimeOff />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
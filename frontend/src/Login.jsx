import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Send the data to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginId, // Assuming they type their email into the Login Id field
        password: password
      });

      // Save the VIP pass (JWT token) to browser memory
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Go to dashboard!
      navigate('/dashboard');
      
    } catch (err) {
      // If the backend sends an error, display it
      setError(err.response?.data?.message || 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ border: '1px solid #333', padding: '40px', borderRadius: '8px', width: '350px', backgroundColor: '#1e1e1e' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px', padding: '10px', backgroundColor: '#333', borderRadius: '4px' }}>
          App/Web Logo
        </div>
        
        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Login Id/Email :-</label>
            <input 
              type="text" 
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Password :-</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white', boxSizing: 'border-box' }}
            />
          </div>

          {/* Error Message Display */}
          {error && <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

          <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '12px', backgroundColor: isLoading ? '#6b21a8' : '#a855f7', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
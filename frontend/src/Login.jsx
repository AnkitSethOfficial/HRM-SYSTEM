import { useState } from 'react';

function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Attempting login with:", loginId); 
  };

  return (
    <div style={{ backgroundColor: '#121212', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ border: '1px solid #333', padding: '40px', borderRadius: '8px', width: '350px', backgroundColor: '#1e1e1e' }}>
        
        {/* Placeholder for the Logo */}
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
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Password :-</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#a855f7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            SIGN IN
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#aaa' }}>
          Don't have an Account? <a href="#" style={{ color: '#a855f7', textDecoration: 'none' }}>Sign Up</a>
        </div>

      </div>
    </div>
  );
}

export default Login;
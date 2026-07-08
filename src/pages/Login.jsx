import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
        else setMessage('Account created! Please sign in.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        else navigate('/dashboard');
      }
    } catch {
      setError('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #07070f 0%, #0f0a1e 50%, #07070f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(124,58,237,0.2)', borderRadius: '16px', padding: '36px', width: '360px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>📄</div>
          <div style={{ fontSize: '20px', fontWeight: '500', color: 'white', marginBottom: '4px' }}>ContractAI</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>{isSignUp ? 'Create your account' : 'Welcome back — login to continue'}</div>
        </div>

        {/* Fields */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '5px' }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '6px' }}>
          <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleAuth()}
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: 'white', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {!isSignUp && (
          <div style={{ textAlign: 'right', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', color: '#7c3aed', cursor: 'pointer' }}>Forgot password?</span>
          </div>
        )}

        {/* Messages */}
        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '0.5px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', color: '#ef4444', marginBottom: '12px' }}>{error}</div>}
        {message && <div style={{ background: 'rgba(34,197,94,0.1)', border: '0.5px solid rgba(34,197,94,0.2)', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', color: '#22c55e', marginBottom: '12px' }}>{message}</div>}

        {/* Login Button */}
        <button
          onClick={handleAuth}
          disabled={loading}
          style={{ width: '100%', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginBottom: '10px' }}
        >
          {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Login'}
        </button>

        {/* Sign up / Sign in toggle */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '14px' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }} style={{ color: '#7c3aed', cursor: 'pointer', marginLeft: '4px' }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/upload', label: 'Upload Document' },
    { path: '/analysis', label: 'AI Analysis' },
    { path: '/history', label: 'Document History' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
    { path: '/settings', label: 'Settings' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav style={{
      background: 'rgba(7,7,18,0.97)',
      borderBottom: '0.5px solid rgba(124,58,237,0.12)',
      padding: '0 20px',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '24px' }}>
        <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>📄</div>
        <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>ContractAI</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1px', flex: 1, overflowX: 'auto' }}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              padding: '5px 11px',
              borderRadius: '7px',
              fontSize: '12px',
              color: location.pathname === link.path ? 'white' : 'rgba(255,255,255,0.4)',
              background: location.pathname === link.path ? 'rgba(124,58,237,0.15)' : 'transparent',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: 'rgba(239,68,68,0.08)',
          border: '0.5px solid rgba(239,68,68,0.2)',
          color: 'rgba(239,68,68,0.8)',
          padding: '5px 12px',
          borderRadius: '7px',
          fontSize: '12px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
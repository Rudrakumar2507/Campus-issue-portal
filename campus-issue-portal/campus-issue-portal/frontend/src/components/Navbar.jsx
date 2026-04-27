import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        🏫 Campus Issue Portal
      </div>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.greeting}>Hi, {user.name}</span>
            {user.role === 'STUDENT' ? (
              <>
                <Link style={styles.link} to="/dashboard">My Issues</Link>
                <Link style={styles.link} to="/submit">Report Issue</Link>
              </>
            ) : (
              <Link style={styles.link} to="/admin">Admin Dashboard</Link>
            )}
            <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 32px', background: '#1a3c5e', color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  brand: { fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.5px' },
  links: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: '#90caf9', textDecoration: 'none', fontWeight: '500' },
  greeting: { color: '#b3e5fc', fontSize: '0.95rem' },
  logoutBtn: {
    background: '#e53935', color: '#fff', border: 'none',
    borderRadius: '6px', padding: '6px 16px', cursor: 'pointer', fontWeight: '600',
  },
};

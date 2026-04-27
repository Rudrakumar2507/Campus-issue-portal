import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitIssue } from '../api';

const CATEGORIES = [
  'ELECTRICAL', 'PLUMBING', 'CLEANLINESS', 'FURNITURE', 'IT_EQUIPMENT', 'SECURITY', 'OTHER'
];

export default function SubmitIssue() {
  const [form, setForm] = useState({ title: '', description: '', category: 'ELECTRICAL' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      await submitIssue(form);
      setSuccess('✅ Issue submitted successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch {
      setError('Failed to submit issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚨 Report a Campus Issue</h2>
        {success && <div style={styles.success}>{success}</div>}
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Issue Title</label>
          <input style={styles.input} type="text" placeholder="e.g., Broken light in Room 204"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />

          <label style={styles.label}>Category</label>
          <select style={styles.input} value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c.replace('_', ' ')}</option>
            ))}
          </select>

          <label style={styles.label}>Description</label>
          <textarea style={{ ...styles.input, height: '120px', resize: 'vertical' }}
            placeholder="Describe the issue in detail..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} required />

          <button style={styles.btn} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '40px 20px', background: '#f0f4f8', minHeight: '80vh' },
  card: { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '520px' },
  title: { color: '#1a3c5e', marginBottom: '20px' },
  label: { display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#444', marginTop: '16px', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #cdd7e0', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', marginTop: '20px', background: '#1a3c5e', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' },
  success: { background: '#e8f5e9', color: '#2e7d32', padding: '10px', borderRadius: '6px', marginBottom: '12px' },
  error: { background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '6px', marginBottom: '12px' },
};

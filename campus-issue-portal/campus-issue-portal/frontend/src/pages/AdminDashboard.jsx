import React, { useEffect, useState } from 'react';
import { getAllIssues, updateIssueStatus } from '../api';

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
const statusColors = {
  OPEN: { bg: '#fff3e0', color: '#e65100' },
  IN_PROGRESS: { bg: '#e3f2fd', color: '#0277bd' },
  RESOLVED: { bg: '#e8f5e9', color: '#2e7d32' },
};

export default function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    getAllIssues()
      .then(res => setIssues(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      await updateIssueStatus(id, newStatus);
      setIssues(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    } catch {
      alert('Failed to update status.');
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === 'ALL' ? issues : issues.filter(i => i.status === filter);

  const counts = { ALL: issues.length };
  STATUS_OPTIONS.forEach(s => { counts[s] = issues.filter(i => i.status === s).length; });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛠️ Admin Dashboard</h2>

      {/* Stats */}
      <div style={styles.stats}>
        {['ALL', ...STATUS_OPTIONS].map(s => (
          <div key={s} style={{ ...styles.statCard, ...(filter === s ? styles.statActive : {}) }}
            onClick={() => setFilter(s)}>
            <div style={styles.statNum}>{counts[s]}</div>
            <div style={styles.statLabel}>{s.replace('_', ' ')}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <p style={styles.info}>Loading issues...</p>
      ) : filtered.length === 0 ? (
        <p style={styles.info}>No issues found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              {['ID', 'Title', 'Category', 'Reported By', 'Date', 'Status', 'Action'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(issue => {
              const sc = statusColors[issue.status] || {};
              return (
                <tr key={issue.id} style={styles.tr}>
                  <td style={styles.td}>#{issue.id}</td>
                  <td style={styles.td}><strong>{issue.title}</strong><br /><span style={styles.desc}>{issue.description.slice(0, 60)}...</span></td>
                  <td style={styles.td}><span style={styles.catBadge}>{issue.category.replace('_', ' ')}</span></td>
                  <td style={styles.td}>{issue.reportedBy?.name || 'Unknown'}</td>
                  <td style={styles.td}>{new Date(issue.createdAt).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, background: sc.bg, color: sc.color }}>
                      {issue.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <select
                      value={issue.status}
                      disabled={updating === issue.id}
                      onChange={e => handleStatusChange(issue.id, e.target.value)}
                      style={styles.select}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '40px auto', padding: '0 20px' },
  title: { color: '#1a3c5e', marginBottom: '20px' },
  stats: { display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' },
  statCard: { flex: 1, minWidth: '100px', background: '#fff', border: '2px solid #e0e7ef', borderRadius: '10px', padding: '16px', textAlign: 'center', cursor: 'pointer' },
  statActive: { border: '2px solid #1a3c5e', background: '#e8edf5' },
  statNum: { fontSize: '1.8rem', fontWeight: '700', color: '#1a3c5e' },
  statLabel: { fontSize: '0.8rem', color: '#777', marginTop: '4px' },
  info: { color: '#777', textAlign: 'center', marginTop: '40px' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  th: { background: '#1a3c5e', color: '#fff', padding: '12px 14px', textAlign: 'left', fontSize: '0.85rem' },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '12px 14px', fontSize: '0.88rem', verticalAlign: 'middle', color: '#333' },
  desc: { color: '#888', fontSize: '0.8rem' },
  catBadge: { background: '#e8eaf6', color: '#3949ab', padding: '2px 8px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600' },
  statusBadge: { padding: '3px 10px', borderRadius: '20px', fontWeight: '600', fontSize: '0.78rem' },
  select: { padding: '6px 10px', borderRadius: '6px', border: '1px solid #cdd7e0', fontSize: '0.85rem', cursor: 'pointer' },
};

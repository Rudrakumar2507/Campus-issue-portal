import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyIssues } from '../api';

const statusColors = {
  OPEN: { bg: '#fff3e0', color: '#e65100' },
  IN_PROGRESS: { bg: '#e3f2fd', color: '#0277bd' },
  RESOLVED: { bg: '#e8f5e9', color: '#2e7d32' },
};

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyIssues()
      .then(res => setIssues(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Reported Issues</h2>
        <Link to="/submit" style={styles.reportBtn}>+ Report New Issue</Link>
      </div>

      {loading ? (
        <p style={styles.info}>Loading your issues...</p>
      ) : issues.length === 0 ? (
        <div style={styles.empty}>
          <p>You haven't reported any issues yet.</p>
          <Link to="/submit" style={styles.reportBtn}>Report your first issue</Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {issues.map(issue => {
            const sc = statusColors[issue.status] || {};
            return (
              <div key={issue.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.category}>{issue.category.replace('_', ' ')}</span>
                  <span style={{ ...styles.status, background: sc.bg, color: sc.color }}>
                    {issue.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 style={styles.issueTitle}>{issue.title}</h3>
                <p style={styles.desc}>{issue.description}</p>
                <p style={styles.date}>
                  Submitted: {new Date(issue.createdAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '40px auto', padding: '0 20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { color: '#1a3c5e', margin: 0 },
  reportBtn: { background: '#1a3c5e', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' },
  info: { color: '#777', textAlign: 'center', marginTop: '40px' },
  empty: { textAlign: 'center', marginTop: '60px', color: '#555' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  card: { background: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: '4px solid #1a3c5e' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  category: { fontSize: '0.78rem', background: '#e8eaf6', color: '#3949ab', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' },
  status: { fontSize: '0.78rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' },
  issueTitle: { margin: '8px 0 6px', color: '#1a3c5e', fontSize: '1rem' },
  desc: { color: '#555', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '12px' },
  date: { fontSize: '0.8rem', color: '#999' },
};

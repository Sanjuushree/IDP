import React, { useState, useEffect } from 'react';

const styles = {
  page: { background: '#08080f', minHeight: '100vh', padding: '24px', color: 'white' },
  title: { fontSize: '20px', fontWeight: '500', marginBottom: '4px' },
  sub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' },
  panel: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '16px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: '500', textAlign: 'left', padding: '9px 12px', borderBottom: '0.5px solid rgba(255,255,255,0.06)' },
  td: { fontSize: '12px', color: 'rgba(255,255,255,0.65)', padding: '10px 12px', borderBottom: '0.5px solid rgba(255,255,255,0.04)' },
  rt: { fontSize: '9px', fontWeight: '500', padding: '2px 7px', borderRadius: '8px' },
  aic: { fontSize: '14px', cursor: 'pointer', opacity: 0.5, marginRight: '8px' },
  emptyText: { fontSize: '13px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '32px' },
  searchInput: { background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', color: 'white', outline: 'none', width: '240px', marginBottom: '14px' },
};

const BACKEND = 'https://idp-3yw3.onrender.com';

function History() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = () => {
    fetch(`${BACKEND}/documents`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDocs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await fetch(`${BACKEND}/documents/${id}`, { method: 'DELETE' });
      setDocs(prev => prev.filter(d => d.id !== id));
    } catch {
      alert('Delete failed.');
    }
  };

  const getRiskStyle = (risk) => {
    if (risk === 'High') return { background: 'rgba(239,68,68,0.1)', color: '#ef4444' };
    if (risk === 'Medium') return { background: 'rgba(234,179,8,0.1)', color: '#eab308' };
    return { background: 'rgba(34,197,94,0.1)', color: '#22c55e' };
  };

  const filtered = docs.filter(d =>
    d.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.title}>Document History</div>
      <div style={styles.sub}>All previously analysed documents.</div>

      <input
        style={styles.searchInput}
        placeholder="🔍 Search documents..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={styles.panel}>
        {loading ? (
          <div style={styles.emptyText}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyText}>
            {search ? 'No documents found.' : 'No Document History Available. Upload a document to get started.'}
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Document Name</th>
                <th style={styles.th}>Upload Date</th>
                <th style={styles.th}>Risk Level</th>
                <th style={styles.th}>Summary</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc, i) => (
                <tr key={i} onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.04)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={styles.td}>📄 {doc.filename}</td>
                  <td style={styles.td}>{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                  <td style={styles.td}><span style={{ ...styles.rt, ...getRiskStyle(doc.risk_score) }}>{doc.risk_score}</span></td>
                  <td style={{ ...styles.td, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.summary?.slice(0, 80) || 'No summary'}...</td>
                  <td style={styles.td}>
                    <span style={styles.aic} title="View" onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.5}>👁️</span>
                    <span style={styles.aic} title="Delete" onClick={() => handleDelete(doc.id)} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.5}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default History;
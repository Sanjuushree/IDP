import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const styles = {
  page: { background: '#08080f', minHeight: '100vh', padding: '24px', color: 'white' },
  title: { fontSize: '20px', fontWeight: '500', marginBottom: '4px' },
  sub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' },
  g4: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '16px' },
  g2: { display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '12px', marginBottom: '14px' },
  sc: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '16px', position: 'relative', overflow: 'hidden' },
  scBar: { position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px' },
  scIcon: { fontSize: '18px', marginBottom: '8px' },
  scNum: { fontSize: '26px', fontWeight: '700', color: 'white', lineHeight: '1', marginBottom: '2px' },
  scLbl: { fontSize: '10px', color: 'rgba(255,255,255,0.35)' },
  scBadge: { display: 'inline-block', marginTop: '6px', fontSize: '10px', padding: '2px 7px', borderRadius: '10px' },
  panel: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '14px' },
  panelTitle: { fontSize: '12px', fontWeight: '500', color: 'white', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  panelLink: { fontSize: '11px', color: '#7c3aed', cursor: 'pointer' },
  dr: { display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.04)' },
  di: { width: '28px', height: '28px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 },
  dn: { fontSize: '11px', color: 'rgba(255,255,255,0.7)' },
  dd: { fontSize: '10px', color: 'rgba(255,255,255,0.28)', marginTop: '1px' },
  rt: { fontSize: '9px', fontWeight: '500', padding: '2px 6px', borderRadius: '8px', marginLeft: 'auto', flexShrink: 0 },
  aig: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '5px' },
  ai: { background: 'rgba(124,58,237,0.06)', border: '0.5px solid rgba(124,58,237,0.1)', borderRadius: '7px', padding: '9px', display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer' },
  a4: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' },
  ab: { background: 'rgba(124,58,237,0.06)', border: '0.5px solid rgba(124,58,237,0.1)', borderRadius: '9px', padding: '12px 8px', textAlign: 'center', cursor: 'pointer' },
  emptyText: { fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px' },
};

const BACKEND = 'https://idp-3yw3.onrender.com';

function Dashboard() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    fetch(`${BACKEND}/documents`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDocs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const total = docs.length;
  const high = docs.filter(d => d.risk_score === 'High').length;
  const safe = docs.filter(d => d.risk_score !== 'High').length;
  const userName = user?.email?.split('@')[0] || 'User';

  const getRiskStyle = (risk) => {
    if (risk === 'High') return { background: 'rgba(239,68,68,0.1)', color: '#ef4444' };
    if (risk === 'Medium') return { background: 'rgba(234,179,8,0.1)', color: '#eab308' };
    return { background: 'rgba(34,197,94,0.1)', color: '#22c55e' };
  };

  return (
    <div style={styles.page}>
      <div style={styles.title}>Welcome back, {userName} 👋</div>
      <div style={styles.sub}>Here's what's happening with your contracts today.</div>

      {/* Stats */}
      <div style={styles.g4}>
        <div style={styles.sc}>
          <div style={{ ...styles.scBar, background: 'linear-gradient(90deg,#7c3aed,#4f46e5)' }}></div>
          <div style={styles.scIcon}>📄</div>
          <div style={styles.scNum}>{loading ? '...' : total}</div>
          <div style={styles.scLbl}>Documents Uploaded</div>
          <div style={{ ...styles.scBadge, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>Total</div>
        </div>
        <div style={styles.sc}>
          <div style={{ ...styles.scBar, background: 'linear-gradient(90deg,#3b82f6,#06b6d4)' }}></div>
          <div style={styles.scIcon}>🤖</div>
          <div style={styles.scNum}>{loading ? '...' : total}</div>
          <div style={styles.scLbl}>AI Analyses Done</div>
          <div style={{ ...styles.scBadge, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>Complete</div>
        </div>
        <div style={styles.sc}>
          <div style={{ ...styles.scBar, background: 'linear-gradient(90deg,#ef4444,#f97316)' }}></div>
          <div style={styles.scIcon}>⚠️</div>
          <div style={styles.scNum}>{loading ? '...' : high}</div>
          <div style={styles.scLbl}>High Risk Contracts</div>
          <div style={{ ...styles.scBadge, background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>{high > 0 ? 'Needs attention' : 'All safe'}</div>
        </div>
        <div style={styles.sc}>
          <div style={{ ...styles.scBar, background: 'linear-gradient(90deg,#22c55e,#10b981)' }}></div>
          <div style={styles.scIcon}>✅</div>
          <div style={styles.scNum}>{loading ? '...' : safe}</div>
          <div style={styles.scLbl}>Safe Contracts</div>
          <div style={{ ...styles.scBadge, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>{total > 0 ? `${Math.round((safe / total) * 100)}% safe` : 'No data'}</div>
        </div>
      </div>

      {/* Recent Docs + AI Features */}
      <div style={styles.g2}>
        <div style={styles.panel}>
          <div style={styles.panelTitle}>
            📋 Recent Documents
            <span style={styles.panelLink} onClick={() => navigate('/history')}>View all</span>
          </div>
          {loading ? (
            <div style={styles.emptyText}>Loading...</div>
          ) : docs.length === 0 ? (
            <div style={styles.emptyText}>No documents uploaded yet.</div>
          ) : (
            docs.slice(0, 4).map((doc, i) => (
              <div key={i} style={styles.dr}>
                <div style={{ ...styles.di, background: 'rgba(124,58,237,0.1)' }}>📄</div>
                <div>
                  <div style={styles.dn}>{doc.filename}</div>
                  <div style={styles.dd}>{new Date(doc.uploaded_at).toLocaleString()}</div>
                </div>
                <div style={{ ...styles.rt, ...getRiskStyle(doc.risk_score) }}>{doc.risk_score}</div>
              </div>
            ))
          )}
        </div>

        <div style={styles.panel}>
          <div style={styles.panelTitle}>🤖 AI Features</div>
          <div style={styles.aig}>
            <div style={styles.ai} onClick={() => navigate('/analysis')}><span>💬</span><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>AI Chat</span></div>
            <div style={styles.ai} onClick={() => navigate('/analysis')}><span>🔍</span><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>OCR</span></div>
            <div style={styles.ai} onClick={() => navigate('/analysis')}><span>⚠️</span><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>Risk Detect</span></div>
            <div style={styles.ai} onClick={() => navigate('/analysis')}><span>📝</span><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>Summarize</span></div>
            <div style={styles.ai} onClick={() => navigate('/analysis')}><span>🌐</span><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>Translate</span></div>
            <div style={styles.ai} onClick={() => navigate('/analysis')}><span>📊</span><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>Report</span></div>          
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.panel}>
        <div style={styles.panelTitle}>⚡ Quick Actions</div>
        <div style={styles.a4}>
          <div style={styles.ab} onClick={() => navigate('/upload')}>
            <div style={{ fontSize: '18px', marginBottom: '5px' }}>📤</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Upload Document</div>
          </div>
          <div style={styles.ab} onClick={() => navigate('/analysis')}>
            <div style={{ fontSize: '18px', marginBottom: '5px' }}>🤖</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>AI Analysis</div>
          </div>
          <div style={styles.ab} onClick={() => navigate('/analysis')}>
            <div style={{ fontSize: '18px', marginBottom: '5px' }}>💬</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>AI Chat</div>
          </div>
          <div style={styles.ab} onClick={() => navigate('/analysis')}>
            <div style={{ fontSize: '18px', marginBottom: '5px' }}>📊</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Generate Report</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: { background: '#08080f', minHeight: '100vh', padding: '24px', color: 'white' },
  title: { fontSize: '20px', fontWeight: '500', marginBottom: '4px' },
  sub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' },
  upzone: { border: '1.5px dashed rgba(124,58,237,0.3)', borderRadius: '14px', padding: '48px', textAlign: 'center', marginBottom: '16px', cursor: 'pointer', transition: 'all 0.2s' },
  upIcon: { fontSize: '36px', marginBottom: '12px' },
  upTitle: { fontSize: '15px', fontWeight: '500', color: 'white', marginBottom: '6px' },
  upSub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '16px' },
  browseBtn: { background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' },
  fmts: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px', flexWrap: 'wrap' },
  fmt: { background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '5px', padding: '3px 10px', fontSize: '10px', color: 'rgba(255,255,255,0.35)' },
  panel: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '16px' },
  panelTitle: { fontSize: '13px', fontWeight: '500', color: 'white', marginBottom: '14px' },
  dr: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '0.5px solid rgba(255,255,255,0.04)' },
  di: { width: '30px', height: '30px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0, background: 'rgba(124,58,237,0.1)' },
  dn: { fontSize: '12px', color: 'rgba(255,255,255,0.7)', flex: 1 },
  pb: { height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', overflow: 'hidden', marginTop: '4px' },
  pf: { height: '100%', background: 'linear-gradient(90deg,#7c3aed,#4f46e5)', borderRadius: '3px' },
  rt: { fontSize: '9px', fontWeight: '500', padding: '2px 7px', borderRadius: '8px', flexShrink: 0 },
  result: { background: 'rgba(124,58,237,0.06)', border: '0.5px solid rgba(124,58,237,0.15)', borderRadius: '10px', padding: '14px', marginTop: '14px' },
  resultLabel: { fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' },
  resultText: { fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' },
  emptyText: { fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '20px' },
};

const BACKEND = 'https://idp-3yw3.onrender.com';

function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${BACKEND}/upload-contract/`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
      setUploads(prev => [{ name: file.name, status: 'Done', risk: data.risk_score }, ...prev]);
      setFile(null);
    } catch (err) {
      setResult({ error: 'Upload failed. Please try again.' });
    }
    setUploading(false);
  };

  const getRiskStyle = (risk) => {
    if (risk === 'High') return { background: 'rgba(239,68,68,0.1)', color: '#ef4444' };
    if (risk === 'Medium') return { background: 'rgba(234,179,8,0.1)', color: '#eab308' };
    return { background: 'rgba(34,197,94,0.1)', color: '#22c55e' };
  };

  return (
    <div style={styles.page}>
      <div style={styles.title}>Upload Document</div>
      <div style={styles.sub}>Drag and drop your contract for AI analysis.</div>

      {/* Upload Zone */}
      <div
        style={{ ...styles.upzone, borderColor: dragOver ? 'rgba(124,58,237,0.6)' : 'rgba(124,58,237,0.3)', background: dragOver ? 'rgba(124,58,237,0.03)' : 'transparent' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input id="file-input" type="file" accept=".pdf,.docx,.png,.jpg,.jpeg" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
        <div style={styles.upIcon}>📤</div>
        <div style={styles.upTitle}>{file ? file.name : 'Drag and drop files here'}</div>
        <div style={styles.upSub}>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'or click to browse from your computer'}</div>
        {file ? (
          <button style={styles.browseBtn} onClick={e => { e.stopPropagation(); handleUpload(); }} disabled={uploading}>
            {uploading ? 'Analysing...' : 'Analyse Contract'}
          </button>
        ) : (
          <button style={styles.browseBtn} onClick={e => { e.stopPropagation(); document.getElementById('file-input').click(); }}>Browse Files</button>
          )}
        <div style={styles.fmts}>
          <span style={styles.fmt}>PDF</span>
          <span style={styles.fmt}>DOCX</span>
          <span style={styles.fmt}>PNG</span>
          <span style={styles.fmt}>JPG</span>
          <span style={styles.fmt}>Max 50MB</span>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div style={styles.panel}>
          <div style={styles.panelTitle}>📊 Analysis Result</div>
          {result.error ? (
            <div style={{ color: '#ef4444', fontSize: '13px' }}>{result.error}</div>
          ) : (
            <>
              <div style={styles.result}>
                <div style={styles.resultLabel}>AI Summary</div>
                <div style={styles.resultText}>{result.summary}</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                <div style={styles.result}>
                  <div style={styles.resultLabel}>Risk Score</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: result.risk_score === 'High' ? '#ef4444' : result.risk_score === 'Medium' ? '#eab308' : '#22c55e' }}>
                    {result.risk_score}
                  </div>
                </div>
              </div>
              <button
                style={{ ...styles.browseBtn, marginTop: '12px' }}
                onClick={() => navigate('/analysis')}
              >
                View Full Analysis →
              </button>
            </>
          )}
        </div>
      )}

      {/* Recent Uploads */}
      <div style={{ ...styles.panel, marginTop: '14px' }}>
        <div style={styles.panelTitle}>📋 Recent Uploads</div>
        {uploads.length === 0 ? (
          <div style={styles.emptyText}>No documents uploaded yet.</div>
        ) : (
          uploads.map((u, i) => (
            <div key={i} style={styles.dr}>
              <div style={styles.di}>📄</div>
              <div style={{ flex: 1 }}>
                <div style={styles.dn}>{u.name}</div>
                <div style={styles.pb}><div style={{ ...styles.pf, width: '100%' }}></div></div>
              </div>
              <div style={{ ...styles.rt, ...getRiskStyle(u.risk) }}>{u.status}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Upload;
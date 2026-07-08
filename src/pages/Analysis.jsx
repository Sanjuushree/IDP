import React, { useState, useEffect } from 'react';

const styles = {
  page: { background: '#08080f', minHeight: '100vh', padding: '24px', color: 'white' },
  title: { fontSize: '20px', fontWeight: '500', marginBottom: '4px' },
  sub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' },
  panel: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '16px', marginBottom: '14px' },
  panelTitle: { fontSize: '13px', fontWeight: '500', color: 'white', marginBottom: '14px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' },
  card: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '14px' },
  label: { fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' },
  text: { fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' },
  chatWrap: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px', maxHeight: '280px', overflowY: 'auto' },
  msgAI: { display: 'flex', gap: '8px', alignItems: 'flex-start' },
  msgUser: { display: 'flex', gap: '8px', alignItems: 'flex-start', flexDirection: 'row-reverse' },
  av: { width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', flexShrink: 0, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: 'white', fontWeight: '500' },
  avU: { width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', flexShrink: 0, background: 'rgba(124,58,237,0.2)', color: 'white' },
  bubble: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '9px', padding: '9px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', maxWidth: '480px' },
  bubbleU: { background: 'rgba(124,58,237,0.1)', border: '0.5px solid rgba(124,58,237,0.2)', borderRadius: '9px', padding: '9px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', maxWidth: '480px' },
  inputRow: { display: 'flex', gap: '8px' },
  input: { flex: 1, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', color: 'white', outline: 'none' },
  sendBtn: { background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' },
  clauseItem: { display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginBottom: '5px' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0 },
  select: { background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '7px', padding: '7px 12px', fontSize: '12px', color: 'white', outline: 'none', marginRight: '8px' },
  translateBtn: { background: 'rgba(124,58,237,0.1)', border: '0.5px solid rgba(124,58,237,0.2)', color: '#a78bfa', padding: '6px 14px', borderRadius: '7px', fontSize: '12px', cursor: 'pointer' },
  emptyText: { fontSize: '13px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '24px' },
  docSelect: { background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '7px', padding: '7px 12px', fontSize: '12px', color: 'white', outline: 'none', width: '100%', marginBottom: '14px' },
};

const BACKEND = 'https://idp-3yw3.onrender.com';

function Analysis() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your AI Contract Assistant. Select a document and I'll help you analyse risks, find clauses, and answer questions." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [translateLang, setTranslateLang] = useState('Tamil');
  const [translated, setTranslated] = useState('');
  const [translating, setTranslating] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND}/documents`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDocuments(data);
          if (data.length > 0) setSelectedDoc(data[0]);
        }
      });
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          context: selectedDoc?.extracted_text || ''
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to AI.' }]);
    }
    setLoading(false);
  };

  const handleTranslate = async () => {
    if (!selectedDoc?.summary) return;
    setTranslating(true);
    try {
      const res = await fetch(`${BACKEND}/translate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedDoc.summary, language: translateLang })
      });
      const data = await res.json();
      setTranslated(data.translated);
    } catch {
      setTranslated('Translation failed.');
    }
    setTranslating(false);
  };

  const getRiskColor = (risk) => {
    if (risk === 'High') return '#ef4444';
    if (risk === 'Medium') return '#eab308';
    return '#22c55e';
  };

  return (
    <div style={styles.page}>
      <div style={styles.title}>AI Analysis</div>
      <div style={styles.sub}>AI-powered contract insights and chat assistant.</div>

      {/* Document Selector */}
      <div style={styles.panel}>
        <div style={styles.panelTitle}>📄 Select Document</div>
        {documents.length === 0 ? (
          <div style={styles.emptyText}>No documents uploaded yet. Go to Upload Document first.</div>
        ) : (
          <select
            style={styles.docSelect}
            onChange={e => setSelectedDoc(documents.find(d => d.id === parseInt(e.target.value)))}
            value={selectedDoc?.id || ''}
          >
            {documents.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.filename} — {doc.risk_score}</option>
            ))}
          </select>
        )}
      </div>

      {/* AI Chat */}
      <div style={styles.panel}>
        <div style={styles.panelTitle}>💬 AI Chat Assistant</div>
        <div style={styles.chatWrap}>
          {messages.map((m, i) => (
            <div key={i} style={m.role === 'ai' ? styles.msgAI : styles.msgUser}>
              <div style={m.role === 'ai' ? styles.av : styles.avU}>{m.role === 'ai' ? 'AI' : 'S'}</div>
              <div style={m.role === 'ai' ? styles.bubble : styles.bubbleU}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div style={styles.msgAI}>
              <div style={styles.av}>AI</div>
              <div style={styles.bubble}>Thinking...</div>
            </div>
          )}
        </div>
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your contract..."
          />
          <button style={styles.sendBtn} onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Analysis Results */}
      {selectedDoc ? (
        <div style={styles.grid2}>
          <div style={styles.card}>
            <div style={styles.label}>AI Summary</div>
            <div style={styles.text}>
              {selectedDoc.summary || 'No summary available.'}
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.label}>Risk Score</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: getRiskColor(selectedDoc.risk_score), marginBottom: '4px' }}>
              {selectedDoc.risk_score || 'Unknown'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
              Uploaded: {new Date(selectedDoc.uploaded_at).toLocaleDateString()}
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.label}>Extracted Text Preview</div>
            <div style={{ ...styles.text, fontSize: '11px', maxHeight: '100px', overflowY: 'auto' }}>
              {selectedDoc.extracted_text?.slice(0, 300) || 'No text available.'}...
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.label}>Document Info</div>
            <div style={styles.clauseItem}><div style={{ ...styles.dot, background: '#7c3aed' }}></div>File: {selectedDoc.filename}</div>
            <div style={styles.clauseItem}><div style={{ ...styles.dot, background: getRiskColor(selectedDoc.risk_score) }}></div>Risk: {selectedDoc.risk_score}</div>
            <div style={styles.clauseItem}><div style={{ ...styles.dot, background: '#22c55e' }}></div>Status: Analysed</div>
          </div>
        </div>
      ) : (
        <div style={styles.panel}>
          <div style={styles.emptyText}>No Document Available For Analysis. Please upload a document first.</div>
        </div>
      )}

      {/* Translation */}
      <div style={styles.panel}>
        <div style={styles.panelTitle}>🌐 Multi-language Translation</div>
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <select style={styles.select} value={translateLang} onChange={e => setTranslateLang(e.target.value)}>
            <option>Tamil</option>
            <option>Hindi</option>
            <option>French</option>
            <option>Spanish</option>
            <option>German</option>
            <option>Arabic</option>
            <option>Japanese</option>
          </select>
          <button style={styles.translateBtn} onClick={handleTranslate} disabled={translating || !selectedDoc}>
            {translating ? 'Translating...' : 'Translate Summary'}
          </button>
        </div>
        {translated && (
          <div style={{ ...styles.text, background: 'rgba(124,58,237,0.06)', padding: '12px', borderRadius: '8px' }}>
            {translated}
          </div>
        )}
      </div>
    </div>
  );
}

export default Analysis;
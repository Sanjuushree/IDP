import React, { useState } from 'react';

const styles = {
  page: { background: '#08080f', minHeight: '100vh', padding: '24px', color: 'white' },
  title: { fontSize: '20px', fontWeight: '500', marginBottom: '4px' },
  sub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' },
  panel: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '20px' },
  panelTitle: { fontSize: '13px', fontWeight: '500', color: 'white', marginBottom: '16px' },
  label: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '5px' },
  input: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', color: 'white', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' },
  textarea: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', color: 'white', outline: 'none', resize: 'none', height: '90px', marginBottom: '12px', boxSizing: 'border-box' },
  btn: { width: '100%', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' },
  infoItem: { display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' },
  infoLabel: { fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '2px' },
  infoVal: { fontSize: '12px', color: 'rgba(255,255,255,0.65)' },
  success: { background: 'rgba(34,197,94,0.1)', border: '0.5px solid rgba(34,197,94,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#22c55e', marginBottom: '12px' },
};

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.title}>Contact Us</div>
      <div style={styles.sub}>We're here to help with any questions.</div>
      <div style={styles.grid}>

        {/* Left — Form */}
        <div style={styles.panel}>
          <div style={styles.panelTitle}>Send a Message</div>
          {sent && <div style={styles.success}>✅ Message sent successfully!</div>}
          <label style={styles.label}>Full Name</label>
          <input style={styles.input} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <label style={styles.label}>Email Address</label>
          <input style={styles.input} placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <label style={styles.label}>Message</label>
          <textarea style={styles.textarea} placeholder="How can we help you?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          <button style={styles.btn} onClick={handleSend}>Send Message</button>
        </div>

        {/* Right — Info */}
        <div style={styles.panel}>
          <div style={styles.panelTitle}>Contact Info</div>
          <div style={styles.infoItem}>
            <span style={{ fontSize: '16px' }}>📧</span>
            <div>
              <div style={styles.infoLabel}>Support Email</div>
              <div style={styles.infoVal}>support@contractai.com</div>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '500', color: 'white', marginBottom: '10px' }}>FAQ</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: '1.8' }}>
              Q: What formats are supported?<br />
              A: PDF, DOCX, PNG, JPG up to 50MB.<br /><br />
              Q: How accurate is the AI?<br />
              A: Powered by Groq LLaMA 3.3 70B.<br /><br />
              Q: Is my data secure?<br />
              A: Yes, stored securely in Supabase.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
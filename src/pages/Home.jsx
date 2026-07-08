import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: { background: '#08080f', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: '600' },
  logoIcon: { width: '32px', height: '32px', background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', borderRadius: '8px' },
  loginBtn: { background: 'transparent', border: '0.5px solid rgba(255,255,255,0.2)', color: 'white', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' },
  hero: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' },
  badge: { background: 'rgba(124,58,237,0.12)', border: '0.5px solid rgba(124,58,237,0.3)', color: '#a78bfa', fontSize: '12px', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px' },
  title: { fontSize: '42px', fontWeight: '700', maxWidth: '700px', lineHeight: '1.2', marginBottom: '16px' },
  gradientText: { background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  sub: { fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '560px', marginBottom: '32px', lineHeight: '1.6' },
  ctaRow: { display: 'flex', gap: '14px' },
  primaryBtn: { background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: 'white', border: 'none', padding: '13px 28px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
  secondaryBtn: { background: 'transparent', border: '0.5px solid rgba(255,255,255,0.2)', color: 'white', padding: '13px 28px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' },
  features: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '900px', margin: '60px auto 40px', padding: '0 20px' },
  card: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '24px', textAlign: 'left' },
  cardIcon: { fontSize: '24px', marginBottom: '12px' },
  cardTitle: { fontSize: '15px', fontWeight: '600', marginBottom: '8px' },
  cardText: { fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.5' },
  footer: { textAlign: 'center', padding: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' },
};

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}></div>
          ContractAI
        </div>
        <button style={styles.loginBtn} onClick={() => navigate('/login')}>Login</button>
      </div>

      <div style={styles.hero}>
        <div style={styles.badge}>AI-Powered Contract Analysis</div>
        <div style={styles.title}>
          Understand any contract <span style={styles.gradientText}>in seconds</span>
        </div>
        <div style={styles.sub}>
            Welcome to Contract Analyser, an AI-powered platform for smart document processing, contract analysis, risk detection, and intelligent insights.     
        </div>
        <div style={styles.ctaRow}>
          <button style={styles.primaryBtn} onClick={() => navigate('/login')}>Get Started</button>
          <button style={styles.secondaryBtn} onClick={() => navigate('/contact')}>Contact Us</button>
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>📄</div>
          <div style={styles.cardTitle}>Smart Upload</div>
          <div style={styles.cardText}>Upload PDF or Word contracts and get instant text extraction, even from scanned documents.</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardIcon}>⚠️</div>
          <div style={styles.cardTitle}>Risk Detection</div>
          <div style={styles.cardText}>Automatically identifies high, medium, and low risk clauses so you know what to watch for.</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardIcon}>💬</div>
          <div style={styles.cardTitle}>Ask Anything</div>
          <div style={styles.cardText}>Chat with your contract — ask questions and get plain-language answers, powered by AI.</div>
        </div>
      </div>

      <div style={styles.footer}>© 2026 ContractAI. All rights reserved.</div>
    </div>
  );
}

export default Home;
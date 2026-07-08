import React from 'react';

const styles = {
  page: { background: '#08080f', minHeight: '100vh', padding: '24px', color: 'white' },
  title: { fontSize: '20px', fontWeight: '500', marginBottom: '4px' },
  sub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' },
  card: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '20px', transition: 'all 0.2s', cursor: 'pointer' },
  icon: { fontSize: '24px', marginBottom: '12px' },
  cardTitle: { fontSize: '14px', fontWeight: '500', color: 'white', marginBottom: '6px' },
  cardDesc: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' },
};

const services = [
  { icon: '🤖', title: 'AI Contract Analysis', desc: 'Automatically analyse contracts, detect risks, and extract key clauses using Groq LLaMA 3.3 70B.' },
  { icon: '🔍', title: 'OCR — Image to Text', desc: 'Extract text from scanned PDFs, images, and handwritten documents with Tesseract OCR.' },
  { icon: '⚠️', title: 'Risk Detection', desc: 'Identify High, Medium, and Low risk levels based on contract keywords and legal clauses.' },
  { icon: '🔎', title: 'Clause Search', desc: 'Search and locate specific clauses instantly across all uploaded documents.' },
  { icon: '📝', title: 'Smart Summarization', desc: 'Generate concise, accurate summaries of long contracts using advanced AI models.' },
  { icon: '🌐', title: 'Multi-language Translation', desc: 'Translate contracts and documents into multiple languages with AI-powered accuracy.' },
  { icon: '💬', title: 'AI Chat Assistant', desc: 'Ask questions about your contracts and get instant AI-powered answers and insights.' },
  { icon: '📊', title: 'AI Report Generator', desc: 'Generate professional PDF reports with full contract analysis, risks, and recommendations.' },
  { icon: '🗂️', title: 'Document Classification', desc: 'Automatically classify documents by type — NDA, Employment, Service Agreement, and more.' },
];

function Services() {
  return (
    <div style={styles.page}>
      <div style={styles.title}>Our Services</div>
      <div style={styles.sub}>Powerful AI tools for all your document needs.</div>
      <div style={styles.grid}>
        {services.map((s, i) => (
          <div key={i} style={styles.card}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.12)'}
          >
            <div style={styles.icon}>{s.icon}</div>
            <div style={styles.cardTitle}>{s.title}</div>
            <div style={styles.cardDesc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
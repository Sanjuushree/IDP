import React from 'react';

function Landing() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Landing Header */}
      <header style={{
        padding: '0 40px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(7, 10, 19, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>📄</span>
          <span style={{
            fontFamily: 'Outfit',
            fontSize: '18px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            IDP Analyser
          </span>
        </div>
        <a href="/login" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '13px', textDecoration: 'none' }}>
          Sign In
        </a>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1 }}>
        <section style={{
          textAlign: 'center',
          padding: '100px 20px 80px',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }} className="animate-fade-in">
          
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            color: 'var(--primary)',
            fontWeight: '600',
            marginBottom: '24px',
            fontFamily: 'Outfit'
          }}>
            ✨ AI-Powered Document Intelligence
          </div>

          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            lineHeight: 1.15,
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #ffffff 30%, var(--text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Intelligent Document Processing <br/> & Contract Analyser
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Instantly upload contracts to extract text, generate AI-powered summaries, and assess risks—all powered by Groq LLaMA and Supabase.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/login" className="btn-primary" style={{ padding: '14px 36px', fontSize: '15px', textDecoration: 'none' }}>
              Get Started for Free
            </a>
            <a href="https://github.com/Sanjuushree/IDP" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '14px 36px', fontSize: '15px', textDecoration: 'none' }}>
              View Github Repository
            </a>
          </div>

          {/* Interactive UI Mockup Card */}
          <div style={{
            marginTop: '80px',
            padding: '12px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 30px 100px rgba(0,0,0,0.8)'
          }}>
            <div style={{
              background: '#0d1323',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)'
            }}>
              {/* Mockup Window Header */}
              <div style={{
                height: '40px',
                background: '#090e1a',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                borderBottom: '1px solid var(--border-color)',
                gap: '8px'
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                <div style={{
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  margin: '0 auto',
                  fontFamily: 'monospace'
                }}>idp-lemon.vercel.app</div>
              </div>
              {/* Mockup Window Content */}
              <div style={{ padding: '30px', textAlign: 'left', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '240px' }} className="glass-panel">
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>ANALYSIS HIGHLIGHTS</h3>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                      <div className="badge badge-high">High Risk Score</div>
                      <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', padding: '4px 10px', fontSize: '12px' }}>llama-3.3-70b</div>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginBottom: '8px', width: '100%' }} />
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginBottom: '8px', width: '90%' }} />
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', width: '40%' }} />
                  </div>
                </div>
                <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="glass-panel" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold' }}>TOTAL UPLOADS</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>12 Documents</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold' }}>OCR STATUS</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--success)' }}>Tesseract Connected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          padding: '100px 40px',
          background: 'rgba(15, 21, 36, 0.4)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '12px' }}>
              Everything you need to analyze contracts
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '60px' }}>
              A complete processing pipeline from document upload to AI-generated insights.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {[
                { icon: '📄', title: 'PDF & DOCX Support', desc: 'Drag-and-drop contracts in PDF or DOCX format. Handles typed and scanned content.' },
                { icon: '🤖', title: 'LLaMA-Powered Summary', desc: 'Instantly reads the entire file and compiles a clean 2–3 sentence summary using Groq.' },
                { icon: '⚠️', title: 'Automated Risk Scoring', desc: 'Classifies risks (High, Medium, Low) based on key clauses, obligations, and penalties.' },
                { icon: '📋', title: 'Cloud Document History', desc: 'Keeps a secure database log of all analyzed files in Supabase so you never lose your history.' },
                { icon: '🔍', title: 'OCR Scanning', desc: 'Uses Tesseract OCR to automatically scan and extract text from images or scanned PDF contracts.' },
                { icon: '🔒', title: 'Secure Database Integration', desc: 'Stores your data safely, allowing for easy query and secure dashboard management.' },
              ].map((item, index) => (
                <div key={index} className="glass-panel" style={{ padding: '30px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginBottom: '20px',
                    border: '1px solid rgba(139, 92, 246, 0.15)'
                  }}>{item.icon}</div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ padding: '100px 40px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '16px' }}>How it works</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px' }}>
            Go from raw contract files to AI summaries in seconds.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {[
              { step: '01', title: 'Upload your document', desc: 'Simply upload your PDF or Word document in our responsive uploader page. Scanned PDFs are automatically supported.' },
              { step: '02', title: 'FastAPI and AI Analysis', desc: 'FastAPI backend processes files using PyMuPDF or Tesseract OCR, feeding text directly to Groq LLaMA.' },
              { step: '03', title: 'Get Summary and Risks', desc: 'Instantly view results, see risk tags, examine summary, and review files stored securely in your database history.' }
            ].map((item, index) => (
              <div key={index} className="glass-panel" style={{
                padding: '30px',
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  fontSize: '28px',
                  fontFamily: 'Outfit',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1
                }}>{item.step}</div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid var(--border-color)',
          padding: '40px',
          textAlign: 'center',
          background: '#090e1a'
        }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Built by Sanjuushree R — Intelligent Document Processing and Contract Analyser
          </p>
          <a href="https://github.com/Sanjuushree/IDP" target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: 'var(--primary)', textDecoration: 'none' }}>
            GitHub Repository →
          </a>
        </footer>
      </main>

    </div>
  );
}

export default Landing;
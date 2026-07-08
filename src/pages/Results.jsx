import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { result, filename } = location.state || {};
  const [showRawText, setShowRawText] = useState(false);

  // If no result is passed (direct URL access), show empty state
  if (!result) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }} className="animate-fade-in">
        <span style={{ fontSize: '64px', display: 'block', marginBottom: '24px' }}>🔍</span>
        <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>No Results Available</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
          Please go to the Upload page and submit a contract first to view its AI summary and risk score.
        </p>
        <Link to="/upload" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 30px' }}>
          Go to Upload
        </Link>
      </div>
    );
  }

  const { summary, risk_score, extracted_text } = result;

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }} className="animate-fade-in">
      
      {/* Header Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Analysis Results</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Contract: <strong style={{ color: 'var(--text-primary)' }}>{filename || 'Uploaded Document'}</strong>
          </p>
        </div>
        <Link to="/upload" className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '13px' }}>
          ← Upload Another
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Risk Card */}
        <div className="glass-panel" style={{
          padding: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          borderLeft: `4px solid ${
            risk_score === 'High' ? 'var(--danger)' :
            risk_score === 'Medium' ? 'var(--warning)' : 'var(--success)'
          }`
        }}>
          <div>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.05em', fontFamily: 'Outfit' }}>RISK ASSESSMENT</h3>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>
              Contract Risk: {risk_score}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '500px' }}>
              {risk_score === 'High' ? 'This contract contains critical key terms like penalty, liability, or breach. Please review thoroughly.' :
               risk_score === 'Medium' ? 'This contract contains restriction and confidentiality clauses. Standard review recommended.' :
               'This contract contains standard formatting clauses with low risk terms. Ready for review.'}
            </p>
          </div>
          
          <div className={`badge ${
            risk_score === 'High' ? 'badge-high' :
            risk_score === 'Medium' ? 'badge-medium' : 'badge-low'
          }`} style={{
            fontSize: '18px',
            padding: '8px 24px',
            borderRadius: '24px',
            boxShadow: risk_score === 'High' ? '0 0 20px rgba(239, 68, 68, 0.2)' : 'none'
          }}>
            {risk_score}
          </div>
        </div>

        {/* AI Summary Card */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '24px' }}>🤖</span>
            <h3 style={{ fontSize: '18px' }}>AI-Generated Summary</h3>
          </div>
          <blockquote style={{
            fontStyle: 'normal',
            fontSize: '16px',
            color: 'var(--text-primary)',
            lineHeight: 1.7,
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '24px',
            borderRadius: '12px',
            borderLeft: '4px solid var(--primary)',
            margin: 0
          }}>
            "{summary || 'Summary generation disabled or failed.'}"
          </blockquote>
        </div>

        {/* Extracted Text Details Card */}
        {extracted_text && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>📝</span>
                <h3 style={{ fontSize: '18px' }}>Extracted Document Content</h3>
              </div>
              <button
                onClick={() => setShowRawText(!showRawText)}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
              >
                {showRawText ? 'Hide Text' : 'View Full Text'}
              </button>
            </div>

            {showRawText && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '20px',
                maxHeight: '300px',
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-wrap'
              }}>
                {extracted_text}
              </div>
            )}
            {!showRawText && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                You can review the raw text characters extracted by the PDF parser or Tesseract OCR.
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Results;
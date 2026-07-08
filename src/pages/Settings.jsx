import React, { useState, useEffect } from 'react';

const BACKEND = "https://idp-3yw3.onrender.com";

const styles = {
  page: { background: '#08080f', minHeight: '100vh', padding: '24px', color: 'white' },
  title: { fontSize: '20px', fontWeight: '500', marginBottom: '4px' },
  sub: { fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  panel: { background: 'rgba(13,13,26,0.95)', border: '0.5px solid rgba(124,58,237,0.12)', borderRadius: '12px', padding: '18px', marginBottom: '12px' },
  panelTitle: { fontSize: '12px', fontWeight: '500', color: 'white', marginBottom: '12px', paddingBottom: '8px', borderBottom: '0.5px solid rgba(255,255,255,0.06)' },
  label: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '5px' },
  input: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.09)', borderRadius: '7px', padding: '8px 12px', fontSize: '12px', color: 'white', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' },
  select: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.09)', borderRadius: '7px', padding: '8px 12px', fontSize: '12px', color: 'white', outline: 'none', marginBottom: '10px' },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '0.5px solid rgba(255,255,255,0.04)' },
  rowLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.65)' },
  rowSub: { fontSize: '10px', color: 'rgba(255,255,255,0.28)', marginTop: '1px' },
  saveBtn: { background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', marginTop: '16px' },
  success: { background: 'rgba(34,197,94,0.1)', border: '0.5px solid rgba(34,197,94,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#22c55e', marginTop: '12px' },
};

function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{ width: '32px', height: '18px', background: on ? '#7c3aed' : 'rgba(124,58,237,0.3)', borderRadius: '9px', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', width: '12px', height: '12px', background: 'white', borderRadius: '50%', top: '3px', left: on ? '17px' : '3px', transition: 'left 0.2s' }}></div>
    </div>
  );
}

function Settings() {
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, risk: true, weekly: false });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${BACKEND}/settings`)
      .then(res => res.json())
      .then(data => {
        setName(data.full_name);
        setEmail(data.email);
      })
      .catch(err => console.error("Failed to load settings:", err));
  }, []);

  const handleSave = async () => {
    try {
      await fetch(`${BACKEND}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name, email: email })
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.title}>Settings</div>
      <div style={styles.sub}>Manage your account and preferences.</div>
      <div style={styles.grid}>
        <div>
          <div style={styles.panel}>
            <div style={styles.panelTitle}>Profile</div>
            <label style={styles.label}>Full Name</label>
            <input style={styles.input} value={name} onChange={e => setName(e.target.value)} />
            <label style={styles.label}>Email</label>
            <input style={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={styles.panel}>
            <div style={styles.panelTitle}>Preferences</div>
            <label style={styles.label}>Language</label>
            <select style={styles.select}>
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
            </select>
            <label style={styles.label}>Time Zone</label>
            <select style={styles.select}>
              <option>IST (UTC+5:30)</option>
              <option>UTC</option>
            </select>
            <label style={styles.label}>Theme</label>
            <select style={styles.select}>
              <option>Dark</option>
              <option>Light</option>
            </select>
          </div>
        </div>
        <div>
          <div style={styles.panel}>
            <div style={styles.panelTitle}>Notifications</div>
            <div style={styles.row}>
              <div><div style={styles.rowLabel}>Email Alerts</div><div style={styles.rowSub}>Notify on analysis complete</div></div>
              <Toggle on={notifs.email} onToggle={() => setNotifs({ ...notifs, email: !notifs.email })} />
            </div>
            <div style={styles.row}>
              <div><div style={styles.rowLabel}>Risk Alerts</div><div style={styles.rowSub}>Alert on high risk contracts</div></div>
              <Toggle on={notifs.risk} onToggle={() => setNotifs({ ...notifs, risk: !notifs.risk })} />
            </div>
            <div style={{ ...styles.row, borderBottom: 'none' }}>
              <div><div style={styles.rowLabel}>Weekly Report</div></div>
              <Toggle on={notifs.weekly} onToggle={() => setNotifs({ ...notifs, weekly: !notifs.weekly })} />
            </div>
          </div>
          <div style={styles.panel}>
            <div style={styles.panelTitle}>Security</div>
            <label style={styles.label}>Current Password</label>
            <input style={styles.input} type="password" placeholder="••••••••" />
            <label style={styles.label}>New Password</label>
            <input style={styles.input} type="password" placeholder="••••••••" />
          </div>
        </div>
      </div>
      <button style={styles.saveBtn} onClick={handleSave}>Save Changes</button>
      {saved && <div style={styles.success}>✅ Settings saved successfully!</div>}
    </div>
  );
}

export default Settings;
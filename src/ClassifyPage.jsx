import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, AlertCircle, Loader2, ChevronDown, RotateCcw } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const LEVEL_CONFIG = [
  { label: 'Level 1' },
  { label: 'Level 2' },
  { label: 'Level 3' },
  { label: 'Level 4' },
];

const EXAMPLES = ['Fastenal', 'UPS', 'FedEx', 'Willis Rubber', 'DHL Global Forwarding', 'Zetwerk Manufacturing'];

function Result({ result, onReset }) {
  const levels = result.levels || result.classification.split(' > ');
  return (
    <div className="cpr-wrap">
      <div className="cpr-card">
        {/* top row */}
        <div className="cpr-toprow">
          <div className="cpr-badge-ok">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#dcfce7"/>
              <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Category identified
          </div>
          <button className="cpr-reset" onClick={onReset}>
            <RotateCcw size={12} /> Classify another
          </button>
        </div>

        {/* levels */}
        <div className="cpr-levels">
          {levels.map((lvl, i) => {
            const cfg = LEVEL_CONFIG[i] || LEVEL_CONFIG[3];
            return (
              <div key={i} className="cpr-level-row">
                <div className="cpr-level" style={{ '--c': cfg.color, '--bg': cfg.bg }}>
                  <span className="cpr-level-label">{cfg.label}</span>
                  <span className="cpr-level-value">{lvl}</span>
                </div>
                {i < levels.length - 1 && (
                  <div className="cpr-arrow"><ChevronDown size={13} /></div>
                )}
              </div>
            );
          })}
        </div>

        {/* breadcrumb */}
        <div className="cpr-breadcrumb">
          {levels.map((lvl, i) => (
            <span key={i} className="cpr-bc-item">
              {i > 0 && <span className="cpr-bc-sep">›</span>}
              {lvl}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClassifyPage() {
  const [supplier,    setSupplier]    = useState('');
  const [description, setDescription] = useState('');
  const [result,      setResult]      = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const resultRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!supplier.trim()) { setError('Please enter a supplier name.'); return; }
    setError(''); setResult(null); setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/classify`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplier: supplier.trim(), po_description: description.trim(), invoice_description: '' }),
      });
      const data = await res.json();
      if (data.error && !data.classification) { setError(data.error); }
      else {
        setResult(data);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    } catch { setError('Could not reach the server.'); }
    finally   { setLoading(false); }
  }

  function handleReset() { setSupplier(''); setDescription(''); setResult(null); setError(''); }

  return (
    <div className="cp-page">

      {/* Navbar */}
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/" className="logo-link">
            <img src="/logowebsite.png" alt="Dolphin AI" className="logo-img" />
          </Link>
          <nav className="nav-links">
            <Link to="/#solution">Solution</Link>
            <Link to="/#workflow">Workflow</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/login?redirect=/demo-video" className="btn btn-primary">Live demo</Link>
            <Link to="/book-demo" className="btn btn-primary">Book a demo</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="cp-hero">
        <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>Spend Classifier</span>
        <h1 className="cp-title">Classify any supplier or invoice line</h1>
        <p className="cp-sub">Enter a supplier name and get the exact spend category in seconds.</p>
      </section>

      {/* Tool — two columns */}
      <section className="cp-tool container">
        <div className="cp-cols">

          {/* LEFT — form */}
          <div className="cp-form-col">
            <div className="cp-tool-card">
              <div className="cp-input-group">
                <label className="cp-label" htmlFor="supplier">Supplier name <span className="cp-req">*</span></label>
                <input
                  id="supplier" type="text" className="cp-input cp-input-lg"
                  value={supplier} onChange={e => setSupplier(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
                  placeholder="e.g. Fastenal, UPS, Zetwerk…"
                  autoFocus autoComplete="off"
                />
              </div>
              <div className="cp-input-group" style={{ marginTop: '1.25rem' }}>
                <label className="cp-label" htmlFor="desc">
                  Description <span className="cp-opt">optional</span>
                </label>
                <textarea
                  id="desc" rows={3} className="cp-input"
                  value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. Galvanized steel tubing, powder paint primers, A4 printer paper…"
                />
              </div>
              {error && <div className="cp-error"><AlertCircle size={14} /> {error}</div>}
              <button className="btn btn-primary cp-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? <><Loader2 size={16} className="spin" /> Classifying…</> : <><Sparkles size={15} /> Classify</>}
              </button>
              <div className="cp-examples">
                <span className="cp-ex-label">Try:</span>
                {EXAMPLES.map(s => (
                  <button key={s} className="cp-chip"
                    onClick={() => { setSupplier(s); setDescription(''); setResult(null); setError(''); }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — result */}
          <div className="cp-result-col" ref={resultRef}>
            {!result && !loading && (
              <div className="cp-placeholder">
                <div className="cp-ph-icon"><Sparkles size={22} /></div>
                <p className="cp-ph-title">Your result will appear here</p>
                <p className="cp-ph-sub">Try "Fastenal" or "Office Depot + printer paper"</p>
              </div>
            )}
            {loading && (
              <div className="cp-placeholder">
                <Loader2 size={28} className="spin" style={{ color: 'var(--copper)', opacity: 0.7 }} />
                <p className="cp-ph-title" style={{ marginTop: '1rem' }}>Analysing…</p>
                <p className="cp-ph-sub">Matching against your spend taxonomy</p>
              </div>
            )}
            {result && !loading && <Result result={result} onReset={handleReset} />}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-bottom">
          <p>Copyright © 2026 Dolphin AI</p>
          <div><a href="#">Privacy Policy</a><a href="#">Cookie Policy</a></div>
        </div>
      </footer>
    </div>
  );
}

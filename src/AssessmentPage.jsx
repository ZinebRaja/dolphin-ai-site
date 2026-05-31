import Navbar from './Navbar.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock, TrendingUp, Users, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

const fmtCurrency = (n) => {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000)     return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)         return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};

function SliderField({ label, value, min, max, step, onChange, display, hint }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="roi-field">
      <div className="roi-field-header">
        <label>{label}</label>
        <span className="roi-field-value">{display(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%` }} className="roi-slider" />
      <div className="roi-field-hints"><span>{display(min)}</span><span>{display(max)}</span></div>
      {hint && <p className="roi-field-hint">{hint}</p>}
    </div>
  );
}

function NumberField({ label, value, min, max, onChange, suffix, hint }) {
  return (
    <div className="roi-field">
      <label className="roi-field-label">{label}</label>
      <div className="roi-number-wrap">
        <input type="number" min={min} max={max} value={value}
          onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
          className="roi-number-input" />
        {suffix && <span className="roi-number-suffix">{suffix}</span>}
      </div>
      {hint && <p className="roi-field-hint">{hint}</p>}
    </div>
  );
}

export function ROICalculator({ showGate = true }) {
  const [spend,        setSpend]        = useState(25_000_000);
  const [employees,    setEmployees]    = useState(2);
  const [hourlyRate,   setHourlyRate]   = useState(30);
  const [hoursPerWeek, setHoursPerWeek] = useState(3);
  const [email,        setEmail]        = useState('');
  const [unlocked,     setUnlocked]     = useState(!showGate);

  const productivity = Math.round(employees * hoursPerWeek * 52 * 0.65 * hourlyRate);
  const spendSavings = Math.round(spend * 0.035);
  const tailSpend    = Math.round(spend * 0.012);
  const compliance   = Math.round(spend * 0.008);
  const total        = productivity + spendSavings + tailSpend + compliance;

  const breakdown = [
    { icon: <Users size={15}/>,       label: 'Productivity Recovery',  value: productivity,  desc: 'Hours freed from manual data work' },
    { icon: <BarChart3 size={15}/>,   label: 'Classification Savings', value: spendSavings,  desc: 'Better visibility → better contracts' },
    { icon: <TrendingUp size={15}/>,  label: 'Tail Spend Recovery',    value: tailSpend,     desc: 'Unmanaged spend brought under control' },
    { icon: <ShieldCheck size={15}/>, label: 'Contract Compliance',    value: compliance,    desc: 'Off-contract purchases reduced' },
  ];

  return (
    <div className="roi-calc-grid">
      {/* LEFT: Inputs */}
      <div className="roi-inputs-panel">
        <h3 className="roi-panel-title">Your organization's data</h3>
        <SliderField label="Annual procurement spend"
          value={spend} min={1_000_000} max={2_000_000_000} step={1_000_000}
          onChange={setSpend} display={fmtCurrency}
          hint="Total spend across all categories and suppliers" />
        <NumberField label="Employees managing spend data"
          value={employees} min={1} max={500} onChange={setEmployees}
          suffix="people" hint="People who clean, classify or report on procurement data" />
        <SliderField label="Average hourly rate"
          value={hourlyRate} min={15} max={200} step={5}
          onChange={setHourlyRate} display={v => `$${v}/hr`}
          hint="Fully loaded cost per hour for your procurement team" />
        <SliderField label="Hours spent on data work per employee / week"
          value={hoursPerWeek} min={1} max={40} step={0.5}
          onChange={setHoursPerWeek} display={v => `${v}h`}
          hint="Time spent cleaning, formatting, or preparing spend reports" />
      </div>

      {/* RIGHT: Results */}
      <div className="roi-results-panel">
        {/* Total */}
        <div className="roi-total">
          <span className="roi-total-label">Your estimated annual savings</span>
          <strong className="roi-total-value" style={{ filter: unlocked ? 'none' : 'blur(12px)', userSelect: unlocked ? 'auto' : 'none' }}>
            {fmtCurrency(total)}
          </strong>
          <span className="roi-total-sub">
            Based on {fmtCurrency(spend)} spend · {employees} {employees === 1 ? 'person' : 'people'} · ${hourlyRate}/hr · {hoursPerWeek}h/week
          </span>
        </div>

        {/* Gate or Results */}
        {!unlocked ? (
          <div className="roi-gate">
            <div className="roi-gate-preview">
              {breakdown.map(r => (
                <div className="roi-gate-row-item" key={r.label}>
                  <span className="roi-gate-dot" />
                  <span style={{ filter: 'blur(5px)', flex: 1 }}>{r.label} — {fmtCurrency(r.value)}</span>
                </div>
              ))}
            </div>
            <div className="roi-gate-box">
              <Lock size={20} />
              <h4>Unlock your full ROI breakdown</h4>
              <p>Enter your work email to see savings by category, ROI %, and payback period.</p>
              <form onSubmit={e => { e.preventDefault(); if (email) setUnlocked(true); }} className="roi-gate-form">
                <input type="email" placeholder="Work email address" value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="roi-gate-input" required />
                <button type="submit" className="btn btn-primary btn-full">
                  See my ROI breakdown <ArrowRight size={15} />
                </button>
              </form>
              <p className="roi-gate-privacy">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        ) : (
          <div className="roi-unlocked">
            {/* Breakdown rows */}
            <div className="roi-breakdown-list">
              {breakdown.map(r => {
                const pct = Math.round(r.value / total * 100);
                return (
                  <div className="roi-brow" key={r.label}>
                    <div className="roi-brow-icon">{r.icon}</div>
                    <div className="roi-brow-body">
                      <div className="roi-brow-top">
                        <div>
                          <strong>{r.label}</strong>
                          <span>{r.desc}</span>
                        </div>
                        <strong className="roi-brow-val">{fmtCurrency(r.value)}</strong>
                      </div>
                      <div className="roi-brow-bar">
                        <div className="roi-brow-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Metrics */}
            <div className="roi-metrics-row">
              <div className="roi-metric">
                <span>Estimated ROI</span>
                <strong>{((total / Math.max(spend * 0.001, 1)) * 10).toFixed(0)}×</strong>
              </div>
              <div className="roi-metric">
                <span>Payback period</span>
                <strong>&lt; 3 months</strong>
              </div>
            </div>

            <Link to="/book-demo" className="btn btn-primary btn-full" style={{ margin: '16px 20px 4px', width: 'calc(100% - 40px)' }}>
              Validate with your real data <ArrowRight size={15} />
            </Link>
            <p className="roi-disclaimer" style={{ padding: '0 20px 20px' }}>Estimates use industry benchmark rates. Actual results vary by data quality and scope.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <section className="roi-hero">
          <div className="container roi-hero-inner">
            <div className="roi-hero-badge"><Sparkles size={13} /> Free ROI Calculator</div>
            <h1>How much could you save with Dolphin AI?</h1>
            <p>4 inputs. 30 seconds. Get a personalized savings estimate for your organization.</p>
          </div>
        </section>
        <section className="roi-body container">
          <ROICalculator showGate={true} />
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-bottom">
          <p>Copyright © 2026 Dolphin AI</p>
          <div>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

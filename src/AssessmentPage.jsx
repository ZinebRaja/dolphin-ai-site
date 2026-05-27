import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Package, BarChart3, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

/* ── Benchmark tables (from proposal section 7) ─────────── */
const POORLY_CLASSIFIED = { Low: 0.50, Medium: 0.30, High: 0.12 };
const CLASS_SAVINGS     = { Low: 0.07, Medium: 0.05, High: 0.03 };
const TAIL_EXPOSURE     = { Low: 0.32, Medium: 0.20, High: 0.12 };
const TAIL_OPT          = { Low: 0.09, Medium: 0.06, High: 0.03 };
const OFF_CONTRACT      = { Low: 0.30, Medium: 0.15, High: 0.07 };
const COMPLIANCE_OPT    = { Low: 0.12, Medium: 0.075, High: 0.035 };
const sourcingLeverage  = (dup) => dup >= 0.30 ? 0.07 : dup >= 0.20 ? 0.05 : 0.03;

/* ── Formatters ─────────────────────────────────────────── */
const fmt = (n) => {
  if (!n || !isFinite(n) || n <= 0) return '$0';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};
const fmtSpend = (v) => {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`;
  if (v >= 1_000_000)     return `$${(v / 1_000_000).toFixed(0)}M`;
  return `$${(v / 1_000).toFixed(0)}K`;
};

/* ── Slider ─────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="assess-field">
      <div className="assess-label-row">
        <label>{label}</label>
        <span className="assess-val">{format ? format(value) : value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step || 1} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="assess-slider"
        style={{ '--pct': `${pct}%` }}
      />
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────── */
export default function AssessmentPage() {
  const [annualSpend,  setAnnualSpend]  = useState(200_000_000);
  const [employees,    setEmployees]    = useState(15);
  const [weeklyHours,  setWeeklyHours]  = useState(4);
  const [hourlyRate,   setHourlyRate]   = useState(55);
  const [dupExposure,  setDupExposure]  = useState(25);
  const [classVis,     setClassVis]     = useState('Medium');
  const [tailVis,      setTailVis]      = useState('Medium');
  const [compliance,   setCompliance]   = useState('Medium');

  /* ── Calculations (section 8 of proposal) ── */
  const dup = dupExposure / 100;

  const productivityRecovery  = Math.round(employees * weeklyHours * 52 * 0.65 * hourlyRate);
  const fragmented            = annualSpend * dup;
  const supplierConsolidation = Math.round(fragmented * sourcingLeverage(dup));
  const poorlyClassified      = annualSpend * POORLY_CLASSIFIED[classVis];
  const classificationOpp     = Math.round(poorlyClassified * CLASS_SAVINGS[classVis]);
  const tailSpend             = annualSpend * TAIL_EXPOSURE[tailVis];
  const tailOpp               = Math.round(tailSpend * TAIL_OPT[tailVis]);
  const offContract           = annualSpend * OFF_CONTRACT[compliance];
  const complianceOpp         = Math.round(offContract * COMPLIANCE_OPT[compliance]);
  const totalValue            = productivityRecovery + supplierConsolidation + classificationOpp + tailOpp + complianceOpp;

  const results = [
    { label: 'Employee Productivity Recovery', value: productivityRecovery,  type: 'Cost Avoidance', icon: <Users size={17} />,       desc: 'Time recovered from manual spend data work' },
    { label: 'Supplier Consolidation',         value: supplierConsolidation, type: 'Hard Savings',   icon: <Package size={17} />,     desc: 'Sourcing leverage from fragmented supplier base' },
    { label: 'Classification Opportunity',     value: classificationOpp,     type: 'Hard Savings',   icon: <BarChart3 size={17} />,   desc: 'Savings from improved spend visibility' },
    { label: 'Tail Spend Opportunity',         value: tailOpp,               type: 'Hard Savings',   icon: <TrendingUp size={17} />,  desc: 'Unmanaged spend brought under control' },
    { label: 'Contract Compliance',            value: complianceOpp,         type: 'Hard Savings',   icon: <ShieldCheck size={17} />, desc: 'Off-contract spend brought into governance' },
  ];

  return (
    <div className="site">
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/" className="logo-link">
            <img src="/logowebsite.png" alt="Dolphin AI" className="logo-img" />
          </Link>
          <nav className="nav-links">
            <Link to="/#solution">Solution</Link>
            <Link to="/#workflow">Workflow</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="nav-login">Log in</Link>
          </div>
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="assess-hero">
          <div className="container assess-hero-inner">
            <span className="eyebrow">AI Spend Intelligence Assessment</span>
            <h1>Discover hidden procurement savings opportunities</h1>
            <p>Adjust 8 inputs. Get an executive-ready breakdown of where your organisation may be leaking procurement value — in under 2 minutes.</p>
          </div>
        </section>

        {/* ── Calculator ── */}
        <section className="assess-body container">
          <div className="assess-grid">

            {/* LEFT: Inputs */}
            <div className="assess-inputs">
              <h2 className="assess-section-title">Your procurement profile</h2>

              <div className="assess-group">
                <p className="assess-group-label">Organisation scale</p>
                <Slider label="Annual company spend" value={annualSpend}
                  min={5_000_000} max={2_000_000_000} step={5_000_000}
                  onChange={setAnnualSpend} format={fmtSpend} />
                <Slider label="Employees using spend data" value={employees}
                  min={1} max={200} step={1}
                  onChange={setEmployees} format={v => `${v} people`} />
              </div>

              <div className="assess-group">
                <p className="assess-group-label">Manual data work</p>
                <Slider label="Avg weekly hours per person on spend tasks" value={weeklyHours}
                  min={0.5} max={20} step={0.5}
                  onChange={setWeeklyHours} format={v => `${v}h / week`} />
                <Slider label="Avg employee hourly cost" value={hourlyRate}
                  min={20} max={250} step={5}
                  onChange={setHourlyRate} format={v => `$${v} / hr`} />
              </div>

              <div className="assess-group">
                <p className="assess-group-label">Supplier data health</p>
                <Slider label="Duplicate supplier exposure" value={dupExposure}
                  min={5} max={60} step={1}
                  onChange={setDupExposure} format={v => `${v}%`} />
              </div>

              <div className="assess-group">
                <p className="assess-group-label">Current maturity</p>
                <div className="assess-field">
                  <label>Classification visibility level</label>
                  <select value={classVis} onChange={e => setClassVis(e.target.value)} className="assess-select">
                    <option value="Low">Low — limited spend visibility</option>
                    <option value="Medium">Medium — partial taxonomy in place</option>
                    <option value="High">High — strong classification coverage</option>
                  </select>
                </div>
                <div className="assess-field">
                  <label>Tail spend visibility level</label>
                  <select value={tailVis} onChange={e => setTailVis(e.target.value)} className="assess-select">
                    <option value="Low">Low — most tail spend unmanaged</option>
                    <option value="Medium">Medium — some tail spend visibility</option>
                    <option value="High">High — tail spend actively managed</option>
                  </select>
                </div>
                <div className="assess-field">
                  <label>Contract compliance maturity</label>
                  <select value={compliance} onChange={e => setCompliance(e.target.value)} className="assess-select">
                    <option value="Low">Low — limited contract compliance tracking</option>
                    <option value="Medium">Medium — partial contract coverage</option>
                    <option value="High">High — strong procurement governance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT: Live results */}
            <div className="assess-results">

              <div className="assess-total-card">
                <span className="assess-total-label">Total Estimated Annual Business Value</span>
                <strong className="assess-total-value">{fmt(totalValue)}</strong>
                <span className="assess-total-sub">Based on industry benchmark logic across 5 opportunity areas</span>
              </div>

              <div className="assess-result-list">
                {results.map(r => (
                  <div className="assess-result-item" key={r.label}>
                    <div className="assess-result-icon">{r.icon}</div>
                    <div className="assess-result-info">
                      <strong>{r.label}</strong>
                      <span>{r.desc}</span>
                    </div>
                    <div className="assess-result-right">
                      <strong className="assess-result-value">{fmt(r.value)}</strong>
                      <span className={`assess-type-badge ${r.type === 'Cost Avoidance' ? 'avoidance' : 'savings'}`}>{r.type}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="assess-strategic">
                <p className="assess-group-label" style={{ margin: '0 0 0.6rem' }}>Strategic benefits — enabled with Dolphin AI</p>
                {[
                  'Executive Reporting Acceleration — Days → Minutes',
                  'Unified Supplier Intelligence — across all ERP sources',
                  'Level 4 Spend Visibility — full taxonomy depth',
                ].map(t => (
                  <div className="assess-strategic-item" key={t}>
                    <CheckCircle2 size={14} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              <div className="assess-cta-box">
                <p>Ready to validate these numbers with your real data?</p>
                <Link to="/book-demo" className="btn btn-primary btn-full">
                  Book a demo to validate your numbers <ArrowRight size={15} />
                </Link>
                <p className="assess-disclaimer">Estimates based on industry benchmarks. Actual results depend on your data quality and scope.</p>
              </div>

            </div>
          </div>
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

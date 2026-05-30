import Navbar from './Navbar.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Package, BarChart3, TrendingUp, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

/* ── Spend range options ─────────────────────────────────── */
const SPEND_OPTIONS = [
  { label: 'Under $25M',    value: 12_500_000 },
  { label: '$25M – $100M',  value: 62_500_000 },
  { label: '$100M – $500M', value: 300_000_000 },
  { label: '$500M – $2B',   value: 1_000_000_000 },
  { label: 'Over $2B',      value: 3_000_000_000 },
];

const TEAM_OPTIONS = [
  { label: '1 – 5',  desc: 'people',  value: 3 },
  { label: '6 – 20', desc: 'people',  value: 13 },
  { label: '21 – 50',desc: 'people',  value: 35 },
  { label: '50+',    desc: 'people',  value: 75 },
];

const MATURITY_OPTIONS = [
  { key: 'Low',    label: 'Just Starting',   desc: 'Manual spreadsheets, limited visibility into spend',   hours: 8 },
  { key: 'Medium', label: 'Partially Set Up',desc: 'Some tools in place, partial classification coverage', hours: 5 },
  { key: 'High',   label: 'Well Established',desc: 'Strong processes in place, looking to optimise',      hours: 3 },
];

/* ── Benchmark rates ─────────────────────────────────────── */
const RATES = {
  Low:    { classRate: 0.50 * 0.07, tailRate: 0.32 * 0.09, complianceRate: 0.30 * 0.12, sourcingRate: 0.07 },
  Medium: { classRate: 0.30 * 0.05, tailRate: 0.20 * 0.06, complianceRate: 0.15 * 0.075, sourcingRate: 0.05 },
  High:   { classRate: 0.12 * 0.03, tailRate: 0.12 * 0.03, complianceRate: 0.07 * 0.035, sourcingRate: 0.03 },
};

const HOURLY_RATE = 65;

/* ── Formatter ───────────────────────────────────────────── */
const fmt = (n) => {
  if (!n || n <= 0) return '$0';
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000)     return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)         return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};

/* ── Tile button ─────────────────────────────────────────── */
function Tile({ selected, onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`roi-tile ${selected ? 'roi-tile-active' : ''} ${className}`}
    >
      {selected && <span className="roi-tile-check"><CheckCircle2 size={14} /></span>}
      {children}
    </button>
  );
}

export default function AssessmentPage() {
  const [spendIdx,   setSpendIdx]   = useState(2);   // default $100M–$500M
  const [teamIdx,    setTeamIdx]    = useState(1);   // default 6–20
  const [maturity,   setMaturity]   = useState('Medium');

  /* ── Calculations ── */
  const spend   = SPEND_OPTIONS[spendIdx].value;
  const team    = TEAM_OPTIONS[teamIdx].value;
  const mat     = MATURITY_OPTIONS.find(m => m.key === maturity);
  const rates   = RATES[maturity];

  const productivity    = Math.round(team * mat.hours * 52 * 0.65 * HOURLY_RATE);
  const classification  = Math.round(spend * rates.classRate);
  const tailSpend       = Math.round(spend * rates.tailRate);
  const compliance      = Math.round(spend * rates.complianceRate);
  const consolidation   = Math.round(spend * rates.sourcingRate * 0.25);
  const total           = productivity + classification + tailSpend + compliance + consolidation;

  const results = [
    { icon: <Users size={16} />,      label: 'Productivity Recovery',    value: productivity,   pct: Math.round(productivity   / total * 100), type: 'Cost Avoidance', desc: 'Hours saved on manual data work' },
    { icon: <BarChart3 size={16} />,  label: 'Classification Savings',   value: classification, pct: Math.round(classification / total * 100), type: 'Hard Savings',   desc: 'Better visibility → better contracts' },
    { icon: <TrendingUp size={16} />, label: 'Tail Spend Recovery',      value: tailSpend,      pct: Math.round(tailSpend      / total * 100), type: 'Hard Savings',   desc: 'Unmanaged spend brought under control' },
    { icon: <ShieldCheck size={16}/>, label: 'Contract Compliance',      value: compliance,     pct: Math.round(compliance     / total * 100), type: 'Hard Savings',   desc: 'Off-contract spend reduced' },
    { icon: <Package size={16} />,    label: 'Supplier Consolidation',   value: consolidation,  pct: Math.round(consolidation  / total * 100), type: 'Hard Savings',   desc: 'Leverage from fewer, stronger suppliers' },
  ];

  return (
    <div className="site">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="roi-hero">
          <div className="container roi-hero-inner">
            <div className="roi-hero-badge"><Sparkles size={13} /> Free ROI Calculator</div>
            <h1>How much could you save with Dolphin AI?</h1>
            <p>3 questions. 30 seconds. Get a personalised savings estimate for your organisation.</p>
          </div>
        </section>

        {/* Calculator */}
        <section className="roi-body container">
          <div className="roi-layout">

            {/* LEFT: Questions */}
            <div className="roi-questions">

              {/* Q1 */}
              <div className="roi-question">
                <div className="roi-q-header">
                  <span className="roi-q-num">1</span>
                  <div>
                    <h3>What is your annual procurement spend?</h3>
                    <p>Total spend across all categories and suppliers</p>
                  </div>
                </div>
                <div className="roi-tiles-spend">
                  {SPEND_OPTIONS.map((o, i) => (
                    <Tile key={o.label} selected={spendIdx === i} onClick={() => setSpendIdx(i)}>
                      <strong>{o.label}</strong>
                    </Tile>
                  ))}
                </div>
              </div>

              {/* Q2 */}
              <div className="roi-question">
                <div className="roi-q-header">
                  <span className="roi-q-num">2</span>
                  <div>
                    <h3>How many people handle spend data?</h3>
                    <p>People who prepare, clean, or analyse procurement reports</p>
                  </div>
                </div>
                <div className="roi-tiles-team">
                  {TEAM_OPTIONS.map((o, i) => (
                    <Tile key={o.label} selected={teamIdx === i} onClick={() => setTeamIdx(i)}>
                      <strong>{o.label}</strong>
                      <span>{o.desc}</span>
                    </Tile>
                  ))}
                </div>
              </div>

              {/* Q3 */}
              <div className="roi-question">
                <div className="roi-q-header">
                  <span className="roi-q-num">3</span>
                  <div>
                    <h3>How mature is your current procurement process?</h3>
                    <p>Be honest — a lower score means a bigger opportunity</p>
                  </div>
                </div>
                <div className="roi-tiles-maturity">
                  {MATURITY_OPTIONS.map(o => (
                    <Tile key={o.key} selected={maturity === o.key} onClick={() => setMaturity(o.key)} className="roi-tile-maturity">
                      <strong>{o.label}</strong>
                      <span>{o.desc}</span>
                    </Tile>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: Live results */}
            <div className="roi-results">

              {/* Total */}
              <div className="roi-total">
                <span className="roi-total-label">Your estimated annual savings</span>
                <strong className="roi-total-value">{fmt(total)}</strong>
                <span className="roi-total-sub">Based on {SPEND_OPTIONS[spendIdx].label} spend · {TEAM_OPTIONS[teamIdx].label} people · {MATURITY_OPTIONS.find(m=>m.key===maturity).label}</span>
              </div>

              {/* Breakdown */}
              <div className="roi-breakdown">
                {results.map(r => (
                  <div className="roi-result-row" key={r.label}>
                    <div className="roi-result-left">
                      <span className="roi-result-icon">{r.icon}</span>
                      <div>
                        <strong>{r.label}</strong>
                        <span>{r.desc}</span>
                      </div>
                    </div>
                    <div className="roi-result-right">
                      <strong>{fmt(r.value)}</strong>
                      <span className={`roi-badge ${r.type === 'Cost Avoidance' ? 'roi-badge-blue' : 'roi-badge-green'}`}>{r.type}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <div className="roi-bars">
                {results.map(r => (
                  <div className="roi-bar-row" key={r.label}>
                    <span className="roi-bar-label">{r.label}</span>
                    <div className="roi-bar-track">
                      <div className="roi-bar-fill" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="roi-bar-pct">{r.pct}%</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="roi-cta">
                <p>Want to validate this with your real data?</p>
                <Link to="/book-demo" className="btn btn-primary btn-full">
                  Book a free demo <ArrowRight size={15} />
                </Link>
                <p className="roi-disclaimer">Estimates use industry benchmark rates. Actual results vary by data quality and scope.</p>
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

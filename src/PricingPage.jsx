import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, Clock, DollarSign, Star } from 'lucide-react';

function fmtEUR(n) {
  if (isNaN(n) || !isFinite(n)) return '€0';
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

function Slider({ label, value, min, max, onChange, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="pc-field">
      <div className="pc-label-row">
        <label>{label}</label>
        <span className="pc-val">{format ? format(value) : value}</span>
      </div>
      <div className="pc-slider-wrap">
        <input
          type="range" min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ '--pct': `${pct}%` }}
        />
      </div>
    </div>
  );
}

function PricingCalculator() {
  const [annualSpend,   setAnnualSpend]   = useState(25000000);
  const [suppliers,     setSuppliers]     = useState(1200);
  const [spendLines,    setSpendLines]    = useState(80000);
  const [monthlyHours,  setMonthlyHours]  = useState(40);
  const [savingsPct,    setSavingsPct]    = useState(3);
  const [planType,      setPlanType]      = useState('Professional');

  const hourlyRate        = 60;
  const savingsPotential  = Math.round(annualSpend * (savingsPct / 100));
  const manualWorkSavings = Math.round(monthlyHours * 12 * hourlyRate);

  const basePrice = (() => {
    const p = planType === 'Starter'       ? Math.max(12000, annualSpend * 0.0008)
            : planType === 'Professional'  ? Math.max(24000, annualSpend * 0.0012)
            : Math.max(48000, annualSpend * 0.0018);
    return Math.round(p);
  })();

  const complexityFee        = Math.round((suppliers * 2) + (spendLines * 0.03));
  const estimatedAnnualPrice = Math.round(basePrice + complexityFee);
  const totalBenefit         = savingsPotential + manualWorkSavings;
  const roi                  = ((totalBenefit - estimatedAnnualPrice) / Math.max(1, estimatedAnnualPrice)) * 100;
  const paybackMonths        = Math.round(estimatedAnnualPrice / Math.max(1, totalBenefit / 12));

  let recommended = 'Professional';
  if (annualSpend < 10000000) recommended = 'Starter';
  if (annualSpend > 75000000 || suppliers > 3000) recommended = 'Enterprise';

  const PLANS = ['Starter', 'Professional', 'Enterprise'];

  return (
    <div className="pc-card">
      {/* ── Inputs ── */}
      <div className="pc-inputs">
        <p className="pc-section-label">Your data</p>

        <div className="pc-field">
          <div className="pc-label-row">
            <label>Annual addressable spend</label>
            <span className="pc-val">{fmtEUR(annualSpend)}</span>
          </div>
          <div className="pc-slider-wrap">
            <input type="range" min={1000000} max={500000000} step={1000000}
              value={annualSpend} onChange={e => setAnnualSpend(Number(e.target.value))}
              style={{ '--pct': `${((annualSpend - 1000000) / (500000000 - 1000000)) * 100}%` }}
            />
          </div>
          <div className="pc-range-labels"><span>€1M</span><span>€500M</span></div>
        </div>

        <div className="pc-field">
          <div className="pc-label-row">
            <label>Number of suppliers</label>
            <span className="pc-val">{suppliers.toLocaleString()}</span>
          </div>
          <div className="pc-slider-wrap">
            <input type="range" min={50} max={10000} step={50}
              value={suppliers} onChange={e => setSuppliers(Number(e.target.value))}
              style={{ '--pct': `${((suppliers - 50) / (10000 - 50)) * 100}%` }}
            />
          </div>
          <div className="pc-range-labels"><span>50</span><span>10,000</span></div>
        </div>

        <div className="pc-field">
          <div className="pc-label-row">
            <label>Annual spend lines</label>
            <span className="pc-val">{spendLines.toLocaleString()}</span>
          </div>
          <div className="pc-slider-wrap">
            <input type="range" min={1000} max={1000000} step={1000}
              value={spendLines} onChange={e => setSpendLines(Number(e.target.value))}
              style={{ '--pct': `${((spendLines - 1000) / (1000000 - 1000)) * 100}%` }}
            />
          </div>
          <div className="pc-range-labels"><span>1k</span><span>1M</span></div>
        </div>

        <div className="pc-field">
          <div className="pc-label-row">
            <label>Hours cleaning data / month</label>
            <span className="pc-val">{monthlyHours}h</span>
          </div>
          <div className="pc-slider-wrap">
            <input type="range" min={5} max={200} step={5}
              value={monthlyHours} onChange={e => setMonthlyHours(Number(e.target.value))}
              style={{ '--pct': `${((monthlyHours - 5) / (200 - 5)) * 100}%` }}
            />
          </div>
          <div className="pc-range-labels"><span>5h</span><span>200h</span></div>
        </div>

        <div className="pc-field">
          <div className="pc-label-row">
            <label>Expected savings opportunity</label>
            <span className="pc-val">{savingsPct}%</span>
          </div>
          <div className="pc-slider-wrap">
            <input type="range" min={1} max={8} step={0.5}
              value={savingsPct} onChange={e => setSavingsPct(Number(e.target.value))}
              style={{ '--pct': `${((savingsPct - 1) / (8 - 1)) * 100}%` }}
            />
          </div>
          <div className="pc-range-labels"><span>1%</span><span>8%</span></div>
        </div>

        {/* Plan selector */}
        <div className="pc-plans">
          <p className="pc-section-label" style={{ marginBottom: '10px' }}>Plan</p>
          <div className="pc-plan-tabs">
            {PLANS.map(p => (
              <button
                key={p}
                className={`pc-plan-tab ${planType === p ? 'active' : ''} ${recommended === p ? 'recommended' : ''}`}
                onClick={() => setPlanType(p)}
              >
                {p}
                {recommended === p && <span className="rec-dot" />}
              </button>
            ))}
          </div>
          {recommended === planType && (
            <p className="rec-note">✦ Recommended based on your inputs</p>
          )}
        </div>
      </div>

      {/* ── Results ── */}
      <div className="pc-results">
        <p className="pc-section-label">Your estimate</p>

        <div className="pc-hero-metric">
          <span className="pc-hero-label">Estimated annual price</span>
          <span className="pc-hero-value">{fmtEUR(estimatedAnnualPrice)}</span>
        </div>

        <div className="pc-metrics-grid">
          <div className="pc-metric">
            <TrendingUp size={16} />
            <div>
              <span className="metric-label">Savings potential</span>
              <strong>{fmtEUR(savingsPotential)}</strong>
            </div>
          </div>
          <div className="pc-metric">
            <Clock size={16} />
            <div>
              <span className="metric-label">Manual work savings</span>
              <strong>{fmtEUR(manualWorkSavings)}</strong>
            </div>
          </div>
          <div className="pc-metric">
            <DollarSign size={16} />
            <div>
              <span className="metric-label">Estimated ROI</span>
              <strong className={roi > 0 ? 'positive' : ''}>{roi.toFixed(0)}%</strong>
            </div>
          </div>
          <div className="pc-metric">
            <Star size={16} />
            <div>
              <span className="metric-label">Payback period</span>
              <strong>{isFinite(paybackMonths) && paybackMonths > 0 ? `${paybackMonths} months` : 'N/A'}</strong>
            </div>
          </div>
        </div>

        {/* ROI bar */}
        <div className="pc-roi-bar-wrap">
          <div className="pc-roi-bar-labels">
            <span>Cost</span>
            <span>Total benefit</span>
          </div>
          <div className="pc-roi-bars">
            <div className="pc-bar pc-bar-cost" style={{ width: '100%' }}>
              <span>{fmtEUR(estimatedAnnualPrice)}</span>
            </div>
            <div
              className="pc-bar pc-bar-benefit"
              style={{ width: `${Math.min(100, (totalBenefit / Math.max(1, estimatedAnnualPrice)) * 50)}%`, minWidth: '30%' }}
            >
              <span>{fmtEUR(totalBenefit)}</span>
            </div>
          </div>
        </div>

        <div className="pc-recommended-plan">
          <span>Recommended plan for you:</span>
          <strong>{recommended}</strong>
        </div>

        <p className="pc-disclaimer">
          Estimate only. Actual pricing depends on data quality, integrations, and scope.
        </p>

        <Link to="/book-demo" className="btn btn-primary btn-full" style={{ marginTop: '1rem' }}>
          Validate your estimate with us <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
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
            <Link to="/pricing" style={{ color: 'var(--navy)', fontWeight: 700 }}>Pricing</Link>
            <Link to="/#contact">Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/login?redirect=/demo-video" className="btn btn-primary">Live demo</Link>
            <Link to="/book-demo" className="btn btn-primary">Book a demo</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Page header */}
        <div className="pc-page-header container">
          <Link to="/" className="btn-text-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem' }}>
            <ArrowLeft size={15} /> Back to home
          </Link>
          <span className="eyebrow">Pricing</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: '0.5rem 0 0.75rem' }}>
            Estimate your spend intelligence ROI
          </h1>
          <p style={{ color: 'var(--gray-600)', maxWidth: '580px', fontSize: '15.5px' }}>
            Adjust the sliders to your organisation's data and see your estimated price, savings, and payback period in real time.
          </p>
        </div>

        {/* Calculator */}
        <div className="container" style={{ paddingBottom: '3rem' }}>
          <PricingCalculator />
        </div>

        {/* Why pricing cards */}
        <div className="pc-why container">
          <h3>Why pricing depends on your data</h3>
          <div className="pc-why-grid">
            {[
              { title: 'Spend volume',       text: 'More spend data means more classification and enrichment scope.' },
              { title: 'Supplier complexity', text: 'Duplicate suppliers, aliases, and ERP variations affect normalization effort.' },
              { title: 'Integration needs',  text: 'Excel upload, ERP integration, or procurement platform connections can change scope.' },
            ].map(c => (
              <div className="pc-why-card" key={c.title}>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pc-cta container">
          <h3>Want a precise quote based on your real data?</h3>
          <p>Book a demo — we'll estimate the scope, normalization effort, and savings potential for your specific data.</p>
          <Link to="/book-demo" className="btn btn-primary btn-lg">
            Book a demo <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/logowebsite.png" alt="Dolphin AI" className="footer-logo" />
            <p>Intelligent Spend Classification for modern procurement and finance teams.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <Link to="/#platform">Platform</Link>
              <Link to="/#solution">Solution</Link>
              <Link to="/#workflow">Workflow</Link>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Case studies</a>
              <a href="#">Blog</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <Link to="/#contact">Contact</Link>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>Copyright © 2026 Dolphin AI</p>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

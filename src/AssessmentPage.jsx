import Navbar from './Navbar.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

const fmtCurrency = (n) => {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 10_000_000)    return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000_000)     return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)         return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};

function Tooltip({ text }) {
  return (
    <span className="roi-tooltip-wrap">
      <span className="roi-tooltip-icon">ⓘ</span>
      <span className="roi-tooltip-box">{text}</span>
    </span>
  );
}

function SliderField({ label, value, min, max, step, onChange, display, hint, rawUnit, tooltip }) {
  const pct = ((value - min) / (max - min)) * 100;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');

  function startEdit() { setEditing(true); setRaw(String(value / (rawUnit || 1))); }
  function commitEdit() {
    const parsed = parseFloat(raw) * (rawUnit || 1);
    if (!isNaN(parsed)) onChange(Math.min(max, Math.max(min, parsed)));
    setEditing(false);
  }

  return (
    <div className="roi-field">
      <div className="roi-field-header">
        <label>{label}{tooltip && <Tooltip text={tooltip} />}</label>
        {editing ? (
          <input
            type="number"
            value={raw}
            onChange={e => setRaw(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={e => e.key === 'Enter' && commitEdit()}
            className="roi-field-edit"
            autoFocus
          />
        ) : (
          <span className="roi-field-value" onClick={startEdit} title="Click to type exact value">
            {display(value)} ✎
          </span>
        )}
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%` }} className="roi-slider" />
      <div className="roi-field-hints"><span>{display(min)}</span><span>{display(max)}</span></div>
      {hint && <p className="roi-field-hint">{hint}</p>}
    </div>
  );
}

function NumberField({ label, value, min, max, onChange, suffix, hint, tooltip }) {
  const [raw, setRaw] = useState(String(value));

  function commit(str) {
    const parsed = Number(str);
    if (!isNaN(parsed) && str !== '') {
      onChange(Math.min(max, Math.max(min, parsed)));
      setRaw(String(Math.min(max, Math.max(min, parsed))));
    } else {
      setRaw(String(value));
    }
  }

  return (
    <div className="roi-field">
      <label className="roi-field-label">{label}{tooltip && <Tooltip text={tooltip} />}</label>
      <div className="roi-number-wrap">
        <input type="number" min={min} max={max} value={raw}
          onChange={e => setRaw(e.target.value)}
          onBlur={e => commit(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && commit(e.target.value)}
          className="roi-number-input" />
        {suffix && <span className="roi-number-suffix">{suffix}</span>}
      </div>
      {hint && <p className="roi-field-hint">{hint}</p>}
    </div>
  );
}

export function ROICalculator() {
  const [spend,             setSpend]             = useState(25_000_000);
  const [employees,         setEmployees]         = useState(2);
  const [hourlyRate,        setHourlyRate]        = useState(30);
  const [hoursPerWeek,      setHoursPerWeek]      = useState(3);
  const [classifiedPct,     setClassifiedPct]     = useState(60);
  const [tailManagedPct,    setTailManagedPct]    = useState(60);
  const [supplierOptPct,    setSupplierOptPct]    = useState(60);
  const [activeSuppliers,   setActiveSuppliers]   = useState(500);

  // Recommended plan based on spend AND active suppliers — highest need wins
  const PLAN_TIERS = [
    { name: 'Coastal',   emoji: '🌊', spend: 'Up to $200M',  price: '$699/mo',   annual: '$8,388/yr',  color: '#0ea5e9' },
    { name: 'Reef',      emoji: '🪸', spend: 'Up to $400M',  price: '$999/mo',   annual: '$11,988/yr', color: '#f97316' },
    { name: 'Navigator', emoji: '🧭', spend: 'Up to $750M',  price: '$1,399/mo', annual: '$16,788/yr', color: '#8b5cf6' },
    { name: 'Horizon',   emoji: '🌅', spend: 'Up to $1B',    price: '$1,699/mo', annual: '$20,388/yr', color: '#ec4899' },
    { name: 'Apex',      emoji: '🐬', spend: '$1.5B+',        price: 'Custom',    annual: null,         color: '#E06820' },
  ];
  const bySpend = spend < 200_000_000 ? 0 : spend < 400_000_000 ? 1 : spend < 750_000_000 ? 2 : spend < 1_500_000_000 ? 3 : 4;
  const bySuppliers = activeSuppliers <= 500 ? 0 : activeSuppliers <= 1000 ? 1 : activeSuppliers <= 1500 ? 2 : activeSuppliers <= 2000 ? 3 : 4;
  const recommendedPlan = PLAN_TIERS[Math.max(bySpend, bySuppliers)];

  // Formula 1 – Productivity Recovery: Team × Hours/week × 52 × 65% × hourly rate
  const productivity = Math.round(employees * hoursPerWeek * 52 * 0.65 * hourlyRate);

  // Formula 2 – Classification Savings: Spend × improvable% × 2.5%
  // improvable% = (100 - wellClassified%) - 15  (conservative buffer)
  const improvablePct  = Math.max(0, (100 - classifiedPct) - 15);
  const spendSavings   = Math.round(spend * (improvablePct / 100) * 0.025);

  // Formula 3 – Tail Spend Recovery: opposite of managed% minus 15 buffer
  const effectiveTail  = Math.max(0, (100 - tailManagedPct) - 15);
  const tailSpend      = Math.round(spend * (effectiveTail / 100) * 0.025);

  // Formula 5 – Supplier Consolidation: Spend × (100 - good% - 15) × 2.5%
  const effectiveLeverage = Math.max(0, (100 - supplierOptPct) - 15);
  const consolidation     = Math.round(spend * (effectiveLeverage / 100) * 0.025);

  const total = productivity + spendSavings + tailSpend + consolidation;

  const breakdown = [
    { icon: <Users size={15}/>,       label: 'Productivity Recovery',   value: productivity,  desc: 'Hours freed from manual data work',
      tooltip: 'The value of time your team gets back when Dolphin AI handles manual data cleaning, formatting, and classification — freeing your people to focus on analysis and decisions instead.' },
    { icon: <BarChart3 size={15}/>,   label: 'Classification Savings',  value: spendSavings,  desc: 'Better visibility → better contracts',
      tooltip: 'When spend is accurately categorized, procurement teams can benchmark suppliers, identify overspending, and negotiate better contracts. This saving reflects the improved sourcing decisions that accurate classification enables.' },
    { icon: <TrendingUp size={15}/>,  label: 'Tail Spend Recovery',     value: tailSpend,     desc: 'Unmanaged spend brought under control',
      tooltip: 'Tail spend consists of many small purchases from unmanaged suppliers — often with no contracts, no negotiation, and inflated prices. Bringing this spend under control through better visibility and consolidation recovers significant value.' },
    { icon: <ShieldCheck size={15}/>, label: 'Supplier Consolidation',  value: consolidation, desc: 'Leverage from fewer, stronger suppliers',
      tooltip: 'By consolidating spend across fewer, strategic suppliers, companies gain negotiating leverage and unlock volume discounts, better payment terms, and stronger partnerships — all of which translate into direct cost savings.' },
  ];

  return (
    <div className="roi-calc-grid">
      {/* LEFT: Inputs */}
      <div className="roi-inputs-panel">
        <h3 className="roi-panel-title">Your organization's data</h3>
        <SliderField label="Annual procurement spend"
          value={spend} min={1_000_000} max={2_000_000_000} step={1_000_000}
          onChange={setSpend} display={fmtCurrency} rawUnit={1_000_000}
          tooltip="Total value of all purchases across categories and suppliers in a year. Click the value to type an exact amount."
          hint="Click the value on the right to type an exact amount." />
        <NumberField label="Employees managing spend data"
          value={employees} min={1} max={500} onChange={setEmployees}
          suffix="people"
          tooltip="Number of people who spend time preparing, cleaning, or reporting on procurement data — not just analysts, but anyone touching the data."
          hint="Used to calculate time saved on manual data work." />
        <SliderField label="Average hourly rate"
          value={hourlyRate} min={15} max={200} step={5}
          onChange={setHourlyRate} display={v => `$${v}/hr`}
          tooltip="Fully loaded cost per hour for your procurement team — includes salary, benefits, and overhead. Typical range: $30–$80/hr."
          hint="Used in the productivity savings formula." />
        <SliderField label="Hours spent on data work per employee / week"
          value={hoursPerWeek} min={1} max={40} step={0.5}
          onChange={setHoursPerWeek} display={v => `${v}h`}
          tooltip="Hours per person per week spent on manual data tasks: exporting from ERP, cleaning in Excel, reformatting for reports. Does NOT include actual analysis time." />
        <SliderField label="What % of your spend is currently well-classified?"
          value={classifiedPct} min={0} max={100} step={5}
          onChange={setClassifiedPct} display={v => `${v}%`}
          tooltip="The percentage of your total spend that is correctly assigned to a category today. 60% means 40% is either unclassified or miscategorized. We use the unclassified portion (minus a 15% buffer) in our savings formula." />
        <SliderField label="What % of your tail spend is currently well-managed?"
          value={tailManagedPct} min={0} max={100} step={5}
          onChange={setTailManagedPct} display={v => `${v}%`}
          tooltip={`How much of your low-value, unmanaged supplier spend is already under control. ${tailManagedPct}% managed → ${100 - tailManagedPct}% unmanaged → minus 15% buffer = ${effectiveTail}% used in the savings formula.`} />
        <NumberField label="Total number of active suppliers"
          value={activeSuppliers} min={1} max={100000} onChange={setActiveSuppliers}
          suffix="suppliers"
          tooltip="The total count of distinct suppliers you actively purchase from. Used to estimate how many suppliers could be consolidated."
          hint={`≈ ${Math.round(activeSuppliers * (1 - supplierOptPct / 100))} suppliers currently not consolidated.`} />
        <SliderField label="What % of your supplier base is currently well-consolidated?"
          value={supplierOptPct} min={0} max={100} step={5}
          onChange={setSupplierOptPct} display={v => `${v}%`}
          tooltip={`How much of your spend already benefits from consolidated, optimized supplier relationships. ${supplierOptPct}% optimized → ${100 - supplierOptPct}% not → minus 15% buffer = ${effectiveLeverage}% used in the savings formula. With ${activeSuppliers} active suppliers, that's ≈ ${Math.round(activeSuppliers * (1 - supplierOptPct / 100))} not yet consolidated.`} />
      </div>

      {/* RIGHT: Results */}
      <div className="roi-results-panel">
        {/* Total */}
        <div className="roi-total">
          <span className="roi-total-label">Your estimated annual savings</span>
          <strong className="roi-total-value">{fmtCurrency(total)}</strong>
          <span className="roi-total-sub">
            Based on {fmtCurrency(spend)} spend · {employees} {employees === 1 ? 'person' : 'people'} · ${hourlyRate}/hr · {hoursPerWeek}h/week
          </span>
        </div>

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
                          <strong>{r.label}{r.tooltip && <Tooltip text={r.tooltip} />}</strong>
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

            {/* Recommended plan */}
            <div className="roi-plan-rec">
              <div className="roi-plan-rec-label">Recommended plan for your spend</div>
              <div className="roi-plan-rec-card">
                <div className="roi-plan-rec-left">
                  <span className="roi-plan-rec-emoji">{recommendedPlan.emoji}</span>
                  <div>
                    <strong>{recommendedPlan.name}</strong>
                    <span>{recommendedPlan.spend} spend</span>
                  </div>
                </div>
                <div className="roi-plan-rec-right">
                  <strong style={{ color: 'var(--copper)' }}>{recommendedPlan.price}</strong>
                  {recommendedPlan.annual && <span>{recommendedPlan.annual} billed yearly</span>}
                </div>
              </div>
              <a
                href="/pricing#pricing-tiers"
                className="roi-plan-rec-link"
                onClick={e => {
                  const el = document.getElementById('pricing-tiers');
                  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                }}
              >
                See full plan details <ArrowRight size={12} />
              </a>
            </div>

            <Link to="/book-demo" className="btn btn-primary btn-full" style={{ margin: '4px 20px 4px', width: 'calc(100% - 40px)' }}>
              Validate with your real data <ArrowRight size={15} />
            </Link>
            <p className="roi-disclaimer" style={{ padding: '0 20px 20px' }}>Estimates use industry benchmark rates. Actual results vary by data quality and scope.</p>
          </div>
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
          <ROICalculator />
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

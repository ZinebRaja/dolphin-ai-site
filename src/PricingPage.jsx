import Navbar from './Navbar.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const TIERS = [
  {
    icon: '🌊', name: 'Coastal', spend: 'Up to $200M', annualMonthly: 699,
    runtime: 'Up to 250K line items / month',
    features: [
      'Up to $200M spend under management',
      'Spend classification & taxonomy mapping',
      'Supplier normalization & deduplication',
      'Automated data quality detection',
      'Email support & self-serve onboarding',
    ],
    cta: 'Get started', ctaLink: '/book-demo', note: '',
  },
  {
    icon: '🪸', name: 'Reef', spend: 'Up to $400M', annualMonthly: 999,
    runtime: 'Up to 500K line items / month',
    includes: 'Coastal',
    features: [
      'Full spend classification suite',
      'Advanced category performance reporting',
      'Opportunity & savings identification',
      'Email + chat support with guided onboarding',
    ],
    cta: 'Get started', ctaLink: '/book-demo', note: '',
  },
  {
    icon: '🧭', name: 'Navigator', spend: 'Up to $750M', annualMonthly: 1399,
    popular: true,
    runtime: 'Up to 1M line items / month',
    includes: 'Reef',
    features: [
      'Multi-source spend consolidation',
      'Custom taxonomy configuration',
      'Savings detection & tail spend analysis',
      'Real-time spend monitoring & alerts',
      'Priority support & dedicated onboarding',
    ],
    cta: 'Get started', ctaLink: '/book-demo', note: '',
  },
  {
    icon: '🌅', name: 'Horizon', spend: 'Up to $1B+', annualMonthly: 1699,
    runtime: 'Up to 5M line items / month',
    includes: 'Navigator',
    features: [
      'Enterprise-grade data pipelines',
      'Full supplier ecosystem visibility',
      'Advanced opportunity detection',
      'Dedicated onboarding team & priority SLA',
    ],
    cta: 'Get started', ctaLink: '/book-demo', note: '',
  },
  {
    icon: '🐬', name: 'Apex', spend: '$1.5B+ under management', annualMonthly: null,
    runtime: 'Unlimited processing',
    includes: 'Horizon',
    features: [
      'Custom integrations & taxonomy',
      'White-glove implementation',
      'Dedicated CSM & enterprise SLA',
      'Security, compliance & custom reporting',
    ],
    cta: 'Contact us', ctaLink: '/contact', note: 'Custom scope · Enterprise SLA',
  },
];

function PricingTiers() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="pt-section container">
      <div className="pt-header">
        <span className="eyebrow">Plans</span>
        <h2 className="pt-title">Simple, transparent pricing</h2>
        <p className="pt-sub">Scale from mid-market to enterprise. No long-term commitment required.</p>

        {/* Billing toggle */}
        <div className="pt-billing-row">
          <span className={`pt-billing-label${!annual ? ' is-active' : ''}`}>Monthly pricing</span>
          <button
            className={`pt-ios-switch${annual ? ' on' : ''}`}
            onClick={() => setAnnual(a => !a)}
            aria-pressed={annual}
            aria-label="Toggle yearly pricing"
          />
          <span className={`pt-billing-label${annual ? ' is-active' : ''}`}>
            Yearly pricing <span className="pt-save-badge">Save 15%</span>
          </span>
        </div>
      </div>

      <div className="pt-grid">
        {TIERS.map(t => {
          const monthlyPrice = t.annualMonthly ? Math.round(t.annualMonthly * 1.15) : null;
          const yearlyTotal = t.annualMonthly ? t.annualMonthly * 12 : null;
          const displayPrice = t.annualMonthly === null
            ? 'Custom'
            : annual
              ? `$${t.annualMonthly.toLocaleString()}`
              : `$${monthlyPrice.toLocaleString()}`;
          const period = t.annualMonthly === null ? '' : '/mo';

          return (
            <div key={t.name} className={`pt-card${t.popular ? ' pt-card--popular' : ''}`}>
              {t.popular && <div className="pt-badge">Most popular</div>}
              <div className="pt-card-top">
                <div className="pt-tier-icon">{t.icon}</div>
                <h3 className="pt-name">{t.name}</h3>
                <p className="pt-spend">{t.spend}</p>
              </div>
              <div className="pt-price-row">
                <span className="pt-price">{displayPrice}</span>
                {period && <span className="pt-period">{period}</span>}
              </div>
              <div className="pt-annual-info">
                {t.annualMonthly ? (
                  annual ? (
                    <span className="pt-annual-saving">Billed yearly · ${yearlyTotal.toLocaleString()}/year</span>
                  ) : (
                    <span className="pt-annual-total">Billed monthly · no commitment</span>
                  )
                ) : (
                  <span className="pt-annual-total">Pricing tailored to your scale</span>
                )}
              </div>
              {t.runtime && <div className="pt-runtime">{t.runtime}</div>}
              {t.includes && (
                <div className="pt-includes">Everything in {t.includes}, plus:</div>
              )}
              <ul className="pt-features">
                {t.features.map(f => (
                  <li key={f}>
                    <Check size={13} className="pt-check" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-card-bottom">
                <Link to={t.ctaLink} className="btn btn-primary pt-cta-btn">
                  {t.cta}
                </Link>
                {t.note && <p className="pt-note">{t.note}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const fmt = (n) => {
  if (!isFinite(n) || isNaN(n)) return '$0';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
};

function RoiSlider({ label, value, min, max, step, onChange, format, rangeMin, rangeMax }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="pc-field">
      <div className="pc-label-row">
        <label>{label}</label>
        <span className="pc-val">{format ? format(value) : value.toLocaleString()}</span>
      </div>
      <div className="pc-slider-wrap">
        <input type="range" min={min} max={max} step={step || 1} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ '--pct': `${pct}%` }} />
      </div>
      {(rangeMin || rangeMax) && (
        <div className="pc-range-labels"><span>{rangeMin}</span><span>{rangeMax}</span></div>
      )}
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="roi-toggle-row">
      <span className="roi-toggle-label">{label}</span>
      <div className="roi-toggle-group">
        <button className={`roi-toggle-btn${!value ? ' active' : ''}`} onClick={() => onChange(false)}>No</button>
        <button className={`roi-toggle-btn${value ? ' active' : ''}`} onClick={() => onChange(true)}>Yes</button>
      </div>
    </div>
  );
}

function PricingCalculator() {
  const [annualSpend,       setAnnualSpend]       = useState(200000000);
  const [suppliers,         setSuppliers]          = useState(500);
  const [monthlyHours,      setMonthlyHours]       = useState(160);
  const [hourlyRate,        setHourlyRate]         = useState(75);
  const [hasClassification, setHasClassification] = useState(false);
  const [classDepth,        setClassDepth]         = useState(2);
  const [classAccuracy,     setClassAccuracy]      = useState(55);
  const [hasNormalization,  setHasNormalization]   = useState(false);
  const [savingsRate,       setSavingsRate]        = useState(3.5);

  // ── Calculations ──────────────────────────────────
  // Labor: how much time Dolphin AI frees up
  const laborReduction = hasClassification
    ? (classDepth >= 3 ? 0.40 : classDepth === 2 ? 0.55 : 0.65)
    : 0.80;
  const laborSavings = Math.round(monthlyHours * hourlyRate * 12 * laborReduction);

  // Spend: better category visibility → better sourcing decisions
  // Bonus if currently no classification or low accuracy
  const accuracyBonus = hasClassification ? Math.max(0, (80 - classAccuracy) / 80 * 0.015) : 0.015;
  const effectiveSavingsRate = (savingsRate / 100) + accuracyBonus;
  const spendSavings = Math.round(annualSpend * effectiveSavingsRate);

  // Supplier normalization value
  const normSavings = hasNormalization
    ? Math.round(suppliers * 35)
    : Math.round(suppliers * 90);

  const totalBenefit   = laborSavings + spendSavings + normSavings;

  // Dolphin AI fee by spend tier
  const { tierName, annualFee } = (() => {
    if (annualSpend < 200000000)  return { tierName: 'Coastal',   annualFee: 699  * 12 };
    if (annualSpend < 400000000)  return { tierName: 'Reef',      annualFee: 999  * 12 };
    if (annualSpend < 750000000)  return { tierName: 'Navigator', annualFee: 1399 * 12 };
    if (annualSpend < 1500000000) return { tierName: 'Horizon',   annualFee: 1699 * 12 };
    return { tierName: 'Apex', annualFee: 2500 * 12 };
  })();

  const netBenefit    = totalBenefit - annualFee;
  const roi           = Math.round((netBenefit / Math.max(1, annualFee)) * 100);
  const paybackDays   = Math.round((annualFee / Math.max(1, totalBenefit)) * 365);
  const paybackText   = paybackDays < 30
    ? `${paybackDays} days`
    : paybackDays < 365
      ? `${Math.round(paybackDays / 30)} months`
      : `${(paybackDays / 365).toFixed(1)} yrs`;

  const benefitPct = Math.min(96, Math.round((totalBenefit / Math.max(1, totalBenefit + annualFee)) * 100));

  return (
    <div className="pc-card">

      {/* ── LEFT: Inputs ── */}
      <div className="pc-inputs">

        <div className="roi-section">
          <p className="pc-section-label">Your spend data</p>
          <RoiSlider label="Annual addressable spend" value={annualSpend}
            min={10000000} max={2000000000} step={5000000}
            onChange={setAnnualSpend} format={v => fmt(v)}
            rangeMin="$10M" rangeMax="$2B" />
          <RoiSlider label="Number of suppliers" value={suppliers}
            min={50} max={10000} step={50}
            onChange={setSuppliers}
            rangeMin="50" rangeMax="10,000" />
          <RoiSlider label="Expected savings rate" value={savingsRate}
            min={0.5} max={8} step={0.5}
            onChange={setSavingsRate} format={v => `${v}%`}
            rangeMin="0.5%" rangeMax="8%" />
        </div>

        <div className="roi-section">
          <p className="pc-section-label">Your team cost</p>
          <RoiSlider label="Hours on data cleaning / month" value={monthlyHours}
            min={5} max={500} step={5}
            onChange={setMonthlyHours} format={v => `${v}h`}
            rangeMin="5h" rangeMax="500h" />
          <RoiSlider label="Labor cost per hour" value={hourlyRate}
            min={30} max={250} step={5}
            onChange={setHourlyRate} format={v => `$${v}`}
            rangeMin="$30" rangeMax="$250" />
        </div>

        <div className="roi-section">
          <p className="pc-section-label">Your current process</p>
          <Toggle label="Do you classify spend today?" value={hasClassification} onChange={setHasClassification} />
          {hasClassification && (
            <div className="roi-sub">
              <p className="roi-sub-label">Classification depth</p>
              <div className="roi-depth-pills">
                {[1,2,3,4].map(d => (
                  <button key={d}
                    className={`roi-depth-pill${classDepth === d ? ' active' : ''}`}
                    onClick={() => setClassDepth(d)}>
                    Level {d}
                  </button>
                ))}
              </div>
              <RoiSlider label="Current accuracy" value={classAccuracy}
                min={20} max={95} step={5}
                onChange={setClassAccuracy} format={v => `${v}%`}
                rangeMin="20%" rangeMax="95%" />
            </div>
          )}
          <Toggle label="Supplier normalization in place?" value={hasNormalization} onChange={setHasNormalization} />
        </div>

      </div>

      {/* ── RIGHT: Results ── */}
      <div className="pc-results">
        <p className="pc-section-label">Your savings potential</p>

        {/* Big ROI */}
        <div className="roi-headline">
          <span className="roi-hl-label">Estimated Year 1 ROI</span>
          <span className="roi-hl-value">
            {roi <= 0 ? '—' : roi > 9999 ? '>9,999%' : `${roi.toLocaleString()}%`}
          </span>
          <span className="roi-hl-sub">Payback in {paybackText}</span>
        </div>

        {/* Savings breakdown */}
        <div className="roi-breakdown">
          <div className="roi-break-row">
            <span>Labor time saved (annual)</span>
            <strong>{fmt(laborSavings)}</strong>
          </div>
          <div className="roi-break-row">
            <span>Spend savings ({(effectiveSavingsRate * 100).toFixed(1)}%)</span>
            <strong>{fmt(spendSavings)}</strong>
          </div>
          <div className="roi-break-row">
            <span>Supplier normalization value</span>
            <strong>{fmt(normSavings)}</strong>
          </div>
          <div className="roi-break-row roi-break-total">
            <span>Total benefit (Year 1)</span>
            <strong>{fmt(totalBenefit)}</strong>
          </div>
        </div>

        {/* Visual bar */}
        <div className="roi-bar-section">
          <div className="roi-bar-labels">
            <span>Dolphin AI cost</span>
            <span>Your benefit</span>
          </div>
          <div className="roi-bar-track">
            <div className="roi-bar-cost" style={{ width: `${100 - benefitPct}%` }}>
              <span>{fmt(annualFee)}</span>
            </div>
            <div className="roi-bar-benefit" style={{ width: `${benefitPct}%` }}>
              <span>{fmt(totalBenefit)}</span>
            </div>
          </div>
        </div>

        {/* Recommended plan */}
        <div className="roi-plan-chip">
          <span>Suggested plan</span>
          <strong>{tierName} · {fmt(annualFee)} / yr</strong>
        </div>

        <p className="pc-disclaimer">Estimates based on your inputs. Actual results depend on data quality and scope.</p>

        <Link to="/book-demo" className="btn btn-primary btn-full" style={{ marginTop: '0.5rem' }}>
          Validate your ROI with us <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}


export default function PricingPage() {
  return (
    <div className="site">
      <Navbar />

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

        {/* Pricing tier cards */}
        <PricingTiers />

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

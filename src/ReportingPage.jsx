import Navbar from './Navbar.jsx';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, Users, Tag, FileText, Lightbulb, Bell, BookOpen,
  ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Download, LayoutDashboard,
} from 'lucide-react';

const TABS = [
  {
    id: 'spend-overview',
    icon: <BarChart3 size={16} />,
    label: 'Spend Overview',
    headline: 'Total spend visibility across every dimension',
    desc: 'See your full spend footprint — by year, location, business unit, and data source — in one live dashboard. Trend lines, category breakdowns, and top-supplier rankings update in real time.',
    img: '/screenshots/dash-spend-overview.png',
    stats: [{ label: 'Transactions analysed', value: '100,000' }, { label: 'Total spend tracked', value: '$7.49B' }, { label: 'Classification rate', value: '75.9%' }],
  },
  {
    id: 'supplier-analysis',
    icon: <Users size={16} />,
    label: 'Supplier Analysis',
    headline: 'Know every supplier — their spend, risk, and performance',
    desc: 'Pareto analysis, year-over-year supplier spend, risk distribution, and performance scoring in one view. Identify concentration risk before it becomes a problem.',
    img: '/screenshots/dash-supplier-analysis.png',
    stats: [{ label: 'Suppliers tracked', value: '39' }, { label: 'High-risk suppliers', value: '8' }, { label: 'Avg performance score', value: '75.9%' }],
  },
  {
    id: 'category-analysis',
    icon: <Tag size={16} />,
    label: 'Category Analysis',
    headline: 'Deep taxonomy insights down to Level 4',
    desc: 'Category trend charts, L1 and L2 breakdowns, YoY growth by category, and a full spend summary table. Filter by scope level to go as deep as your taxonomy allows.',
    img: '/screenshots/dash-category-analysis.png',
    stats: [{ label: 'L1 categories', value: '10' }, { label: 'Coverage rate', value: '82.4%' }, { label: 'Fastest growing', value: '+34.9%' }],
  },
  {
    id: 'contract-analysis',
    icon: <FileText size={16} />,
    label: 'Contract Analysis',
    headline: 'Stay ahead of renewals and compliance gaps',
    desc: 'Active contracts, expiry alerts, compliance trend vs. target, and renewal risk — all surfaced automatically. Never miss a critical renewal again.',
    img: '/screenshots/dash-contract-analysis.png',
    stats: [{ label: 'Active contracts', value: '8,142' }, { label: 'Expiring in 90 days', value: '542' }, { label: 'Compliance rate', value: '89.7%' }],
  },
  {
    id: 'savings-opportunities',
    icon: <Lightbulb size={16} />,
    label: 'Savings Opportunities',
    headline: 'Savings opportunities ranked by value and confidence',
    desc: 'Every opportunity quantified in dollars, ranked by potential impact, and tracked through planning, in-progress, and implemented stages.',
    img: '/screenshots/dash-savings.png',
    stats: [{ label: 'Opportunities found', value: '243' }, { label: 'Potential savings', value: '$412.3M' }, { label: 'Implemented savings', value: '$96.8M' }],
  },
  {
    id: 'alerts-insights',
    icon: <Bell size={16} />,
    label: 'Alerts & Insights',
    headline: 'Proactive alerts before issues become crises',
    desc: 'Critical spend anomalies, contract risks, duplicate invoices, and supplier risks — all surfaced with severity levels, dollar impact, and AI-generated action recommendations.',
    img: '/screenshots/dash-alerts.png',
    stats: [{ label: 'Critical alerts', value: '17' }, { label: 'Spend anomalies', value: '36' }, { label: 'AI insights open', value: '24' }],
  },
  {
    id: 'reports',
    icon: <BookOpen size={16} />,
    label: 'Reports',
    headline: 'Scheduled reports delivered automatically',
    desc: 'Create, schedule, and share procurement reports — weekly, monthly, or on demand. Export to PDF, Excel, or CSV. Every report your team needs, automated.',
    img: '/screenshots/dash-reports.png',
    stats: [{ label: 'Reports in library', value: '128' }, { label: 'Scheduled deliveries', value: '34' }, { label: 'Ran last 30 days', value: '96' }],
  },
];

export default function ReportingPage() {
  const [active, setActive]       = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible]     = useState(false);
  const sectionRef = useRef(null);

  /* scroll reveal only */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  function handleTabClick(i) {
    if (i === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 200);
  }

  const tab = TABS[active];

  return (
    <div className="site">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="rpt-hero">
          <div className="container rpt-hero-inner">
            <div className="rpt-live-badge"><span className="rpt-live-dot" />Live dashboards</div>
            <h1>Every procurement insight, live and in one place</h1>
            <p>From spend trends to supplier risk, contract compliance to savings pipelines — Dolphin AI turns raw data into executive-ready dashboards that update automatically.</p>
            <div className="rpt-hero-pills">
              {['Real-time data', 'Zero manual preparation', 'Export to PDF & Excel', 'Scheduled delivery'].map(t => (
                <span className="rpt-pill" key={t}><CheckCircle2 size={12} />{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section className="rpt-showcase" ref={sectionRef}>
          <div className="container">
            {/* Headline above grid */}
          <div className={`rpt-headline-row ${visible ? 'rpt-visible' : ''}`} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s', marginBottom: 24 }}>
            <h2 className={`rpt-content-h2 ${animating ? 'rpt-fade-out' : 'rpt-fade-in'}`}>{tab.headline}</h2>
            <div className="rpt-stats2">
              {tab.stats.map(s => (
                <div className={`rpt-stat2 ${animating ? 'rpt-fade-out' : 'rpt-fade-in'}`} key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`rpt-layout2 ${visible ? 'rpt-visible' : ''}`}>

              {/* LEFT: tab nav card */}
              <div className="rpt-tabs2">
                <p className="rpt-tabs-label">Dashboard views</p>
                <div className="rpt-tab-list">
                  {TABS.map((t, i) => (
                    <button
                      key={t.id}
                      className={`rpt-tab2 ${i === active ? 'rpt-tab2-active' : ''}`}
                      onClick={() => handleTabClick(i)}
                    >
                      <span className="rpt-tab-icon">{t.icon}</span>
                      <span>{t.label}</span>
                      {i === active && <span className="rpt-tab-dot" />}
                    </button>
                  ))}
                </div>
                <Link to="/book-demo" className="rpt-tabs-cta">
                  See it live <ArrowRight size={13} />
                </Link>
              </div>

              {/* RIGHT: screenshot only */}
              <div className="rpt-content2">

                {/* Browser chrome */}
                <div className="rpt-browser2">
                  <div className="rpt-browser-bar">
                    <span className="rpt-dot rpt-dot-red" />
                    <span className="rpt-dot rpt-dot-yellow" />
                    <span className="rpt-dot rpt-dot-green" />
                    <span className="rpt-browser-url">app.dolphinaipro.com / {tab.id}</span>
                    <span className="rpt-live-chip"><span className="rpt-live-dot-sm" />LIVE</span>
                  </div>
                  <div className="rpt-browser-screen2">
                    <img
                      key={tab.id}
                      src={tab.img}
                      alt={tab.label}
                      className={`rpt-screenshot2 ${animating ? 'rpt-img-out' : 'rpt-img-in'}`}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Feature strip */}
        <section className="rpt-features">
          <div className="container rpt-features-grid">
            {[
              { icon: <TrendingUp size={20} />, title: 'Always up to date', desc: 'Data refreshes automatically from every connected source. No manual exports, no stale reports.' },
              { icon: <LayoutDashboard size={20} />, title: 'Role-based views', desc: 'CPO, category manager, CFO — each role gets the view they need without drowning in irrelevant data.' },
              { icon: <Download size={20} />, title: 'One-click export', desc: 'Every dashboard and table exports to PDF, Excel, or CSV in seconds. Board-ready in minutes.' },
              { icon: <ShieldCheck size={20} />, title: 'Enterprise security', desc: 'All data processed within your security boundary. SOC 2 aligned, role-based access control.' },
            ].map(f => (
              <div className="rpt-feature-card" key={f.title}>
                <div className="rpt-feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rpt-cta">
          <div className="container rpt-cta-inner">
            <h2>See these dashboards on your own data</h2>
            <p>In a 30-minute demo we'll connect to your data and show you live results — not a generic demo.</p>
            <div className="rpt-cta-btns">
              <Link to="/book-demo" className="btn btn-primary btn-lg">Book a demo <ArrowRight size={15} /></Link>
              <Link to="/assessment" className="btn btn-outline btn-lg">Try the free ROI calculator <ArrowRight size={15} /></Link>
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

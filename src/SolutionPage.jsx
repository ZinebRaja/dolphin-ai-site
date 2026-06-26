import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Database, Zap, Layers3, BarChart3,
  Users, FileText, TrendingUp, Clock, ShieldCheck, AlertTriangle,
  Upload, Cpu, Monitor, ChevronRight,
} from 'lucide-react';

const PROBLEMS = [
  { icon: <AlertTriangle size={20}/>, color: '#dc2626', bg: '#fef2f2', title: 'Spend data you can\'t trust', desc: 'Duplicate suppliers, blank categories, inconsistent naming — your ERP export is unusable without hours of manual cleaning.' },
  { icon: <Clock size={20}/>, color: '#ca8a04', bg: '#fefce8', title: 'Weeks lost every month', desc: 'Finance and category teams spend 40+ hours a month reformatting Excel files instead of driving decisions.' },
  { icon: <Users size={20}/>, color: '#7c3aed', bg: '#f5f3ff', title: 'No single view of suppliers', desc: 'The same vendor appears as 12 different names across your systems. You have no idea what you\'re really spending with them.' },
  { icon: <BarChart3 size={20}/>, color: '#0369a1', bg: '#e0f2fe', title: 'Reporting that\'s always out of date', desc: 'By the time a spend report reaches leadership, it\'s already two weeks old — built from stale, unclassified data.' },
];

const STEPS = [
  {
    num: '01',
    icon: <Upload size={28}/>,
    color: '#E06820',
    bg: '#fff3eb',
    title: 'Connect your data',
    subtitle: 'Any source. No IT project.',
    desc: 'Dolphin AI connects directly to your ERP, finance system, or accepts file uploads. We handle SAP, Oracle, Dynamics 365, Coupa, Workday, and plain Excel — in any format you have.',
    bullets: ['Direct API connector or secure file upload', 'Multiple sources merged and reconciled automatically', 'Full data encrypted in transit', 'Initial completeness scan in hours, not weeks'],
    stat: { value: '1–3 days', label: 'to connect and extract' },
  },
  {
    num: '02',
    icon: <Cpu size={28}/>,
    color: '#7c3aed',
    bg: '#f5f3ff',
    title: 'AI cleans and classifies',
    subtitle: 'Automatic. Auditable. Accurate.',
    desc: 'Our AI pipeline normalizes supplier names, fills blank fields, removes duplicates, and maps every transaction to your taxonomy — down to Level 4. Every change is logged. Low-confidence results go to a review queue, not silently accepted.',
    bullets: ['87% of data issues resolved without human input', 'Supplier deduplication using NLP fuzzy matching', '95%+ classification accuracy across L1–L4', 'Full audit trail — every change has a reason'],
    stat: { value: '95%+', label: 'classification accuracy' },
  },
  {
    num: '03',
    icon: <Monitor size={28}/>,
    color: '#16a34a',
    bg: '#f0fdf4',
    title: 'Live dashboards delivered',
    subtitle: 'First results in 14–30 days.',
    desc: 'Clean, classified spend data lands in role-based dashboards — spend by category, supplier rankings, contract compliance, savings opportunities. Data refreshes automatically as new transactions arrive.',
    bullets: ['Spend by category (L1–L4), supplier rankings, trend charts', 'Anomaly alerts and savings opportunities surfaced automatically', 'Role-based access: CPO, category managers, finance', 'Export to PDF, Excel, or CSV in one click'],
    stat: { value: '14–30 days', label: 'to first live dashboard' },
  },
];

const CAPABILITIES = [
  { icon: <Layers3 size={22}/>, color: '#E06820', bg: '#fff3eb', title: 'Spend Classification', desc: 'Every transaction mapped to your taxonomy at L1–L4. Works with UNSPSC, custom, or hybrid structures.' },
  { icon: <Users size={22}/>, color: '#0369a1', bg: '#e0f2fe', title: 'Supplier Normalization', desc: 'One clean, trusted supplier master — duplicates removed, variants merged, names standardized.' },
  { icon: <Database size={22}/>, color: '#7c3aed', bg: '#f5f3ff', title: 'Data Enrichment', desc: 'AI completes blank fields, adds country of origin, industry code, risk tier, and contract status.' },
  { icon: <BarChart3 size={22}/>, color: '#16a34a', bg: '#f0fdf4', title: 'Spend Intelligence', desc: 'Live dashboards with trend charts, KPIs, category breakdowns, and anomaly detection.' },
  { icon: <FileText size={22}/>, color: '#ca8a04', bg: '#fefce8', title: 'Contract Compliance', desc: 'Track on-contract vs off-contract spend. Expiry alerts surfaced automatically before it\'s too late.' },
  { icon: <TrendingUp size={22}/>, color: '#C05818', bg: '#fff8f2', title: 'Savings Opportunities', desc: 'Consolidation targets, tail spend, duplicate invoices — ranked by dollar impact and ready to act on.' },
];

const OUTCOMES = [
  { value: '95%+', label: 'Classification accuracy', sub: 'Across L1–L4 taxonomy' },
  { value: '87%', label: 'Issues auto-resolved', sub: 'Without human intervention' },
  { value: '14–30', label: 'Days to first dashboard', sub: 'From data handover to go-live' },
  { value: '0', label: 'IT projects required', sub: 'We connect to what you have' },
];

export default function SolutionPage() {
  return (
    <div className="site">
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #111111 0%, #1E1E1E 45%, #C05818 80%, #E06820 100%)', padding: '100px 0 80px', color: '#fff', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 780 }}>
            <span style={{ background: 'rgba(255,255,255,0.12)', color: '#fcd9bc', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 20, display: 'inline-block', marginBottom: 24 }}>
              The Solution
            </span>
            <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
              Turn messy spend data into decisions — in weeks, not quarters
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.7 }}>
              Dolphin AI connects to your existing systems, cleans and classifies every transaction automatically, and delivers live dashboards your finance and category teams can actually trust.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/book-demo" className="btn btn-primary btn-lg" style={{ background: '#fff', color: '#E06820', border: 'none', fontWeight: 800 }}>
                Book a Demo <ArrowRight size={16}/>
              </Link>
              <Link to="/scoping" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', fontWeight: 700 }}>
                Estimate my project <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Outcome numbers ── */}
        <section style={{ background: '#1A1A1A', padding: '40px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 0 }}>
              {OUTCOMES.map((o, i) => (
                <div key={o.label} style={{ textAlign: 'center', padding: '20px 16px', borderRight: i < OUTCOMES.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#E06820', lineHeight: 1 }}>{o.value}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '6px 0 2px' }}>{o.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{o.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Problem ── */}
        <section style={{ padding: '80px 0', background: '#fafafa' }}>
          <div className="container" style={{ maxWidth: 1040 }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="eyebrow">The problem we solve</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', marginTop: 8, marginBottom: 12 }}>Most organizations are flying blind on spend</h2>
              <p style={{ color: '#6b7280', maxWidth: 520, margin: '0 auto', fontSize: 16 }}>
                Not because the data doesn't exist — but because it's too messy to use.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
              {PROBLEMS.map(p => (
                <div key={p.title} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 16, padding: '24px 22px' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: p.bg, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{p.icon}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 800, color: '#1B2A4A', marginBottom: 8 }}>{p.title}</h4>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works: 3 steps ── */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: 1040 }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="eyebrow">How it works</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', marginTop: 8 }}>Three steps from raw data to live intelligence</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {STEPS.map((s, i) => (
                <div key={s.num} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 60, alignItems: 'center', padding: '48px 0', borderBottom: i < STEPS.length - 1 ? '1px solid #f0f0f0' : 'none' }}>

                  {/* Text side */}
                  <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: s.color, background: s.bg, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>STEP {s.num}</span>
                    </div>
                    <h3 style={{ fontSize: 28, fontWeight: 900, color: '#1B2A4A', marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, fontWeight: 700, color: s.color, marginBottom: 16 }}>{s.subtitle}</p>
                    <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>{s.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {s.bullets.map(b => (
                        <div key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <CheckCircle2 size={15} style={{ color: s.color, flexShrink: 0, marginTop: 2 }}/>
                          <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual side */}
                  <div style={{ order: i % 2 === 0 ? 1 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: `linear-gradient(135deg, ${s.bg}, #fff)`, border: `2px solid ${s.color}22`, borderRadius: 24, padding: '48px 40px', textAlign: 'center', width: '100%', maxWidth: 340 }}>
                      <div style={{ width: 72, height: 72, borderRadius: '50%', background: s.bg, border: `2px solid ${s.color}33`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>{s.icon}</div>
                      <div style={{ fontSize: 48, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.stat.value}</div>
                      <div style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>{s.stat.label}</div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section style={{ padding: '80px 0', background: '#fafafa' }}>
          <div className="container" style={{ maxWidth: 1040 }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="eyebrow">What's included</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', marginTop: 8 }}>Six capabilities, one platform</h2>
              <p style={{ color: '#6b7280', maxWidth: 480, margin: '12px auto 0', fontSize: 16 }}>Everything works together — you don't need to stitch tools together or maintain integrations.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
              {CAPABILITIES.map(c => (
                <div key={c.title} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 16, padding: '24px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: '#1B2A4A', marginBottom: 6 }}>{c.title}</h4>
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who it's for ── */}
        <section style={{ padding: '80px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: 1040 }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="eyebrow">Who it's for</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', marginTop: 8 }}>Built for the teams that own the data</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
              {[
                { role: 'CPO & Procurement Leadership', icon: <TrendingUp size={20}/>, color: '#E06820', bg: '#fff3eb', points: ['Full spend visibility across every category', 'Savings pipeline with dollar estimates', 'Supplier risk and concentration reports', 'Board-ready dashboards on demand'] },
                { role: 'Category Managers', icon: <Layers3 size={20}/>, color: '#7c3aed', bg: '#f5f3ff', points: ['Category deep-dives to L4 with trend data', 'Supplier performance by category', 'Off-contract spend identification', 'Sourcing opportunity ranking'] },
                { role: 'Finance & CFO', icon: <BarChart3 size={20}/>, color: '#0369a1', bg: '#e0f2fe', points: ['Accurate spend data they can sign off on', 'Cost center and entity-level breakdowns', 'Budget vs. actuals visibility', 'Automated monthly reporting'] },
              ].map(r => (
                <div key={r.role} style={{ background: r.bg, border: `1.5px solid ${r.color}22`, borderRadius: 16, padding: '28px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.icon}</div>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: '#1B2A4A', margin: 0 }}>{r.role}</h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {r.points.map(p => (
                      <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <ChevronRight size={13} style={{ color: r.color, flexShrink: 0, marginTop: 3 }}/>
                        <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2a2a2a 60%, #7a3010 100%)', padding: '80px 0', textAlign: 'center', color: '#fff' }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 900, marginBottom: 16 }}>
              See it on your actual data
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
              In a 30-minute demo we connect to a sample of your data and show you real results — real categories, real supplier names, real dashboards. No generic screenshots.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/book-demo" className="btn btn-primary btn-lg" style={{ border: 'none' }}>
                Book a Demo <ArrowRight size={15}/>
              </Link>
              <Link to="/scoping" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', fontWeight: 700 }}>
                Estimate my project <ArrowRight size={15}/>
              </Link>
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

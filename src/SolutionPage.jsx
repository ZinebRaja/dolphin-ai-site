import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BarChart3, Users, Layers3, Bell, Download,
  CheckCircle2, Database, RefreshCw, Tag, Sparkles, ShieldCheck, Zap,
} from 'lucide-react';

const SOURCES = [
  { name: 'SAP / S4HANA',        dot: '#3b82f6' },
  { name: 'Oracle Fusion',        dot: '#8b5cf6' },
  { name: 'MS Dynamics 365',      dot: '#06b6d4' },
  { name: 'Coupa / Ariba',        dot: '#10b981' },
  { name: 'Excel · CSV · Any file', dot: '#f59e0b' },
];

const ENGINE = [
  { n: 1, icon: <Database size={14}/>,     title: 'Ingest & parse',    sub: 'Any format, any source' },
  { n: 2, icon: <RefreshCw size={14}/>,    title: 'Deduplicate',       sub: 'NLP entity matching' },
  { n: 3, icon: <Tag size={14}/>,          title: 'Classify to L4',    sub: 'UNSPSC or custom taxonomy' },
  { n: 4, icon: <Sparkles size={14}/>,     title: 'Enrich fields',     sub: 'Fill blanks, add context' },
  { n: 5, icon: <ShieldCheck size={14}/>,  title: 'Human review queue', sub: 'Low-confidence flagged' },
  { n: 6, icon: <Zap size={14}/>,          title: 'Publish live',      sub: 'Auto-refresh on new data' },
];

const OUTPUTS = [
  { icon: <BarChart3 size={16}/>, name: 'Spend Overview' },
  { icon: <Users size={16}/>,     name: 'Supplier Analysis' },
  { icon: <Layers3 size={16}/>,   name: 'Category Reports' },
  { icon: <Bell size={16}/>,      name: 'Savings Alerts' },
  { icon: <Download size={16}/>,  name: 'Export — PDF / Excel / API' },
];

const STAGE_DETAIL = [
  {
    n: 1, color: '#E06820', bg: '#fff3eb',
    title: 'Ingest & parse',
    desc: 'We connect directly to your ERP via API, or you drop a file. We handle any encoding, any column layout, multiple currencies. Multiple systems are merged into one unified dataset automatically.',
  },
  {
    n: 2, color: '#7c3aed', bg: '#f5f3ff',
    title: 'Deduplicate suppliers',
    desc: '"Microsoft Corp", "MICROSOFT", "Micro Soft Inc." → one record. Our NLP model does fuzzy string matching, phonetic matching, and contextual signals to resolve supplier variants at scale.',
  },
  {
    n: 3, color: '#0369a1', bg: '#e0f2fe',
    title: 'Classify to L4',
    desc: 'Every transaction is mapped to your taxonomy — UNSPSC, custom, or hybrid — down to Level 4. The model is trained on hundreds of millions of spend records and fine-tuned on your industry.',
  },
  {
    n: 4, color: '#16a34a', bg: '#f0fdf4',
    title: 'Enrich blank fields',
    desc: 'Missing country? Risk tier? Contract status? Cost centre? The enrichment layer fills gaps using supplier databases, public registries, and your own master data — logged for every field changed.',
  },
  {
    n: 5, color: '#ca8a04', bg: '#fefce8',
    title: 'Human review queue',
    desc: 'Nothing is silently accepted. Rows below a confidence threshold go to a review queue — your analyst or ours. Every change has a reason code. Full audit trail exported at any time.',
  },
  {
    n: 6, color: '#C05818', bg: '#fff8f2',
    title: 'Publish & auto-refresh',
    desc: 'Clean data lands in role-based dashboards. When a new extract arrives, the pipeline re-runs automatically. No manual intervention. Your dashboards are always current.',
  },
];

// ── Connector arrow between columns ──
function Arrow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, flexShrink: 0, width: 56 }}>
      <div style={{ width: '100%', height: 2, background: 'linear-gradient(90deg, rgba(224,104,32,0.4), #E06820)' }}/>
      <span style={{ color: '#E06820', fontSize: 20, fontWeight: 900, lineHeight: 1, marginTop: -4 }}>›</span>
    </div>
  );
}

export default function SolutionPage() {
  return (
    <div className="site">
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #111111 0%, #1E1E1E 45%, #C05818 80%, #E06820 100%)', padding: '88px 0 64px', color: '#fff' }}>
          <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fcd9bc', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20, display: 'inline-block', marginBottom: 24 }}>
              Platform overview
            </span>
            <h1 style={{ fontSize: 'clamp(28px,5vw,54px)', fontWeight: 900, lineHeight: 1.08, marginBottom: 18 }}>
              From raw spend data to live intelligence — one connected platform
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.75 }}>
              Dolphin AI connects to every system you use, runs your data through an AI pipeline, and delivers clean dashboards your whole team can trust.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/book-demo" className="btn btn-primary btn-lg" style={{ background: '#fff', color: '#E06820', border: 'none', fontWeight: 800 }}>
                Book a Demo <ArrowRight size={15}/>
              </Link>
              <Link to="/scoping" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)', fontWeight: 700 }}>
                Get an estimate <ArrowRight size={15}/>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Architecture Diagram ── */}
        <section style={{ background: '#0D0D0D', padding: '72px 0' }}>
          <div className="container" style={{ maxWidth: 1040 }}>

            <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E06820', marginBottom: 48 }}>
              Platform Architecture
            </p>

            {/* Three-panel diagram */}
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>

              {/* ── LEFT: Data sources ── */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 12, paddingLeft: 2 }}>Your data sources</div>
                <div style={{ flex: 1, border: '1px solid #222', borderRadius: 16, overflow: 'hidden', background: '#141414' }}>
                  {SOURCES.map((s, i) => (
                    <div key={s.name} style={{ padding: '14px 16px', borderBottom: i < SOURCES.length - 1 ? '1px solid #1f1f1f' : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: s.dot, flexShrink: 0, display: 'inline-block', boxShadow: `0 0 6px ${s.dot}88` }}/>
                      <span style={{ fontSize: 13, color: '#d1d5db', fontWeight: 500 }}>{s.name}</span>
                    </div>
                  ))}
                  <div style={{ padding: '12px 16px', borderTop: '1px solid #1f1f1f' }}>
                    <span style={{ fontSize: 11, color: '#444', fontStyle: 'italic' }}>+ any other source</span>
                  </div>
                </div>
              </div>

              {/* ── CONNECTOR → ── */}
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: 32 }}>
                <Arrow />
              </div>

              {/* ── CENTER: Engine ── */}
              <div style={{ width: 224, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E06820', marginBottom: 12, textAlign: 'center' }}>Dolphin AI Engine</div>
                <div style={{ flex: 1, border: '2px solid #E06820', borderRadius: 16, overflow: 'hidden', background: '#0d0d0d', boxShadow: '0 0 40px rgba(224,104,32,0.12), inset 0 0 40px rgba(224,104,32,0.03)' }}>
                  {/* Header */}
                  <div style={{ padding: '14px 16px 10px', background: 'rgba(224,104,32,0.08)', borderBottom: '1px solid rgba(224,104,32,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E06820', boxShadow: '0 0 8px #E06820' }}/>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#E06820', letterSpacing: '0.05em' }}>AI PIPELINE</span>
                  </div>
                  {ENGINE.map((s, i) => (
                    <div key={s.n} style={{ padding: '11px 14px', borderBottom: i < ENGINE.length - 1 ? '1px solid #1a1a1a' : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(224,104,32,0.12)', color: '#E06820', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 800 }}>{s.n}</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{s.title}</div>
                        <div style={{ fontSize: 10, color: '#555', lineHeight: 1.3 }}>{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── CONNECTOR → ── */}
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: 32 }}>
                <Arrow />
              </div>

              {/* ── RIGHT: Outputs ── */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 12, paddingLeft: 2 }}>What your team gets</div>
                <div style={{ flex: 1, border: '1px solid #222', borderRadius: 16, overflow: 'hidden', background: '#141414' }}>
                  {OUTPUTS.map((o, i) => (
                    <div key={o.name} style={{ padding: '14px 16px', borderBottom: i < OUTPUTS.length - 1 ? '1px solid #1f1f1f' : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#E06820', flexShrink: 0 }}>{o.icon}</span>
                      <span style={{ fontSize: 13, color: '#d1d5db', fontWeight: 500 }}>{o.name}</span>
                      <CheckCircle2 size={12} style={{ color: '#10b981', marginLeft: 'auto', flexShrink: 0 }}/>
                    </div>
                  ))}
                  <div style={{ padding: '12px 16px', borderTop: '1px solid #1f1f1f', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b98188', display: 'inline-block' }}/>
                    <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>Live · auto-refreshing</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Key metrics strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, marginTop: 40, border: '1px solid #222', borderRadius: 14, overflow: 'hidden' }}>
              {[
                { v: '14–30', u: 'days to go live', sub: 'From data handover' },
                { v: '95%+', u: 'classification accuracy', sub: 'Across L1–L4' },
                { v: '87%', u: 'issues auto-resolved', sub: 'Without human input' },
                { v: '0',   u: 'IT projects required', sub: 'We connect to what you have' },
              ].map((m, i) => (
                <div key={m.v} style={{ background: '#141414', padding: '22px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid #222' : 'none' }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#E06820', lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', margin: '6px 0 2px', lineHeight: 1.3 }}>{m.u}</div>
                  <div style={{ fontSize: 10, color: '#444' }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stage deep-dives ── */}
        <section style={{ padding: '80px 0', background: '#fafafa' }}>
          <div className="container" style={{ maxWidth: 1000 }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E06820', background: '#fff3eb', padding: '4px 12px', borderRadius: 20 }}>Under the hood</span>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, marginTop: 14, color: '#111' }}>What each pipeline stage actually does</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 18 }}>
              {STAGE_DETAIL.map(s => (
                <div key={s.n} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 16, padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, color: s.color, fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.n}</div>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: '#111', margin: 0 }}>{s.title}</h4>
                  </div>
                  <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Works with strip ── */}
        <section style={{ padding: '48px 0', background: '#fff', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
          <div className="container" style={{ maxWidth: 880 }}>
            <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 28 }}>Works with your existing stack</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['SAP', 'Oracle', 'MS Dynamics 365', 'Coupa', 'SAP Ariba', 'Workday', 'NetSuite', 'Sage', 'QuickBooks', 'Excel / CSV', 'Any ERP'].map(name => (
                <div key={name} style={{ background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, color: '#374151' }}>{name}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '80px 0', background: '#fff', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 560 }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,38px)', fontWeight: 900, color: '#111', marginBottom: 14 }}>
              See the full pipeline on your data
            </h2>
            <p style={{ color: '#6b7280', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
              In a 30-minute demo we run a sample of your actual spend through the pipeline and show you the output live — real suppliers, real categories, real dashboards.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/book-demo" className="btn btn-primary btn-lg">
                Book a Demo <ArrowRight size={15}/>
              </Link>
              <Link to="/scoping" className="btn btn-lg" style={{ background: '#f5f5f5', color: '#374151', border: '1.5px solid #e5e7eb', fontWeight: 700 }}>
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

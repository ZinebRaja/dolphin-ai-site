import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle, RefreshCw, Tag, Database, Sparkles, BarChart3 } from 'lucide-react';

// ── Fake messy ERP export ──
const MESSY = [
  { supplier: 'Microsoft Corp',          category: '',              amount: '$247,832', entity: 'HQ',           issue: 'nocat' },
  { supplier: 'MICROSOFT',               category: 'Software',      amount: '$183,200', entity: 'Finance',      issue: 'dup' },
  { supplier: 'Microsoft Corporation',   category: 'IT',            amount: '$91,500',  entity: 'IT Dept',      issue: 'dup' },
  { supplier: 'Micro Soft Inc.',         category: '',              amount: '$34,100',  entity: 'Legal',        issue: 'dup' },
  { supplier: 'Unknown Vendor #44',      category: '',              amount: '$45,000',  entity: '???',          issue: 'unknown' },
  { supplier: 'Staples',                 category: 'Office Supp.',  amount: '$8,200',   entity: 'HR',           issue: '' },
  { supplier: 'STAPLES INC',             category: '',              amount: '$3,100',   entity: 'Finance',      issue: 'dup' },
  { supplier: 'fedex',                   category: 'logistics',     amount: '$12,400',  entity: 'Ops',          issue: 'fmt' },
  { supplier: 'Federal Express Corp',    category: '',              amount: '$9,800',   entity: 'Supply Chain', issue: 'dup' },
  { supplier: 'FedEx Ground',            category: 'Delivery',      amount: '$4,300',   entity: 'Warehouse',    issue: 'dup' },
];

// ── What the same data looks like after ──
const CLEAN = [
  { supplier: 'Microsoft Corporation', category: 'IT — Software & Licences', amount: '$556,632', merged: 4, status: 'ok' },
  { supplier: 'FedEx',                 category: 'Logistics & Transportation', amount: '$26,500', merged: 3, status: 'ok' },
  { supplier: 'Staples Inc.',          category: 'Office Supplies',           amount: '$11,300', merged: 2, status: 'ok' },
  { supplier: 'Unresolved Vendor #44', category: '— Review required',         amount: '$45,000', merged: 1, status: 'review' },
];

const ISSUE_STYLE = {
  dup:     { bg: '#fef3c7', border: '#f59e0b', dot: '#f59e0b', label: 'Duplicate supplier' },
  nocat:   { bg: '#fce7f3', border: '#ec4899', dot: '#ec4899', label: 'Missing category' },
  unknown: { bg: '#fee2e2', border: '#ef4444', dot: '#ef4444', label: 'Unknown vendor' },
  fmt:     { bg: '#e0f2fe', border: '#0ea5e9', dot: '#0ea5e9', label: 'Formatting error' },
};

const PIPELINE = [
  { icon: <Database size={20}/>,     title: 'Ingest',      desc: 'Connect any source — SAP, Oracle, Excel, Coupa. We parse and unify into one dataset.' },
  { icon: <RefreshCw size={20}/>,    title: 'Deduplicate', desc: 'NLP entity-matching groups "Microsoft Corp", "MSFT", "Microsoft Corporation" into one record.' },
  { icon: <Tag size={20}/>,          title: 'Classify',    desc: 'Every row mapped to your taxonomy (UNSPSC, custom, or hybrid) down to L4.' },
  { icon: <Sparkles size={20}/>,     title: 'Enrich',      desc: 'Blank fields filled: country, risk tier, contract status, cost centre, currency normalised.' },
  { icon: <CheckCircle2 size={20}/>, title: 'Validate',    desc: 'Low-confidence rows go to a human review queue. Nothing is silently accepted.' },
  { icon: <BarChart3 size={20}/>,    title: 'Publish',     desc: 'Clean data lands in live dashboards. Refreshes automatically with each new data extract.' },
];

const USECASES = [
  {
    before: '"How much do we actually spend with Accenture?"',
    after:  '$2.3M — across 7 business units, consolidated from 19 different supplier records. Meeting prep went from 3 days to 15 minutes.',
    label:  'Negotiation leverage',
    color:  '#E06820',
    bg:     '#fff3eb',
  },
  {
    before: '"Why does our spend report take 3 weeks every month?"',
    after:  'Because it\'s built manually from 6 Excel files. Now it generates in 30 seconds, automatically, every morning.',
    label:  'Finance reporting',
    color:  '#0369a1',
    bg:     '#e0f2fe',
  },
  {
    before: '"We have 1,847 active suppliers. That feels like too many."',
    after:  'After deduplication: 403 unique suppliers. 312 of the others are name variants of vendors you already have contracts with.',
    label:  'Tail spend & consolidation',
    color:  '#7c3aed',
    bg:     '#f5f3ff',
  },
];

function MessyTable() {
  return (
    <div style={{ overflowX: 'auto', fontFamily: 'monospace', fontSize: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: 560 }}>
        <colgroup>
          <col style={{ width: 28 }}/>
          <col style={{ width: '30%' }}/>
          <col style={{ width: '22%' }}/>
          <col style={{ width: '16%' }}/>
          <col style={{ width: '16%' }}/>
          <col style={{ width: 16 }}/>
        </colgroup>
        <thead>
          <tr style={{ background: '#d1d5db', fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {['#','Supplier Name','Category','Amount','Entity',''].map(h => (
              <th key={h} style={{ padding: '6px 8px', textAlign: h === 'Amount' ? 'right' : 'left', color: '#374151', border: '1px solid #9ca3af', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MESSY.map((r, i) => {
            const s = ISSUE_STYLE[r.issue];
            const bg = s ? s.bg : (i % 2 === 0 ? '#fff' : '#f9fafb');
            return (
              <tr key={i} style={{ background: bg, borderLeft: s ? `3px solid ${s.border}` : '3px solid transparent' }}>
                <td style={{ padding: '5px 8px', color: '#9ca3af', border: '1px solid #e5e7eb', borderLeft: 'none' }}>{i + 1}</td>
                <td style={{ padding: '5px 8px', color: '#111', border: '1px solid #e5e7eb' }}>{r.supplier}</td>
                <td style={{ padding: '5px 8px', border: '1px solid #e5e7eb', color: r.category ? '#374151' : '#d1d5db', fontStyle: r.category ? 'normal' : 'italic' }}>{r.category || '(empty)'}</td>
                <td style={{ padding: '5px 8px', textAlign: 'right', border: '1px solid #e5e7eb', color: '#374151' }}>{r.amount}</td>
                <td style={{ padding: '5px 8px', border: '1px solid #e5e7eb', color: r.entity === '???' ? '#ef4444' : '#374151' }}>{r.entity}</td>
                <td style={{ border: '1px solid #e5e7eb', padding: '0 4px', textAlign: 'center' }}>
                  {s && <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, display: 'inline-block' }}/>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12, paddingLeft: 4 }}>
        {Object.values(ISSUE_STYLE).map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.bg, border: `1.5px solid ${s.border}`, flexShrink: 0, display: 'inline-block' }}/>
            <span style={{ fontSize: 11, color: '#6b7280' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CleanTable() {
  return (
    <div style={{ overflowX: 'auto', fontFamily: 'monospace', fontSize: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
        <thead>
          <tr style={{ background: '#d1fae5', fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {['Supplier (canonical)','Category L1 — L2','Total spend','Records merged'].map(h => (
              <th key={h} style={{ padding: '6px 10px', textAlign: h === 'Total spend' || h === 'Records merged' ? 'center' : 'left', color: '#065f46', border: '1px solid #a7f3d0', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CLEAN.map((r, i) => (
            <tr key={i} style={{ background: r.status === 'review' ? '#fef3c7' : (i % 2 === 0 ? '#f0fdf4' : '#fff'), borderLeft: r.status === 'review' ? '3px solid #f59e0b' : '3px solid #10b981' }}>
              <td style={{ padding: '7px 10px', border: '1px solid #d1fae5', color: '#111', fontWeight: r.status === 'ok' ? 600 : 400 }}>
                {r.status === 'ok'
                  ? <CheckCircle2 size={11} style={{ color: '#10b981', marginRight: 5, display: 'inline', verticalAlign: 'middle' }}/>
                  : <AlertCircle size={11} style={{ color: '#f59e0b', marginRight: 5, display: 'inline', verticalAlign: 'middle' }}/>}
                {r.supplier}
              </td>
              <td style={{ padding: '7px 10px', border: '1px solid #d1fae5', color: r.status === 'review' ? '#92400e' : '#374151' }}>{r.category}</td>
              <td style={{ padding: '7px 10px', textAlign: 'center', border: '1px solid #d1fae5', fontWeight: 700, color: '#111' }}>{r.amount}</td>
              <td style={{ padding: '7px 10px', textAlign: 'center', border: '1px solid #d1fae5' }}>
                {r.merged > 1
                  ? <span style={{ background: '#dcfce7', color: '#15803d', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{r.merged} → 1</span>
                  : <span style={{ color: '#9ca3af' }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SolutionPage() {
  return (
    <div className="site">
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #111111 0%, #1E1E1E 45%, #C05818 80%, #E06820 100%)', padding: '96px 0 72px', color: '#fff' }}>
          <div className="container" style={{ maxWidth: 820 }}>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fcd9bc', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 20, display: 'inline-block', marginBottom: 28 }}>
              What we do
            </span>
            <h1 style={{ fontSize: 'clamp(30px,5.5vw,58px)', fontWeight: 900, lineHeight: 1.07, marginBottom: 22, maxWidth: 700 }}>
              Your ERP contains the answers.<br/>
              <span style={{ color: '#fbbf24' }}>The data is just too messy to read them.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 17, maxWidth: 520, lineHeight: 1.75, marginBottom: 40 }}>
              Dolphin AI takes your raw spend export — duplicates, blank fields, inconsistent names and all — runs it through an AI pipeline, and returns clean classified data in live dashboards. In 14 to 30 days.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/book-demo" className="btn btn-primary btn-lg" style={{ background: '#fff', color: '#E06820', border: 'none', fontWeight: 800 }}>
                Book a Demo <ArrowRight size={15}/>
              </Link>
              <Link to="/scoping" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)', fontWeight: 700 }}>
                Get an estimate <ArrowRight size={15}/>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Messy data ── */}
        <section style={{ padding: '72px 0 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: 880 }}>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ef4444', background: '#fee2e2', padding: '4px 12px', borderRadius: 20 }}>Your data today</span>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, marginTop: 14, marginBottom: 8, color: '#111' }}>
                You have 10 rows. Four of them are Microsoft.
              </h2>
              <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 540, lineHeight: 1.7 }}>
                This is a real slice of what customers send us on Day 1. Duplicates, empty categories, inconsistent names, unknown vendors — spread across thousands of rows.
              </p>
            </div>

            <div style={{ border: '1.5px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}/>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}/>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}/>
                <span style={{ marginLeft: 10, fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>spend_export_Q4_FINAL_v3_REVISED.xlsx</span>
              </div>
              <div style={{ padding: 16 }}>
                <MessyTable />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginTop: 20 }}>
              {[
                { n: '4×', label: '"Microsoft" — same vendor, 4 names, no one knows the real total' },
                { n: '40%', label: 'of category cells are blank or non-standard in a typical ERP export' },
                { n: '1,847', label: '"suppliers" in a typical ERP that resolve to ~400 unique vendors after cleaning' },
              ].map(s => (
                <div key={s.n} style={{ background: '#fafafa', border: '1.5px solid #f0f0f0', borderRadius: 12, padding: '18px 16px' }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: '#ef4444', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6, lineHeight: 1.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pipeline ── */}
        <section style={{ background: '#111', padding: '72px 0', marginTop: 60 }}>
          <div className="container" style={{ maxWidth: 940 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E06820', background: 'rgba(224,104,32,0.15)', padding: '5px 14px', borderRadius: 20, display: 'inline-block' }}>The Dolphin AI pipeline</span>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, color: '#fff', marginTop: 14, marginBottom: 8 }}>What happens between messy and clean</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, maxWidth: 420, margin: '0 auto' }}>Six automated stages. Every stage logged. Every decision auditable.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
              {PIPELINE.map((step, i) => (
                <div key={step.title} style={{ position: 'relative' }}>
                  <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 14, padding: '22px 18px', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(224,104,32,0.15)', color: '#E06820', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.icon}</div>
                      <div>
                        <div style={{ fontSize: 10, color: '#555', fontWeight: 700, letterSpacing: '0.08em' }}>STEP {i + 1}</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{step.title}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                  </div>
                  {i < PIPELINE.length - 1 && (i + 1) % 3 !== 0 && (
                    <div style={{ position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', zIndex: 10, color: '#E06820', fontSize: 18, fontWeight: 900, lineHeight: 1 }}>›</div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
              {['Raw export', 'Unified dataset', 'Deduped suppliers', 'Classified to L4', 'Enriched fields', 'Validated', 'Live dashboard'].map((label, i, arr) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: i === 0 ? '#ef4444' : i === arr.length - 1 ? '#10b981' : 'rgba(255,255,255,0.5)', fontWeight: i === 0 || i === arr.length - 1 ? 700 : 400 }}>{label}</span>
                  {i < arr.length - 1 && <span style={{ color: '#E06820', fontWeight: 900, fontSize: 14 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Clean data ── */}
        <section style={{ padding: '72px 0', background: '#f0fdf4' }}>
          <div className="container" style={{ maxWidth: 880 }}>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#15803d', background: '#dcfce7', padding: '4px 12px', borderRadius: 20 }}>30 days later</span>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, marginTop: 14, marginBottom: 8, color: '#111' }}>
                Same data. Zero noise.
              </h2>
              <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 500, lineHeight: 1.7 }}>
                10 rows became 4 clean records. Microsoft is now one supplier with one real total. The unresolved vendor goes to a review queue — it doesn't get silently accepted.
              </p>
            </div>

            <div style={{ border: '1.5px solid #a7f3d0', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(16,185,129,0.08)' }}>
              <div style={{ background: '#dcfce7', borderBottom: '1px solid #a7f3d0', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={13} style={{ color: '#15803d' }}/>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#15803d', fontFamily: 'monospace' }}>Dolphin AI — Spend master · 4 records · 97% classified · last updated 09:04</span>
              </div>
              <div style={{ padding: 16, background: '#fff' }}>
                <CleanTable />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginTop: 20 }}>
              {[
                { n: '10 → 4', label: 'Supplier records after deduplication', color: '#15803d', bg: '#dcfce7' },
                { n: '$556K', label: 'Real Microsoft total — was split across 4 phantom records', color: '#0369a1', bg: '#dbeafe' },
                { n: '97%', label: 'Category coverage — up from 60% on the raw export', color: '#7c3aed', bg: '#ede9fe' },
              ].map(s => (
                <div key={s.n} style={{ background: s.bg, borderRadius: 12, padding: '18px 16px' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: '#374151', marginTop: 6, lineHeight: 1.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Real questions, now answered ── */}
        <section style={{ padding: '72px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: 880 }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E06820', background: '#fff3eb', padding: '4px 12px', borderRadius: 20 }}>Why it matters</span>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 900, marginTop: 14, marginBottom: 0, color: '#111' }}>
                Questions that were unanswerable. Now answered.
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {USECASES.map((u, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1.5px solid #e5e7eb', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ padding: '26px', background: '#fafafa', borderRight: '1.5px solid #e5e7eb' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#ef4444', marginBottom: 10 }}>Before</div>
                    <p style={{ fontSize: 14.5, color: '#374151', fontStyle: 'italic', lineHeight: 1.65, margin: 0 }}>{u.before}</p>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <HelpCircle size={12} style={{ color: '#d1d5db' }}/>
                      <span style={{ fontSize: 11, color: '#9ca3af' }}>No reliable answer available</span>
                    </div>
                  </div>
                  <div style={{ padding: '26px', background: u.bg }}>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: u.color, marginBottom: 10 }}>After — {u.label}</div>
                    <p style={{ fontSize: 14.5, color: '#1f2937', lineHeight: 1.65, margin: 0 }}>{u.after}</p>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle2 size={12} style={{ color: u.color }}/>
                      <span style={{ fontSize: 11, color: u.color, fontWeight: 700 }}>Live in dashboard</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section style={{ background: '#1A1A1A', padding: '60px 0' }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 900, color: '#fff', marginBottom: 8 }}>What 30 days looks like</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>No IT project. No year-long implementation. This is the real timeline.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 28, left: '10%', right: '10%', height: 2, background: 'linear-gradient(90deg, #E06820, #fbbf24)', zIndex: 0 }}/>
              {[
                { day: 'Day 1–3',   title: 'Data received',    sub: 'Any format, any source' },
                { day: 'Day 3–7',   title: 'Pipeline runs',    sub: 'AI processes all rows' },
                { day: 'Day 7–14',  title: 'Review queue',     sub: 'Humans validate edge cases' },
                { day: 'Day 14–21', title: 'Dashboards built', sub: 'Taxonomy confirmed with you' },
                { day: 'Day 21–30', title: 'You go live',      sub: 'First live report ready' },
              ].map((s, i) => (
                <div key={s.day} style={{ textAlign: 'center', padding: '0 6px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#E06820', color: '#fff', fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', border: '3px solid #1A1A1A' }}>{i + 1}</div>
                  <div style={{ fontSize: 10, color: '#E06820', fontWeight: 700, marginBottom: 3 }}>{s.day}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', lineHeight: 1.4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '80px 0', background: '#fff', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 580 }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,38px)', fontWeight: 900, color: '#111', marginBottom: 12 }}>
              Bring your messiest export.<br/>We'll show you what's inside.
            </h2>
            <p style={{ color: '#6b7280', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
              In a 30-minute demo we run a sample of your actual data through the pipeline and show you the output — real suppliers, real categories, real numbers. No generic screenshots.
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

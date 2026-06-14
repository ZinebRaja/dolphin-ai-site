import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, RefreshCw, ArrowRight } from 'lucide-react';

const PROFILES = [
  {
    id: 'manufacturing',
    label: 'Global Manufacturing Co.',
    meta: '2022 — 2026 · 100,000 transactions · $7.49B total spend',
    kpis: [
      { label: 'TOTAL SPEND',      value: '$7.49B',  delta: '+29.7%', up: true  },
      { label: 'SUPPLIERS',        value: '39',       delta: '+39 new', up: true  },
      { label: 'TRANSACTIONS',     value: '100,000',  delta: '+29.6%', up: true  },
      { label: 'PURCHASE ORDERS',  value: '60,170',   delta: '+16.6%', up: true  },
      { label: 'INVOICES',         value: '94,633',   delta: '+28.0%', up: true  },
      { label: 'CLASSIFIED',       value: '75.9%',    delta: 'Avg conf. 71.7%', up: true },
    ],
    trend: [
      { month: 'Jan', v2022:138,v2023:142,v2024:145,v2025:148,v2026:152 },
      { month: 'Feb', v2022:140,v2023:145,v2024:143,v2025:150,v2026:155 },
      { month: 'Mar', v2022:155,v2023:152,v2024:158,v2025:162,v2026:160 },
      { month: 'Apr', v2022:148,v2023:150,v2024:155,v2025:158,v2026:163 },
      { month: 'May', v2022:150,v2023:148,v2024:152,v2025:156,v2026:165 },
      { month: 'Jun', v2022:145,v2023:149,v2024:150,v2025:153,v2026:158 },
      { month: 'Jul', v2022:142,v2023:146,v2024:148,v2025:152,v2026:156 },
      { month: 'Aug', v2022:148,v2023:150,v2024:152,v2025:155,v2026:160 },
      { month: 'Sep', v2022:155,v2023:158,v2024:160,v2025:163,v2026:168 },
      { month: 'Oct', v2022:152,v2023:155,v2024:158,v2025:162,v2026:170 },
      { month: 'Nov', v2022:148,v2023:152,v2024:155,v2025:160,v2026:165 },
      { month: 'Dec', v2022:145,v2023:148,v2024:152,v2025:158,v2026:162 },
    ],
    categories: [
      { name: 'Unclassified',              value: 24.35, color: '#94a3b8' },
      { name: 'Logistics & Transport',     value: 12.43, color: '#f59e0b' },
      { name: 'Indirect Materials',        value: 11.10, color: '#3b82f6' },
      { name: 'Components & Parts',        value: 8.34,  color: '#8b5cf6' },
      { name: 'Travel & Expenses',         value: 8.29,  color: '#10b981' },
      { name: 'Direct Materials',          value: 8.24,  color: '#A56D58' },
      { name: 'Information Technology',    value: 8.14,  color: '#1B2A4A' },
      { name: 'Professional Services',     value: 6.91,  color: '#ec4899' },
      { name: 'Other',                     value: 12.20, color: '#e2e8f0' },
    ],
    suppliers: [
      { rank:1, name:'Unknown',               spend:'$366.2M' },
      { rank:2, name:'FastBolt Supply Ltd',   spend:'$204.8M' },
      { rank:3, name:'ProBuild Contractors',  spend:'$204.7M' },
      { rank:4, name:'GreenPack Industries',  spend:'$204.4M' },
      { rank:5, name:'Eastern Plastics Inc',  spend:'$203.0M' },
      { rank:6, name:'LegalEdge Partners',    spend:'$202.9M' },
      { rank:7, name:'TechVision Software',   spend:'$202.8M' },
      { rank:8, name:'Global Aluminum Inc',   spend:'$202.7M' },
      { rank:9, name:'Precision Parts Co',    spend:'$201.1M' },
      { rank:10,name:'United Packaging Corp', spend:'$201.0M' },
    ],
    insights: [
      { icon: '📊', text: '75.9% classified — strongest rate to date. Rule engine resolving 46% at high confidence.' },
      { icon: '⚠️', text: 'Unclassified remains largest category at 24% of total spend ($1.83B).' },
      { icon: '🚚', text: 'Logistics spend grew 29% vs prior year — review consolidation with top 3 carriers.' },
      { icon: '🔴', text: '24.1% unclassified — primarily missing PO descriptions. 24,052 rows need attention.' },
      { icon: '👥', text: 'Top 5 suppliers account for 16% of total spend. Concentration risk worth monitoring.' },
    ],
  },
  {
    id: 'retail',
    label: 'National Retail Group',
    meta: '2023 — 2026 · 54,000 transactions · $1.2B total spend',
    kpis: [
      { label: 'TOTAL SPEND',      value: '$1.2B',   delta: '+14.2%', up: true  },
      { label: 'SUPPLIERS',        value: '212',      delta: '+18 new', up: true  },
      { label: 'TRANSACTIONS',     value: '54,000',   delta: '+11.3%', up: true  },
      { label: 'PURCHASE ORDERS',  value: '31,200',   delta: '+9.4%',  up: true  },
      { label: 'INVOICES',         value: '48,900',   delta: '+12.1%', up: true  },
      { label: 'CLASSIFIED',       value: '88.4%',    delta: 'Avg conf. 84.2%', up: true },
    ],
    trend: [
      { month: 'Jan', v2023:88, v2024:92, v2025:96, v2026:102 },
      { month: 'Feb', v2023:90, v2024:95, v2025:98, v2026:105 },
      { month: 'Mar', v2023:105,v2024:108,v2025:112,v2026:118 },
      { month: 'Apr', v2023:98, v2024:102,v2025:106,v2026:111 },
      { month: 'May', v2023:95, v2024:99, v2025:103,v2026:109 },
      { month: 'Jun', v2023:92, v2024:96, v2025:100,v2026:106 },
      { month: 'Jul', v2023:90, v2024:94, v2025:98, v2026:103 },
      { month: 'Aug', v2023:96, v2024:100,v2025:104,v2026:110 },
      { month: 'Sep', v2023:102,v2024:106,v2025:110,v2026:116 },
      { month: 'Oct', v2023:108,v2024:112,v2025:116,v2026:122 },
      { month: 'Nov', v2023:118,v2024:122,v2025:126,v2026:133 },
      { month: 'Dec', v2023:125,v2024:130,v2025:135,v2026:142 },
    ],
    categories: [
      { name: 'Merchandise & Goods',   value: 38.5, color: '#A56D58' },
      { name: 'Logistics & Transport', value: 18.2, color: '#f59e0b' },
      { name: 'Facilities',            value: 12.4, color: '#3b82f6' },
      { name: 'Marketing',             value: 10.1, color: '#ec4899' },
      { name: 'IT & Software',         value: 8.8,  color: '#1B2A4A' },
      { name: 'Professional Services', value: 6.5,  color: '#8b5cf6' },
      { name: 'Unclassified',          value: 5.5,  color: '#94a3b8' },
    ],
    suppliers: [
      { rank:1, name:'CoreMerch Distribution',  spend:'$98.4M'  },
      { rank:2, name:'FastShip Logistics',       spend:'$72.1M'  },
      { rank:3, name:'BrandSource Co.',          spend:'$65.8M'  },
      { rank:4, name:'PackRight Solutions',      spend:'$48.2M'  },
      { rank:5, name:'Vertex IT Systems',        spend:'$44.9M'  },
      { rank:6, name:'CleanSpace Facilities',    spend:'$38.3M'  },
      { rank:7, name:'MediaEdge Agency',         spend:'$35.7M'  },
      { rank:8, name:'SwiftCourier Inc',         spend:'$31.2M'  },
      { rank:9, name:'NovaTech Software',        spend:'$29.8M'  },
      { rank:10,name:'ProStore Fixtures',        spend:'$27.4M'  },
    ],
    insights: [
      { icon: '✅', text: '88.4% classified — above industry benchmark. Only 5.5% unclassified spend remaining.' },
      { icon: '📦', text: 'Merchandise & Goods at 38.5% — top 3 suppliers cover 62% of this category.' },
      { icon: '🚚', text: 'Logistics costs up 18% YoY — consolidation opportunity estimated at $4.2M savings.' },
      { icon: '💡', text: 'IT & Software fragmented across 34 suppliers. Consolidation could save 15-20%.' },
      { icon: '📈', text: 'Q4 spend spike consistent across all years — plan procurement cycles accordingly.' },
    ],
  },
  {
    id: 'logistics',
    label: 'Global Logistics Corp',
    meta: '2022 — 2026 · 78,000 transactions · $3.1B total spend',
    kpis: [
      { label: 'TOTAL SPEND',      value: '$3.1B',   delta: '+21.4%', up: true  },
      { label: 'SUPPLIERS',        value: '156',      delta: '+22 new', up: true  },
      { label: 'TRANSACTIONS',     value: '78,000',   delta: '+18.8%', up: true  },
      { label: 'PURCHASE ORDERS',  value: '44,820',   delta: '+13.2%', up: true  },
      { label: 'INVOICES',         value: '69,400',   delta: '+20.5%', up: true  },
      { label: 'CLASSIFIED',       value: '82.1%',    delta: 'Avg conf. 78.9%', up: true },
    ],
    trend: [
      { month: 'Jan', v2022:210,v2023:218,v2024:226,v2025:238,v2026:252 },
      { month: 'Feb', v2022:205,v2023:214,v2024:222,v2025:234,v2026:248 },
      { month: 'Mar', v2022:225,v2023:232,v2024:240,v2025:252,v2026:268 },
      { month: 'Apr', v2022:218,v2023:226,v2024:234,v2025:246,v2026:260 },
      { month: 'May', v2022:222,v2023:230,v2024:238,v2025:250,v2026:264 },
      { month: 'Jun', v2022:215,v2023:224,v2024:232,v2025:244,v2026:258 },
      { month: 'Jul', v2022:208,v2023:216,v2024:224,v2025:236,v2026:250 },
      { month: 'Aug', v2022:218,v2023:226,v2024:234,v2025:246,v2026:260 },
      { month: 'Sep', v2022:228,v2023:236,v2024:244,v2025:256,v2026:272 },
      { month: 'Oct', v2022:235,v2023:244,v2024:252,v2025:264,v2026:280 },
      { month: 'Nov', v2022:228,v2023:237,v2024:245,v2025:257,v2026:272 },
      { month: 'Dec', v2022:220,v2023:228,v2024:236,v2025:248,v2026:263 },
    ],
    categories: [
      { name: 'Fuel & Energy',          value: 32.1, color: '#f59e0b' },
      { name: 'Fleet & Maintenance',    value: 22.4, color: '#1B2A4A' },
      { name: 'Warehousing',            value: 14.8, color: '#3b82f6' },
      { name: 'IT & Tracking Systems',  value: 10.2, color: '#8b5cf6' },
      { name: 'Labor & Contractors',    value: 9.6,  color: '#A56D58' },
      { name: 'Insurance & Compliance', value: 6.4,  color: '#10b981' },
      { name: 'Unclassified',           value: 4.5,  color: '#94a3b8' },
    ],
    suppliers: [
      { rank:1, name:'PetroLink Fuels',         spend:'$312.4M' },
      { rank:2, name:'FleetMaster Services',    spend:'$228.6M' },
      { rank:3, name:'WarehouseOne Corp',        spend:'$195.3M' },
      { rank:4, name:'TruckCare Maintenance',   spend:'$168.9M' },
      { rank:5, name:'TrackSoft Systems',        spend:'$142.7M' },
      { rank:6, name:'SafeFreight Insurance',   spend:'$118.4M' },
      { rank:7, name:'ContractHaul LLC',         spend:'$98.2M'  },
      { rank:8, name:'ColdChain Solutions',      spend:'$87.6M'  },
      { rank:9, name:'DocuRoute Compliance',    spend:'$72.1M'  },
      { rank:10,name:'PackSeal Industries',     spend:'$68.4M'  },
    ],
    insights: [
      { icon: '⛽', text: 'Fuel & Energy at 32.1% of total spend — hedging strategy could reduce exposure by $40M.' },
      { icon: '🚛', text: 'Fleet maintenance costs up 24% — preventive maintenance program ROI estimated at 3.2×.' },
      { icon: '✅', text: '82.1% classified — unclassified spend concentrated in ad-hoc contractor invoices.' },
      { icon: '📦', text: 'Warehousing fragmented across 18 providers. Consolidation to 5 would yield $12M savings.' },
      { icon: '🔍', text: 'Top 3 suppliers represent 29% of spend — dual-source strategy recommended for resilience.' },
    ],
  },
];

const TREND_COLORS = ['#94a3b8','#3b82f6','#10b981','#f59e0b','#A56D58'];

export default function DashboardPage() {
  const [activeId, setActiveId] = useState('manufacturing');
  const p = PROFILES.find(x => x.id === activeId);
  const trendKeys = Object.keys(p.trend[0]).filter(k => k !== 'month');

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
            <Link to="/#contact">Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/book-demo" className="btn btn-primary">Book a Demo</Link>
          </div>
        </div>
      </header>

      <main style={{ background: '#f0f4f8', minHeight: '100vh', padding: '2rem 0 4rem' }}>
        <div className="container">

          {/* Page header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="eyebrow">Sample Outputs</span>
            <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', margin: '0.4rem 0 0.5rem', color: 'var(--navy)' }}>
              What your spend dashboard looks like
            </h1>
            <p style={{ color: 'var(--gray-600)', fontSize: '14.5px', margin: 0 }}>
              Switch between sample company profiles to see how Dolphin AI transforms raw ERP data into actionable intelligence.
            </p>
          </div>

          {/* Profile switcher */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {PROFILES.map(pr => (
              <button key={pr.id}
                onClick={() => setActiveId(pr.id)}
                style={{
                  padding: '8px 18px', borderRadius: '999px', border: '1.5px solid',
                  borderColor: activeId === pr.id ? 'var(--copper)' : 'var(--gray-200)',
                  background: activeId === pr.id ? 'var(--copper)' : '#fff',
                  color: activeId === pr.id ? '#fff' : 'var(--navy)',
                  fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{pr.label}</button>
            ))}
          </div>

          {/* Dashboard card */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>

            {/* Header bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)' }}>Spend Overview</h2>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', letterSpacing: '0.05em' }}>SAMPLE</span>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--gray-400)' }}>{p.meta}</p>
              </div>
              <img src="/logowebsite.png" alt="Dolphin AI" style={{ height: '32px', objectFit: 'contain' }} />
            </div>

            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px', marginBottom: '1.25rem' }}>
              {p.kpis.map(k => (
                <div key={k.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--gray-400)' }}>{k.label}</p>
                  <p style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>{k.value}</p>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: k.up ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {k.delta}
                  </span>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '1.25rem' }}>

              {/* Spend Trend */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Spend Trend</p>
                  <span style={{ fontSize: '10px', color: 'var(--gray-400)', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>
                    {trendKeys[0].replace('v','').replace(/(\d{4})/,'$1')} — {trendKeys[trendKeys.length-1].replace('v','')}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={p.trend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                    {trendKeys.map((k, i) => (
                      <Area key={k} type="monotone" dataKey={k} stroke={TREND_COLORS[i]} fill={TREND_COLORS[i]} fillOpacity={0.06} strokeWidth={1.5} dot={false} />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Donut chart */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Spend by Category</p>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={p.categories} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={2} dataKey="value">
                      {p.categories.map((c, i) => <Cell key={i} fill={c.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                  {p.categories.slice(0,5).map(c => (
                    <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--gray-600)' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                      <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{c.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top suppliers */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Top Suppliers by Spend</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {p.suppliers.map(s => (
                    <div key={s.rank} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                      <span style={{ width: 16, textAlign: 'right', color: 'var(--gray-400)', fontWeight: 600, flexShrink: 0 }}>{s.rank}</span>
                      <span style={{ flex: 1, color: 'var(--navy)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                      <span style={{ color: 'var(--copper)', fontWeight: 700, flexShrink: 0 }}>{s.spend}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
              <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Key Insights</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '10px' }}>
                {p.insights.map((ins, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px' }}>
                    <span style={{ fontSize: '16px', lineHeight: 1.4, flexShrink: 0 }}>{ins.icon}</span>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--gray-600)', lineHeight: 1.5 }}>{ins.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* CTA */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--gray-600)', fontSize: '14.5px', marginBottom: '1rem' }}>
              Ready to see this with your own data?
            </p>
            <Link to="/book-demo" className="btn btn-primary btn-lg">
              Book a Demo <ArrowRight size={16} />
            </Link>
          </div>

        </div>
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

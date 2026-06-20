import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { ArrowRight, ArrowLeft, CheckCircle2, Clock, TrendingUp, Database, Layers3, BarChart3, Users, FileText, Zap, Calendar } from 'lucide-react';

const STEPS = ['Data Profile', 'Data Quality', 'Your Goals', 'Your Estimate'];

const SPEND_OPTIONS = [
  { label: 'Under $50M',      value: 40,   key: 'a' },
  { label: '$50M – $200M',    value: 125,  key: 'b' },
  { label: '$200M – $500M',   value: 350,  key: 'c' },
  { label: '$500M – $1B',     value: 750,  key: 'd' },
  { label: 'Over $1B',        value: 1500, key: 'e' },
];

const SOURCE_OPTIONS = [
  { label: '1 system',    value: 1,  desc: 'Single ERP or source file' },
  { label: '2 – 3',       value: 2,  desc: 'e.g. SAP + Excel exports' },
  { label: '4 – 6',       value: 5,  desc: 'Multi-ERP environment' },
  { label: '7 or more',   value: 8,  desc: 'Complex data landscape' },
];

const VOLUME_OPTIONS = [
  { label: 'Under 10K',     value: 8,   key: 'a' },
  { label: '10K – 50K',     value: 30,  key: 'b' },
  { label: '50K – 200K',    value: 125, key: 'c' },
  { label: 'Over 200K',     value: 350, key: 'd' },
];

const SUPPLIER_OPTIONS = [
  { label: 'Under 500',       value: 300,   key: 'a' },
  { label: '500 – 2,000',     value: 1250,  key: 'b' },
  { label: '2,000 – 10,000',  value: 6000,  key: 'c' },
  { label: 'Over 10,000',     value: 15000, key: 'd' },
];

const QUALITY_OPTIONS = [
  { key: 'very_messy',    label: 'Very messy',    desc: 'Duplicates everywhere, inconsistent naming, lots of blanks', color: '#dc2626', bg: '#fef2f2' },
  { key: 'mostly_messy',  label: 'Mostly messy',  desc: 'Significant issues across most records',                    color: '#ea580c', bg: '#fff7ed' },
  { key: 'mixed',         label: 'Mixed',          desc: 'Some clean areas, some problematic — typical ERP output',   color: '#ca8a04', bg: '#fefce8' },
  { key: 'mostly_clean',  label: 'Mostly clean',  desc: 'Minor issues only, generally well structured',              color: '#16a34a', bg: '#f0fdf4' },
];

const TAXONOMY_OPTIONS = [
  { key: 'none',       label: 'No taxonomy',         desc: 'Categories are freeform or non-existent' },
  { key: 'partial',    label: 'Partial',              desc: 'Some categories exist but very incomplete' },
  { key: 'exists',     label: 'Exists but messy',     desc: 'Taxonomy in place but not followed consistently' },
  { key: 'structured', label: 'Structured & defined', desc: 'Clear taxonomy, mostly applied to data' },
];

const PRIORITY_OPTIONS = [
  { key: 'visibility',  label: 'Spend visibility',       icon: <BarChart3 size={18}/>,  desc: 'See where every dollar goes across categories' },
  { key: 'savings',     label: 'Savings identification',  icon: <TrendingUp size={18}/>, desc: 'Surface cost reduction and consolidation opportunities' },
  { key: 'suppliers',   label: 'Supplier normalization',  icon: <Users size={18}/>,      desc: 'One clean, trusted view of every vendor' },
  { key: 'compliance',  label: 'Contract compliance',     icon: <FileText size={18}/>,   desc: 'Track on-contract vs off-contract spend automatically' },
  { key: 'reporting',   label: 'Executive reporting',     icon: <Layers3 size={18}/>,    desc: 'Board-ready dashboards delivered automatically' },
];

function calcEstimate({ spend, sources, volume, suppliers, quality, taxonomy, priorities }) {
  let minDays = 3, maxDays = 5;
  if (sources >= 2)  { minDays += 2; maxDays += 3; }
  if (sources >= 5)  { minDays += 3; maxDays += 4; }
  if (sources >= 8)  { minDays += 4; maxDays += 6; }
  if (quality === 'very_messy')   { minDays += 5; maxDays += 8; }
  else if (quality === 'mostly_messy') { minDays += 3; maxDays += 5; }
  else if (quality === 'mixed')        { minDays += 1; maxDays += 3; }
  if (volume > 200) { minDays += 3; maxDays += 5; }
  else if (volume > 50) { minDays += 1; maxDays += 2; }

  const cleanupRates = { very_messy: [45,65], mostly_messy: [25,45], mixed: [12,25], mostly_clean: [4,12] };
  const [cMin, cMax] = cleanupRates[quality] || [15,30];

  const dupRates = { very_messy: [0.30,0.45], mostly_messy: [0.18,0.30], mixed: [0.08,0.18], mostly_clean: [0.03,0.08] };
  const [dMin, dMax] = dupRates[quality] || [0.15,0.25];
  const dupMin = Math.round(suppliers * dMin);
  const dupMax = Math.round(suppliers * dMax);

  let rateMin, rateMax;
  if (spend < 100)       { rateMin = 0.03; rateMax = 0.06; }
  else if (spend < 300)  { rateMin = 0.04; rateMax = 0.08; }
  else if (spend < 700)  { rateMin = 0.05; rateMax = 0.10; }
  else                   { rateMin = 0.06; rateMax = 0.12; }

  const savMin = +(spend * rateMin).toFixed(1);
  const savMax = +(spend * rateMax).toFixed(1);

  const taxonomyBonus = { none: '+3–5 days for taxonomy design', partial: '+1–2 days for gap-filling', exists: 'Using your existing structure', structured: 'Mapped directly to your taxonomy' };

  return { minDays, maxDays, cMin, cMax, dupMin, dupMax, savMin, savMax, taxonomyNote: taxonomyBonus[taxonomy] || '' };
}

function OptionCard({ selected, onClick, children, color, bg }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: selected ? `2px solid ${color || '#E06820'}` : '2px solid #e5e7eb',
        background: selected ? (bg || '#fff8f4') : '#fff',
        borderRadius: 12,
        padding: '14px 18px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s',
        width: '100%',
      }}
    >
      {children}
    </button>
  );
}

function StepIndicator({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 48 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: i < current ? '#E06820' : i === current ? '#E06820' : '#e5e7eb',
              color: i <= current ? '#fff' : '#9ca3af',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13,
              transition: 'all 0.3s',
            }}>
              {i < current ? <CheckCircle2 size={16}/> : i + 1}
            </div>
            <span style={{ fontSize: 11, color: i === current ? '#E06820' : '#9ca3af', fontWeight: i === current ? 700 : 400, whiteSpace: 'nowrap' }}>{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ width: 60, height: 2, background: i < current ? '#E06820' : '#e5e7eb', marginBottom: 22, transition: 'all 0.3s' }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ScopingPage() {
  const [step, setStep] = useState(0);
  const [spend, setSpend]         = useState(null);
  const [sources, setSources]     = useState(null);
  const [volume, setVolume]       = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [quality, setQuality]     = useState(null);
  const [taxonomy, setTaxonomy]   = useState(null);
  const [priorities, setPriorities] = useState([]);

  const togglePriority = (key) => setPriorities(p => p.includes(key) ? p.filter(k => k !== key) : [...p, key]);

  const canNext0 = spend && sources && volume && suppliers;
  const canNext1 = quality && taxonomy;
  const canNext2 = priorities.length > 0;

  const estimate = step === 3 && spend && sources && volume && suppliers && quality && taxonomy
    ? calcEstimate({ spend: spend.value, sources: sources.value, volume: volume.value, suppliers: suppliers.value, quality, taxonomy, priorities })
    : null;

  const fmt = (n) => n >= 1000 ? `$${(n/1000).toFixed(1)}B` : `$${n}M`;

  return (
    <div className="site">
      <Navbar />
      <main>
        <section style={{ background: 'linear-gradient(135deg,#fdf6f0 0%,#fff 60%)', minHeight: '100vh', padding: '80px 0 60px' }}>
          <div className="container" style={{ maxWidth: 780 }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="eyebrow">Project Scoping Tool</span>
              <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', marginTop: 8, marginBottom: 12 }}>
                How long will <span style={{ color: '#E06820' }}>your project</span> take?
              </h1>
              <p style={{ color: '#6b7280', maxWidth: 520, margin: '0 auto', fontSize: 16 }}>
                Answer 3 quick questions about your data and we'll give you a realistic estimate — timeline, cleanup effort, and savings potential.
              </p>
            </div>

            <StepIndicator current={step} />

            {/* ── STEP 0: Data Profile ── */}
            {step === 0 && (
              <div>
                <h2 style={{ fontSize: 22, marginBottom: 32, color: '#1B2A4A' }}>Tell us about your data</h2>

                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontWeight: 700, color: '#374151', marginBottom: 12 }}>What is your annual procurement spend?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 10 }}>
                    {SPEND_OPTIONS.map(o => (
                      <OptionCard key={o.key} selected={spend?.key === o.key} onClick={() => setSpend(o)}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: spend?.key === o.key ? '#E06820' : '#1B2A4A' }}>{o.label}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontWeight: 700, color: '#374151', marginBottom: 12 }}>How many ERP / data sources do you have?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 10 }}>
                    {SOURCE_OPTIONS.map(o => (
                      <OptionCard key={o.label} selected={sources?.label === o.label} onClick={() => setSources(o)}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: sources?.label === o.label ? '#E06820' : '#1B2A4A', marginBottom: 4 }}>{o.label}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{o.desc}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontWeight: 700, color: '#374151', marginBottom: 12 }}>How many transaction lines per year?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 10 }}>
                    {VOLUME_OPTIONS.map(o => (
                      <OptionCard key={o.key} selected={volume?.key === o.key} onClick={() => setVolume(o)}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: volume?.key === o.key ? '#E06820' : '#1B2A4A' }}>{o.label}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 40 }}>
                  <p style={{ fontWeight: 700, color: '#374151', marginBottom: 12 }}>How many active suppliers?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10 }}>
                    {SUPPLIER_OPTIONS.map(o => (
                      <OptionCard key={o.key} selected={suppliers?.key === o.key} onClick={() => setSuppliers(o)}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: suppliers?.key === o.key ? '#E06820' : '#1B2A4A' }}>{o.label}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  disabled={!canNext0}
                  onClick={() => setStep(1)}
                  style={{ width: '100%', opacity: canNext0 ? 1 : 0.4, cursor: canNext0 ? 'pointer' : 'not-allowed' }}
                >
                  Next: Data Quality <ArrowRight size={16}/>
                </button>
              </div>
            )}

            {/* ── STEP 1: Data Quality ── */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 22, marginBottom: 32, color: '#1B2A4A' }}>How clean is your data today?</h2>

                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontWeight: 700, color: '#374151', marginBottom: 12 }}>Overall data quality</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
                    {QUALITY_OPTIONS.map(o => (
                      <OptionCard key={o.key} selected={quality === o.key} onClick={() => setQuality(o.key)} color={o.color} bg={o.bg}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: quality === o.key ? o.color : '#1B2A4A', marginBottom: 4 }}>{o.label}</div>
                        <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>{o.desc}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 40 }}>
                  <p style={{ fontWeight: 700, color: '#374151', marginBottom: 12 }}>Do you have an existing spend taxonomy?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
                    {TAXONOMY_OPTIONS.map(o => (
                      <OptionCard key={o.key} selected={taxonomy === o.key} onClick={() => setTaxonomy(o.key)}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: taxonomy === o.key ? '#E06820' : '#1B2A4A', marginBottom: 4 }}>{o.label}</div>
                        <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>{o.desc}</div>
                      </OptionCard>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline" onClick={() => setStep(0)} style={{ flex: 1 }}>
                    <ArrowLeft size={15}/> Back
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    disabled={!canNext1}
                    onClick={() => setStep(2)}
                    style={{ flex: 3, opacity: canNext1 ? 1 : 0.4, cursor: canNext1 ? 'pointer' : 'not-allowed' }}
                  >
                    Next: Your Goals <ArrowRight size={16}/>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Priorities ── */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 22, marginBottom: 8, color: '#1B2A4A' }}>What are your main goals?</h2>
                <p style={{ color: '#6b7280', marginBottom: 28 }}>Select all that apply.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
                  {PRIORITY_OPTIONS.map(o => (
                    <OptionCard key={o.key} selected={priorities.includes(o.key)} onClick={() => togglePriority(o.key)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                          background: priorities.includes(o.key) ? '#fff3eb' : '#f3f4f6',
                          color: priorities.includes(o.key) ? '#E06820' : '#6b7280',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{o.icon}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15, color: priorities.includes(o.key) ? '#E06820' : '#1B2A4A' }}>{o.label}</div>
                          <div style={{ fontSize: 13, color: '#6b7280' }}>{o.desc}</div>
                        </div>
                        {priorities.includes(o.key) && <CheckCircle2 size={18} style={{ color: '#E06820', marginLeft: 'auto', flexShrink: 0 }}/>}
                      </div>
                    </OptionCard>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>
                    <ArrowLeft size={15}/> Back
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    disabled={!canNext2}
                    onClick={() => setStep(3)}
                    style={{ flex: 3, opacity: canNext2 ? 1 : 0.4, cursor: canNext2 ? 'pointer' : 'not-allowed' }}
                  >
                    See My Estimate <ArrowRight size={16}/>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Results ── */}
            {step === 3 && estimate && (
              <div>
                {/* Hero result */}
                <div style={{
                  background: 'linear-gradient(135deg, #111111 0%, #1E1E1E 45%, #C05818 80%, #E06820 100%)',
                  borderRadius: 20, padding: '40px 36px', marginBottom: 28, textAlign: 'center', color: '#fff',
                }}>
                  <div style={{ fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 12 }}>
                    Estimated time to first results
                  </div>
                  <div style={{ fontSize: 'clamp(48px,8vw,72px)', fontWeight: 900, lineHeight: 1, color: '#fff', marginBottom: 8 }}>
                    {estimate.minDays}–{estimate.maxDays}
                    <span style={{ fontSize: 24, fontWeight: 400, marginLeft: 8 }}>days</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 12 }}>
                    From data upload to your first classified spend dashboard
                  </p>
                  {estimate.taxonomyNote && (
                    <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#fff', display: 'inline-block' }}>
                      📋 Taxonomy: {estimate.taxonomyNote}
                    </div>
                  )}
                </div>

                {/* Key metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 28 }}>
                  {[
                    {
                      icon: <TrendingUp size={22}/>, color: '#16a34a', bg: '#f0fdf4',
                      label: 'Estimated savings potential',
                      value: `${fmt(estimate.savMin)} – ${fmt(estimate.savMax)}`,
                      sub: `${Math.round(estimate.savMin/spend.value*100)}–${Math.round(estimate.savMax/spend.value*100)}% of your annual spend`,
                    },
                    {
                      icon: <Database size={22}/>, color: '#0369a1', bg: '#e0f2fe',
                      label: 'Records requiring cleanup',
                      value: `${estimate.cMin}–${estimate.cMax}%`,
                      sub: 'Automatically cleaned by Dolphin AI',
                    },
                    {
                      icon: <Users size={22}/>, color: '#7c3aed', bg: '#f5f3ff',
                      label: 'Estimated duplicate suppliers',
                      value: `${estimate.dupMin.toLocaleString()} – ${estimate.dupMax.toLocaleString()}`,
                      sub: `Out of your ~${suppliers.label} suppliers`,
                    },
                    {
                      icon: <Zap size={22}/>, color: '#E06820', bg: '#fff3eb',
                      label: 'Classification accuracy',
                      value: '95%+',
                      sub: 'Across L1–L4 taxonomy levels',
                    },
                  ].map(m => (
                    <div key={m.label} style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 14, padding: '20px 18px' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>{m.icon}</div>
                      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', lineHeight: 1.1, marginBottom: 4 }}>{m.value}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{m.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Process timeline */}
                <div style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 16, padding: '28px 28px', marginBottom: 28 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1B2A4A', marginBottom: 24 }}>
                    <Calendar size={16} style={{ marginRight: 8, verticalAlign: -2 }}/>
                    How your project will unfold
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {[
                      { day: 'Day 1',        icon: <Database size={15}/>,   color: '#0369a1', bg: '#e0f2fe', title: 'Data ingestion',          desc: `We connect to your ${sources.label === '1 system' ? 'system' : sources.label + ' systems'} and pull all spend data. No IT project required.` },
                      { day: 'Days 1–3',     icon: <Zap size={15}/>,        color: '#ca8a04', bg: '#fefce8', title: 'Automated cleaning',       desc: `AI cleans ${estimate.cMin}–${estimate.cMax}% of records: normalizes supplier names, fills blanks, removes duplicates.` },
                      { day: 'Days 2–' + Math.round(estimate.minDays * 0.7), icon: <Layers3 size={15}/>, color: '#7c3aed', bg: '#f5f3ff', title: 'Spend classification', desc: `Every transaction mapped to your taxonomy at 95%+ accuracy. Low-confidence predictions flagged for review.` },
                      { day: 'Day ' + estimate.minDays,  icon: <BarChart3 size={15}/>, color: '#16a34a', bg: '#f0fdf4', title: 'First dashboard delivered', desc: 'Spend by category, supplier rankings, anomaly alerts — all live. Your team can act on the data immediately.' },
                      { day: 'Ongoing',      icon: <TrendingUp size={15}/>, color: '#E06820', bg: '#fff3eb', title: 'Continuous intelligence',  desc: 'Data refreshes automatically. New transactions classified in real time. Savings opportunities surfaced as they appear.' },
                    ].map((phase, i, arr) => (
                      <div key={phase.title} style={{ display: 'flex', gap: 16, paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: phase.bg, color: phase.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{phase.icon}</div>
                          {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: '#e5e7eb', margin: '4px 0' }}/>}
                        </div>
                        <div style={{ paddingTop: 6, paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: phase.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{phase.day}</div>
                          <div style={{ fontWeight: 700, color: '#1B2A4A', marginBottom: 4 }}>{phase.title}</div>
                          <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{phase.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's included */}
                {priorities.length > 0 && (
                  <div style={{ background: '#fff8f4', border: '1.5px solid rgba(224,104,32,0.2)', borderRadius: 16, padding: '24px 28px', marginBottom: 28 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B2A4A', marginBottom: 16 }}>What's included for your goals</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {priorities.map(pk => {
                        const p = PRIORITY_OPTIONS.find(o => o.key === pk);
                        const deliverables = {
                          visibility:  'Spend breakdown by L1–L4 category, time trend charts, top-supplier rankings',
                          savings:     'Savings opportunity ranking with dollar estimates, tail spend analysis, consolidation targets',
                          suppliers:   'Deduplicated supplier master, canonical vendor names, concentration risk report',
                          compliance:  'On-contract vs off-contract spend split, contract expiry alerts, compliance trend',
                          reporting:   'Scheduled PDF/Excel reports, role-based dashboard access, one-click export',
                        };
                        return (
                          <div key={pk} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <CheckCircle2 size={16} style={{ color: '#E06820', flexShrink: 0, marginTop: 2 }}/>
                            <div>
                              <span style={{ fontWeight: 700, color: '#1B2A4A' }}>{p?.label}: </span>
                              <span style={{ color: '#6b7280', fontSize: 14 }}>{deliverables[pk]}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Back + CTA */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <button className="btn btn-outline" onClick={() => setStep(2)} style={{ flex: 1 }}>
                    <ArrowLeft size={15}/> Back to Goals
                  </button>
                  <button className="btn btn-outline" onClick={() => { setStep(0); setSpend(null); setSources(null); setVolume(null); setSuppliers(null); setQuality(null); setTaxonomy(null); setPriorities([]); }} style={{ flex: 1 }}>
                    Start over
                  </button>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2a2a2a 60%, #7a3010 100%)', borderRadius: 16, padding: '32px 28px', textAlign: 'center', color: '#fff' }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Ready to get your detailed proposal?</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 24 }}>
                    Book a 30-min demo and we'll show you exactly what this looks like on your actual data — no commitment required.
                  </p>
                  <Link to="/book-demo" className="btn btn-primary btn-lg" style={{ border: 'none' }}>
                    Book a Demo <ArrowRight size={15}/>
                  </Link>
                </div>
              </div>
            )}
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

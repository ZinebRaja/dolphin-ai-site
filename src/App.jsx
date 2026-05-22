import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PricingPage from './PricingPage.jsx';
import ClassifyPage from './ClassifyPage.jsx';
import PrivacyPage from './PrivacyPage.jsx';
import TermsPage from './TermsPage.jsx';
import AboutPage from './AboutPage.jsx';
import SecurityPage from './SecurityPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import BookDemoPage from './BookDemoPage.jsx';
import DemoVideoPage from './DemoVideoPage.jsx';
import CookieBanner from './CookieBanner.jsx';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSpreadsheet,
  Layers3,
  RefreshCcw,
  Search,
  ShieldCheck
} from 'lucide-react';

const features = [
  {
    icon: <Layers3 size={22} />,
    title: 'Spend taxonomy classification',
    text: 'Automatically classify transaction lines into category, subcategory, family, and spend group using your procurement taxonomy.'
  },
  {
    icon: <RefreshCcw size={22} />,
    title: 'Supplier name normalization',
    text: 'Group duplicate supplier names, clean spelling variations, and create one trusted supplier identity across your data.'
  },
  {
    icon: <Search size={22} />,
    title: 'Data quality detection',
    text: 'Identify inconsistent descriptions, missing fields, duplicates, and unreliable labels before analysis.'
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Actionable spend visibility',
    text: 'Turn messy ERP and Excel exports into clean reporting-ready data for procurement and finance teams.'
  }
];

const steps = [
  { num: '01', title: 'Import',    text: 'Import raw spend data from Excel, ERP, or any procurement system.' },
  { num: '02', title: 'Normalize', text: 'Normalize supplier names and detect duplicates automatically.' },
  { num: '03', title: 'Classify',  text: 'Classify spend using your taxonomy, business rules, and AI suggestions.' },
  { num: '04', title: 'Export',    text: 'Review, validate, and export clean data for reporting and strategy.' }
];

/* ── Brand SVG logos ─────────────────────────────────────── */

function LogoSAP() {
  return (
    <svg width="60" height="38" viewBox="0 0 60 38" fill="none">
      <rect width="60" height="38" rx="6" fill="#009999"/>
      <polygon points="0,0 46,0 60,38 14,38" fill="rgba(0,0,0,0.18)"/>
      <text x="30" y="26" textAnchor="middle" fill="white"
        fontSize="16" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" letterSpacing="2">SAP</text>
    </svg>
  );
}

function LogoDynamics() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect width="38" height="38" rx="8" fill="#EDEBF0"/>
      <path d="M9 7h11c7 0 11 4.2 11 10.5S27 28 20 28h-5v-6h5c3.2 0 5-1.8 5-4.5S20.2 13 17 13h-2v16H9V7z" fill="#5C2D91"/>
    </svg>
  );
}

function LogoExcel() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="14" fill="#185C37"/>
      <path d="M10 10h16v36H10z" fill="#21A366"/>
      <path d="M16 20l5 8-5 8h4l3-5 3 5h4l-5-8 5-8h-4l-3 5-3-5z" fill="white"/>
      <rect x="26" y="18" width="18" height="4" rx="1.5" fill="white" opacity="0.85"/>
      <rect x="26" y="26" width="18" height="4" rx="1.5" fill="white" opacity="0.85"/>
      <rect x="26" y="34" width="18" height="4" rx="1.5" fill="white" opacity="0.85"/>
    </svg>
  );
}

function LogoSharePoint() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="14" fill="#F3F2F1"/>
      <circle cx="22" cy="29" r="11" fill="#036C70"/>
      <circle cx="32" cy="23" r="9"  fill="#1A9BA1"/>
      <circle cx="36" cy="33" r="8"  fill="#37C6D0"/>
      <text x="22" y="34" textAnchor="middle" fill="white"
        fontSize="13" fontWeight="900" fontFamily="Arial,sans-serif">S</text>
    </svg>
  );
}

function LogoCoupa() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect width="38" height="38" rx="8" fill="#00B2A9"/>
      <path d="M26 19c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7c2.1 0 4 .9 5.3 2.4l-2.8 2.8C22.8 16.4 21.5 16 20 16c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3h-3v-3h6v3z" fill="white"/>
    </svg>
  );
}


function LogoOracle() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="14" fill="#F8F8F8"/>
      <rect x="8" y="18" width="40" height="20" rx="10" fill="#E10000"/>
      <rect x="18" y="18" width="20" height="20" rx="0" fill="#F8F8F8"/>
      <text x="28" y="33" textAnchor="middle" fill="#E10000"
        fontSize="8" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="0.5">ORACLE</text>
    </svg>
  );
}

function LogoAzure() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="12" fill="#F0F4FF"/>
      <path d="M15 38 L24 16 H30 L22 32 H30 L32 38 Z" fill="url(#azgrad)"/>
      <path d="M24 16 L29 28 L25 34 L19 22 Z" fill="#50E6FF" opacity="0.55"/>
      <defs>
        <linearGradient id="azgrad" x1="15" y1="16" x2="32" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0078D4"/>
          <stop offset="100%" stopColor="#50E6FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Animation variants ──────────────────────────────────── */

const sceneVariants = {
  initial: { opacity: 0, x: 18, scale: 0.995 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.42, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -12, scale: 0.995, transition: { duration: 0.32, ease: 'easeIn'  } },
};

const listVariants = {
  animate: { transition: { staggerChildren: 0.09 } },
};

const itemVariant = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

/* ── CountUp hook ────────────────────────────────────────── */

function useCountUp(target, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

/* ── ProcessingScene ─────────────────────────────────────── */

const PROC_STEPS = [
  { label: 'Normalizing supplier names', detail: 'Microsoft Ltd. → Microsoft', pct: 100, done: true },
  { label: 'Cleaning spend descriptions', detail: 'Removing noise from invoice lines', pct: 92, done: true },
  { label: 'Detecting supplier duplicates', detail: 'Matching aliases across ERP exports', pct: 86, done: true },
  { label: 'Mapping taxonomy', detail: 'Category, family, sub-family', pct: 74, done: true },
  { label: 'Classifying transactions', detail: 'Confidence score in progress', pct: 63, done: false },
];

function ProcessingScene() {
  return (
    <div className="demo-scene processing-scene">
      <div className="product-panel ai-panel">
        <div className="panel-topline">
          <div className="ai-badge">✦</div>
          <div>
            <strong>Dolphin AI</strong>
            <span>Preparing spend data</span>
          </div>
        </div>

        <motion.div className="light-proc-list" variants={listVariants} initial="initial" animate="animate">
          {PROC_STEPS.map((s, index) => (
            <motion.div className="light-proc-step" key={s.label} variants={itemVariant}>
              <div className={`light-check ${s.done ? 'done' : 'active'}`}>
                {s.done ? <CheckCircle2 size={17} /> : <span />}
              </div>
              <div className="light-proc-copy">
                <div className="light-proc-row">
                  <strong>{s.label}</strong>
                  <em>{s.pct}%</em>
                </div>
                <p>{s.detail}</p>
                <div className="light-track">
                  <motion.div
                    className="light-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.8, delay: index * 0.12 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="floating-chip chip-clean"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <span>1,284</span> suppliers normalized
      </motion.div>
    </div>
  );
}

/* ── ClassificationScene ────────────────────────────────── */

const CLASS_ROWS = [
  { supplier: 'Microsoft Ireland Operations', desc: 'Cloud subscription', category: 'IT Software', confidence: '96%' },
  { supplier: 'Orange Business Services', desc: 'Fiber connectivity', category: 'Telecom', confidence: '94%' },
  { supplier: 'Amazon Marketplace', desc: 'Office equipment', category: 'Office Supplies', confidence: '91%' },
  { supplier: 'DHL Express', desc: 'Delivery services', category: 'Logistics', confidence: '89%' },
];

function ClassificationScene() {
  return (
    <div className="demo-scene classification-scene">
      <div className="product-panel classification-panel">
        <div className="panel-topline table-topline">
          <div>
            <strong>Classification preview</strong>
            <span>Spend lines mapped to your taxonomy</span>
          </div>
          <div className="confidence-pill">94% avg. confidence</div>
        </div>

        <motion.div className="classification-table" variants={listVariants} initial="initial" animate="animate">
          <div className="class-header">
            <span>Supplier</span>
            <span>Description</span>
            <span>Category</span>
            <span>Confidence</span>
          </div>
          {CLASS_ROWS.map((row) => (
            <motion.div className="class-row" key={row.supplier} variants={itemVariant}>
              <span>{row.supplier}</span>
              <span>{row.desc}</span>
              <span><em>{row.category}</em></span>
              <span><b>{row.confidence}</b></span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="floating-chip chip-taxonomy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        Taxonomy matched: <span>Level 3</span>
      </motion.div>
    </div>
  );
}

/* ── InsightsScene ───────────────────────────────────────── */

function CountMetric({ label, value, prefix = '', suffix = '', accent }) {
  const n = useCountUp(value, 950);
  return (
    <motion.div className={`insight-card ${accent ? 'accent' : ''}`} variants={itemVariant}>
      <p>{label}</p>
      <strong>{prefix}{n.toLocaleString()}{suffix}</strong>
    </motion.div>
  );
}

function InsightsScene() {
  return (
    <div className="demo-scene insights-scene">
      <motion.div className="insight-stack" variants={listVariants} initial="initial" animate="animate">
        <motion.div className="opportunity-card main-opportunity" variants={itemVariant}>
          <div className="panel-topline">
            <div className="ai-badge copper">↗</div>
            <div>
              <strong>Supplier consolidation opportunity</strong>
              <span>Consolidate spend from 12 suppliers into 3 strategic suppliers</span>
            </div>
          </div>
          <div className="saving-row">
            <span>Projected savings</span>
            <b>EUR 95k / year</b>
          </div>
          <div className="progress-line"><span /></div>
        </motion.div>

        <CountMetric label="Savings potential" value={9} prefix="EUR " suffix=".0M" accent />
        <CountMetric label="Normalized suppliers" value={1284} />
        <CountMetric label="Contract coverage" value={26} suffix=".18%" />
        <CountMetric label="Classification confidence" value={94} suffix="%" />
      </motion.div>
    </div>
  );
}

/* ── HeroDemoRotator ─────────────────────────────────────── */

const SCENES = [ProcessingScene, ClassificationScene, InsightsScene];

function HeroDemoRotator() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setScene(s => (s + 1) % SCENES.length), 3000);
    return () => clearInterval(id);
  }, [paused, SCENES.length]);

  const SceneComponent = SCENES[scene];

  return (
    <div
      className="demo-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="demo-glow" />
      <div className="demo-chrome">
        <div className="chrome-bar">
          <div className="chrome-dots"><span /><span /><span /></div>
          <div className="chrome-url">Dolphin AI · Spend intelligence workspace</div>
        </div>
        <div className="demo-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SceneComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="demo-nav">
        {SCENES.map((_, i) => (
          <button
            key={i}
            className={`demo-nav-dot${scene === i ? ' active' : ''}`}
            onClick={() => setScene(i)}
            aria-label={`View scene ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function HomePage() {
  const [productOpen, setProductOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const productRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!productRef.current) return;
      if (!productRef.current.contains(e.target)) {
        setProductOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setProductOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="site">

      {/* ── Navbar ── */}
      <header className="navbar">
        <div className="container nav-inner">
          <a href="/" className="logo-link">
            <img src="/logowebsite.png" alt="Dolphin AI" className="logo-img" />
          </a>
          <nav className="nav-links">
            {/* Product mega menu */}
            <div
              ref={productRef}
              className="nav-item product-item"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                className={`nav-link product-toggle ${productOpen ? 'open' : ''}`}
                aria-haspopup="true"
                aria-expanded={productOpen}
                onClick={(e) => { e.stopPropagation(); setProductOpen(p => !p); }}
                onKeyDown={(e) => { if (e.key === 'Escape') setProductOpen(false); }}
              >
                <span>Product</span>
                <svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true" focusable="false">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" fill="currentColor" />
                </svg>
              </button>

              <div
                className={`mega-menu ${productOpen ? 'open' : ''}`}
                role="menu"
              >
                <div className="mega-inner container">
                  <div className="mega-col">
                    <h4 className="mega-title">Product</h4>
                    <p className="mega-copy">Dolphin AI brings clean, classified, and actionable spend data to procurement teams.</p>
                  </div>

                  <div className="mega-col">
                    <h5 className="mega-section">Core capabilities</h5>
                    <ul className="mega-list">
                      <li tabIndex={0} className="mega-item">
                        <a href="#workflow"><strong>Spend classification</strong>
                        <span>Automatically classify transactions using your procurement taxonomy.</span></a>
                      </li>
                      <li tabIndex={0} className="mega-item">
                        <a href="#workflow"><strong>Supplier normalization</strong>
                        <span>Clean, standardize, and group duplicate supplier names into one trusted supplier view.</span></a>
                      </li>
                      <li tabIndex={0} className="mega-item">
                        <a href="#platform"><strong>Spend intelligence</strong>
                        <span>Turn raw spend data into clear insights, trends, and category visibility.</span></a>
                      </li>
                      <li tabIndex={0} className="mega-item">
                        <a href="#platform"><strong>Opportunity detection</strong>
                        <span>Identify savings opportunities, off-contract spend, consolidation potential, and tail spend.</span></a>
                      </li>
                      <li tabIndex={0} className="mega-item">
                        <a href="#platform"><strong>Data enrichment</strong>
                        <span>Improve descriptions, supplier records, and category mapping with AI-assisted enrichment.</span></a>
                      </li>
                    </ul>
                  </div>

                  <div className="mega-col">
                    <h5 className="mega-section">Quick links</h5>
                    <ul className="mega-list">
                      <li tabIndex={0} className="mega-item">
                        <a href="#ecosystem"><strong>Integrations</strong>
                        <span>Connect ERP systems, Excel files, procurement platforms, and supplier datasets.</span></a>
                      </li>
                      <li tabIndex={0} className="mega-item">
                        <a href="#security"><strong>Security</strong>
                        <span>Learn how Dolphin AI handles data privacy, protection, and enterprise security.</span></a>
                      </li>
                      <li tabIndex={0} className="mega-item">
                        <a href="#workflow"><strong>Workflow</strong>
                        <span>Discover how Dolphin AI cleans, classifies, validates, and enriches spend data.</span></a>
                      </li>
                      <li tabIndex={0} className="mega-item">
                        <a href="#platform"><strong>Analytics</strong>
                        <span>Explore dashboards, KPIs, confidence scores, and reporting outputs.</span></a>
                      </li>
                      <li tabIndex={0} className="mega-item">
                        <a href="#contact"><strong>Contact / Demo</strong>
                        <span>Talk to us about your procurement data use case.</span></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* nav links */}
            <a href="#solution">Solution</a>
            <a href="#workflow">Workflow</a>
            <Link to="/pricing">Pricing</Link>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <Link to="/login?redirect=/demo-video" className="btn btn-primary">Live demo</Link>
            <Link to="/book-demo" className="btn btn-primary">Book a demo</Link>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(m => !m)} aria-label="Menu">
            <span className={`hamburger ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>
      </header>
      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="mobile-nav" onClick={() => setMobileOpen(false)}>
          <a href="#solution">Solution</a>
          <a href="#workflow">Workflow</a>
          <Link to="/pricing">Pricing</Link>
          <a href="#contact">Contact</a>
          <Link to="/login?redirect=/demo-video" className="btn btn-primary">Live demo</Link>
          <Link to="/book-demo" className="btn btn-primary">Book a demo</Link>
        </div>
      )}

      <main>

        {/* ══ HERO ══ */}
        <section className="hero">
          <div className="container">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <h1 className="hero-title">Transform raw spend data into actionable intelligence</h1>
              <p className="hero-subtitle">
                Dolphin AI normalizes supplier names, classifies spend using your taxonomy,
                and reveals opportunities hidden in procurement data.
              </p>
              <HeroDemoRotator />
            </motion.div>
          </div>
        </section>

        {/* ══ INTEGRATION ECOSYSTEM ══ */}
        <section id="ecosystem" className="integration-section">
          <div className="container">

            <motion.div
              className="integration-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow">Integrations</span>
              <h2>Unify every spend source into one intelligent classification layer</h2>
              <p>
                Dolphin AI connects ERP systems, procurement platforms, spreadsheets, and
                supplier data to normalize supplier names and classify spend using your taxonomy.
              </p>
              <div className="integration-ctas">
                <Link to="/book-demo" className="btn btn-primary btn-pill">Book a demo</Link>
                <a href="#solution" className="btn-text-link">
                  Explore Dolphin AI <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>

            {/* Hub stage — absolute-positioned orbital layout, 800×560 canvas */}
            <motion.div
              className="eco-stage"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2 }}
            >
              {/* ── SVG layer: glow · rings · connectors · animated data dots ── */}
              <svg
                className="eco-svg"
                viewBox="0 0 800 560"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  {/* Soft radial glow centred on hub */}
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#A56D58" stopOpacity="0.22"/>
                    <stop offset="55%"  stopColor="#A56D58" stopOpacity="0.07"/>
                    <stop offset="100%" stopColor="#A56D58" stopOpacity="0"/>
                  </radialGradient>
                  {/* Navy accent for secondary dots */}
                  <radialGradient id="copperGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#1B2A4A" stopOpacity="0.10"/>
                    <stop offset="100%" stopColor="#1B2A4A" stopOpacity="0"/>
                  </radialGradient>
                </defs>

                {/* Glow ellipse */}
                <ellipse cx="400" cy="280" rx="195" ry="158" fill="url(#hubGlow)"/>

                {/* Orbital rings — very faint structural guides */}
                <ellipse cx="400" cy="280" rx="158" ry="126"
                  fill="none" stroke="#A56D58" strokeOpacity="0.10" strokeWidth="1.2"/>
                <ellipse cx="400" cy="280" rx="258" ry="208"
                  fill="none" stroke="#A56D58" strokeOpacity="0.06"  strokeWidth="1.2"/>

                {/* Connector curves — card → center (data flowing in)
                    p1 SAP (220,105) · p2 Dynamics (582,105)
                    p3 Oracle (168,280) · p4 SharePoint (630,280)
                    p5 Coupa (220,455) · p6 Azure (400,502) · p7 Excel (580,455) */}
                <path id="p1" d="M220,105 Q310,193 400,280"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p2" d="M582,105 Q491,193 400,280"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p3" d="M168,280 Q284,271 400,280"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p4" d="M630,280 Q515,271 400,280"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p5" d="M220,455 Q310,368 400,280"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p6" d="M400,502 Q400,391 400,280"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p7" d="M580,455 Q490,368 400,280"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>

                {/* Animated data-flow dots — copper primary, navy accent */}
                <circle r="2.8" fill="#A56D58" opacity="0.90">
                  <animateMotion dur="2.6s" repeatCount="indefinite" begin="0.0s">
                    <mpath href="#p1"/>
                  </animateMotion>
                </circle>
                <circle r="2.8" fill="#1B2A4A" opacity="0.75">
                  <animateMotion dur="3.0s" repeatCount="indefinite" begin="0.5s">
                    <mpath href="#p2"/>
                  </animateMotion>
                </circle>
                <circle r="2.8" fill="#A56D58" opacity="0.90">
                  <animateMotion dur="2.3s" repeatCount="indefinite" begin="1.1s">
                    <mpath href="#p3"/>
                  </animateMotion>
                </circle>
                <circle r="2.8" fill="#1B2A4A" opacity="0.75">
                  <animateMotion dur="2.7s" repeatCount="indefinite" begin="0.7s">
                    <mpath href="#p4"/>
                  </animateMotion>
                </circle>
                <circle r="2.4" fill="#BF8974" opacity="0.85">
                  <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.5s">
                    <mpath href="#p5"/>
                  </animateMotion>
                </circle>
                <circle r="2.8" fill="#A56D58" opacity="0.90">
                  <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.3s">
                    <mpath href="#p6"/>
                  </animateMotion>
                </circle>
                <circle r="2.4" fill="#BF8974" opacity="0.85">
                  <animateMotion dur="2.9s" repeatCount="indefinite" begin="0.9s">
                    <mpath href="#p7"/>
                  </animateMotion>
                </circle>
              </svg>

              {/* ── Central hub card ── */}
              <div className="eco-hub">
                <img src="/logowebsite.png" alt="Dolphin AI" />
              </div>

              {/* ── Orbit cards: all have icon + name ── */}
              <div className="orbit-anchor anchor-sap">
                <div className="int-card"><LogoSAP /><span>SAP</span></div>
              </div>
              <div className="orbit-anchor anchor-dynamics">
                <div className="int-card"><LogoDynamics /><span>Microsoft Dynamics 365</span></div>
              </div>
              <div className="orbit-anchor anchor-oracle">
                <div className="int-card"><LogoOracle /><span>Oracle</span></div>
              </div>
              <div className="orbit-anchor anchor-sharepoint">
                <div className="int-card"><LogoSharePoint /><span>SharePoint</span></div>
              </div>
              <div className="orbit-anchor anchor-coupa">
                <div className="int-card"><LogoCoupa /><span>Coupa</span></div>
              </div>
              <div className="orbit-anchor anchor-azure">
                <div className="int-card"><LogoAzure /><span>Azure AI</span></div>
              </div>
              <div className="orbit-anchor anchor-excel">
                <div className="int-card"><LogoExcel /><span>Excel</span></div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* ══ METRICS ══ */}
        <section id="platform" className="metrics-strip">
          <div className="container metrics-grid">
            {[
              ['80%',  'Less manual data cleaning'],
              ['360°', 'Supplier visibility'],
              ['4×',   'Faster category analysis'],
              ['95%+', 'Classification accuracy']
            ].map(([val, label]) => (
              <div className="metric-cell" key={label}>
                <strong>{val}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section id="solution" className="section container">
          <div className="section-head">
            <span className="eyebrow">Solution</span>
            <h2>From raw supplier spend to clean strategic insight.</h2>
            <div className="section-rule" style={{ margin: '1rem 0 1.25rem' }} />
            <p>Built for companies that still depend on Excel, manual category mapping, and inconsistent supplier names.</p>
          </div>
          <div className="features-grid">
            {features.map(f => (
              <article className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ══ WORKFLOW ══ */}
        <section id="workflow" className="workflow-section">
          <div className="container">
            <div className="section-head centered">
              <span className="eyebrow">How it works</span>
              <h2>A simple process for complex procurement data.</h2>
              <div className="section-rule" />
              <p>Dolphin AI gives teams a repeatable workflow — import, clean, classify, validate, and export.</p>
            </div>
            <div className="steps-grid">
              {steps.map(s => (
                <div className="step-card" key={s.num}>
                  <div className="step-num">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BEFORE / AFTER ══ */}
        <section className="compare-section container">
          <div className="section-head centered">
            <span className="eyebrow">The difference</span>
            <h2>Before and after Dolphin AI.</h2>
            <div className="section-rule" />
          </div>
          <div className="compare-grid">
            <div className="compare-card compare-before">
              <div className="compare-head">
                <FileSpreadsheet size={24} /><h3>Before</h3>
              </div>
              {[
                'Supplier duplicates across several systems',
                'Manual spend category mapping in Excel',
                'Low confidence in category-level reporting',
                'Slow analysis before procurement decisions'
              ].map(item => (
                <div className="compare-item" key={item}>
                  <span className="dot" />{item}
                </div>
              ))}
            </div>
            <div className="compare-card compare-after">
              <div className="compare-head">
                <ShieldCheck size={24} /><h3>After Dolphin AI</h3>
              </div>
              {[
                'One normalized supplier master view',
                'Spend mapped to a consistent taxonomy',
                'Clear category visibility for procurement strategy',
                'Clean exports for BI, dashboards, and reporting'
              ].map(item => (
                <div className="compare-item" key={item}>
                  <CheckCircle2 size={16} />{item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CASE STUDIES ══ */}
        <section className="cases-section container">
          <div className="section-head centered">
            <span className="eyebrow">Results</span>
            <h2>What procurement teams achieve</h2>
            <div className="section-rule" />
            <p>Real outcomes from organisations that replaced manual spend analysis with Dolphin AI.</p>
          </div>
          <div className="cases-grid">
            {[
              {
                industry: 'Industrial Manufacturing',
                spend: '$450M annual spend',
                challenge: 'Supplier names duplicated across 4 ERPs. No consistent taxonomy. Category reporting took 3 weeks per quarter.',
                results: [
                  '1,800+ supplier records normalized in one run',
                  'Classification accuracy improved from 54% to 97%',
                  'Quarterly reporting time cut from 3 weeks to 2 days',
                ],
                saving: '$3.2M savings identified',
              },
              {
                industry: 'European Retail Group',
                spend: '$280M annual spend',
                challenge: 'Procurement team manually mapping 60,000+ spend lines per year in Excel. 40h/month of analyst time wasted on data prep.',
                results: [
                  '60,000 spend lines auto-classified at 95%+ accuracy',
                  'Analyst data prep time reduced by 80%',
                  'Identified $1.8M in off-contract tail spend',
                ],
                saving: '$1.8M tail spend surfaced',
              },
              {
                industry: 'Global Logistics Company',
                spend: '$750M annual spend',
                challenge: 'No spend visibility below Level 1 categories. Strategic sourcing decisions made on incomplete data.',
                results: [
                  'Full Level 1–4 taxonomy applied across all spend',
                  'Supplier consolidation opportunities across 6 categories',
                  'Finance and procurement aligned on one data source',
                ],
                saving: '$6.1M consolidation opportunity',
              },
            ].map(c => (
              <div className="case-card" key={c.industry}>
                <div className="case-header">
                  <div className="case-industry">{c.industry}</div>
                  <div className="case-spend">{c.spend}</div>
                </div>
                <p className="case-challenge">{c.challenge}</p>
                <ul className="case-results">
                  {c.results.map(r => (
                    <li key={r}><CheckCircle2 size={14} />{r}</li>
                  ))}
                </ul>
                <div className="case-saving">{c.saving}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-head centered">
              <span className="eyebrow">What our clients say</span>
              <h2>Trusted by procurement and finance teams</h2>
              <div className="section-rule" />
            </div>
            <div className="testimonials-grid">
              {[
                { quote: "Dolphin AI cut our spend classification time by 80%. What used to take our team weeks now happens in hours — and the accuracy is far better than manual mapping.", name: "Sarah Mitchell", role: "Head of Procurement", company: "Global Manufacturing Group" },
                { quote: "We had supplier names in 6 different formats across 3 ERPs. Dolphin AI normalized everything into one clean master list in a single run. Game-changer for our reporting.", name: "Thomas Berger", role: "CPO", company: "€1.2B Industrial Distributor" },
                { quote: "The spend category visibility we now have changed how we approach sourcing strategy. We identified €4M in consolidation opportunities we didn't know existed.", name: "Amina Rousseau", role: "Category Manager", company: "European Retail Group" },
              ].map(t => (
                <div className="testimonial-card" key={t.name}>
                  <div className="testimonial-stars">{'★'.repeat(5)}</div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.name.split(' ').map(n=>n[0]).join('')}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role} · {t.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="faq-section container">
          <div className="section-head centered">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions</h2>
            <div className="section-rule" />
          </div>
          <div className="faq-list">
            {[
              { q: "What kind of data does Dolphin AI work with?", a: "Dolphin AI works with any spend data — ERP exports, procurement platform reports, Excel files, or AP transaction data. As long as it contains supplier names, amounts, and descriptions, we can classify and normalize it." },
              { q: "How accurate is the classification?", a: "Our classification engine achieves 95%+ accuracy on spend data, combining a sourcing team's rule-based recommendations with AI reasoning. Every result can be reviewed and validated before export." },
              { q: "Do I need to change my ERP or procurement system?", a: "No. Dolphin AI connects to your existing systems via API or file upload. You keep your current stack — we enrich and classify the data, then return it in whatever format you need." },
              { q: "How long does it take to get started?", a: "Most clients are up and running within one week. We start with a sample of your data, configure your taxonomy, and deliver a first classification run before full deployment." },
              { q: "Is our spend data secure?", a: "Yes. All data is encrypted in transit and at rest. We use Azure cloud infrastructure, and your data is never used to train models or shared with third parties. We sign NDAs and DPAs as standard." },
              { q: "What's the difference between the plans?", a: "Starter is for teams with under €10M spend and basic needs. Professional adds more suppliers, integrations, and advanced reporting. Enterprise covers unlimited scope, dedicated support, and custom integrations." },
            ].map((item, i) => (
              <div className={`faq-item ${faqOpen === i ? 'open' : ''}`} key={i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div className="faq-q">
                  <span>{item.q}</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="faq-chevron">
                    <path d="M4 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {faqOpen === i && <div className="faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section id="contact" className="cta-section">
          <div className="container cta-inner">
            <span className="eyebrow">Get started</span>
            <h2>Ready to make your spend data usable?</h2>
            <p>Build a trusted foundation for procurement reporting, category strategy, and supplier analysis.</p>
            <Link to="/book-demo" className="btn btn-primary btn-lg">
              Book a demo <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/logowebsite.png" alt="Dolphin AI" className="footer-logo" />
            <p>Intelligent Spend Classification for modern procurement and finance teams.</p>
            <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              Dolphin AI LLC<br />
              7301 State Highway 161 Ste 148<br />
              Irving, TX 75039
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/dolphinaipro" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#platform">Platform</a>
              <a href="#solution">Solution</a>
              <a href="#workflow">Workflow</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <Link to="/about">About us</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/security">Security</Link>
              <Link to="/book-demo">Book a demo</Link>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Cookie Policy</Link>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>Copyright © 2026 Dolphin AI · dolphinaipro.com</p>
          <div>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/privacy">Cookie Policy</Link>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/classify" element={<ClassifyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/book-demo" element={<BookDemoPage />} />
      <Route path="/demo-video" element={<DemoVideoPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import DashboardPage from './DashboardPage.jsx';
import ContactPage from './ContactPage.jsx';
import AssessmentPage from './AssessmentPage.jsx';
import ProductPage from './ProductPage.jsx';
import ReportingPage from './ReportingPage.jsx';
import CookieBanner from './CookieBanner.jsx';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSpreadsheet,
  Layers3,
  RefreshCcw,
  Search,
  ShieldCheck,
  TrendingUp,
  Building2,
  Lightbulb,
  Link2,
  Database,
  PieChart,
  GitBranch,
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


function LogoWorkday() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#F3F2F1"/>
      {/* Workday rising-sun motif: three concentric arcs */}
      <path d="M8 27 A12 10 0 0 1 32 27" stroke="#E8930C" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M12 27 A8  7  0 0 1 28 27" stroke="#E8930C" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.65"/>
      <path d="M16 27 A4  3.5 0 0 1 24 27" stroke="#E8930C" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.35"/>
    </svg>
  );
}

function LogoAriba() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="12" fill="#F5F5F5"/>
      <text x="26" y="31" textAnchor="middle" fill="#0070D2"
        fontSize="11" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="0.5">ARIBA</text>
      <rect x="10" y="34" width="32" height="2.5" rx="1.25" fill="#0070D2" opacity="0.6"/>
    </svg>
  );
}

function LogoJaggaer() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="12" fill="#F0F7F0"/>
      <text x="26" y="31" textAnchor="middle" fill="#2E7D32"
        fontSize="9" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="0.3">JAGGAER</text>
      <circle cx="26" cy="17" r="6" fill="#2E7D32" opacity="0.2"/>
      <circle cx="26" cy="17" r="3" fill="#2E7D32"/>
    </svg>
  );
}

const TICKER_ITEMS = [
  { logo: <LogoSAP />,      name: 'SAP' },
  { logo: <LogoOracle />,   name: 'Oracle' },
  { logo: <LogoDynamics />, name: 'MS Dynamics' },
  { logo: <LogoCoupa />,    name: 'Coupa' },
  { logo: <LogoExcel />,    name: 'Excel' },
  { logo: <LogoSharePoint />, name: 'SharePoint' },
  { logo: <LogoWorkday />,  name: 'Workday' },
  { logo: <LogoAriba />,    name: 'SAP Ariba' },
  { logo: <LogoJaggaer />,  name: 'Jaggaer' },
];

function LogoTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-section">
      <p className="ticker-label">Works with the tools your team already uses</p>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {items.map((item, i) => (
            <div className="ticker-item" key={i}>
              {item.logo}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
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

/* ─────────────────────────────────────────────────────────── */

function HomePage() {
  const [productOpen, setProductOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const productRef = useRef(null);
  const closeTimer = useRef(null);

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
              onMouseEnter={() => { clearTimeout(closeTimer.current); setProductOpen(true); }}
              onMouseLeave={() => { closeTimer.current = setTimeout(() => setProductOpen(false), 180); }}
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

              <div className={`mega-menu ${productOpen ? 'open' : ''}`} role="menu">
                <div className="mega-inner container">

                  {/* Left: Overview */}
                  <div className="mega-overview">
                    <div className="mega-brand-badge">
                      <img src="/logowebsite.png" alt="Dolphin AI" style={{ height: 36 }} />
                    </div>
                    <h4 className="mega-overview-title">Spend Intelligence Platform</h4>
                    <p className="mega-overview-copy">Clean, classify, and analyze your procurement data from any source — in hours, not months.</p>
                    <a href="/product" className="mega-overview-link" onClick={() => setProductOpen(false)}>Explore platform <ArrowRight size={13} /></a>
                  </div>

                  {/* Center: Capabilities grid */}
                  <div className="mega-caps">
                    <p className="mega-section">Capabilities</p>
                    <div className="mega-caps-grid">
                      {[
                        { icon: <Layers3 size={16}/>,    title: 'Spend Classification',   desc: 'Map every transaction to your taxonomy', href: '/product#spend-classification' },
                        { icon: <Building2 size={16}/>,  title: 'Supplier Normalization', desc: 'One trusted view of every supplier',      href: '/product#supplier-normalization' },
                        { icon: <TrendingUp size={16}/>, title: 'Spend Intelligence',     desc: 'Trends, KPIs, and category visibility',   href: '/product#spend-intelligence' },
                        { icon: <Lightbulb size={16}/>,  title: 'Opportunity Detection',  desc: 'Savings, tail spend, off-contract',       href: '/product#opportunity-detection' },
                        { icon: <Database size={16}/>,   title: 'Data Enrichment',        desc: 'AI-assisted cleaning and enrichment',     href: '/product#data-enrichment' },
                        { icon: <Link2 size={16}/>,      title: 'Integrations',           desc: 'SAP, Oracle, Coupa, Excel and more',      href: '/product#integrations' },
                      ].map(item => (
                        <a href={item.href} className="mega-cap-item" key={item.title} onClick={() => setProductOpen(false)}>
                          <div className="mega-cap-icon">{item.icon}</div>
                          <div className="mega-cap-text">
                            <strong>{item.title}</strong>
                            <span>{item.desc}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right: Resources */}
                  <div className="mega-resources">
                    <p className="mega-section">Resources</p>
                    <div className="mega-res-list">
                      {[
                        { icon: <GitBranch size={15}/>, title: 'How it works',          desc: 'See the end-to-end workflow',      href: '#workflow' },
                        { icon: <PieChart size={15}/>,  title: 'Analytics & Reporting', desc: 'KPIs, dashboards, and insights',   href: '/reporting' },
                        { icon: <ShieldCheck size={15}/>, title: 'Security',            desc: 'Data privacy & enterprise grade',  href: '/security' },
                      ].map(r => (
                        <a href={r.href} className="mega-res-item" key={r.title} onClick={() => setProductOpen(false)}>
                          <div className="mega-res-icon">{r.icon}</div>
                          <div><strong>{r.title}</strong><span>{r.desc}</span></div>
                        </a>
                      ))}
                    </div>
                    <Link to="/book-demo" className="mega-demo-cta" onClick={() => setProductOpen(false)}>
                      Book a demo <ArrowRight size={13}/>
                    </Link>
                  </div>

                </div>
              </div>
            </div>

            {/* nav links */}
            <a href="#solution">Solution</a>
            <a href="#workflow">Workflow</a>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="nav-login">Log in</Link>
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
              <div className="hero-actions">
                <Link to="/book-demo" className="btn btn-primary btn-lg btn-pill">
                  Book a demo <ArrowRight size={16} />
                </Link>
                <Link to="/assessment" className="btn btn-outline btn-lg btn-pill">
                  Get your free assessment <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ LOGO TICKER ══ */}
        <LogoTicker />

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
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#A56D58" stopOpacity="0.22"/>
                    <stop offset="55%"  stopColor="#A56D58" stopOpacity="0.07"/>
                    <stop offset="100%" stopColor="#A56D58" stopOpacity="0"/>
                  </radialGradient>
                </defs>

                {/* Glow — hub center (400,300) */}
                <ellipse cx="400" cy="300" rx="185" ry="155" fill="url(#hubGlow)"/>

                {/* Orbital rings — smaller than node positions so nodes sit clearly outside */}
                <ellipse cx="400" cy="300" rx="130" ry="105"
                  fill="none" stroke="#A56D58" strokeOpacity="0.10" strokeWidth="1.2"/>
                <ellipse cx="400" cy="300" rx="205" ry="168"
                  fill="none" stroke="#A56D58" strokeOpacity="0.06" strokeWidth="1.2"/>

                {/* Connectors — 8 nodes → hub (400,300)
                    p1 SAP(227,159)  p2 Dynamics(573,159)
                    p3 Oracle(155,300) p4 SharePoint(645,300)
                    p5 Coupa(227,441) p6 Azure(400,500)
                    p7 Excel(573,441) p8 Workday(400,100) */}
                <path id="p1" d="M227,159 Q314,230 400,300"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p2" d="M624,159 Q512,230 400,300"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p3" d="M155,300 Q278,300 400,300"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p4" d="M645,300 Q522,300 400,300"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p5" d="M227,441 Q314,371 400,300"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p6" d="M400,500 Q400,400 400,300"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p7" d="M573,441 Q487,371 400,300"
                  fill="none" stroke="#A56D58" strokeWidth="0.9" strokeOpacity="0.16"/>
                <path id="p8" d="M400,100 Q400,200 400,300"
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
                <circle r="2.8" fill="#A56D58" opacity="0.90">
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.6s">
                    <mpath href="#p8"/>
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
              <div className="orbit-anchor anchor-workday">
                <div className="int-card"><LogoWorkday /><span>Workday</span></div>
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
              <h2>Turn complex procurement data into savings.</h2>
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
                industry: 'US Retail Group',
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
              {
                industry: 'Healthcare System',
                spend: '$320M annual spend',
                challenge: 'Complex supplier landscape across medical devices, pharmaceuticals, and services. No unified category structure across hospital entities.',
                results: [
                  'Spend taxonomy harmonized across 8 hospital entities',
                  'Medical device spend classified at 96% accuracy',
                  'Contract compliance gaps surfaced across 3 categories',
                ],
                saving: '$4.1M in contract leakage identified',
              },
              {
                industry: 'Global Banking Group',
                spend: '$600M annual spend',
                challenge: 'Procurement operating across 12 countries with inconsistent supplier master data and no cross-entity spend visibility.',
                results: [
                  'Supplier master harmonized across 12 entities',
                  '94% of indirect spend auto-classified',
                  'Procurement risk reduced through supplier deduplication',
                ],
                saving: '$7.2M savings opportunity identified',
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

        {/* ══ TRUST STATS ══ */}
        <section className="trust-stats-section">
          <div className="container">
            <div className="section-head centered">
              <span className="eyebrow">Why teams choose Dolphin AI</span>
              <h2>Built for the reality of procurement data</h2>
              <div className="section-rule" />
            </div>
            <div className="trust-stats-grid">
              {[
                { value: '95%+',   label: 'Classification accuracy',        sub: 'Across L1–L4 taxonomy levels' },
                { value: '80%',    label: 'Less time on data cleaning',      sub: 'Compared to manual Excel work' },
                { value: '4×',     label: 'Faster category analysis',        sub: 'From raw data to insights' },
                { value: '<24h',   label: 'Time to first results',           sub: 'From data upload to classified output' },
                { value: '360°',   label: 'Supplier visibility',             sub: 'Normalized across all ERP sources' },
                { value: '100%',   label: 'Data stays yours',                sub: 'Never used for model training' },
              ].map(s => (
                <div className="trust-stat-card" key={s.label}>
                  <span className="trust-stat-value">{s.value}</span>
                  <strong className="trust-stat-label">{s.label}</strong>
                  <span className="trust-stat-sub">{s.sub}</span>
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
              { q: "How long does it take to get started?", a: "It depends on the quality and complexity of your data. We start with a sample, configure your taxonomy, and deliver a first classification run before full deployment. The cleaner and more structured your data, the faster we can move." },
              { q: "Is our spend data secure?", a: "Yes. All data is encrypted in transit and at rest, and your data is never used to train models or shared with third parties. We sign NDAs and DPAs as standard." },
              { q: "What's the difference between the plans?", a: "Starter is for teams with under $10M spend and basic needs. Professional adds more suppliers, integrations, and advanced reporting. Enterprise covers unlimited scope, dedicated support, and custom integrations." },
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
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/reporting" element={<ReportingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

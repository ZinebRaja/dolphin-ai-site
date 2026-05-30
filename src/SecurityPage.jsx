import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Server, Eye, FileCheck, Users } from 'lucide-react';

const PILLARS = [
  {
    icon: <Lock size={22} />,
    title: 'Encryption in transit & at rest',
    body: 'All data is encrypted in transit using TLS 1.2+ and encrypted at rest using AES-256. This applies to every spend file, API call, and database record — without exception.',
  },
  {
    icon: <Server size={22} />,
    title: 'Azure cloud infrastructure',
    body: 'Dolphin AI runs on Microsoft Azure, one of the world\'s most trusted enterprise cloud platforms. Data is stored in EU-region datacentres with 99.9%+ availability SLA and automatic backups.',
  },
  {
    icon: <Eye size={22} />,
    title: 'Your data is never shared',
    body: 'Your spend data is never used to train AI models, benchmarked against other clients, or shared with any third party. Each client\'s data is fully isolated at the storage and processing level.',
  },
  {
    icon: <FileCheck size={22} />,
    title: 'GDPR compliant',
    body: 'We process personal and organisational data in accordance with GDPR. We sign Data Processing Agreements (DPAs) as standard for all enterprise clients and respond to data subject requests within 30 days.',
  },
  {
    icon: <Users size={22} />,
    title: 'Access controls',
    body: 'Role-based access control (RBAC) ensures users only see data relevant to their role. All authentication is logged and monitored. We support SSO integration for enterprise accounts.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Data retention & deletion',
    body: 'Spend data uploaded for classification is retained for 90 days after project completion, then permanently deleted. You can request immediate deletion at any time. We confirm all deletions in writing.',
  },
];

const FAQS = [
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We sign mutual NDAs as standard before any data is shared or any demo involving real spend data is conducted.',
  },
  {
    q: 'Do you sign Data Processing Agreements (DPAs)?',
    a: 'Yes. We provide a standard DPA for all paid clients. Enterprise clients can request addendums to cover specific compliance requirements.',
  },
  {
    q: 'Where is our data stored?',
    a: 'Data is stored on Microsoft Azure in EU-region datacentres (West Europe / North Europe). We can discuss specific region requirements for enterprise contracts.',
  },
  {
    q: 'Can we request a security review or questionnaire?',
    a: 'Yes. We complete standard vendor security questionnaires and can provide a security summary document for your procurement or IT security team on request.',
  },
  {
    q: 'What happens to our data when we cancel?',
    a: 'You can export all your data at any time. On cancellation, your data is retained for 30 days for recovery purposes, then permanently deleted from all systems.',
  },
];

export default function SecurityPage() {
  return (
    <div className="site">
      <Navbar />

      <main>

        {/* Hero */}
        <section className="sec-hero">
          <div className="container sec-hero-inner">
            <span className="eyebrow">Security & Trust</span>
            <h1>Your spend data is safe with us</h1>
            <p>
              Enterprise procurement data is sensitive. We built Dolphin AI with security as a
              first principle — not an afterthought.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="sec-pillars container">
          <div className="sec-pillars-grid">
            {PILLARS.map(p => (
              <div className="sec-pillar-card" key={p.title}>
                <div className="sec-pillar-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust bar */}
        <section className="sec-trust">
          <div className="container sec-trust-inner">
            {[
              { label: 'TLS 1.2+',     sub: 'Encryption in transit' },
              { label: 'AES-256',      sub: 'Encryption at rest' },
              { label: 'Azure EU',     sub: 'EU-region cloud storage' },
              { label: 'GDPR',         sub: 'Compliant by design' },
              { label: 'DPA',          sub: 'Signed as standard' },
              { label: '90 days',      sub: 'Max data retention' },
            ].map(t => (
              <div className="sec-trust-item" key={t.label}>
                <strong>{t.label}</strong>
                <span>{t.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="sec-faq container">
          <div className="section-head centered">
            <span className="eyebrow">Security FAQ</span>
            <h2>Common questions from security & IT teams</h2>
            <div className="section-rule" />
          </div>
          <div className="sec-faq-list">
            {FAQS.map(f => (
              <div className="sec-faq-item" key={f.q}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="sec-cta">
          <div className="container sec-cta-inner">
            <h2>Have specific security requirements?</h2>
            <p>We're happy to complete your vendor security questionnaire, provide documentation, or arrange a technical security review.</p>
            <Link to="/book-demo" className="btn btn-primary btn-lg">Talk to our team</Link>
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

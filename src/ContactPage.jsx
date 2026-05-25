import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, MessageSquare, BarChart3, Handshake } from 'lucide-react';

const REASONS = [
  {
    icon: <BarChart3 size={22} />,
    title: 'Talk to Sales',
    desc: 'Get a personalised walkthrough of how Dolphin AI fits your procurement stack.',
    cta: 'Book a demo',
    href: '/book-demo',
  },
  {
    icon: <MessageSquare size={22} />,
    title: 'General Enquiries',
    desc: 'Questions about our platform, pricing, or data approach? We\'re happy to help.',
    cta: 'Send a message',
    href: '#contact-form',
  },
  {
    icon: <Handshake size={22} />,
    title: 'Partnerships',
    desc: 'Interested in integrating with Dolphin AI or exploring a partnership opportunity?',
    cta: 'Get in touch',
    href: '#contact-form',
  },
];

const SPEND_RANGES = [
  'Under $100M', '$100M – $500M', '$500M – $1B', '$1B – $5B', 'Over $5B',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', spend: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  async function submit(e) {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setSubmitted(true);
  }

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
            <Link to="/contact" style={{ color: 'var(--navy)', fontWeight: 700 }}>Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="nav-login">Log in</Link>
          </div>
        </div>
      </header>

      <main>

        {/* Hero */}
        <section className="contact-hero">
          <div className="container contact-hero-inner">
            <span className="eyebrow">Contact us</span>
            <h1>Let's talk spend intelligence</h1>
            <p>Whether you're evaluating Dolphin AI, already a customer, or just curious — our team responds within one business day.</p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="contact-cards-section container">
          <div className="contact-cards-grid">
            {REASONS.map(r => (
              <div className="contact-card" key={r.title}>
                <div className="contact-card-icon">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <a href={r.href} className="contact-card-link">
                  {r.cta} <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Form + Info */}
        <section className="contact-body container" id="contact-form">
          <div className="contact-body-grid">

            {/* Form */}
            <div className="contact-form-wrap">
              <h2>Send us a message</h2>
              <p className="contact-form-sub">Fill in the form and a member of our team will be in touch shortly.</p>

              {submitted ? (
                <div className="contact-success">
                  <span className="contact-success-icon">✓</span>
                  <h3>Message received!</h3>
                  <p>We'll get back to you within one business day.</p>
                  <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Back to home
                  </Link>
                </div>
              ) : (
                <form className="contact-form" onSubmit={submit}>
                  <div className="cf-row">
                    <div className="cf-field">
                      <label>Full name *</label>
                      <input name="name" value={form.name} onChange={handle} required placeholder="Jane Smith" />
                    </div>
                    <div className="cf-field">
                      <label>Company *</label>
                      <input name="company" value={form.company} onChange={handle} required placeholder="Acme Corp" />
                    </div>
                  </div>
                  <div className="cf-field">
                    <label>Work email *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} required placeholder="jane@acme.com" />
                  </div>
                  <div className="cf-field">
                    <label>Annual spend under management</label>
                    <select name="spend" value={form.spend} onChange={handle}>
                      <option value="">Select a range</option>
                      {SPEND_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="cf-field">
                    <label>Message *</label>
                    <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="Tell us about your procurement data challenge..." />
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">
                    Send message <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="contact-info">
              <div className="contact-info-card">
                <h3>Contact information</h3>
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><Phone size={16} /></div>
                    <div>
                      <strong>Phone</strong>
                      <a href="tel:+19728120398">+1 972 812 0398</a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><Mail size={16} /></div>
                    <div>
                      <strong>Email</strong>
                      <a href="mailto:hello@dolphin-ai.com">hello@dolphin-ai.com</a>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><MapPin size={16} /></div>
                    <div>
                      <strong>Office</strong>
                      <span>7301 State Highway 161 Ste 148<br />Irving, TX 75039</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-info-card contact-demo-card">
                <h3>Prefer to see it first?</h3>
                <p>Book a live 30-minute demo and see how Dolphin AI handles your real spend data.</p>
                <Link to="/book-demo" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Book a demo <ArrowRight size={15} />
                </Link>
              </div>

              <div className="contact-info-card">
                <h3>Response time</h3>
                <div className="contact-sla-list">
                  <div className="contact-sla-item">
                    <span className="contact-sla-dot orange" />
                    <div><strong>Sales enquiries</strong><span>Within 4 business hours</span></div>
                  </div>
                  <div className="contact-sla-item">
                    <span className="contact-sla-dot gray" />
                    <div><strong>General questions</strong><span>Within 1 business day</span></div>
                  </div>
                  <div className="contact-sla-item">
                    <span className="contact-sla-dot gray" />
                    <div><strong>Partnerships</strong><span>Within 2 business days</span></div>
                  </div>
                </div>
              </div>
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

import Navbar from './Navbar.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Calendar, Clock, Users } from 'lucide-react';

const API_URL       = import.meta.env.VITE_API_URL || 'https://dolphinai-api-c2a8ezgdctakh9g0.centralus-01.azurewebsites.net';
const COMPANY_SIZES = ['1–50', '51–200', '201–500', '501–2,000', '2,000–10,000', '10,000+'];
const SPEND_RANGES  = ['Under $5M', '$5M–$25M', '$25M–$100M', '$100M–$500M', 'Over $500M'];
const ROLES         = ['CPO / Head of Procurement', 'Procurement Manager', 'Finance / CFO', 'Data / Analytics', 'IT', 'Other'];

export default function BookDemoPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', company: '',
    role: '', companySize: '', annualSpend: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.company) {
      setError('Please fill in all required fields.'); return;
    }
    setError('');
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/book-demo`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Cannot reach the server. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* Navbar */}
      <Navbar />

      <main className="demo-main">
        <div className="demo-layout container">

          {/* ── Left: info panel ── */}
          <div className="demo-info">
            <span className="eyebrow">Book a demo</span>
            <h1 className="demo-title">See Dolphin AI in action</h1>
            <p className="demo-sub">
              In 30 minutes we'll show you how Dolphin AI cleans, normalizes, and classifies your
              spend data — and estimate the savings potential for your specific data.
            </p>

            <div className="demo-perks">
              {[
                { icon: <Clock size={18} />,    text: '30-minute live walkthrough' },
                { icon: <Users size={18} />,    text: 'Tailored to your procurement setup' },
                { icon: <Calendar size={18} />, text: 'Pick a time that works for you' },
                { icon: <CheckCircle2 size={18} />, text: 'No commitment required' },
              ].map(({ icon, text }) => (
                <div className="demo-perk" key={text}>
                  <span className="perk-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="demo-quote">
              <p>"Dolphin AI cut our data cleaning time by 80% and gave us confidence in our spend reports for the first time."</p>
              <span>— Head of Procurement, $2B manufacturing group</span>
            </div>
          </div>

          {/* ── Right: form or success ── */}
          <div className="demo-form-wrap">
            {submitted ? (
              <div className="demo-success">
                <div className="success-icon"><CheckCircle2 size={40} /></div>
                <h2>You're booked in!</h2>
                <p>Thanks, <strong>{form.firstName}</strong>. We'll send a calendar invite to <strong>{form.email}</strong> within the next few hours.</p>
                <p style={{ color: 'var(--gray-400)', fontSize: '13.5px' }}>
                  While you wait, explore how the classifier works.
                </p>
                <Link to="/demo-video" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                  Try the classifier <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="demo-form">
                <h2 className="form-heading">Tell us about yourself</h2>

                {/* Name row */}
                <div className="signup-row">
                  <div className="login-field">
                    <label>First name <span className="req">*</span></label>
                    <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="Jane" autoFocus />
                  </div>
                  <div className="login-field">
                    <label>Last name <span className="req">*</span></label>
                    <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Smith" />
                  </div>
                </div>

                <div className="login-field">
                  <label>Work email <span className="req">*</span></label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" />
                </div>

                <div className="login-field">
                  <label>Company <span className="req">*</span></label>
                  <input type="text" value={form.company} onChange={set('company')} placeholder="Acme Corp" />
                </div>

                <div className="signup-row">
                  <div className="login-field">
                    <label>Your role</label>
                    <select value={form.role} onChange={set('role')}>
                      <option value="">Select…</option>
                      {ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="login-field">
                    <label>Number of employees</label>
                    <select value={form.companySize} onChange={set('companySize')}>
                      <option value="">Select…</option>
                      {COMPANY_SIZES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="login-field">
                  <label>Annual addressable spend</label>
                  <select value={form.annualSpend} onChange={set('annualSpend')}>
                    <option value="">Select…</option>
                    {SPEND_RANGES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div className="login-field">
                  <label>What are you trying to solve? <span className="optional">(optional)</span></label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="e.g. We have messy supplier data across 3 ERP systems and can't trust our category reports…"
                  />
                </div>

                {error && <div className="login-error">{error}</div>}

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? 'Sending…' : <>Book my demo <ArrowRight size={16} /></>}
                </button>

                <p className="signup-terms" style={{ marginTop: '0.75rem' }}>
                  We'll never share your data. <a href="#">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

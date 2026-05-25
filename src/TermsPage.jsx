import { Link } from 'react-router-dom';

export default function TermsPage() {
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
            <Link to="/book-demo" className="btn btn-primary">Book a demo</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2rem)', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>Terms of Service</h1>
        <p style={{ color: 'var(--gray-400)', fontSize: '13.5px', marginBottom: '2.5rem' }}>Last updated: May 2026</p>

        {[
          {
            title: '1. Acceptance of terms',
            body: 'By accessing or using Dolphin AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Service. These terms apply to all users, including visitors, registered accounts, and clients under a paid subscription.'
          },
          {
            title: '2. Description of service',
            body: 'Dolphin AI is a spend intelligence platform that provides spend classification, supplier normalization, and procurement analytics services. We process spend data provided by clients and return structured, classified outputs via our platform, API, or file export.'
          },
          {
            title: '3. Account registration',
            body: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately at raja.essahri@dolphinaipro.com if you suspect unauthorized access.'
          },
          {
            title: '4. Acceptable use',
            body: 'You agree to use the Service only for lawful business purposes. You may not: (a) attempt to reverse-engineer or copy the platform; (b) upload malicious code or harmful data; (c) resell or sublicense access without written permission; (d) use the Service in a way that violates applicable laws or third-party rights.'
          },
          {
            title: '5. Data ownership',
            body: 'You retain full ownership of all spend data you upload or connect to the Service. Dolphin AI processes your data solely to deliver the contracted services. We do not use your data to train AI models, share it with other clients, or sell it to third parties. Data processing is governed by our Privacy Policy and any applicable Data Processing Agreement (DPA).'
          },
          {
            title: '6. Payment and billing',
            body: 'Paid plans are billed monthly or annually as agreed at the time of purchase. All fees are non-refundable unless otherwise stated in writing. We reserve the right to suspend access if payment is overdue by more than 14 days. Pricing is subject to change with 30 days written notice.'
          },
          {
            title: '7. Service availability',
            body: 'We aim to provide 99.5%+ uptime across all plans. Scheduled maintenance will be communicated in advance. We are not liable for downtime caused by third-party infrastructure providers, force majeure events, or factors outside our reasonable control.'
          },
          {
            title: '8. Intellectual property',
            body: 'All platform software, algorithms, UI designs, and taxonomy frameworks developed by Dolphin AI remain our exclusive intellectual property. Nothing in these terms grants you a license to copy, distribute, or create derivative works from our platform or methodology.'
          },
          {
            title: '9. Limitation of liability',
            body: 'To the maximum extent permitted by law, Dolphin AI shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability in any circumstance shall not exceed the fees paid by you in the 12 months preceding the claim.'
          },
          {
            title: '10. Termination',
            body: 'Either party may terminate the agreement with 30 days written notice. We may terminate immediately for material breach of these terms. Upon termination, your data will be retained for 30 days then deleted, and you will lose access to the platform.'
          },
          {
            title: '11. Governing law',
            body: 'These terms are governed by the laws of the State of Texas, United States. Any disputes shall be resolved in the courts of Dallas County, Texas. Clients in the European Union may also have rights under applicable EU law.'
          },
          {
            title: '12. Changes to terms',
            body: 'We may update these Terms of Service from time to time. We will notify you of material changes by email or via the platform at least 14 days before they take effect. Continued use after changes constitutes acceptance of the updated terms. Contact us at raja.essahri@dolphinaipro.com with any questions.'
          },
        ].map(s => (
          <div key={s.title} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>{s.title}</h2>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
          </div>
        ))}
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

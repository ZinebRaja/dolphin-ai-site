import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg,#fff 0%,#FDF6F2 40%,#F0DDD4 100%)', padding: '2rem', textAlign: 'center' }}>
      <span style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--copper)', opacity: 0.15, lineHeight: 1 }}>404</span>
      <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--navy)', margin: '0.5rem 0 0.75rem' }}>Page not found</h1>
      <p style={{ color: 'var(--gray-600)', maxWidth: '380px', lineHeight: 1.6, marginBottom: '2rem' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to home <ArrowRight size={15} />
      </Link>
    </div>
  );
}

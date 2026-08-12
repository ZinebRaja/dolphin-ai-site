import Navbar from './Navbar.jsx';

export default function PowerBIPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#111' }}>
      <Navbar />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <iframe
          src="/spend-dashboard.html"
          title="Spend Intelligence Dashboard"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allowFullScreen
        />
      </div>
    </div>
  );
}

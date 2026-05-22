import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-inner">
        <div className="cookie-text">
          <strong>We use cookies</strong>
          <p>
            We use essential cookies to keep the site working and optional analytics cookies
            to understand how visitors use it. See our{' '}
            <Link to="/privacy">Privacy Policy</Link> for details.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="btn cookie-decline" onClick={decline}>Decline</button>
          <button className="btn btn-primary cookie-accept" onClick={accept}>Accept all</button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CITIES, KEYWORDS } from '../constants';

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.93 2 2 0 0 1 3.6 2.72h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const Footer = () => {
  const [showAllCities, setShowAllCities] = useState(false);
  const displayedCities = showAllCities ? CITIES : CITIES.slice(0, 20);

  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.15em', // Increased from 11
    color: 'var(--gold2)', textTransform: 'uppercase', marginBottom: 20,
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7,
  };

  const linkStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-sans)', fontSize: 13,
    color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 12,
    transition: 'color 0.2s',
  };

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '80px 24px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* ─── MAIN GRID ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 64 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 62, height: 62, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                boxShadow: '0 0 0 2px var(--gold), 0 4px 20px rgba(0,0,0,0.4)',
                background: '#1A0E00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src="/ws-emblem.webp"
                  alt="White Stone WS Emblem"
                  width={62}
                  height={62}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    transform: 'scale(2.1)', // Max consistency: Same scale as navbar and home page
                    display: 'block' 
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1 }}>WHITE STONE</div>
                <div style={{ fontFamily: 'var(--font-hindi)', fontSize: 13, color: 'rgba(201,168,76,0.7)', lineHeight: 1 }}>व्हाइट स्टोन अगरबत्ती</div>
              </div>
            </div>
            <p style={{ ...bodyStyle, marginBottom: 24 }}>
              Premium handcrafted agarbatti since 2004. Rooted in Indian tradition, refined for the sacred home.
              Natural, charcoal-free incense sticks from Chiplun, Maharashtra.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: <LocationIcon />, text: 'Chiplun, Ratnagiri, Maharashtra', href: undefined },
                { icon: <PhoneIcon />, text: '+91 92269 15311', href: 'tel:+919226915311' },
                { icon: <EmailIcon />, text: 'shreeganesha645@gmail.com', href: 'mailto:shreeganesha645@gmail.com' },
              ].map((item, i) => (
                item.href ? (
                  <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, ...bodyStyle, textDecoration: 'none' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{item.icon}</span>
                    {item.text}
                  </a>
                ) : (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, ...bodyStyle }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{item.icon}</span>
                    {item.text}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={headingStyle}>QUICK LINKS</div>
            {[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Wholesale', href: '/wholesale' },
              { label: 'About Us', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
            ].map(link => (
              <a key={link.label} href={link.href} style={linkStyle}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--gold)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
              >{link.label}</a>
            ))}
            <div style={{ marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <div style={{ ...headingStyle, marginTop: 0 }}>OUR FRAGRANCES</div>
              {['Rose Gold', 'Black Oudh', 'Camphor Jasmine', 'Chandan Natural', 'Chafa Green'].map(p => (
                <div key={p} style={{ ...bodyStyle, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--gold)', fontSize: 8 }}>✦</span> {p}
                </div>
              ))}
            </div>
          </div>

          {/* Order CTA */}
          <div>
            <div style={headingStyle}>ORDER NOW</div>
            <p style={{ ...bodyStyle, marginBottom: 24 }}>Ready to experience divine fragrance? Order directly on WhatsApp for fastest delivery across Maharashtra and India.</p>
            <a
              href="https://wa.me/919226915311?text=Hello%2C%20I%20want%20to%20order%20White%20Stone%20Agarbatti"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
              aria-label="Order on WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.54 4.063 1.489 5.778L0 24l6.389-1.673A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.914 0-3.713-.496-5.279-1.364l-.379-.224-3.932 1.028 1.045-3.818-.247-.395A9.942 9.942 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WHATSAPP ORDER
            </a>
          </div>
        </div>

        {/* ─── CITIES WE SERVE ─── */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 48, marginBottom: 48 }}>
          <div style={headingStyle}>WE DELIVER ACROSS MAHARASHTRA — {CITIES.length} CITIES &amp; COUNTING</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 0' }}>
            {displayedCities.map((city, i) => (
              <React.Fragment key={city.id}>
                <a
                  href={`/city/${city.id}`}
                  style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-dark)', // Darker
                    textDecoration: 'none', padding: '2px 0',
                    transition: 'color 0.2s', whiteSpace: 'nowrap',
                    fontWeight: 700, // Bold
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--gold)')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-dark)')}
                  title={`Buy agarbatti in ${city.name} — White Stone`}
                >
                  {city.name}
                </a>
                {i < displayedCities.length - 1 && (
                  <span style={{ color: 'var(--border)', margin: '0 10px', fontFamily: 'var(--font-sans)', fontSize: 13 }}>·</span>
                )}
              </React.Fragment>
            ))}
            {!showAllCities && CITIES.length > 20 && (
              <>
                <span style={{ color: 'var(--border)', margin: '0 10px', fontFamily: 'var(--font-sans)', fontSize: 13 }}>·</span>
                <button
                  onClick={() => setShowAllCities(true)}
                  style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--gold)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
                    textDecoration: 'underline',
                  }}
                >
                  +{CITIES.length - 20} more cities
                </button>
              </>
            )}
          </div>
        </div>

        {/* ─── SEO KEYWORD FOOTER ─── */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, marginBottom: 24, width: '100%' }}>
          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: 11, 
            color: 'rgba(51,51,51,0.8)', 
            lineHeight: 1.8, 
            width: '100%',
            fontWeight: 700,
            textAlign: 'left' // Changed from justify to left as per "not needed space"
          }}>
            White Stone Agarbatti — {KEYWORDS.join(' · ')}
          </p>
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#999', margin: 0 }}>
              &copy; 2025 White Stone Agarbatti. All rights reserved. Chiplun, Maharashtra, India. | Agarbatti Manufacturer &amp; Wholesale Supplier.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--gold2)', fontWeight: 800, letterSpacing: '0.05em', margin: 0 }}>
              WEBSITE DEVELOP AND SEO BY <a 
                href="http://sunmargindia.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >SUNMARG INDIA</a>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a
              href="/privacy"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--gold)')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#aaa')}
            >Privacy Policy</a>
            <a
              href="/terms"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--gold)')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '#aaa')}
            >Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

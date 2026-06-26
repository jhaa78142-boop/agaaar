import React, { useState, useEffect } from 'react';

export const FloatingUI = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="floating-btn" role="complementary" aria-label="Quick actions" style={{ 
      position: 'fixed', 
      bottom: 24, 
      right: 24, 
      zIndex: 1000, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 12 
    }}>
      {/* Call Us Button */}
      <a
        href="tel:+919226915311"
        aria-label="Call White Stone"
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--gold)', color: '#1A0E00',
          padding: '10px 18px', borderRadius: 40,
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 800,
          letterSpacing: '0.06em', textDecoration: 'none',
          boxShadow: '0 4px 15px rgba(201,168,76,0.3)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          willChange: 'transform',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(201,168,76,0.4)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'none';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(201,168,76,0.3)';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.93 2 2 0 0 1 3.6 2.72h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        CALL US
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919226915311?text=Hello%2C%20I%20am%20interested%20in%20White%20Stone%20Agarbatti"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#25D366', color: '#FFFFFF',
          padding: '12px 24px', borderRadius: 40,
          fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
          letterSpacing: '0.06em', textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          willChange: 'transform',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(37,211,102,0.5)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'none';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.54 4.063 1.489 5.778L0 24l6.389-1.673A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.914 0-3.713-.496-5.279-1.364l-.379-.224-3.932 1.028 1.045-3.818-.247-.395A9.942 9.942 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        ORDER NOW
      </a>
    </div>
  );
};

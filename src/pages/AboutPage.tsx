import React, { useState, useEffect, useRef } from 'react';
import { KEYWORDS } from '../constants';
import { useSEO } from '../hooks/useSEO';

export const AboutPage = () => {
  const canonical = 'https://whitestoneagarbatti.com/about';

  useSEO({
    title: 'About White Stone | Premium Agarbatti Brand India Since 2004',
    description: "Discover White Stone's heritage since 2004. Learn about our commitment to pure, handmade agarbatti and sacred craft traditions from Chiplun, Maharashtra.",
    keywords: KEYWORDS.join(', '),
    canonical,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRef.current.offsetHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (heroHeight * 0.6)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="page-enter" style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', paddingTop: 112, paddingBottom: 80,
      }}>
        {/* Background image 1 — Chandan Natural (visible initially) */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/hero-bg-1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1 - scrollProgress,
          transition: 'opacity 0.05s linear',
        }} />

        {/* Background image 2 — Rose Gold (revealed on scroll) */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/hero-bg-2.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: scrollProgress,
          transition: 'opacity 0.05s linear',
        }} />

        {/* Dark overlay for text readability */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(10,5,0,0.55) 0%, rgba(10,5,0,0.45) 50%, rgba(10,5,0,0.65) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Grid overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Corner accents */}
        {([
          { top: 140, left: 24 },
          { top: 140, right: 24 },
          { bottom: 40, left: 24 },
          { bottom: 40, right: 24 },
        ] as React.CSSProperties[]).map((s, i) => (
          <div key={i} aria-hidden="true" style={{
            position: 'absolute', width: 50, height: 50, zIndex: 2,
            borderTop: i < 2 ? '1px solid rgba(201,168,76,0.5)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(201,168,76,0.5)' : 'none',
            borderLeft: i % 2 === 0 ? '1px solid rgba(201,168,76,0.5)' : 'none',
            borderRight: i % 2 !== 0 ? '1px solid rgba(201,168,76,0.5)' : 'none',
            ...s,
          }} />
        ))}

        {/* Watermark text */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: -20, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(64px,14vw,200px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.08)',
          letterSpacing: '0.08em', lineHeight: 1, userSelect: 'none', zIndex: 2,
        }}>WHITE STONE</div>

        {/* Scroll indicator dots */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 3,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          <div style={{
            width: scrollProgress < 0.5 ? 24 : 8, height: 8, borderRadius: 4,
            background: scrollProgress < 0.5 ? 'var(--gold)' : 'rgba(201,168,76,0.4)',
            transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
          }} />
          <div style={{
            width: scrollProgress >= 0.5 ? 24 : 8, height: 8, borderRadius: 4,
            background: scrollProgress >= 0.5 ? 'var(--gold)' : 'rgba(201,168,76,0.4)',
            transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
          }} />
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(44px,7vw,88px)', color: '#FFFBF0', marginBottom: 32, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.5)', letterSpacing: '-0.02em' }}>Two Decades of<br />Sacred Craft</h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 500, color: 'rgba(253,246,227,0.88)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>
            White Stone was born in 2004 in Chiplun, Maharashtra — dedicated to preserving the sacred art of agarbatti craftsmanship.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '0 24px 80px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', paddingTop: 64 }}>
          {[
            "White Stone began with a simple vision: to create the finest agarbatti using only natural ingredients and traditional methods. For over twenty years, we've been honoring the spiritual significance of incense while maintaining rigorous quality standards.",
            "Our commitment to purity means every stick is handmade by skilled artisans who understand that premium incense sticks are not merely fragrances — they're vessels of devotion. We source natural sandalwood, organic resins, and botanical essences to create long-lasting agarbatti that connects you to ancient traditions.",
            "Today, White Stone serves over 10,000 sacred homes across India. Our charcoal-free agarbatti and temple-grade products have become synonymous with quality. Whether you're buying agarbatti online for daily meditation or seeking bulk agarbatti for your temple, White Stone remains your trusted partner in spiritual practice.",
          ].map((para, i) => (
            <p key={i} className="reveal-on-scroll" style={{ 
              fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--text-mid)', 
              lineHeight: 1.9, marginBottom: 28, transitionDelay: `${i * 0.15}s` 
            }}>{para}</p>
          ))}
        </div>
      </section>

      {/* Three Pillars */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(32px,4vw,56px)', color: 'var(--text-dark)', textAlign: 'center', marginBottom: 64, letterSpacing: '-0.02em' }}>Our Pillars</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
            {[
              { title: 'PURITY', desc: 'We use only natural ingredients with no chemical additives or artificial fragrances. Every batch is tested for purity.', icon: '🌿' },
              { title: 'CRAFT', desc: 'Each stick is handmade by artisans who dedicate their lives to perfection. Traditional methods, modern consistency.', icon: '🎨' },
              { title: 'HERITAGE', desc: 'We honor 2,000+ years of Vedic tradition in every product we create. Sacred knowledge passed down through generations.', icon: '🙏' },
            ].map((pillar, i) => (
              <div key={pillar.title} className="reveal-on-scroll" style={{ 
                textAlign: 'center', padding: '40px 24px', background: 'var(--bg2)', 
                border: '1px solid var(--border)', borderTop: '3px solid var(--gold)', 
                borderRadius: 12, transitionDelay: `${i * 0.2}s` 
              }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{pillar.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 16, color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 16 }}>{pillar.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text-dark)', marginBottom: 40, letterSpacing: '-0.02em' }}>Why Choose White Stone?</h2>
          <ul style={{ listStyle: 'none' }}>
            {[
              '✦ 100% natural, charcoal-free formulation',
              '✦ Hand-rolled by skilled artisans in Maharashtra',
              '✦ Export quality – certified for international markets',
              '✦ 62 sticks per box with 45-50 minutes burn time',
              '✦ Consistent quality across every batch',
              '✦ Pan-India delivery with 5-7 day turnaround',
              '✦ Wholesale and private label options available',
            ].map(item => (
              <li key={item} style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 500, color: 'var(--text-mid)', padding: '14px 0', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div aria-hidden="true" style={{ fontSize: 1, color: 'var(--bg)', userSelect: 'none', overflow: 'hidden', height: 0 }}>{KEYWORDS.join(' ')}</div>
    </main>
  );
};

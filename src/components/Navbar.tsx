import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useIsMobile } from '../hooks/use-mobile';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const progress = useScrollProgress();
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PRODUCTS', href: '/products' },
    { label: 'WHOLESALE', href: '/wholesale' },
    { label: 'ABOUT', href: '/about' },
    { label: 'BLOG', href: '/blog' },
  ];

  const handleFAQClick = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
      }
    }
  };

  const isDark = theme === 'dark';

  const isHeroPage = currentPath === '/';

  const navBg = scrolled
    ? isDark ? 'rgba(5,3,8,0.98)' : 'rgba(255,255,255,0.98)'
    : 'transparent';

  const navBorder = scrolled
    ? isDark ? '1px solid rgba(201,168,76,0.15)' : '1px solid rgba(200,153,42,0.2)'
    : 'none';

  const navShadow = scrolled
    ? isDark ? '0 2px 20px rgba(0,0,0,0.5)' : '0 2px 20px rgba(107,58,42,0.06)'
    : 'none';

  const navLinkColor = 'var(--gold)';

  const WA_MESSAGE = encodeURIComponent('Hi, I found White Stone Agarbatti online. I would like to know more about your products and pricing.');

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, height: 2,
          width: `${progress}%`,
          background: 'linear-gradient(to right, var(--gold2), var(--gold), var(--gold3))',
          zIndex: 1000, transition: 'width 0.1s',
        }}
      />

      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 500,
          transition: 'background-color 0.4s cubic-bezier(0.22,1,0.36,1), border-bottom 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), padding 0.4s cubic-bezier(0.22,1,0.36,1)',
          backgroundColor: navBg,
          borderBottom: navBorder,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: navShadow,
          padding: scrolled ? '12px 24px' : '22px 24px',
          willChange: 'background-color, padding',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* LOGO */}
          <a
            href="/"
            aria-label="White Stone Agarbatti — Home"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}
          >
            <div style={{
              width: scrolled ? 44 : 54,
              height: scrolled ? 44 : 54,
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1)',
              border: scrolled ? `1.5px solid var(--gold)` : '1.5px solid rgba(255,255,255,0.4)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              background: '#1A0E00', // Solid dark background to hide any image transparency/artifacts
              willChange: 'width, height',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src="/ws-emblem.webp"
                alt="White Stone WS Emblem"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transform: 'scale(2.1)', // Senior Engineer: Even more aggressive scale to completely eliminate the white bars at the top/bottom
                  display: 'block' 
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginLeft: 12 }}>
              <span className="gold-shimmer" style={{
                fontFamily: 'var(--font-sans)', 
                fontWeight: 1000, 
                fontSize: scrolled ? 24 : 32, // Even larger
                letterSpacing: '-0.04em', // Slightly less negative for more impact
                textTransform: 'uppercase', 
                lineHeight: 1,
                transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                textShadow: '0 4px 24px rgba(201,168,76,0.6)', // Stronger shadow
                color: 'var(--gold)',
                WebkitFontSmoothing: 'antialiased',
                WebkitTextStroke: '0.5px var(--gold)', // Add a tiny stroke to make it even thicker
              }}>WHITE STONE</span>
              <span style={{
                fontFamily: 'var(--font-hindi)', 
                fontSize: scrolled ? 13 : 15, // Slightly larger
                fontWeight: 1000, // Maximum boldness for Hindi too
                color: scrolled ? (isDark ? '#FFF' : 'var(--brown)') : (isHeroPage ? '#FFF' : 'var(--gold)'), 
                lineHeight: 1.2, 
                transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                letterSpacing: '0.04em',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}>व्हाइट स्टोन</span>
            </div>
          </a>

          {/* Desktop Nav */}
          {!isMobile && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              background: scrolled ? 'transparent' : 'rgba(0,0,0,0.2)', // Add a subtle dark plate for high-contrast visibility when transparent
              padding: '8px 20px',
              borderRadius: 100,
              backdropFilter: scrolled ? 'none' : 'blur(8px)',
              border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.1)',
            }}>
              {navLinks.map(item => {
                const isActive = currentPath === item.href;
                return (
                  <Link 
                    key={item.label} 
                    to={item.href} 
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    style={{ 
                      color: scrolled 
                        ? (isDark ? 'var(--cream)' : 'var(--brown)') 
                        : (isActive ? 'var(--gold)' : '#FFFFFF'),
                      fontWeight: isActive ? 900 : 700, 
                      fontSize: 13,
                      letterSpacing: '0.08em',
                      padding: '8px 16px',
                      borderRadius: 100,
                      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                      background: isActive ? (scrolled ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.1)') : 'transparent',
                    }}
                  >{item.label}</Link>
                );
              })}
            </div>
          )}

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button 
              onClick={onToggleTheme} 
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              style={{
                border: '1px solid var(--gold)', 
                color: 'var(--gold)',
                background: 'transparent',
                fontFamily: 'var(--font-sans)', 
                fontSize: 12, 
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '10px 18px', 
                cursor: 'pointer', 
                borderRadius: 100,
                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                textTransform: 'uppercase',
                boxShadow: scrolled ? 'none' : '0 4px 15px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'var(--gold)';
                el.style.color = '#1A0E00';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                el.style.color = 'var(--gold)';
              }}
            >
              <span style={{ fontSize: 16 }}>{isDark ? '☀' : '☾'}</span>
              <span>{isDark ? 'LIGHT' : 'DARK'}</span>
            </button>

            {!isMobile && (
              <a href={`https://wa.me/919226915311?text=${WA_MESSAGE}`}
                target="_blank" rel="noopener noreferrer" className="btn-primary"
                style={{ 
                  padding: '12px 28px', 
                  fontSize: 13, 
                  fontWeight: 800, 
                  letterSpacing: '0.05em',
                  borderRadius: 100,
                  boxShadow: '0 8px 25px rgba(201,168,76,0.3)'
                }} 
                aria-label="Order now on WhatsApp"
              >ORDER NOW</a>
            )}

            {isMobile && (
              <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{ display: 'flex', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 22, height: 1.5, background: isDark ? 'var(--cream)' : '#3D2B1F', transition: 'all 0.3s',
                    transform: menuOpen
                      ? i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(5px, -5px)'
                      : 'none',
                  }} />
                ))}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, width: '100%',
            background: isDark ? 'rgba(5,3,8,0.99)' : 'rgba(255,255,255,0.99)',
            borderBottom: `1px solid var(--border)`, padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }}>
            {navLinks.map(item => (
              <Link 
                key={item.label} 
                to={item.href} 
                onClick={item.label === 'FAQ' ? handleFAQClick : () => setMenuOpen(false)}
                className={currentPath === item.href ? 'active' : ''}
                style={{
                  display: 'block', padding: '14px 0', fontFamily: 'var(--font-sans)', 
                  fontSize: 16, letterSpacing: '0.08em', color: 'var(--gold)',
                  textDecoration: 'none', textTransform: 'uppercase', fontWeight: 800,
                  borderBottom: '1px solid var(--border)', transition: 'color 0.2s',
                }}
              >{item.label}</Link>
            ))}
            <a href={`https://wa.me/919226915311?text=${WA_MESSAGE}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block', marginTop: 20, padding: '14px 24px', textAlign: 'center',
                background: 'var(--gold)', color: '#1A0E00', fontFamily: 'var(--font-sans)',
                fontSize: 14, letterSpacing: '0.05em', textDecoration: 'none',
                textTransform: 'uppercase', fontWeight: 500,
              }}
            >ORDER NOW</a>
          </div>
        )}
      </nav>
    </>
  );
};

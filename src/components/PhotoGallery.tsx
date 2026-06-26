import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useIsMobile } from '../hooks/use-mobile';

const SHOWCASE_IMAGES = [
  {
    src: '/hero-bg-1.webp',
    label: 'TEMPLE COLLECTION',
    caption: 'Sacred arrangements for daily puja rituals',
  },
  {
    src: '/hero-bg-2.webp',
    label: 'ROSE GOLD PACK',
    caption: 'Premium Rose Gold — Export Quality',
  },
  {
    src: '/hero-bg-3.webp',
    label: 'PRODUCT RANGE',
    caption: 'Full lineup of premium agarbatti',
  },
  {
    src: '/gemini-generated-image-q0o5itq0o5itq0o5.webp',
    label: 'BLACK OUDH',
    caption: 'Deep, mysterious, and spiritually grounding',
  },
];

export const PhotoGallery = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref: galleryRef, isIntersecting: galleryVisible } = useIntersectionObserver();
  const isMobile = useIsMobile();

  // Responsive columns
  const [columns, setColumns] = useState('repeat(4, 1fr)');
  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < 640) setColumns('1fr');
      else if (w < 900) setColumns('repeat(2, 1fr)');
      else setColumns('repeat(4, 1fr)');
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Auto-rotate active image
  useEffect(() => {
    const t = setInterval(() => setActiveImg(i => (i + 1) % SHOWCASE_IMAGES.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: '100px 0', background: '#0A0500', overflow: 'hidden', position: 'relative' }}>
      {/* Golden top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), var(--gold3), var(--gold), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), var(--gold3), var(--gold), transparent)' }} />

      {/* Background texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }} ref={galleryRef}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56, opacity: galleryVisible ? 1 : 0, transform: galleryVisible ? 'none' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: '6px 20px', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', backdropFilter: 'blur(8px)' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.2em', color: '#E8C96A' }}>OUR COLLECTION</span>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,5vw,68px)', fontStyle: 'italic', fontWeight: 700, color: '#FFFBF0', lineHeight: 1.1 }}>
            Crafted for the Sacred
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'rgba(253,246,227,0.6)', marginTop: 16, fontStyle: 'italic' }}>
            Every pack, a story of devotion
          </p>
        </div>

        {/* MAIN GALLERY LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: columns,
          gridTemplateRows: 'auto',
          gap: 4,
          opacity: galleryVisible ? 1 : 0,
          transform: galleryVisible ? 'none' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.22,1,0.36,1) 0.2s',
        }}>
          {SHOWCASE_IMAGES.map((img, i) => {
            const isActive = activeImg === i;
            const isHovered = hovered === i;
            const highlight = isActive || isHovered;
            return (
              <div
                key={i}
                onMouseEnter={() => { setHovered(i); setActiveImg(i); }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActiveImg(i)}
                style={{
                  position: 'relative',
                  height: 'clamp(280px, 40vw, 520px)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flexShrink: 0,
                  border: highlight ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.12)',
                  transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                  transform: highlight ? 'translateY(-4px)' : 'none',
                  zIndex: highlight ? 2 : 1,
                  boxShadow: highlight ? '0 24px 60px rgba(0,0,0,0.6)' : '0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                {/* Image */}
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  width={800}
                  height={600}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: highlight ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
                    filter: highlight ? 'brightness(0.85)' : 'brightness(0.6)',
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: highlight
                    ? 'linear-gradient(to top, rgba(10,5,0,0.85) 0%, rgba(10,5,0,0.2) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(10,5,0,0.7) 0%, rgba(10,5,0,0.4) 60%, transparent 100%)',
                  transition: 'background 0.5s',
                }} />

                {/* Active indicator bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(90deg, var(--gold), var(--gold3))',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.4s',
                }} />

                {/* Image number */}
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  fontFamily: 'var(--font-display)', fontSize: 10,
                  color: 'rgba(201,168,76,0.6)', letterSpacing: '0.1em',
                }}>0{i + 1} / 04</div>

                {/* Content */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '24px 20px',
                  transform: highlight ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 11,
                    letterSpacing: '0.2em', color: 'var(--gold3)',
                    marginBottom: 8, textTransform: 'uppercase',
                  }}>{img.label}</div>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontSize: 15,
                    color: '#FFFBF0', fontStyle: 'italic', lineHeight: 1.4,
                    opacity: highlight ? 1 : 0.7,
                    transition: 'opacity 0.4s',
                  }}>{img.caption}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot navigation */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 32 }}>
          {SHOWCASE_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              aria-label={`View gallery image ${i + 1}`}
              style={{
                width: i === activeImg ? 28 : 8, height: 8, borderRadius: 4,
                border: 'none', cursor: 'pointer',
                background: i === activeImg ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                padding: 18,
                backgroundClip: 'content-box',
              }}
            />
          ))}
        </div>

        {/* CTA below gallery */}
        <div style={{ textAlign: 'center', marginTop: 48, position: 'relative', zIndex: 10 }}>
          <Link to="/products" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 800,
            letterSpacing: '0.12em', padding: '16px 42px',
            background: 'linear-gradient(135deg, var(--gold), #B8891A)',
            color: '#1A0E00', border: 'none', cursor: 'pointer',
            textTransform: 'uppercase', textDecoration: 'none',
            transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
            borderRadius: 100,
            pointerEvents: 'auto', // Senior Engineer: Forced pointer events for accuracy
          }}
            onMouseEnter={e => { 
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-4px)'; 
              el.style.boxShadow = '0 12px 48px rgba(201,168,76,0.6)'; 
            }}
            onMouseLeave={e => { 
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'none'; 
              el.style.boxShadow = '0 8px 32px rgba(201,168,76,0.4)'; 
            }}
          >
            EXPLORE FULL COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, BLOGS, KEYWORDS, CITIES } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MandalaVisual } from '../components/MandalaVisual';
import { AgarbattiSVG } from '../components/AgarbattiSVG';
import { Marquee } from '../components/Marquee';
import { getProductImage } from '../productImages';

// The four product showcase images (all from the collage)
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
    src: getProductImage('black-oudh'),
    label: 'BLACK OUDH',
    caption: 'Deep, mysterious, and spiritually grounding',
  },
];

const MARQUEE_ITEMS = [
  'PREMIUM AGARBATTI', 'EST. 2004', 'CHIPLUN INDIA', 'NATURAL INGREDIENTS',
  'TEMPLE GRADE', 'EXPORT QUALITY', 'HANDCRAFTED', 'LONG LASTING',
  'CHARCOAL FREE', '62 STICKS', 'DIVINE FRAGRANCE', 'SACRED RITUALS',
];

const HERO_SCROLL_HEIGHT_VH = 380; // Senior Engineer: Increased for 4 cinematic scenes
const HERO_SPRING_STIFFNESS = 0.04; // Slower, more cinematic response
const HERO_SPRING_DAMPING = 0.94; // Higher damping for ultra-smooth landing

// ─── Photo Gallery Component ────────────────────────────────────────────────
const PhotoGallery = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref: galleryRef, isIntersecting: galleryVisible } = useIntersectionObserver({ threshold: 0.08 });

  // Auto-rotate active image
  useEffect(() => {
    const t = setInterval(() => setActiveImg(i => (i + 1) % SHOWCASE_IMAGES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: '100px 0', background: '#0A0500', overflow: 'hidden', position: 'relative', contentVisibility: 'auto' }}>
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
          <div style={{ textAlign: 'center', marginBottom: 56, opacity: galleryVisible ? 1 : 0, transform: galleryVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px,5vw,68px)', fontWeight: 800, color: '#FFFBF0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Crafted for the Sacred
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, color: 'rgba(253,246,227,0.7)', marginTop: 16, fontWeight: 500 }}>
              Every pack, a story of devotion
            </p>
          </div>

        {/* MAIN GALLERY LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto',
          gap: 4,
          opacity: galleryVisible ? 1 : 0,
          transform: galleryVisible ? 'none' : 'translateY(30px)',
          transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.2s',
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
                  transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1)',
                  transform: highlight ? 'translateY(-4px)' : 'none',
                  zIndex: highlight ? 2 : 1,
                  boxShadow: highlight ? '0 24px 60px rgba(0,0,0,0.6)' : '0 4px 16px rgba(0,0,0,0.3)',
                  willChange: 'transform',
                }}
              >
                {/* Image */}
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: highlight ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
                    filter: highlight ? 'brightness(0.85)' : 'brightness(0.6)',
                    willChange: 'transform',
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: highlight
                    ? 'linear-gradient(to top, rgba(10,5,0,0.85) 0%, rgba(10,5,0,0.2) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(10,5,0,0.7) 0%, rgba(10,5,0,0.4) 60%, transparent 100%)',
                  transition: 'opacity 0.5s',
                }} />

                {/* Active indicator bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: 'linear-gradient(90deg, var(--gold), var(--gold3))',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.4s ease',
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
                  willChange: 'transform',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 11, // Increased from 9
                    letterSpacing: '0.2em', color: 'var(--gold3)',
                    marginBottom: 8, textTransform: 'uppercase',
                  }}>{img.label}</div>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontSize: 15,
                    color: '#FFFBF0', fontStyle: 'italic', lineHeight: 1.4,
                    opacity: highlight ? 1 : 0.7,
                    transition: 'opacity 0.4s ease',
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
              aria-label={`View image ${i + 1}`}
              style={{
                width: i === activeImg ? 28 : 8, height: 8, borderRadius: 4,
                border: 'none', cursor: 'pointer',
                background: i === activeImg ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
                transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s cubic-bezier(0.22,1,0.36,1)',
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

const stats = [
  { value: '20+', label: 'Years of Craft' },
  { value: '50+', label: 'Fragrances' },
  { value: '10K+', label: 'Happy Homes' },
  { value: '15+', label: 'Export Countries' },
];

const testimonials = [
  { quote: "White Stone agarbatti transformed our morning pooja. The fragrance lingers for hours — simply divine.", name: "PRIYA SHARMA", city: "Pune", initials: "PS", color: "#7B4F9E" },
  { quote: "As a temple supplier, quality matters. White Stone delivers consistency and purity every single time.", name: "RAMESH PATIL", city: "Mumbai", initials: "RP", color: "#2E6B8A" },
  { quote: "The Chandan Natural variety reminds me of ancient temples. Truly authentic and long lasting.", name: "ANANYA DESAI", city: "Nashik", initials: "AD", color: "#6B4226" },
  { quote: "Best quality agarbatti I have ever used. The Rose fragrance is absolutely magical and stays all day.", name: "VIKRAM SINGH", city: "Delhi", initials: "VS", color: "#B8891A" },
  { quote: "I order in bulk for my meditation center. The soothing aroma helps everyone focus. Highly recommended!", name: "MEERA REDDY", city: "Bangalore", initials: "MR", color: "#4A7C59" },
];

// ─── FAQ INTERACTIVE ITEM ────────────────────────────────────────────────
const FAQItem = ({ q, a, index }: { q: string, a: string, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="glass-card reveal-on-scroll" 
      style={{ 
        padding: '0', 
        borderRadius: 16, 
        border: '1px solid var(--border)',
        background: 'var(--bg)',
        boxShadow: isOpen ? '0 12px 40px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
        overflow: 'hidden',
        transitionDelay: `${index * 0.1}s`,
        cursor: 'pointer'
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ 
        padding: '24px 32px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: 20
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: 18, 
          fontWeight: 700, 
          color: isOpen ? 'var(--gold)' : 'var(--gold2)', 
          transition: 'color 0.3s ease',
          margin: 0
        }}>{q}</h3>
        <div style={{ 
          width: 32, height: 32, borderRadius: '50%', 
          background: isOpen ? 'var(--gold)' : 'rgba(201,168,76,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
          flexShrink: 0
        }}>
          <span style={{ 
            color: isOpen ? '#1A0E00' : 'var(--gold)', 
            fontSize: 20, 
            fontWeight: 300,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
            transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)'
          }}>+</span>
        </div>
      </div>
      <div style={{ 
        maxHeight: isOpen ? '300px' : '0', 
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
        background: 'rgba(201,168,76,0.02)'
      }}>
        <div style={{ padding: '0 32px 32px', marginTop: -8 }}>
          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: 15, 
            color: 'var(--text-muted)', 
            lineHeight: 1.6,
            margin: 0
          }}>{a}</p>
        </div>
      </div>
    </div>
  );
};

// ─── SEO City Grid Section ─────────────────────────────────────────────────
const CitySEOSection = memo(() => {
  const { ref: cityRef, isIntersecting: cityVisible } = useIntersectionObserver({ threshold: 0.05 });

  // Senior Engineer: Memoize this massive list to prevent re-calculating on every scroll/render
  const allLinks = useMemo(() => {
    return CITIES.flatMap(city => 
      KEYWORDS.map(kw => ({
        city: city.name,
        cityId: city.id,
        keyword: kw,
        kwSlug: kw.toLowerCase().replace(/\s+/g, '-')
      }))
    );
  }, []);

  // Group cities by region from the imported CITIES array
  const regionGroups = useMemo(() => {
    return CITIES.reduce((acc, city) => {
      if (!acc[city.region]) acc[city.region] = [];
      acc[city.region].push(city);
      return acc;
    }, {} as Record<string, typeof CITIES>);
  }, []);

  // Priority regions shown prominently (in this order)
  const PRIORITY_REGIONS = [
    'Mumbai', 'Thane', 'Palghar', 'Raigad', 'Pune', 'Nashik',
    'Aurangabad', 'Nagpur', 'Amravati', 'Akola'
  ];

  const sortedRegions = useMemo(() => {
    return [
      ...PRIORITY_REGIONS.filter(r => regionGroups[r]),
      ...Object.keys(regionGroups).filter(r => !PRIORITY_REGIONS.includes(r))
    ];
  }, [regionGroups]);

  return (
    <section 
      ref={cityRef}
      style={{ 
        padding: '100px 24px', 
        background: 'var(--bg)', 
        position: 'relative', 
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Subtle gold grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        zIndex: 0
      }} />

      <div style={{ 
        maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1,
        opacity: 1, // Force visible
      }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ 
            fontFamily: 'var(--font-sans)', fontWeight: 800, 
            fontSize: 'clamp(32px,5vw,52px)', color: 'var(--text-dark)', marginBottom: 24,
            letterSpacing: '-0.02em'
          }}>
            Buy Premium Agarbatti Near You
          </h2>
          
          <p style={{ 
            fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-muted)', 
            maxWidth: 600, margin: '0 auto', lineHeight: 1.6 
          }}>
            White Stone delivers across India. Click your city for local 
            availability, pricing & fast doorstep delivery.
          </p>
        </div>

        {/* Region blocks grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: 40 
        }}>
          {sortedRegions.map((region, rIdx) => {
            const cities = regionGroups[region];
            if (!cities || cities.length === 0) return null;
            const metroOrCity = cities.filter(c => c.type === 'metro' || c.type === 'city');
            const suburbs = cities.filter(c => c.type === 'suburb' || c.type === 'town');

            return (
              <div key={region} style={{ 
                opacity: 1
              }}>
                {/* Region label */}
                <div style={{ 
                  display: 'flex', alignItems: 'baseline', gap: 12, 
                  marginBottom: 20, borderBottom: '2px solid var(--gold)', paddingBottom: 12 
                }}>
                  <h3 style={{ 
                    fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, 
                    color: 'var(--text-dark)', letterSpacing: '0.05em', textTransform: 'uppercase' 
                  }}>
                    {region}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>
                    {cities.length} {cities.length === 1 ? 'AREA' : 'AREAS'}
                  </span>
                </div>

                {/* Metro/City pills — larger, gold accent */}
                {metroOrCity.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: suburbs.length > 0 ? 12 : 0 }}>
                    {metroOrCity.map(city => (
                      <a 
                        key={city.id} 
                        href={`/city/${city.id}`}
                        style={{ 
                          padding: '10px 18px', borderRadius: 6, background: '#FFFBF0',
                          border: '1.5px solid var(--gold)', color: 'var(--brown)',
                          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 800, // Extra bold
                          textDecoration: 'none', transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(201,168,76,0.1)'
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'var(--gold)';
                          el.style.color = '#1A0E00';
                          el.style.transform = 'translateY(-2px)';
                          el.style.boxShadow = '0 6px 16px rgba(201,168,76,0.3)';
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = '#FFFBF0';
                          el.style.color = 'var(--brown)';
                          el.style.transform = 'translateY(0)';
                          el.style.boxShadow = '0 2px 8px rgba(201,168,76,0.1)';
                        }}
                      >
                        {city.name}
                      </a>
                    ))}
                  </div>
                )}

                {/* Suburb pills — smaller, neutral */}
                {suburbs.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {suburbs.map(city => (
                      <Link 
                        key={city.id} 
                        to={`/city/${city.id}`}
                        style={{ 
                          padding: '6px 14px', borderRadius: 6, background: '#FDF6E3',
                          border: '1px solid var(--border)', color: 'var(--text-dark)',
                          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, // Bold
                          textDecoration: 'none', transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = 'var(--gold)';
                          el.style.borderColor = 'var(--gold)';
                          el.style.background = '#FFF';
                          el.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = 'var(--text-dark)';
                          el.style.borderColor = 'var(--border)';
                          el.style.background = '#FDF6E3';
                          el.style.transform = 'translateY(0)';
                        }}
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── SEO Links Grid — Optimized for smoothness ─── */}
        <div style={{ marginTop: 80, width: '100%' }}>
          <div className="section-label" style={{ marginBottom: 24, textAlign: 'center' }}>REGIONAL SEARCHES</div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '8px 24px',
            padding: '20px 0',
            background: 'transparent',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            width: '100%'
          }}>
            {allLinks.map((item, i) => (
              <a 
                key={i}
                href={`/city/${item.cityId}/${item.kwSlug}`}
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: 13, 
                  color: 'var(--text-dark)', 
                  textDecoration: 'none', 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
              >
                <span style={{ color: 'var(--gold)', fontSize: 10 }}>✦</span>
                {item.keyword} in {item.city}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom stats bar */}
        <div style={{ 
          marginTop: 80, padding: '40px', background: 'var(--bg2)', 
          borderRadius: 16, border: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32,
          textAlign: 'center'
        }}>
          {[
            { value: `${CITIES.length}+`, label: 'Cities Served' },
            { value: '3–5 Days', label: 'Pan-India Delivery' },
            { value: 'Free', label: 'Shipping Above ₹500' },
            { value: '15+', label: 'Export Countries' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer / fine print — SEO friendly */}
        <p style={{ 
          marginTop: 40, textAlign: 'center', fontFamily: 'var(--font-sans)', 
          fontSize: 13, color: 'var(--text-muted)', maxWidth: 800, margin: '40px auto 0',
          lineHeight: 1.6
        }}>
          White Stone Agarbatti ships to all pin codes across India via courier. 
          Wholesale orders welcome from all regions. For bulk pricing, contact us on WhatsApp.
        </p>
      </div>
    </section>
  );
});

export const HomePage = () => {
  const homepageCanonical = 'https://whitestoneagarbatti.com/';

  useSEO({
    title: 'White Stone - Premium Agarbatti Online India | Best Incense Sticks',
    description: 'Buy premium handmade agarbatti online. White Stone offers natural, charcoal-free incense sticks with long-lasting fragrances. Temple grade quality since 2004.',
    keywords: KEYWORDS.join(', '),
    canonical: homepageCanonical,
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "White Stone Agarbatti",
      "description": "Premium handcrafted agarbatti since 2004",
      "telephone": "+91-92269-15311",
      "address": { "@type": "PostalAddress", "addressLocality": "Chiplun", "addressRegion": "Maharashtra", "addressCountry": "IN" }
    }
  });

  const [active, setActive] = useState(true);
  const [activeProduct, setActiveProduct] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  // scrollProgress: 0 = image1, 0.5 = image2, 1 = image3
  const [scrollProgress, setScrollProgress] = useState(0);
  // scrollWrapperRef: the tall div that makes the sticky hero scroll
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver({ threshold: 0.08 });
  const { ref: productsRef, isIntersecting: productsVisible } = useIntersectionObserver({ threshold: 0.08 });
  const { ref: brandRef, isIntersecting: brandVisible } = useIntersectionObserver({ threshold: 0.08 });
  const { ref: brandCardsRef, isIntersecting: brandCardsVisible } = useIntersectionObserver({ threshold: 0.08 });
  const { ref: videoRef, isIntersecting: videoVisible } = useIntersectionObserver({ threshold: 0.08 });
  const { ref: testimonialsRef, isIntersecting: testimonialsVisible } = useIntersectionObserver({ threshold: 0.08 });
  const { ref: blogRef, isIntersecting: blogVisible } = useIntersectionObserver({ threshold: 0.08 });
  const { ref: ctaRef, isIntersecting: ctaVisible } = useIntersectionObserver({ threshold: 0.08 });

  // Physics-based smooth scroll — spring + damping for premium feel
  const rawProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const heroActiveRef = useRef(true);

  // Testimonial timer — auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const startTestimonialTimer = () => {
    // This is now handled by the useEffect above for better reliability
  };

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const totalScrollable = wrapper.offsetHeight - window.innerHeight;
      // How far we've scrolled into the wrapper (0 → totalScrollable)
      const scrolled = Math.max(0, -rect.top);
      rawProgressRef.current = Math.min(1, scrolled / totalScrollable);
    };

    const animate = () => {
      // Only do spring math when hero is visible — saves CPU when scrolled away
      if (heroActiveRef.current) {
        const raw = rawProgressRef.current;
        const current = smoothProgressRef.current;
        const diff = raw - current;
        velocityRef.current += diff * HERO_SPRING_STIFFNESS;
        velocityRef.current *= HERO_SPRING_DAMPING;
        smoothProgressRef.current += velocityRef.current;
        smoothProgressRef.current = Math.max(0, Math.min(1, smoothProgressRef.current));
        setScrollProgress(smoothProgressRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // Pause spring work when hero wrapper scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => { heroActiveRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (scrollWrapperRef.current) observer.observe(scrollWrapperRef.current);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  const heroProduct = PRODUCTS[activeProduct];

  return (
    <main className="page-enter" style={{ background: 'var(--bg)' }}>

      {/* ═══════════════════════════════════════════════════════════
          STICKY HERO — tall wrapper pins the hero while images scroll
          200vh = 2 scenes × 100vh of scroll travel each
          ═══════════════════════════════════════════════════════════ */}
      <div ref={scrollWrapperRef} style={{ position: 'relative', height: `${HERO_SCROLL_HEIGHT_VH}vh` }}>
        {/* The sticky panel — stays fixed while wrapper scrolls */}
        <section style={{
          position: 'sticky', top: 0,
          height: '100vh', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', paddingTop: 88,
        }}>
          {/* ── CINEMATIC IMAGE SYSTEM ── */}
          {(() => {
            const p = Math.pow(scrollProgress, 1.22);

            // Cubic ease-in-out — much smoother than smooth-step
            const easeInOut = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
            // Ease-out cubic — fast start, gentle landing
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
            // Ease-in cubic — builds momentum
            const easeIn = (t: number) => t * t * t;

            // Clamp helper
            const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
            // Map a range to 0→1
            const map = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

            // ─── IMAGE OPACITIES ────────────────────────────────────
            // Senior Engineer: 4-scene cinematic system
            const t1out = map(p, 0.15, 0.35);
            const op1 = p < 0.15 ? 1 : 1 - easeIn(t1out);

            const t2in  = map(p, 0.25, 0.45);
            const t2out = map(p, 0.45, 0.65);
            const op2 = p < 0.25 ? 0
              : p < 0.45 ? easeOut(t2in)
              : p < 0.45 ? 1
              : 1 - easeIn(t2out);

            const t3in  = map(p, 0.55, 0.75);
            const t3out = map(p, 0.75, 0.90);
            const op3 = p < 0.55 ? 0
              : p < 0.75 ? easeOut(t3in)
              : p < 0.75 ? 1
              : 1 - easeIn(t3out);

            const t4in = map(p, 0.85, 0.98);
            const op4 = p < 0.85 ? 0 : easeOut(t4in);

            // ─── SCENE BLUR FOR FILMIC CROSSFADE ────────────────────
            const blur1 = easeIn(map(p, 0.20, 0.35)) * 3;
            const blur2 = Math.max(
              easeIn(map(p, 0.30, 0.45)) * 2,
              easeIn(map(p, 0.50, 0.65)) * 2
            );
            const blur3 = Math.max(
              easeIn(map(p, 0.60, 0.75)) * 2,
              easeIn(map(p, 0.80, 0.90)) * 2
            );
            const blur4 = (1 - easeOut(map(p, 0.85, 0.98))) * 2;

            // ─── KEN BURNS — each image breathes while active ───────
            const scale1 = 1.0 + easeOut(map(p, 0, 0.30)) * 0.08;
            const scale2 = 1.0 + easeOut(map(p, 0.25, 0.55)) * 0.06;
            const scale3 = 1.0 + easeOut(map(p, 0.50, 0.80)) * 0.06;
            const scale4 = 1.0 + easeOut(map(p, 0.75, 1.0)) * 0.06;

            // ─── DIRECTIONAL PARALLAX ───────────────────────────────
            const y1 = easeIn(map(p, 0.15, 0.35)) * -24;
            const y2 = easeIn(map(p, 0.45, 0.65)) * -20;
            const y3 = easeIn(map(p, 0.75, 0.90)) * -20;
            const y4 = 0;
            const x1 = easeInOut(map(p, 0.10, 0.35)) * -10;
            const x2 = (1 - easeInOut(map(p, 0.25, 0.65))) * 8;
            const x3 = (1 - easeInOut(map(p, 0.55, 0.90))) * -8;
            const x4 = (1 - easeOut(map(p, 0.80, 0.98))) * 6;

            // ─── WARM/COOL OVERLAY — shifts color temperature between scenes ──
            const warmth2 = op2 * 0.06;
            const dark3   = op3 * 0.12;  // Darker, moodier for Black Oudh
            const cool4   = op4 * 0.04;
            const transitionPulse = Math.max(
              easeOut(map(p, 0.20, 0.40)) * (1 - easeOut(map(p, 0.40, 0.50))),
              easeOut(map(p, 0.50, 0.70)) * (1 - easeOut(map(p, 0.70, 0.80))),
              easeOut(map(p, 0.80, 0.95)) * (1 - easeOut(map(p, 0.95, 0.99)))
            );
            const sweepX = -30 + p * 160;

            return (
              <>
                {/* Image 1 — Temple Collection */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 0,
                  backgroundImage: 'url(/hero-bg-1.webp)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: op1,
                  transform: `scale(${scale1}) translate(${x1}px, ${y1}px)`,
                  filter: `blur(${blur1}px) saturate(${1 + op1 * 0.08}) brightness(${0.94 + op1 * 0.06})`,
                  willChange: 'opacity, transform, filter',
                }} />

                {/* Image 2 — Rose Gold Pack */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 0,
                  backgroundImage: 'url(/hero-bg-2.webp)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: op2,
                  transform: `scale(${scale2}) translate(${x2}px, ${y2}px)`,
                  filter: `blur(${blur2}px) saturate(${1.03 + op2 * 0.12}) brightness(${0.92 + op2 * 0.08})`,
                  willChange: 'opacity, transform, filter',
                }} />

                {/* Image 3 — Black Oudh */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 0,
                  backgroundImage: `url(${getProductImage('black-oudh')})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: op3,
                  transform: `scale(${scale3}) translate(${x3}px, ${y3}px)`,
                  filter: `blur(${blur3}px) saturate(${1.02 + op3 * 0.15}) brightness(${0.88 + op3 * 0.1})`,
                  willChange: 'opacity, transform, filter',
                }} />

                {/* Image 4 — Product Range */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 0,
                  backgroundImage: 'url(/hero-bg-3.webp)',
                  backgroundSize: 'cover', backgroundPosition: 'center top',
                  opacity: op4,
                  transform: `scale(${scale4}) translate(${x4}px, ${y4}px)`,
                  filter: `blur(${blur4}px) saturate(${1.04 + op4 * 0.08}) brightness(${0.93 + op4 * 0.08})`,
                  willChange: 'opacity, transform, filter',
                }} />

                {/* Color temperature overlay — breathes warmth between images */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                  background: `rgba(180,100,20,${warmth2})`,
                  mixBlendMode: 'multiply',
                }} />
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                  background: `rgba(10,5,0,${dark3})`,
                  mixBlendMode: 'multiply',
                }} />
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                  background: `rgba(60,95,140,${cool4})`,
                  mixBlendMode: 'screen',
                }} />

                {/* Cinematic light sweep during transitions */}
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  top: '-18%',
                  bottom: '-18%',
                  left: `${sweepX}%`,
                  width: '22%',
                  zIndex: 0,
                  pointerEvents: 'none',
                  opacity: transitionPulse * 0.28,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,214,130,0.4) 52%, rgba(255,255,255,0) 100%)',
                  transform: 'rotate(8deg)',
                  filter: 'blur(30px)',
                }} />

                {/* Film Grain overlay — increases during transitions for smoothness */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                  opacity: 0.05 + transitionPulse * 0.05,
                  backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                  filter: 'contrast(120%) brightness(120%)',
                }} />
              </>
            );
          })()}

          {/* Dark overlay — slightly darker during crossfade transitions */}
          {(() => {
            const p = Math.pow(scrollProgress, 1.22);
            // In transition zones (0.22-0.50 and 0.54-0.82), overlay is ~15% darker
            const inTransition = (p > 0.28 && p < 0.58) || (p > 0.62 && p < 0.9);
            const extraDark = inTransition ? 0.12 : 0;
            return (
              <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                  background: `linear-gradient(to bottom,
                    rgba(10,5,0,${0.50 + extraDark}) 0%,
                    rgba(10,5,0,${0.32 + extraDark}) 40%,
                    rgba(10,5,0,${0.32 + extraDark}) 60%,
                    rgba(10,5,0,${0.50 + extraDark}) 100%)`, // Reduced from 0.60 to 0.50
                  transition: 'background 0.8s ease',
                }} />
            );
          })()}

          {/* Grid overlay */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Corner accents */}
          {([
            { top: 100, left: 24 },
            { top: 100, right: 24 },
            { bottom: 80, left: 24 },
            { bottom: 80, right: 24 },
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

          {/* Watermark */}
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: -20, left: 0, right: 0, textAlign: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(64px,14vw,200px)', color: 'transparent',
            WebkitTextStroke: '1px rgba(201,168,76,0.08)',
            letterSpacing: '0.08em', lineHeight: 1, userSelect: 'none', zIndex: 2,
          }}>WHITE STONE</div>

          {/* ── SCENE INDICATORS — vertical right rail ── */}
          <div style={{
            position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)',
            zIndex: 4, display: 'flex', flexDirection: 'column', gap: 20,
          }} className="scene-indicators-rail">
            {[
              { label: 'TEMPLE COLLECTION', active: scrollProgress < 0.25 },
              { label: 'ROSE GOLD PACK',    active: scrollProgress >= 0.25 && scrollProgress < 0.50 },
              { label: 'BLACK OUDH',        active: scrollProgress >= 0.50 && scrollProgress < 0.75 },
              { label: 'PRODUCT RANGE',     active: scrollProgress >= 0.75 },
            ].map((scene, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: 'row-reverse' }}>
                {/* Track line */}
                <div style={{
                  width: 2, height: scene.active ? 40 : 20, borderRadius: 1,
                  background: scene.active ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
                  transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1), background 0.4s ease',
                }} />
                {/* Label */}
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.22em',
                  color: scene.active ? '#E8C96A' : 'transparent',
                  transition: 'color 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                  whiteSpace: 'nowrap',
                  transform: scene.active ? 'translateX(0)' : 'translateX(6px)',
                  textTransform: 'uppercase',
                }}>{scene.label}</span>
              </div>
            ))}
          </div>

          {/* ── SCENE PROGRESS BAR — thin gold line at very bottom ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, zIndex: 4,
            background: 'rgba(201,168,76,0.12)',
          }}>
            <div style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, var(--gold3), var(--gold))',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 12px rgba(201,168,76,0.6)',
            }} />
          </div>

          {/* ── SCROLL-DOWN CUE — gold chevron with bounce-down animation ── */}
          <div style={{
            position: 'absolute', bottom: 72, left: '50%', transform: 'translateX(-50%)',
            zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            opacity: scrollProgress < 0.04 ? 1 : 0,
            transition: 'opacity 0.8s ease',
            pointerEvents: 'none',
          }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ animation: 'bounce-down 2s ease-in-out infinite' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* ── Hero content — multi-layer parallax exit ── */}
          {(() => {
            const p = Math.pow(scrollProgress, 1.22);
            // Each element moves at a different speed as scroll happens
            // Fast elements: pill, hindi text — float away first
            // Slow elements: title — lingers longest
            const fadeStart = 0.14;
            const fadeEnd = 0.4;
            const t = Math.max(0, Math.min(1, (p - fadeStart) / (fadeEnd - fadeStart)));
            const easeInCubic = (x: number) => x * x * x;
            const contentOpacity = Math.max(0, 1 - easeInCubic(t));
            return (
              <div style={{
                maxWidth: 1280, width: '100%', padding: '40px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 48, position: 'relative', zIndex: 3, flexWrap: 'wrap',
                opacity: contentOpacity,
                pointerEvents: p > 0.15 ? 'none' : 'auto',
              }}>
                {/* Left content — professional layout with precision spacing */}
                <div style={{
                  flex: '1 1 500px', maxWidth: 640,
                  opacity: active ? 1 : 0,
                  transform: active
                    ? `translateY(${-p * 60}px)`
                    : 'translateY(30px)',
                  transition: active ? 'none' : 'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0
                }}>
                  {/* Information Row */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 24, 
                    marginBottom: 32,
                    transform: `translateY(${-p * 30}px)` 
                  }}>
                    {/* EST pill */}
                    <div style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', 
                      background: 'rgba(255,255,255,0.06)', borderRadius: 100, 
                      border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)'
                    }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFF' }} />
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: '#FFF' }}>EST. 2004</span>
                    </div>
                    <div style={{ height: 1, width: 40, background: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ 
                      fontFamily: 'var(--font-display)', fontSize: 10, 
                      letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', 
                      textTransform: 'uppercase' 
                    }}>CHIPLUN, MAHARASHTRA</span>
                  </div>

                  {/* Brand Title Group with Glass Effect */}
                  <div className="glass-card" style={{ 
                    position: 'relative', 
                    padding: '40px 60px',
                    borderRadius: 24,
                    marginBottom: 40, 
                    transform: `translateY(${-p * 20}px)`,
                    boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
                  }}>
                    <div style={{ 
                      fontFamily: 'var(--font-hindi)', 
                      fontSize: 22, 
                      color: 'rgba(255,255,255,0.92)', // Increased from 0.9
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      marginBottom: 20,
                      textAlign: 'center'
                    }}>अगरबत्ती का अनुभव</div>
                    
                  <h1 className="premium-title" style={{
                      fontSize: 'clamp(64px, 14vw, 150px)', 
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      textShadow: '0 2px 32px rgba(0,0,0,0.5)'
                    }}>
                      <span style={{ color: '#FFF', display: 'block', animation: 'text-reveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both' }}>WHITE</span>
                      <span style={{ color: '#FFF', display: 'block', animation: 'text-reveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}>STONE</span>
                    </h1>
                  </div>

                  {/* Tagline & Description */}
                  <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
                    <div style={{ 
                      fontFamily: 'var(--font-serif)', 
                      fontSize: 22, 
                      color: 'var(--gold)', 
                      fontWeight: 700, 
                      letterSpacing: '0.15em', 
                      textTransform: 'uppercase',
                      marginBottom: 24,
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>The Essence of Divine Purity</div>

                    <p style={{ 
                      fontFamily: 'var(--font-sans)', fontSize: 17, // Increased from 16
                      color: 'rgba(255,255,255,0.95)', lineHeight: 1.7, 
                      marginBottom: 48,
                      textShadow: '0 1px 15px rgba(0,0,0,0.8)',
                      fontWeight: 400
                    }}>
                      Premium handcrafted agarbatti from Chiplun, Maharashtra. Natural ingredients, divine fragrances, and twenty years of sacred tradition.
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ 
                    display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 56,
                    transform: `translateY(${-p * 60}px)` 
                  }}>
                    <a href="https://wa.me/919226915311?text=Hi%2C%20I%20found%20White%20Stone%20Agarbatti%20online.%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20pricing." 
                       target="_blank" rel="noopener noreferrer" className="btn-primary"
                       style={{ boxShadow: '0 10px 30px rgba(201,168,76,0.2)' }}>
                      ORDER ON WHATSAPP
                    </a>
                    <a href="/products" className="btn-outline" 
                       style={{ color: '#FFFBF0', borderColor: 'rgba(253,246,227,0.3)', backdropFilter: 'blur(4px)' }}>
                      EXPLORE PRODUCTS
                    </a>
                  </div>

                  {/* Stats — Senior Engineer: Improved spacing and staggered entrance */}
                  <div ref={statsRef} style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }} className="hero-stats-row">
                    {stats.map((s, i) => (
                      <div key={s.value} style={{
                        opacity: statsVisible ? 1 : 0,
                        transform: statsVisible ? 'none' : 'translateY(16px)',
                        transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
                      }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.04em' }}>{s.value}</div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.06em' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Product Showcase — moves at slower speed, fades later */}
                <div style={{
                  flex: '1 1 360px', maxWidth: 480, position: 'relative',
                  opacity: active ? 1 : 0,
                  transform: active
                    ? `translateY(${-p * 50}px) scale(${1 - p * 0.08})`
                    : 'translateY(30px)',
                  transition: active ? 'none' : 'all 1.2s cubic-bezier(0.22,1,0.36,1) 0.2s',
                }} className="hero-product-showcase">
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2, animation: 'slow-rotate 60s linear infinite' }}>
                    <MandalaVisual />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ background: 'rgba(253,246,227,0.15)', borderRadius: 16, padding: 24, display: 'inline-block', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,168,76,0.2)' }}>
                      <img
                        src={getProductImage(heroProduct.id)}
                        alt={`${heroProduct.name} — premium agarbatti`}
                        loading="eager" // Senior Engineer: High priority LCP
                        width={320} height={280}
                        style={{
                          width: 320, height: 280, objectFit: 'contain',
                          filter: 'drop-shadow(0 20px 40px rgba(107,58,42,0.3))',
                          animation: 'float-y 4s ease-in-out infinite',
                        }}
                      />
                    </div>
                    <div style={{ marginTop: 20, padding: '16px 24px', background: 'rgba(10,5,0,0.6)', border: '1px solid rgba(201,168,76,0.3)', display: 'inline-block', minWidth: 280, textAlign: 'left', backdropFilter: 'blur(8px)' }}>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(201,168,76,0.7)', letterSpacing: '0.08em', marginBottom: 6 }}>FEATURED PRODUCT</div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, color: '#FFFBF0', fontStyle: 'italic' }}>{heroProduct.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.78)' }}>{heroProduct.sticks} · {heroProduct.burnTime}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                      {PRODUCTS.map((p2, i) => (
                        <button key={p2.id} onClick={() => setActiveProduct(i)} aria-label={`View ${p2.name}`}
                          style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', background: i === activeProduct ? 'var(--gold)' : 'rgba(201,168,76,0.35)', transition: 'background 0.3s' }} />
                      ))}
                    </div>
                  </div>
                  <div aria-hidden="true" style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 12 }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ opacity: 0.6 - i * 0.1 }}>
                        <AgarbattiSVG animated={i === 1} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── SCENE CAPTIONS — appear when image 2/3/4 are showing ── */}
          {[
            {
              label: 'ROSE GOLD PACK',
              caption: 'Premium Rose Gold — Export Quality',
              sub: 'हिंदी में: रोज़ गोल्ड अगरबत्ती',
              show: scrollProgress >= 0.25 && scrollProgress < 0.50,
            },
            {
              label: 'BLACK OUDH',
              caption: 'Deep, mysterious, and spiritually grounding',
              sub: 'हिंदी में: ब्लैक ऊद अगरबत्ती',
              show: scrollProgress >= 0.50 && scrollProgress < 0.75,
            },
            {
              label: 'PRODUCT RANGE',
              caption: 'Full lineup of premium agarbatti',
              sub: 'हिंदी में: प्रीमियम अगरबत्ती संग्रह',
              show: scrollProgress >= 0.75,
            },
          ].map((slide, i) => (
            <div key={i} style={{
              position: 'absolute', bottom: 56, left: 48, zIndex: 4,
              maxWidth: 480,
              opacity: slide.show ? 1 : 0,
              transform: slide.show ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
              pointerEvents: 'none',
            }}>
              {/* Gold overline */}
              <div style={{
                width: slide.show ? 48 : 0, height: 1,
                background: 'var(--gold)', marginBottom: 12,
                transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s',
              }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.28em', color: 'var(--gold)', marginBottom: 10, textTransform: 'uppercase' }}>{slide.label}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(24px,3.5vw,44px)', color: '#FFFBF0', lineHeight: 1.15, textShadow: '0 2px 24px rgba(0,0,0,0.7)', marginBottom: 8 }}>{slide.caption}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'rgba(253,246,227,0.5)', fontStyle: 'italic' }}>{slide.sub}</div>
            </div>
          ))}

        </section>
      </div>
      {/* END sticky hero wrapper */}

      {/* ── HOME INTRODUCTION SECTION ── */}
      <section style={{ 
        padding: '120px 24px', 
        background: 'var(--bg)', 
        position: 'relative', 
        zIndex: 5,
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Decorative Element */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '80%', 
          height: '80%', 
          opacity: 0.03, 
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          <MandalaVisual />
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block', 
            marginBottom: 32, 
            width: 84, 
            height: 84, 
            borderRadius: '50%', 
            border: '1.5px solid var(--gold)',
            background: '#1A0E00',
            boxShadow: '0 0 25px rgba(201,168,76,0.2)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img 
              src="/ws-emblem.webp" 
              alt="WS Emblem" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transform: 'scale(2.1)', // Max accuracy: Same scale as navbar for consistency
                display: 'block'
              }} 
            />
          </div>
          
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(32px, 5vw, 54px)', 
            fontWeight: 800, 
            color: 'var(--text-dark)',
            marginBottom: 24,
            letterSpacing: '0.1em',
            lineHeight: 1.2
          }}>
            Welcome to <span className="gold-shimmer">WHITE STONE</span>
          </h2>
          
          <div style={{ 
            fontFamily: 'var(--font-hindi)', 
            fontSize: 26, 
            color: 'var(--gold2)', 
            marginBottom: 32,
            fontWeight: 500
          }}>
            व्हाइट स्टोन अगरबत्ती: शुद्धता और परंपरा का संगम
          </div>
          
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 20, 
            color: 'var(--text-mid)', 
            lineHeight: 1.8, 
            marginBottom: 48,
            fontStyle: 'italic'
          }}>
            “At White Stone, we believe that fragrance is the bridge between the physical and the divine. 
            For two decades, our master blenders in Chiplun have been crafting scents that transform 
            houses into homes and rituals into sacred experiences.”
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              { label: 'AUTHENTIC', icon: '✦' },
              { label: 'HANDCRAFTED', icon: '✦' },
              { label: 'TRADITIONAL', icon: '✦' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--gold)', fontSize: 12 }}>{item.icon}</span>
                <span style={{ 
                  fontFamily: 'var(--font-sans)', // Replaced display with sans
                  fontSize: 12, 
                  letterSpacing: '0.2em', 
                  color: 'var(--text-muted)',
                  fontWeight: 600
                }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* PHOTO GALLERY — 4 product images with cinematic layout */}
      {/* ═══════════════════════════════════════════════════════ */}
      <PhotoGallery />

      {/* PRODUCTS SECTION */}
      <section style={{ position: 'relative', padding: '120px 24px', overflow: 'hidden', background: '#0A0500' }}>

        {/* ── Full-bleed agarbatti background image — CSS transform parallax (iOS safe) ── */}
        <div style={{
          position: 'absolute', inset: '-20%', zIndex: 0,
          backgroundImage: 'url(/agarbatti-hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.28,
          filter: 'saturate(1.2)',
          willChange: 'transform',
        }} />

        {/* Gradient overlays — dark at top/bottom so cards sit on clean base */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, #0A0500 0%, rgba(10,5,0,0.55) 18%, rgba(10,5,0,0.45) 50%, rgba(10,5,0,0.6) 82%, #0A0500 100%)',
        }} />
        {/* Warm amber vignette from left */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(180,90,10,0.18) 0%, transparent 70%)',
        }} />

        {/* Fine gold grid overlay for texture */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* Content */}
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>

          {/* Section header — now on dark bg so text is light */}
          <div
            ref={productsRef}
            style={{
              marginBottom: 64, display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
              opacity: productsVisible ? 1 : 0,
              transform: productsVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div>
              {/* Gold overline */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                marginBottom: 16, padding: '5px 16px',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                backdropFilter: 'blur(6px)',
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.22em', color: '#E8C96A' }}>OUR OFFERINGS</span>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,5vw,64px)',
                fontStyle: 'italic', fontWeight: 700, color: '#FFFBF0', lineHeight: 1.1,
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}>
                Sacred Collection
              </h2>
            </div>
            <a href="/products" style={{
              fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.12em',
              color: '#E8C96A', textDecoration: 'none', border: '1px solid rgba(201,168,76,0.4)',
              padding: '10px 24px', backdropFilter: 'blur(6px)',
              background: 'rgba(201,168,76,0.08)',
              transition: 'background 0.3s',
            }}>VIEW ALL →</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }} className="product-grid">
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <a
                key={p.id}
                href={`/product/${p.id}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
              <div
                className="product-card"
                style={{
                  position: 'relative', overflow: 'hidden',
                  background: 'rgba(253,246,227,0.09)', // Increased from 0.06
                  border: '1px solid rgba(201,168,76,0.18)',
                  borderTop: '2px solid transparent',
                  backgroundImage: 'linear-gradient(rgba(253,246,227,0.09), rgba(253,246,227,0.09)), linear-gradient(90deg, var(--gold2), var(--gold3), var(--gold2))',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  backgroundSize: '100% 100%, 200% auto',
                  animation: 'shimmer-line 6s linear infinite',
                  backdropFilter: 'blur(12px)',
                  opacity: 1, // Force visible
                  cursor: 'pointer',
                  height: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.3), 0 24px 60px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Number watermark */}
                <div aria-hidden="true" style={{
                  position: 'absolute', top: 10, right: 14,
                  fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 900,
                  color: 'rgba(201,168,76,0.05)', lineHeight: 1, userSelect: 'none', zIndex: 0, // Reduced opacity from 0.07 to 0.05
                }}>0{i + 1}</div>

                {/* Subtle inner glow at top border */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 60,
                  background: 'linear-gradient(to bottom, rgba(201,168,76,0.07), transparent)',
                  pointerEvents: 'none', zIndex: 0,
                }} />

                {/* Product image — bigger, warm cream bg */}
                <div style={{
                  height: 340, position: 'relative', zIndex: 1, // Increased from 310
                  background: 'linear-gradient(135deg, rgba(253,246,227,0.12) 0%, rgba(230,200,100,0.06) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <img
                    src={getProductImage(p.id)}
                    alt={`${p.name} — premium agarbatti`}
                    loading="lazy"
                    style={{
                      width: '86%', height: '86%', objectFit: 'contain',
                      transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.8s ease',
                      filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.5))',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.transform = 'scale(1.07) translateY(-4px)';
                      el.style.filter = 'drop-shadow(0 24px 48px rgba(0,0,0,0.6))';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.transform = 'scale(1)';
                      el.style.filter = 'drop-shadow(0 16px 32px rgba(0,0,0,0.5))';
                    }}
                  />
                </div>

                {/* Divider line */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)', margin: '0' }} />

                {/* Card body */}
                <div style={{ padding: '20px 22px 22px', position: 'relative', zIndex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 700, // Increased from 600
                    color: '#FFFBF0', fontStyle: 'italic', marginBottom: 5, lineHeight: 1.3,
                  }}>{p.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, // Increased from 12
                    color: 'rgba(253,246,227,0.78)', marginBottom: 18, lineHeight: 1.6, // Increased from 0.5 to 0.78
                  }}>{p.fragrance} · {p.burnTime} · {p.sticks}</p>

                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/919226915311?text=I%20want%20to%20order%20${encodeURIComponent(p.name)}%20White%20Stone%20Agarbatti`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      width: '100%', padding: '13px 16px', // Increased from 11
                      background: 'rgba(37,211,102,0.15)',
                      border: '1px solid rgba(37,211,102,0.4)',
                      color: '#4AE082',
                      fontFamily: 'var(--font-sans)', fontSize: 12, // Replaced Cinzel, increased from 10
                      fontWeight: 500, letterSpacing: '0.08em',
                      textDecoration: 'none', borderRadius: 3,
                      backdropFilter: 'blur(4px)',
                      transition: 'background 0.3s, border-color 0.3s, transform 0.2s',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    ORDER ON WHATSAPP
                  </a>
                </div>
              </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section style={{ padding: '100px 24px', background: 'var(--bg)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Left text — slides in from left */}
          <div
            ref={brandRef}
            style={{
              flex: '1 1 300px',
              opacity: brandVisible ? 1 : 0,
              transform: brandVisible ? 'translateX(0)' : 'translateX(-48px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div className="section-label" style={{ marginBottom: 16 }}>BRAND STORY</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,56px)', fontStyle: 'italic', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: 28 }}>
              Crafting Sacred Moments Since 2004
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 20,
              opacity: brandVisible ? 1 : 0,
              transform: brandVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s',
            }}>
              Born in the fragrance-rich coastal town of Chiplun, White Stone began as a promise to preserve the sacred art of agarbatti-making. Every stick is hand-rolled by skilled artisans using only natural ingredients.
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 36,
              opacity: brandVisible ? 1 : 0,
              transform: brandVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.28s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.28s',
            }}>
              Our charcoal-free, natural formulations honor 2,000+ years of Vedic tradition while meeting modern standards of purity and quality.
            </p>
            <div style={{
              opacity: brandVisible ? 1 : 0,
              transform: brandVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s',
            }}>
              <a href="/about" className="btn-outline">OUR FULL STORY →</a>
            </div>
          </div>

          {/* Right cards — stagger in from right */}
          <div
            ref={brandCardsRef}
            style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
          >
            {[
              { icon: '🌿', title: 'Natural Ingredients', desc: 'No synthetic chemicals. Ever.' },
              { icon: '🙏', title: 'Temple Grade', desc: 'Certified purity for sacred use' },
              { icon: '🕯️', title: '45-50 Min Burn', desc: 'Long lasting fragrance' },
              { icon: '🌱', title: 'Eco Friendly', desc: 'Sustainable, charcoal-free' },
            ].map((f, i) => (
              <div
                key={f.title}
                style={{
                  padding: '24px 20px', background: 'var(--bg2)',
                  border: '1px solid var(--border)', borderTopColor: 'var(--gold)',
                  borderTop: '3px solid var(--gold)',
                  opacity: brandCardsVisible ? 1 : 0,
                  transform: brandCardsVisible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.96)',
                  transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1 + 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1 + 0.1}s`,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '0.06em', marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION — full bleed cinematic */}
      <section
        ref={videoRef}
        style={{
          position: 'relative', background: '#0A0500', overflow: 'hidden',
          opacity: videoVisible ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Video wrapper with play overlay */}
        <div style={{ position: 'relative', width: '100%' }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label="White Stone Incense Ritual — agarbatti craftsmanship video"
            id="ritual-video"
            style={{
              width: '100%',
              maxHeight: '90vh',
              minHeight: 340,
              display: 'block',
              objectFit: 'cover',
              opacity: 0.82,
              transform: videoVisible ? 'scale(1)' : 'scale(1.06)',
              transition: 'transform 1.6s cubic-bezier(0.22,1,0.36,1)',
            }}
            onPlay={e => {
              const overlay = document.getElementById('video-play-overlay');
              if (overlay) overlay.style.opacity = '0';
            }}
            onPause={e => {
              const overlay = document.getElementById('video-play-overlay');
              if (overlay) overlay.style.opacity = '1';
            }}
          >
            <source src="/White_Stone_Incense_Ritual.mp4" type="video/mp4" />
            <track kind="captions" src="/White_Stone_Incense_Ritual.vtt" srcLang="en" label="English" default />
          </video>
          {/* Gold play button overlay — shows when paused or autoplay fails */}
          <div
            id="video-play-overlay"
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(201,168,76,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 40px rgba(201,168,76,0.5)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#1A0E00" aria-hidden="true">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </div>

        {/* End video wrapper */}

        {/* Gradient overlays for depth */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,5,0,0.45) 0%, transparent 30%, transparent 60%, rgba(10,5,0,0.75) 100%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,5,0,0.5) 0%, transparent 50%, rgba(10,5,0,0.3) 100%)', pointerEvents: 'none' }} />

        {/* Top label */}
        <div style={{ position: 'absolute', top: 32, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '8px 20px',
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', backdropFilter: 'blur(6px)',
            opacity: videoVisible ? 1 : 0,
            transform: videoVisible ? 'translateY(0)' : 'translateY(-16px)',
            transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px rgba(201,168,76,0.8)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.2em', color: '#E8C96A', textTransform: 'uppercase' }}>THE RITUAL</span>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 8px rgba(201,168,76,0.8)' }} />
          </div>
        </div>

        {/* Centered overlay text */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          padding: '40px 24px 56px', textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700,
            fontSize: 'clamp(28px,5vw,64px)', color: '#FFFBF0',
            lineHeight: 1.2, marginBottom: 16,
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
            opacity: videoVisible ? 1 : 0,
            transform: videoVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 0.5s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.5s',
          }}>
            The Sacred Art of Agarbatti
          </h2>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 'clamp(14px,2vw,20px)', color: 'rgba(253,246,227,0.82)',
            maxWidth: 560, lineHeight: 1.7, marginBottom: 32,
            textShadow: '0 1px 12px rgba(0,0,0,0.5)',
            opacity: videoVisible ? 1 : 0,
            transform: videoVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 0.7s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.7s',
          }}>
            "Lighting an agarbatti is not merely about fragrance.<br />
            It is the beginning of a conversation with the divine."
          </p>
          <div style={{
            display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
            opacity: videoVisible ? 1 : 0,
            transform: videoVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 0.9s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.9s',
          }}>
            <a href="/products" style={{
              display: 'inline-block', fontFamily: 'var(--font-display)', fontSize: 12,
              fontWeight: 700, letterSpacing: '0.12em', padding: '13px 32px',
              background: 'var(--gold)', color: '#1A0E00', border: 'none',
              cursor: 'pointer', textTransform: 'uppercase', textDecoration: 'none',
              transition: 'opacity 0.3s',
            }}>EXPLORE COLLECTION</a>
            <a href="https://wa.me/919226915311?text=Hi%2C%20I%20found%20White%20Stone%20Agarbatti%20online.%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20pricing."
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block', fontFamily: 'var(--font-display)', fontSize: 12,
                fontWeight: 700, letterSpacing: '0.12em', padding: '13px 32px',
                background: 'transparent', color: '#FFFBF0',
                border: '1px solid rgba(253,246,227,0.5)',
                cursor: 'pointer', textTransform: 'uppercase', textDecoration: 'none',
                backdropFilter: 'blur(4px)',
              }}>ORDER ON WHATSAPP</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '120px 0', background: 'var(--bg)', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 64, padding: '0 24px' }}>
          <div className="section-label" style={{ marginBottom: 16 }}>VOICES OF TRUST</div>
          <h2 style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: 800, 
            color: 'var(--text-dark)',
            letterSpacing: '-0.02em'
          }}>What Our Customers Say</h2>
        </div>

        <div 
          style={{ 
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            overflow: 'hidden',
            padding: '60px 0'
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 40, 
              transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
              transform: `translateX(calc(50vw - 250px - ${testimonialIdx * 540}px))`,
              width: 'max-content',
            }}
          >
            {testimonials.map((t, idx) => {
              const isActive = idx === testimonialIdx;
              
              return (
                <div 
                  key={idx}
                  style={{
                    flex: '0 0 500px',
                    width: 500,
                    padding: isActive ? '60px 48px' : '40px 32px',
                    background: isActive ? 'var(--bg2)' : 'rgba(255,255,255,0.02)',
                    borderRadius: 32,
                    border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'scale(1)' : 'scale(0.85)',
                    transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
                    textAlign: 'center',
                    boxShadow: isActive ? '0 30px 70px rgba(0,0,0,0.15)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    filter: isActive ? 'none' : 'blur(1px)',
                    cursor: isActive ? 'default' : 'pointer'
                  }}
                  onClick={() => setTestimonialIdx(idx)}
                >
                  {/* Quote icon */}
                  <div style={{
                    fontFamily: 'var(--font-serif)', 
                    fontSize: isActive ? 80 : 60, 
                    color: 'var(--gold)', 
                    lineHeight: 0.5,
                    opacity: 0.2, 
                    marginBottom: 24, 
                    userSelect: 'none',
                  }}>"</div>

                  <p style={{
                    fontFamily: 'var(--font-serif)', 
                    fontSize: isActive ? 'clamp(18px, 2.2vw, 22px)' : '16px',
                    fontStyle: 'italic', 
                    color: 'var(--text-dark)', 
                    lineHeight: 1.7, 
                    marginBottom: 32,
                    transition: 'all 0.8s'
                  }}>
                    "{t.quote}"
                  </p>

                  {/* 5-star rating */}
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ color: 'var(--gold)', fontSize: isActive ? 20 : 16, letterSpacing: 4 }}>★★★★★</span>
                  </div>

                  {/* Avatar block */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: isActive ? 64 : 48, 
                      height: isActive ? 64 : 48, 
                      borderRadius: '50%',
                      background: t.color,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)', 
                      fontSize: isActive ? 18 : 14, 
                      fontWeight: 700,
                      color: '#fff', 
                      letterSpacing: '0.08em',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.8s',
                      marginBottom: 4,
                    }}>
                      {t.initials}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)', 
                      fontSize: isActive ? 13 : 11, 
                      letterSpacing: '0.15em',
                      color: 'var(--gold)', 
                      fontWeight: 800,
                      transition: 'all 0.8s',
                    }}>
                      {t.name}
                    </div>
                    <div style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: isActive ? 14 : 12, 
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                      transition: 'all 0.8s'
                    }}>
                      {t.city}
                    </div>
                    {isActive && (
                      <div style={{
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 6,
                        fontFamily: 'var(--font-sans)', 
                        fontSize: 11, 
                        color: '#4AE082',
                        marginTop: 4,
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"/>
                        </svg>
                        Verified Customer
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot navigation */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 56 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestimonialIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              style={{
                width: i === testimonialIdx ? 32 : 10, 
                height: 10,
                borderRadius: 5, 
                border: 'none', 
                cursor: 'pointer',
                background: i === testimonialIdx ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          ))}
        </div>
      </section>

      {/* HOW TO ORDER SECTION */}
      <section style={{ padding: '100px 24px', background: 'var(--bg)', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px,4vw,52px)',
            fontWeight: 800, color: 'var(--text-dark)',
            lineHeight: 1.2, marginBottom: 64,
          }}>How to Order</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 40,
          }}>
            {[
              {
                step: '01',
                heading: 'Browse & Choose',
                desc: 'Browse our collection and pick your favourite fragrance from our range of premium agarbatti.',
              },
              {
                step: '02',
                heading: 'Message on WhatsApp',
                desc: 'Message us on WhatsApp with your order — our team responds within minutes.',
              },
              {
                step: '03',
                heading: 'Doorstep Delivery',
                desc: 'Receive your delivery at your door in 3–5 days, anywhere across India.',
              },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: 'center', padding: '0 16px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 900,
                  color: 'var(--gold)', lineHeight: 1, marginBottom: 20,
                  letterSpacing: '0.04em', opacity: 0.9,
                }}>{item.step}</div>
                <div style={{
                  width: 40, height: 2,
                  background: 'linear-gradient(to right, var(--gold), transparent)',
                  margin: '0 auto 20px',
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700,
                  fontSize: 22, color: 'var(--text-dark)', marginBottom: 12, lineHeight: 1.3,
                }}>{item.heading}</h3>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14,
                  color: 'var(--text-muted)', lineHeight: 1.7,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56 }}>
            <a
              href={`https://wa.me/919226915311?text=${encodeURIComponent('Hi, I found White Stone Agarbatti online. I would like to know more about your products and pricing.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ display: 'inline-flex' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }} aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.54 4.063 1.489 5.778L0 24l6.389-1.673A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.914 0-3.713-.496-5.279-1.364l-.379-.224-3.932 1.028 1.045-3.818-.247-.395A9.942 9.942 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              START YOUR ORDER
            </a>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section style={{ padding: '100px 24px', background: 'var(--bg2)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            ref={blogRef}
            style={{
              marginBottom: 48, display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
              opacity: blogVisible ? 1 : 0,
              transform: blogVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div>
              <div className="section-label" style={{ marginBottom: 12 }}>EDITORIAL</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,52px)', fontStyle: 'italic', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.1 }}>
                Sacred Wisdom
              </h2>
            </div>
            <a href="/blog" className="btn-outline" style={{ fontSize: 12 }}>ALL ARTICLES →</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 32 }}>
            {BLOGS.slice(0, 3).map((b, i) => (
              <a
                key={b.id}
                href={`/blog/${b.id}`}
                style={{
                  textDecoration: 'none', display: 'block',
                  borderTop: '1px solid var(--border)', paddingTop: 24,
                  opacity: blogVisible ? 1 : 0,
                  transform: blogVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.15 + 0.2}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.15 + 0.2}s`,
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--gold2)', letterSpacing: '0.1em', marginBottom: 12 }}>{b.category} · {b.readTime}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--text-dark)', fontStyle: 'italic', lineHeight: 1.4, marginBottom: 12 }}>{b.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{b.excerpt}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CITY SEO GRID */}
      <section>
        <CitySEOSection />
      </section>

      {/* FAQ SECTION */}
      <section id="faq" style={{ 
        padding: '120px 24px', 
        background: 'var(--bg2)', 
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background highlight */}
        <div aria-hidden="true" style={{ 
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '60%', background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 20px', 
              background: 'rgba(201,168,76,0.1)', borderRadius: 100, 
              border: '1px solid rgba(201,168,76,0.3)', marginBottom: 24
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                HAVE QUESTIONS?
              </span>
            </div>
            <h2 style={{ 
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(40px,5vw,60px)', 
              fontWeight: 900, color: 'var(--text-dark)', marginBottom: 20, 
              letterSpacing: '-0.03em', lineHeight: 1.1 
            }}>
              Frequently Asked
            </h2>
            <div style={{ width: 80, height: 4, background: 'var(--gold)', margin: '0 auto', borderRadius: 2 }} />
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            {[
              { q: "Are White Stone agarbattis charcoal-free?", a: "Yes, all our premium incense sticks are 100% charcoal-free and handcrafted using natural essential oils and resins for a pure, non-toxic experience." },
              { q: "How long does each stick burn?", a: "Our standard premium sticks burn for approximately 45-60 minutes, while our thicker dhoop sticks can last up to 90 minutes depending on the environment." },
              { q: "Do you offer international shipping?", a: "Currently, we ship across all major cities in India and have export partnerships in over 15 countries. For international bulk orders, please contact our wholesale department." },
              { q: "Can I place a wholesale order for my shop?", a: "Absolutely! We welcome wholesale inquiries from retailers and distributors. You can use the 'Wholesale Enquiry' button below or message us directly on WhatsApp." }
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '100px 24px', background: 'var(--bg)', textAlign: 'center', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>
        <div
          ref={ctaRef}
          style={{
            maxWidth: 680, margin: '0 auto',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0) scale(1)' : 'translateY(48px) scale(0.97)',
            transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px,5vw,64px)',
            fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: 24,
            letterSpacing: '-0.02em',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.15s',
          }}>
            Experience the Difference
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 18, color: 'var(--text-mid)', lineHeight: 1.7,
            marginBottom: 40, maxWidth: 480, margin: '0 auto 40px',
            opacity: ctaVisible ? 1 : 0,
            transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 0.3s',
            fontWeight: 500
          }}>
            Join thousands of households and temples across India and the world who trust White Stone for their daily rituals.
          </p>
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 0.45s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.45s',
          }}>
            <a href="https://wa.me/919226915311?text=Hi%2C%20I%20found%20White%20Stone%20Agarbatti%20online.%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20pricing." target="_blank" rel="noopener noreferrer" className="btn-primary">
              ORDER ON WHATSAPP
            </a>
            <a href="/wholesale" className="btn-outline">WHOLESALE ENQUIRY</a>
          </div>
        </div>
      </section>

      {/* KEYWORD SECTION — hidden visually, kept for SEO crawlers */}
      <section style={{ opacity: 0, height: 0, overflow: 'hidden', position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 20 }}>SEARCH TERMS</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4vw,44px)', fontStyle: 'italic', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: 20 }}>
            Top Agarbatti & Incense Keywords
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.8, maxWidth: 720, margin: '0 auto 32px' }}>
            These are the top search terms for premium agarbatti, incense sticks, and wholesale incense in India. We include them here so customers and search engines find White Stone for every relevant query.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {KEYWORDS.map(keyword => (
              <span key={keyword} style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                padding: '10px 14px', 
                background: 'rgba(255,255,255,0.08)', 
                border: '1px solid rgba(255,255,255,0.08)', 
                borderRadius: 999, 
                color: 'var(--cream)', 
                fontSize: 13, 
                lineHeight: 1.5,
                fontWeight: 700 // Make hidden keywords bold too for consistency
              }}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

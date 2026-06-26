import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CITIES, PRODUCTS, KEYWORDS } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { getProductImage } from '../productImages';

// ─── City-specific keyword groups — 8 groups × 15 keywords = 120 per city ─────
const getCityKeywords = (city: string, region: string) => [
  {
    group: `Buy Agarbatti in ${city}`,
    icon: '🛒',
    items: [
      `best agarbatti in ${city}`,
      `buy agarbatti in ${city}`,
      `buy agarbatti online ${city}`,
      `agarbatti shop in ${city}`,
      `agarbatti store in ${city}`,
      `agarbatti near me ${city}`,
      `incense sticks in ${city}`,
      `buy incense sticks ${city}`,
      `order agarbatti ${city}`,
      `agarbatti home delivery ${city}`,
      `agarbatti online delivery ${city}`,
      `best incense sticks ${city}`,
      `online agarbatti ${city}`,
      `cheap agarbatti ${city}`,
      `agarbatti delivery ${city}`,
    ],
  },
  {
    group: `Premium Agarbatti ${city}`,
    icon: '⭐',
    items: [
      `premium agarbatti ${city}`,
      `export quality agarbatti ${city}`,
      `natural agarbatti ${city}`,
      `charcoal free agarbatti ${city}`,
      `chemical free agarbatti ${city}`,
      `organic agarbatti ${city}`,
      `handmade agarbatti ${city}`,
      `herbal agarbatti ${city}`,
      `natural incense sticks ${city}`,
      `organic incense sticks ${city}`,
      `pure agarbatti ${city}`,
      `long lasting agarbatti ${city}`,
      `best fragrance agarbatti ${city}`,
      `strong fragrance agarbatti ${city}`,
      `luxury incense sticks ${city}`,
    ],
  },
  {
    group: `Agarbatti Wholesale ${city}`,
    icon: '📦',
    items: [
      `agarbatti wholesale ${city}`,
      `wholesale agarbatti ${city}`,
      `agarbatti wholesale supplier ${city}`,
      `agarbatti distributor ${city}`,
      `agarbatti distributor near me ${city}`,
      `bulk agarbatti ${city}`,
      `agarbatti bulk order ${city}`,
      `agarbatti manufacturer ${city}`,
      `agarbatti supplier ${city}`,
      `incense sticks wholesale ${city}`,
      `wholesale incense sticks ${city}`,
      `pooja items wholesale ${city}`,
      `agarbatti dealer ${city}`,
      `agarbatti exporter ${city}`,
      `low price agarbatti ${city}`,
    ],
  },
  {
    group: `Pooja & Temple Agarbatti ${city}`,
    icon: '🙏',
    items: [
      `pooja agarbatti ${city}`,
      `agarbatti for pooja ${city}`,
      `pooja incense sticks ${city}`,
      `temple agarbatti ${city}`,
      `agarbatti for temple ${city}`,
      `puja agarbatti ${city}`,
      `agarbatti for daily pooja ${city}`,
      `pooja samagri ${city}`,
      `dhoop sticks ${city}`,
      `dhoop batti ${city}`,
      `agarbatti for mandir ${city}`,
      `temple quality agarbatti ${city}`,
      `agarbatti for home pooja ${city}`,
      `best agarbatti for pooja ${city}`,
      `religious incense sticks ${city}`,
    ],
  },
  {
    group: `Fragrance Agarbatti ${city}`,
    icon: '🌸',
    items: [
      `sandalwood agarbatti ${city}`,
      `chandan agarbatti ${city}`,
      `rose agarbatti ${city}`,
      `jasmine agarbatti ${city}`,
      `oudh agarbatti ${city}`,
      `camphor agarbatti ${city}`,
      `rose gold agarbatti ${city}`,
      `black oudh agarbatti ${city}`,
      `chandan natural agarbatti ${city}`,
      `camphor jasmine agarbatti ${city}`,
      `floral incense sticks ${city}`,
      `woody incense sticks ${city}`,
      `masala agarbatti ${city}`,
      `fragrance incense sticks ${city}`,
      `aromatic agarbatti ${city}`,
    ],
  },
  {
    group: `Meditation & Wellness Incense ${city}`,
    icon: '🧘',
    items: [
      `agarbatti for meditation ${city}`,
      `meditation incense sticks ${city}`,
      `agarbatti for positive energy ${city}`,
      `stress relief incense ${city}`,
      `yoga incense sticks ${city}`,
      `calming incense sticks ${city}`,
      `agarbatti for relaxation ${city}`,
      `spiritual incense sticks ${city}`,
      `incense for mental peace ${city}`,
      `agarbatti for good vibes ${city}`,
      `aromatherapy incense ${city}`,
      `meditation dhoop ${city}`,
      `ayurvedic agarbatti ${city}`,
      `herbal meditation incense ${city}`,
      `agarbatti for concentration ${city}`,
    ],
  },
  {
    group: `${region} Agarbatti`,
    icon: '📍',
    items: [
      `agarbatti in ${region}`,
      `best agarbatti ${region}`,
      `agarbatti wholesale ${region}`,
      `agarbatti supplier ${region}`,
      `incense sticks ${region}`,
      `buy agarbatti ${region}`,
      `pooja agarbatti ${region}`,
      `agarbatti manufacturer ${region}`,
      `agarbatti distributor ${region}`,
      `natural agarbatti ${region}`,
      `premium agarbatti ${region}`,
      `agarbatti home delivery ${region}`,
      `organic incense sticks ${region}`,
      `wholesale incense sticks ${region}`,
      `temple agarbatti ${region}`,
    ],
  },
  {
    group: `White Stone Agarbatti ${city}`,
    icon: '🏆',
    items: [
      `white stone agarbatti ${city}`,
      `white stone incense ${city}`,
      `white stone agarbatti price ${city}`,
      `white stone rose gold agarbatti ${city}`,
      `white stone black oudh ${city}`,
      `white stone chandan ${city}`,
      `white stone agarbatti online ${city}`,
      `white stone agarbatti near me ${city}`,
      `white stone agarbatti wholesale ${city}`,
      `white stone agarbatti order ${city}`,
      `white stone incense sticks ${city}`,
      `best agarbatti brand ${city}`,
      `no 1 agarbatti brand ${city}`,
      `top agarbatti brand ${city}`,
      `white stone agarbatti buy ${city}`,
    ],
  },
];

const CITY_FAQS = [
  {
    q: "Which is the best agarbatti brand available for delivery?",
    a: "White Stone is the best agarbatti brand in India, offering premium export quality incense sticks with natural ingredients, charcoal-free formulation and long-lasting fragrance for 45–50 minutes per stick.",
  },
  {
    q: "Can I buy agarbatti online with fast home delivery?",
    a: "Yes! You can buy agarbatti online and get home delivery via WhatsApp order. We offer premium incense sticks online across all major cities in Maharashtra.",
  },
  {
    q: "Do you offer wholesale agarbatti supply for shops and temples?",
    a: "Yes, we are a trusted agarbatti wholesale supplier India. We offer bulk agarbatti at competitive prices for retailers, temples, distributors, and exporters. Contact us for agarbatti distributor rates.",
  },
  {
    q: "Are White Stone agarbattis charcoal-free and natural?",
    a: "Absolutely. All White Stone agarbattis are chemical-free, charcoal-free, and made from organic ingredients — eco friendly incense sticks India that are safe for daily pooja use and meditation.",
  },
  {
    q: "Which agarbatti lasts the longest?",
    a: "White Stone Black Oudh and Chandan Natural agarbattis burn for 45–50 minutes — among the longest lasting agarbatti online in India. Perfect for temple use agarbatti and long meditation sessions.",
  },
  {
    q: "Do you supply agarbatti in bulk for pooja samagri shops?",
    a: "Yes! We are an agarbatti manufacturer India with a dedicated B2B program. Low price agarbatti bulk orders are available. We also offer private label agarbatti supplier services.",
  },
  {
    q: "What is the best agarbatti for meditation and positive energy?",
    a: "Sandalwood agarbatti (Chandan Natural) and Black Oudh are the best agarbatti for meditation and positive energy. They provide a calming, grounding fragrance that supports deep meditation.",
  },
  {
    q: "Are there natural and herbal incense sticks available?",
    a: "Yes. White Stone offers herbal agarbatti India and organic incense sticks India made from natural flower extracts, wood powder, and pure resins — no synthetic chemicals ever.",
  },
];

const BENEFITS = [
  { icon: "🌿", title: "Natural Ingredients Only", desc: "Handmade agarbatti with organic wood powder, essential oils and floral extracts. Zero synthetic chemicals — chemical free agarbatti India." },
  { icon: "🙏", title: "Temple Grade Quality", desc: "Premium agarbatti for temple use trusted by 500+ temples across Maharashtra. Export quality incense sticks that fill every corner." },
  { icon: "⏱️", title: "45–50 Min Burn Time", desc: "Long lasting agarbatti that burns continuously. Each stick burns 45–50 minutes without break — the longest in its class." },
  { icon: "🌱", title: "Charcoal & Bamboo Free", desc: "Charcoal free agarbatti crafted from pure masala agarbatti bases — eco friendly incense sticks India." },
  { icon: "📦", title: "Wholesale & Retail Supply", desc: "Agarbatti wholesale supplier India for shops, temples, and distributors. Low price agarbatti bulk orders welcome." },
  { icon: "🚚", title: "Pan-India Delivery", desc: "Order premium incense sticks online from Chiplun and get delivery in 5–7 working days anywhere in Maharashtra." },
];

export const CityPage = () => {
  const { id, kw } = useParams<{ id: string; kw?: string }>();
  const navigate = useNavigate();
  const city = CITIES.find(c => c.id === id);
  const product = kw ? PRODUCTS.find(p => p.id === kw) : null;
  const cityName = city?.name || 'India';
  const regionName = city?.region || 'Maharashtra';
  const cityDesc = city?.desc || 'a major city in Maharashtra';
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const canonical = `https://whitestoneagarbatti.com/city/${id}`;
  const kwSectionRef = useRef<HTMLDivElement>(null);
  const activeKwRef = useRef<HTMLAnchorElement>(null);

  const cityKwGroups = getCityKeywords(cityName, regionName);
  const allCityKws = cityKwGroups.flatMap(g => g.items);

  // Helper: convert keyword text to URL slug and back
  const kwToSlug = (kw: string) => kw.toLowerCase().replace(/\s+/g, '-');
  const slugToKw = (slug: string, kwList: string[]) =>
    kwList.find(k => kwToSlug(k) === slug) || '';

  // Read active keyword from URL slug /city/:id/:kw
  const activeKw = kw ? slugToKw(kw, allCityKws) : '';

  // Handle keyword pill click — navigate to clean slug URL or open WhatsApp if already active
  const handleKwClick = (kw: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (activeKw === kw) {
      window.open(`https://wa.me/919226915311?text=${encodeURIComponent(`Hi, I want to enquire about: ${kw}`)}`, '_blank');
      return;
    }
    navigate(`/city/${id}/${kwToSlug(kw)}`, { replace: true });
    setTimeout(() => {
      kwSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // When arriving with ?kw= in URL, scroll to highlighted keyword
  useEffect(() => {
    if (activeKw && activeKwRef.current) {
      setTimeout(() => {
        activeKwRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [activeKw]);

  useSEO({
    title: product 
      ? `Buy ${product.name} in ${cityName} — White Stone Agarbatti` 
      : `Buy Agarbatti in ${cityName} | Best Incense Sticks Online ${cityName} | White Stone`,
    description: product 
      ? `Order ${product.name} agarbatti online in ${cityName}. ${product.fragrance} fragrance. Fast delivery in ${cityName}, ${regionName}.` 
      : `Buy premium agarbatti in ${cityName} online. White Stone offers natural, charcoal-free, long-lasting incense sticks. Wholesale agarbatti supplier ${cityName}. Order on WhatsApp for fast delivery across ${regionName}.`,
    keywords: allCityKws.slice(0, 40).join(', ') + ', ' + KEYWORDS.join(', '),
    canonical: product 
      ? `https://whitestoneagarbatti.com/city/${id}/${product.id}` 
      : (kw ? `https://whitestoneagarbatti.com/city/${id}/${kw}` : canonical),
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `White Stone Agarbatti - ${cityName}`,
      "description": `Premium agarbatti manufacturer and wholesale supplier serving ${cityName}, ${regionName}. Natural, charcoal-free incense sticks for home, temple, and wholesale use.`,
      "telephone": "+91-92269-15311",
      "url": `https://whitestoneagarbatti.in/city/${id}`,
      "areaServed": [cityName, regionName, "Maharashtra", "India"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chiplun",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
    }
  });

  return (
    <main className="page-enter" style={{ paddingTop: 88, background: 'var(--bg)' }}>

      {/* ─── HERO ─── */}
      <section style={{
        padding: '64px 24px 80px',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%), var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '5px 14px', background: 'rgba(201,168,76,0.08)', borderRadius: 20, border: '1px solid rgba(201,168,76,0.2)' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--gold2)', textTransform: 'uppercase' }}>
              SERVING {regionName.toUpperCase()} · EST. 2004
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(36px,5.5vw,72px)', color: 'var(--text-dark)', marginBottom: 20, lineHeight: 1.1 }}>
            Buy Agarbatti in {cityName}<br />
            <span style={{ color: 'var(--gold)' }}>Premium · Natural · Charcoal-Free</span>
          </h1>

          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-mid)', lineHeight: 1.75, maxWidth: 680, marginBottom: 16 }}>
            White Stone delivers <strong>premium incense sticks online</strong> to {cityName} — {cityDesc}.
            Natural ingredients, divine fragrances, and twenty years of sacred tradition from Chiplun, Maharashtra.
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 680, marginBottom: 36 }}>
            We are the most trusted <strong>agarbatti wholesale supplier {cityName}</strong> and <strong>agarbatti distributor {cityName}</strong>.
            Order <strong>best agarbatti in {cityName}</strong> directly via WhatsApp — no middlemen, factory pricing.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919226915311?text=I%20want%20to%20order%20agarbatti%20in%20${encodeURIComponent(cityName)}`}
              target="_blank" rel="noopener noreferrer" className="btn-primary">
              ORDER NOW — {cityName.toUpperCase()}
            </a>
            <a href="/wholesale" className="btn-outline">WHOLESALE ENQUIRY</a>
          </div>
        </div>
      </section>

      {/* ─── GOOGLE-STYLE SEARCH BAR ─── */}
      <section style={{
        background: 'var(--bg)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '24px 24px 0',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Google-style search input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #dfe1e5',
            borderRadius: 24,
            padding: '10px 16px 10px 20px',
            background: '#fff',
            boxShadow: '0 1px 6px rgba(32,33,36,0.1)',
            gap: 12,
            marginBottom: 0,
          }}>
            {/* Google G icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span style={{
              flex: 1,
              fontFamily: 'Arial, sans-serif',
              fontSize: 16,
              color: '#202124',
              letterSpacing: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {activeKw || `buy agarbatti in ${cityName}`}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              {activeKw && (
                <button
                  onClick={() => navigate(`/city/${id}`, { replace: true })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#70757a', fontSize: 18, lineHeight: 1 }}
                  title="Clear search"
                >✕</button>
              )}
              <div style={{ width: 1, height: 24, background: '#dfe1e5' }} />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.2" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>

          {/* Search tabs bar */}
          <div style={{
            display: 'flex',
            gap: 0,
            marginTop: 10,
            borderBottom: 'none',
            overflowX: 'auto',
          }} className="kw-strip-scroll">
            {[
              { label: 'All', icon: null, active: true },
              { label: 'Shopping', icon: '🛍️', active: false },
              { label: 'Maps', icon: '🗺️', active: false },
              { label: 'Images', icon: '🖼️', active: false },
              { label: 'News', icon: '📰', active: false },
            ].map((tab, i) => (
              <div key={i} style={{
                padding: '10px 16px',
                fontFamily: 'Arial, sans-serif',
                fontSize: 13,
                color: tab.active ? '#1a73e8' : '#70757a',
                borderBottom: tab.active ? '3px solid #1a73e8' : '3px solid transparent',
                cursor: tab.active ? 'default' : 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                userSelect: 'none',
              }}>
                {tab.icon && <span style={{ fontSize: 14 }}>{tab.icon}</span>}
                {tab.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOOGLE-STYLE RESULTS STATS ─── */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 24px 0' }}>
        <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#70757a' }}>
          About 4,12,000 results (0.54 seconds) for <strong>{activeKw || `buy agarbatti in ${cityName}`}</strong>
        </span>
      </div>

      {/* ─── PEOPLE ALSO SEARCH / KEYWORD CHIPS ROW ─── */}
      <div style={{ maxWidth: 720, margin: '8px auto 0', padding: '0 24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          {allCityKws.slice(0, 10).map((kw, i) => {
            const isActive = activeKw === kw;
            return (
              <a
                key={i}
                href={`/city/${id}/${kwToSlug(kw)}`}
                onClick={(e) => handleKwClick(kw, e)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: isActive ? '1px solid #1a73e8' : '1px solid #dfe1e5',
                  background: isActive ? '#e8f0fe' : '#fff',
                  color: isActive ? '#1a73e8' : '#202124',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: 13,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                  fontWeight: 700, // Make all keywords bold
                  transition: 'all 0.15s',
                }}
              >
                {kw}
              </a>
            );
          })}
        </div>
      </div>


      {/* ─── PRODUCTS ─── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>OUR COLLECTION</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text-dark)', marginBottom: 8, lineHeight: 1.2 }}>
            Buy Premium Agarbatti in {cityName}
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-muted)', marginBottom: 40 }}>
            Available for home delivery in {cityName} and all of {regionName}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
            {PRODUCTS.map(p => (
              <a key={p.id}
                href={`https://wa.me/919226915311?text=I%20want%20to%20order%20${encodeURIComponent(p.name)}%20in%20${encodeURIComponent(cityName)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textDecoration: 'none', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderTop: '2px solid var(--gold)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(201,168,76,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{ background: '#FDF6E3', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={getProductImage(p.id)} alt={`${p.name} agarbatti ${cityName}`} loading="lazy"
                    style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '14px 16px 18px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--text-dark)', fontStyle: 'italic', marginBottom: 4 }}>{p.name}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{p.fragrance} · {p.sticks}</p>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: '#25D366', letterSpacing: '0.1em' }}>ORDER ON WHATSAPP →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>WHY CHOOSE US</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text-dark)', marginBottom: 48, lineHeight: 1.2 }}>
            Best Agarbatti Brand for {cityName}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
            {BENEFITS.map(b => (
              <div key={b.title} style={{ padding: '28px 24px', background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: '3px solid var(--gold)' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{b.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '0.06em', marginBottom: 8 }}>{b.title}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          GOOGLE-STYLE KEYWORD SEARCH RESULTS SECTION
          ══════════════════════════════════════════════════════════════════════ */}
      <section id="kw-section" ref={kwSectionRef} style={{
        padding: '32px 0 60px',
        background: '#fff',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>

          {/* ── "People also search for" header ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '1px solid #ebebeb',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#70757a" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 14,
              color: '#202124',
              fontWeight: 500,
            }}>People also search for · {cityName}</span>
          </div>

          {/* ── GOOGLE SEARCH RESULT CARDS (one per keyword group) ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {cityKwGroups.map((group, gi) => (
              <div key={gi} style={{
                padding: '20px 0',
                borderBottom: '1px solid #ebebeb',
              }}>
                {/* Group title row — looks like a Google result header */}
                <div style={{ marginBottom: 12 }}>
                  {/* Favicon + URL breadcrumb */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, color: '#fff', fontWeight: 700,
                      fontFamily: 'Arial, sans-serif', flexShrink: 0,
                    }}>W</div>
                    <span style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 13,
                      color: '#202124',
                    }}>whitestoneagarbatti.com</span>
                    <span style={{ color: '#70757a', fontSize: 13 }}>›</span>
                    <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#202124' }}>city</span>
                    <span style={{ color: '#70757a', fontSize: 13 }}>›</span>
                    <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, color: '#202124' }}>{id}</span>
                  </div>

                  {/* Blue result title link — Google style */}
                  <div style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: 20,
                    color: '#1a0dab',
                    lineHeight: 1.3,
                    marginBottom: 4,
                    fontWeight: 600, // Bolder title
                    cursor: 'default',
                  }}>
                    {group.icon} {group.group} — White Stone
                  </div>

                  {/* Green URL */}
                  <div style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: 13,
                    color: '#006621',
                    marginBottom: 8,
                  }}>
                    https://whitestoneagarbatti.com/city/{id}
                  </div>

                  {/* Snippet text */}
                  <div style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: 14,
                    color: '#4d5156',
                    lineHeight: 1.58,
                    marginBottom: 12,
                  }}>
                    Find <strong style={{ color: '#202124' }}>{group.group.toLowerCase()}</strong> from White Stone — premium,
                    natural, charcoal-free incense sticks delivered to <strong style={{ color: '#202124' }}>{cityName}</strong>.
                    Trusted by 10,000+ homes across {regionName}. Order directly on WhatsApp.
                  </div>
                </div>

                {/* Keyword pills — Google-style rounded chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {group.items.map((kw, ki) => {
                    const isActive = activeKw === kw;
                    return (
                      <a
                        key={ki}
                        ref={isActive ? activeKwRef : undefined}
                        href={`/city/${id}/${kwToSlug(kw)}`}
                        onClick={(e) => handleKwClick(kw, e)}
                        title={isActive ? `Click to order: ${kw}` : `Search: ${kw}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '7px 14px',
                          borderRadius: 20,
                          border: isActive ? '1px solid #1a73e8' : '1px solid #dfe1e5',
                          background: isActive ? '#e8f0fe' : '#f8f9fa',
                          color: isActive ? '#1a73e8' : '#3c4043',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: 13,
                          lineHeight: 1.4,
                          textDecoration: 'none',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          fontWeight: isActive ? 600 : 400,
                          boxShadow: isActive ? '0 0 0 1px #1a73e8' : 'none',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = '#f1f3f4';
                            el.style.borderColor = '#bdc1c6';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = '#f8f9fa';
                            el.style.borderColor = '#dfe1e5';
                          }
                        }}
                      >
                        {isActive ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#70757a" strokeWidth="2" style={{ flexShrink: 0, opacity: 0.6 }}>
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                          </svg>
                        )}
                        {kw}
                        {isActive && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                            <path d="M7 17L17 7M17 7H7M17 7v10"/>
                          </svg>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ── Active keyword WhatsApp CTA (Google-style featured snippet) ── */}
          {activeKw && (
            <div style={{
              marginTop: 24,
              padding: '20px 20px 20px 16px',
              border: '1px solid #dfe1e5',
              borderLeft: '4px solid #1a73e8',
              borderRadius: 4,
              background: '#fff',
              boxShadow: '0 1px 6px rgba(32,33,36,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: '#fff', fontWeight: 700,
                  fontFamily: 'Arial, sans-serif', flexShrink: 0,
                }}>W</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#70757a', marginBottom: 2 }}>
                    Featured result · whitestoneagarbatti.com
                  </div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 15, color: '#202124', fontWeight: 500, marginBottom: 6 }}>
                    "{activeKw}" in {cityName}
                  </div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, color: '#4d5156', lineHeight: 1.58, marginBottom: 14 }}>
                    White Stone is {cityName}'s top-rated agarbatti brand. Natural, charcoal-free incense sticks.
                    Factory pricing. Order directly on WhatsApp for same-day confirmation.
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a
                      href={`https://wa.me/919226915311?text=${encodeURIComponent(`Hi, I searched for "${activeKw}" and want to enquire about agarbatti in ${cityName}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '9px 20px',
                        background: '#25D366', color: '#fff',
                        borderRadius: 4, fontFamily: 'Arial, sans-serif', fontSize: 13,
                        fontWeight: 600, textDecoration: 'none',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Order on WhatsApp
                    </a>
                    <button
                      onClick={() => navigate(`/city/${id}`, { replace: true })}
                      style={{
                        background: 'none', border: '1px solid #dfe1e5', borderRadius: 4,
                        padding: '8px 16px', cursor: 'pointer', color: '#70757a',
                        fontFamily: 'Arial, sans-serif', fontSize: 13,
                      }}
                    >✕ Clear search</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* "Related searches" footer row */}
          <div style={{
            marginTop: 32,
            padding: '16px 0 0',
            borderTop: '1px solid #ebebeb',
          }}>
            <div style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 13,
              color: '#70757a',
              marginBottom: 12,
            }}>Related searches</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {allCityKws.slice(40, 56).map((kw, i) => (
                <a
                  key={i}
                  href={`/city/${id}/${kwToSlug(kw)}`}
                  onClick={(e) => handleKwClick(kw, e)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 16px',
                    border: '1px solid #dfe1e5',
                    borderRadius: 20,
                    background: '#f8f9fa',
                    color: '#3c4043',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: 13,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#f1f3f4';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = '#f8f9fa';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#70757a" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  {kw}
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── LOCAL SEO CONTENT ─── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 12 }}>LOCAL DELIVERY</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(24px,3.5vw,42px)', color: 'var(--text-dark)', marginBottom: 20, lineHeight: 1.2 }}>
                Agarbatti Shop in {cityName} — Delivered to Your Door
              </h2>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 16 }}>
                Looking for an <strong>agarbatti store near me</strong> or <strong>incense sticks near me</strong> in {cityName}?
                White Stone operates as your virtual <strong>agarbatti shop in {cityName}</strong> with direct-from-factory pricing
                and delivery within 5–7 working days.
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 24 }}>
                We are a trusted <strong>incense supplier {cityName}</strong> and <strong>agarbatti distributor near me</strong>
                for {cityName}'s growing demand for quality pooja products. Our wholesale pooja items are available for
                shops, temples, and event organizers across {regionName}.
              </p>
              <a href={`https://wa.me/919226915311?text=I%20want%20agarbatti%20delivery%20in%20${encodeURIComponent(cityName)}`}
                target="_blank" rel="noopener noreferrer" className="btn-primary">
                ORDER NOW — {cityName.toUpperCase()}
              </a>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: 12 }}>WELLNESS & RITUAL</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(24px,3.5vw,42px)', color: 'var(--text-dark)', marginBottom: 20, lineHeight: 1.2 }}>
                Natural Incense for Pooja, Meditation & Positive Energy
              </h2>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 16 }}>
                White Stone incense is the <strong>best agarbatti for meditation</strong>, helping you achieve calm and focus.
                Our <strong>organic incense sticks</strong> promote <strong>agarbatti for positive energy</strong> and spiritual upliftment in {cityName}.
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.75 }}>
                The <strong>best fragrance incense sticks {cityName}</strong> use pure essential oils — exactly what White Stone delivers.
                Benefits of natural incense include cleansing the atmosphere, reducing stress, aiding concentration, and creating a sacred space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>COMMON QUESTIONS</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text-dark)', marginBottom: 48, lineHeight: 1.2 }}>
            Agarbatti FAQ — {cityName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {CITY_FAQS.map((faq, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
                  aria-expanded={openFaq === i}
                >
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: 'var(--text-dark)', lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ fontSize: 20, color: 'var(--gold)', flexShrink: 0, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.75, paddingBottom: 20 }}>{faq.a}</p>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 16 }}>GET STARTED TODAY</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(28px,4vw,52px)', color: 'var(--text-dark)', marginBottom: 20, lineHeight: 1.2 }}>
            Order Premium Agarbatti in {cityName} — Straight from the Makers
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 36 }}>
            Join thousands of homes, temples and retailers across {regionName} who trust White Stone —
            the best agarbatti brand in India — for their daily pooja and wholesale incense needs.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919226915311?text=I%20want%20to%20buy%20agarbatti%20in%20${encodeURIComponent(cityName)}`}
              target="_blank" rel="noopener noreferrer" className="btn-primary">
              ORDER ON WHATSAPP
            </a>
            <a href="/wholesale" className="btn-outline">WHOLESALE ENQUIRY</a>
          </div>
        </div>
      </section>

      {/* Product × City SEO Links */}
      <section style={{ padding: '60px 24px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: 12 }}>SHOP BY PRODUCT</div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 24, color: 'var(--text-dark)', marginBottom: 32 }}>
            Buy White Stone Agarbatti in {city?.name}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {PRODUCTS.map(product => (
              <a 
                key={product.id}
                href={`/city/${city?.id}/${product.id}`}
                style={{ 
                  padding: '10px 20px', background: 'rgba(201,168,76,0.07)', 
                  border: '1px solid rgba(201,168,76,0.2)', borderRadius: 4,
                  fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--gold2)',
                  textDecoration: 'none', transition: 'all 0.3s', fontWeight: 500
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(201,168,76,0.16)';
                  el.style.color = 'var(--gold)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(201,168,76,0.07)';
                  el.style.color = 'var(--gold2)';
                }}
              >
                {product.name} in {city?.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hidden SEO keyword dump for crawlers ─── */}
      <div aria-hidden="true" style={{ fontSize: 1, color: 'var(--bg)', userSelect: 'none', overflow: 'hidden', height: 0, lineHeight: 0 }}>
        {allCityKws.join(' ')} {KEYWORDS.join(' ')}
      </div>
    </main>
  );
};

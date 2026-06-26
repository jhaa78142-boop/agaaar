import React, { useState } from 'react';
import { PRODUCTS, KEYWORDS } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { getProductImage } from '../productImages';

export const ProductsPage = () => {
  const canonical = 'https://whitestoneagarbatti.com/products';

  useSEO({
    title: 'Buy Premium Agarbatti Online | White Stone Collection',
    description: 'Browse White Stone premium agarbatti collection. All natural, handmade incense sticks with 5+ fragrances. Fast delivery across India.',
    keywords: KEYWORDS.join(', '),
    canonical,
  });

  const [activeTab, setActiveTab] = useState('ALL');
  const tabs = ['ALL', 'FLORAL', 'WOODY', 'HERBAL'];
  const filtered = activeTab === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <main className="page-enter" style={{ paddingTop: 112, paddingBottom: 80, background: 'var(--bg)' }}>
      {/* Header */}
      <section style={{ padding: '0 24px 64px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(40px,6vw,80px)', color: 'var(--text-dark)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Our Collection</h1>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: 'var(--font-sans)', textTransform: 'uppercase',
                  padding: '12px 28px', border: '1px solid var(--gold)',
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer',
                  background: tab === activeTab ? 'var(--gold)' : 'transparent',
                  color: tab === activeTab ? '#1A0E00' : 'var(--gold)',
                  borderRadius: 100,
                  transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: '0 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <a
                key={p.id}
                href={`/product/${p.id}`}
                className="product-card reveal-on-scroll"
                style={{
                  display: 'block',
                  padding: '32px',
                  textDecoration: 'none',
                  background: 'var(--bg)',
                  borderRadius: 16,
                  border: '1px solid var(--border)',
                  transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease, box-shadow 0.5s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  transitionDelay: `${(i % 4) * 0.1}s`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-8px)';
                  el.style.borderColor = 'var(--gold)';
                  el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'var(--border)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div aria-hidden="true" style={{ position: 'absolute', top: 12, right: 16, fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, color: 'rgba(201,168,76,0.05)', lineHeight: 1, userSelect: 'none' }}>0{i + 1}</div>

                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: 'var(--bg2)', borderRadius: 8 }}>
                  <img
                    src={getProductImage(p.id)}
                    alt={`${p.name} — premium handmade agarbatti`}
                    loading="lazy"
                    width={180}
                    height={180}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                </div>

                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>{p.description.slice(0, 90)}…</p>

                <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                  {['NATURAL', 'LONG BURN', 'TEMPLE GRADE'].map(tag => (
                    <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', padding: '4px 10px', background: 'var(--bg3)', color: 'var(--gold2)', textTransform: 'uppercase', borderRadius: 4 }}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--gold)' }}>DISCOVER →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{ fontSize: 1, color: 'var(--bg)', userSelect: 'none', overflow: 'hidden', height: 0 }}>{KEYWORDS.join(' ')}</div>
    </main>
  );
};

import React from 'react';

interface MarqueeProps {
  items: string[];
}

export const Marquee = ({ items }: MarqueeProps) => {
  const doubled = [...items, ...items];
  return (
    <div 
      role="marquee" 
      aria-label="Brand highlights"
      style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '14px 0', background: 'var(--bg2)' }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 24, marginRight: 24 }}>
            <span style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: 13, 
              fontWeight: 800, // Extra bold for professional look
              letterSpacing: '0.12em', 
              color: 'var(--text-dark)', // More prominent color
              textTransform: 'uppercase', 
              whiteSpace: 'nowrap' 
            }}>{item}</span>
            <span style={{ color: 'var(--gold)', fontSize: 12 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

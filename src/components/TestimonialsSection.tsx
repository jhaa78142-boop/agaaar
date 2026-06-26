import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface Testimonial {
  quote: string;
  name: string;
  city: string;
  initials: string;
  color: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const { ref: testimonialsRef, isIntersecting: testimonialsVisible } = useIntersectionObserver();
  const intervalRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-rotate with pause-on-hover (WCAG 2.2.2)
  const startAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setTestimonialIdx(i => (i + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ padding: '100px 24px', background: 'var(--bg)', overflow: 'hidden' }}
      onMouseEnter={stopAutoRotate}
      onMouseLeave={startAutoRotate}
    >
      <div
        ref={testimonialsRef}
        style={{
          maxWidth: 800, margin: '0 auto', textAlign: 'center',
          opacity: testimonialsVisible ? 1 : 0,
          transform: testimonialsVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="section-label" style={{ marginBottom: 24 }}>WHAT THEY SAY</div>
        {/* Quote mark decoration */}
        <div aria-hidden="true" style={{
          fontFamily: 'var(--font-serif)', fontSize: 96, color: 'var(--gold)', lineHeight: 0.5,
          opacity: 0.12, marginBottom: 24, userSelect: 'none',
        }}>"</div>
        <div style={{ position: 'relative', minHeight: 160, overflow: 'hidden' }}>
          {testimonials.map((t, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px,2.5vw,24px)',
                fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: 28,
                position: i === 0 ? 'relative' : 'absolute',
                top: i === 0 ? 'auto' : 0, left: 0, right: 0,
                opacity: i === testimonialIdx ? 1 : 0,
                transform: i === testimonialIdx ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                willChange: 'opacity, transform',
              }}
            >
              "{t.quote}"
            </p>
          ))}
        </div>
        {/* 5-star rating */}
        <div style={{ marginBottom: 16 }}>
          <span style={{ color: 'var(--gold)', fontSize: 20, letterSpacing: 3 }}>★★★★★</span>
        </div>
        {/* Avatar + name block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {/* Circular avatar with initials */}
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: testimonials[testimonialIdx].color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
            color: '#fff', letterSpacing: '0.08em',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            transition: 'background 0.4s',
            marginBottom: 4,
          }}>
            {testimonials[testimonialIdx].initials}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.15em',
            color: 'var(--gold)', transition: 'opacity 0.4s',
          }}>
            {testimonials[testimonialIdx].name}
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#888', transition: 'opacity 0.4s' }}>
            {testimonials[testimonialIdx].city}
          </div>
          {/* Verified Customer badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'var(--font-sans)', fontSize: 11, color: '#4AE082',
            marginTop: 2,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            Verified Customer
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32 }}>
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setTestimonialIdx(i)}
              aria-label={`View testimonial from ${t.name}`}
              style={{
                width: i === testimonialIdx ? 24 : 8, height: 8,
                borderRadius: 4, border: 'none', cursor: 'pointer',
                background: i === testimonialIdx ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                padding: 18,
                backgroundClip: 'content-box',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

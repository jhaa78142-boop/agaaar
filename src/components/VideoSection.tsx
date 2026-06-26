import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const VideoSection = () => {
  const { ref: videoRef, isIntersecting: videoVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
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
          poster="/agarbatti-hero.webp"
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
            willChange: 'transform',
          }}
          onPlay={() => {
            const overlay = document.getElementById('video-play-overlay');
            if (overlay) overlay.style.opacity = '0';
          }}
          onPause={() => {
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

      {/* Gradient overlays for depth */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,5,0,0.45) 0%, transparent 30%, transparent 60%, rgba(10,5,0,0.75) 100%)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,5,0,0.5) 0%, transparent 50%, rgba(10,5,0,0.3) 100%)', pointerEvents: 'none' }} />

      {/* Centered overlay text */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', textAlign: 'center',
      }}>
        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
          opacity: videoVisible ? 1 : 0,
          transform: videoVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.3s',
        }}>
          <a href="/products" className="btn-primary" style={{ borderRadius: 100, padding: '14px 36px', fontSize: 13, fontWeight: 800 }}>EXPLORE COLLECTION</a>
          <a href="https://wa.me/919226915311?text=Hi%2C%20I%20found%20White%20Stone%20Agarbatti%20online.%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20pricing."
            target="_blank" rel="noopener noreferrer"
            className="btn-outline"
            style={{ borderRadius: 100, padding: '14px 36px', fontSize: 13, fontWeight: 800, color: '#FFF' }}>ORDER ON WHATSAPP</a>
        </div>
      </div>
    </section>
  );
};

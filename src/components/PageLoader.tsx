import React from 'react';

export const PageLoader = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.8s',
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      pointerEvents: isVisible ? 'auto' : 'none',
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        border: '2px solid rgba(201, 168, 76, 0.1)',
        borderTopColor: 'var(--gold)',
        animation: 'loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        marginBottom: 32,
      }} />
      
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: '0.3em',
        color: 'var(--gold)',
        animation: 'loader-pulse 2s ease-in-out infinite',
        textTransform: 'uppercase',
      }}>
        White Stone
      </div>

      <style>{`
        @keyframes loader-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes loader-pulse {
          0%, 100% { opacity: 0.4; letter-spacing: 0.3em; }
          50% { opacity: 1; letter-spacing: 0.4em; }
        }
      `}</style>
    </div>
  );
};

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingUI } from './components/FloatingUI';
import { BackToTop } from './components/BackToTop';
import { NoiseTexture } from './components/NoiseTexture';
import { PageLoader } from './components/PageLoader';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const WholesalePage = lazy(() => import('./pages/WholesalePage').then(m => ({ default: m.WholesalePage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const CityPage = lazy(() => import('./pages/CityPage').then(m => ({ default: m.CityPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));

export default function App() {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (window.localStorage.getItem('ws-theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Show loader on route change
    setIsPageLoading(true);
    const t = setTimeout(() => setIsPageLoading(false), 800); // Cinematic delay
    window.scrollTo({ top: 0, behavior: 'instant' }); // Reset scroll position
    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('ws-theme', theme);
  }, [theme]);

  useEffect(() => {
    // ─── Global Scroll Reveal Handler ───
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    // Handle dynamically added elements (like routes)
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.reveal-on-scroll:not(.observed)');
      newElements.forEach((el) => {
        el.classList.add('observed');
        observer.observe(el);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--cream)' }}>
      <PageLoader isVisible={isPageLoading} />
      <NoiseTexture />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <Suspense fallback={<div style={{ height: '100vh', background: 'var(--bg)' }} />}>
        <div key={location.pathname} className="route-animation">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/wholesale" element={<WholesalePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/city/:id" element={<CityPage />} />
            <Route path="/city/:id/:kw" element={<CityPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Suspense>

      <Footer />
      <BackToTop />
      <FloatingUI />
    </div>
  );
}

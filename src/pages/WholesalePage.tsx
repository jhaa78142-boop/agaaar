import React, { useState } from 'react';
import { KEYWORDS } from '../constants';
import { useSEO } from '../hooks/useSEO';

const WHOLESALE_FAQS = [
  {
    q: "What is the minimum order quantity (MOQ) for wholesale?",
    a: "Our standard MOQ for wholesale pricing starts at 500 units. For private label or custom packaging, the MOQ is 2,000 units per fragrance.",
  },
  {
    q: "Do you offer private labeling services?",
    a: "Yes! We specialize in private labeling. We can develop custom fragrances and packaging tailored to your brand's identity. This process typically takes 6–8 weeks from formulation to final delivery.",
  },
  {
    q: "How long does delivery take for bulk orders?",
    a: "Pan-India delivery usually takes 5–7 working days after order confirmation and payment. For international export orders, delivery time varies by destination and documentation requirements (typically 15–25 days).",
  },
  {
    q: "Are your products charcoal-free?",
    a: "Yes, all White Stone products are 100% charcoal-free and made from natural ingredients. We use premium wood powder, essential oils, and resins to ensure a clean, divine aroma.",
  },
  {
    q: "Do you provide international shipping?",
    a: "Absolutely. We currently export to 15+ countries including the USA, UK, UAE, and Southeast Asia. We handle all necessary documentation and export certifications.",
  },
  {
    q: "What are your payment terms?",
    a: "For new partners, we require 50% advance and 50% before dispatch. For long-term established partners, we offer flexible credit terms including net-30 billing.",
  },
];

export const WholesalePage = () => {
  const canonical = 'https://whitestoneagarbatti.com/wholesale';

  useSEO({
    title: 'Agarbatti Wholesale | B2B Agarbatti Supplier India | White Stone',
    description: "White Stone premium agarbatti wholesale. Bulk pricing, private label options, export capabilities. Connect with India's finest incense supplier.",
    keywords: KEYWORDS.join(', '),
    canonical,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0); // Open the first one by default for visibility
  const [formData, setFormData] = useState({ name: '', company: '', city: '', quantity: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    // Validate required fields
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.company.trim()) newErrors.company = 'Please enter your company name';
    if (!formData.city.trim()) newErrors.city = 'Please enter your city';
    if (!formData.quantity.trim()) newErrors.quantity = 'Please enter the quantity required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Show loading state
    setSending(true);
    setTimeout(() => {
      setSending(false);
      const msg = `*White Stone Wholesale Enquiry*\n\nName: ${formData.name}\nCompany: ${formData.company}\nCity: ${formData.city}\nQuantity: ${formData.quantity} units\n\n${formData.message}`;
      window.open(`https://wa.me/919226915311?text=${encodeURIComponent(msg)}`);
    }, 1000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', background: 'var(--bg)',
    border: '1px solid var(--border)', color: 'var(--cream)',
    fontFamily: 'var(--font-sans)', fontSize: 14,
    transition: 'border-color 0.3s',
  };

  const errorInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: '#E53935',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.12em',
    color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8, display: 'block',
  };

  const requiredFields = [
    { key: 'name', label: 'Your Name *', placeholder: 'Full name' },
    { key: 'company', label: 'Company / Business *', placeholder: 'Company name' },
    { key: 'city', label: 'City *', placeholder: 'Your city' },
    { key: 'quantity', label: 'Quantity Required *', placeholder: 'e.g. 1000 units' },
  ];

  return (
    <main className="page-enter" style={{ paddingTop: 112, paddingBottom: 80, background: 'var(--bg)' }}>
      {/* Hero */}
      <section style={{ padding: '40px 24px 80px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(40px,6vw,80px)', color: 'var(--gold)', marginBottom: 20, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Partner With Us</h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 500, color: 'var(--text-mid)', maxWidth: 560, lineHeight: 1.7 }}>
            Premium agarbatti bulk pricing for temples, distributors, retailers, and export partners across India and globally.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 24px 64px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', paddingTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
          {[
            { value: '10K+', label: 'Units/Month Capacity' },
            { value: '15+', label: 'Export Countries' },
            { value: '20+', label: 'Years in Business' },
            { value: '5-7', label: 'Days Delivery' },
          ].map(s => (
            <div key={s.value} style={{ textAlign: 'center', padding: '28px 16px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--gold)', marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text-dark)', marginBottom: 48 }}>Pricing Tiers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { qty: '500 – 1,000 units', price: '₹180–190', label: 'Distributor Entry', desc: 'Perfect for small retailers and first-time buyers.' },
              { qty: '1,000 – 5,000 units', price: '₹150–170', label: 'Bulk Advantage', desc: 'Most popular for distributors and temple suppliers.' },
              { qty: '5,000+ units', price: 'Custom Quote', label: 'Export Premium', desc: 'International orders with full certification support.' },
            ].map(tier => (
              <div key={tier.qty} style={{ padding: '36px 28px', background: 'var(--bg2)', border: '1px solid var(--border)', borderTop: '3px solid var(--gold)', textAlign: 'center' }}>
                <div className="section-label" style={{ marginBottom: 12 }}>{tier.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--gold)', marginBottom: 8 }}>{tier.price}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>{tier.qty}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.6 }}>{tier.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text-dark)', marginBottom: 48, textAlign: 'center', letterSpacing: '-0.02em' }}>Wholesale Solutions</h2>
          {[
            { title: 'Private Label', body: 'Develop your own brand with custom packaging, fragrances, and branding. Minimum order: 2,000 units. 6–8 weeks turnaround. We handle everything from formulation to packaging.' },
            { title: 'Export Quality', body: 'International certification-ready agarbatti. We export to 15+ countries including UAE, USA, UK, and Southeast Asia. All documentation provided.' },
            { title: 'Delivery & Payment', body: 'Pan-India delivery within 5–7 days. Flexible payment: 50% advance, 50% on delivery. Large orders eligible for net-30 credit terms.' },
          ].map((s, i) => (
            <div key={s.title} className="reveal-on-scroll" style={{ marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--border)', transitionDelay: `${i * 0.1}s` }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 18, color: 'var(--gold)', letterSpacing: '0.08em', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section — Professional Dark Theme */}
      <section style={{ padding: '100px 24px', background: '#0A0500', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle grid overlay for texture */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="section-label" style={{ marginBottom: 16, textAlign: 'center', color: 'var(--gold)' }}>COMMON QUESTIONS</div>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, 
            fontSize: 'clamp(32px,5vw,56px)', color: '#FFFBF0', textAlign: 'center',
            marginBottom: 64, lineHeight: 1.2, textShadow: '0 2px 20px rgba(0,0,0,0.5)'
          }}>
            Wholesale FAQ
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {WHOLESALE_FAQS.map((faq, i) => (
              <div 
                key={i} 
                style={{ 
                  borderRadius: 12, overflow: 'hidden', 
                  border: `2px solid ${openFaq === i ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                  background: openFaq === i ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: openFaq === i ? '0 10px 40px rgba(0,0,0,0.4)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ 
                    width: '100%', textAlign: 'left', padding: '28px 32px', 
                    background: 'none', border: 'none', cursor: 'pointer', 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 
                  }}
                  aria-expanded={openFaq === i}
                >
                  <span style={{ 
                    fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, 
                    color: openFaq === i ? 'var(--gold)' : '#FFF', 
                    lineHeight: 1.4, transition: 'color 0.3s' 
                  }}>
                    {faq.q}
                  </span>
                  <span style={{ 
                    fontSize: 28, color: 'var(--gold)', flexShrink: 0, 
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)', 
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    fontWeight: 700
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '500px' : '0px',
                  opacity: openFaq === i ? 1 : 0,
                  transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                  overflow: 'hidden',
                }}>
                  <p style={{ 
                    fontFamily: 'var(--font-sans)', fontSize: 16, color: '#FFFFFF', // Pure white for maximum visibility
                    lineHeight: 1.8, padding: '0 32px 32px', margin: 0,
                    fontWeight: 400
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text-dark)', marginBottom: 16 }}>Send Enquiry</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.6 }}>Fill the form below and we'll connect on WhatsApp within 2 hours.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {requiredFields.map(field => (
              <div key={field.key}>
                <label style={labelStyle}>{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={e => {
                    setFormData(prev => ({ ...prev, [field.key]: e.target.value }));
                    if (errors[field.key]) setErrors(prev => { const n = {...prev}; delete n[field.key]; return n; });
                  }}
                  style={errors[field.key] ? errorInputStyle : inputStyle}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = errors[field.key] ? '#E53935' : 'var(--gold)'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = errors[field.key] ? '#E53935' : 'var(--border)'}
                />
                {errors[field.key] && (
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#E53935', marginTop: 6 }}>
                    {errors[field.key]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>Message</label>
            <textarea
              placeholder="Tell us about your requirements..."
              rows={4}
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--gold)'}
              onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'}
            />
          </div>

          <div style={{ marginTop: 28 }}>
            <button
              onClick={handleSubmit}
              disabled={sending}
              className="btn-primary"
              style={{
                width: '100%', 
                justifyContent: 'center',
                opacity: sending ? 0.7 : 1,
                cursor: sending ? 'not-allowed' : 'pointer',
                borderRadius: 100,
                padding: '16px 32px',
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.05em'
              }}
            >
              {sending ? (
                <>SENDING...</>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.54 4.063 1.489 5.778L0 24l6.389-1.673A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.914 0-3.713-.496-5.279-1.364l-.379-.224-3.932 1.028 1.045-3.818-.247-.395A9.942 9.942 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  SEND ENQUIRY ON WHATSAPP
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{ fontSize: 1, color: 'var(--bg)', userSelect: 'none', overflow: 'hidden', height: 0 }}>{KEYWORDS.join(' ')}</div>
    </main>
  );
};

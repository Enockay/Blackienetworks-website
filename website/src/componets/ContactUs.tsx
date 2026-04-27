import React, { useState } from 'react';
import { Form, Input, Select, notification } from 'antd';
import { motion } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiLinkedin,
  FiTwitter, FiFacebook, FiInstagram, FiMessageCircle,
  FiCheckCircle, FiZap, FiUsers, FiShield,
} from 'react-icons/fi';
import { SEO } from './SEO';

const { TextArea } = Input;
const { Option } = Select;

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, type: 'spring' as const, stiffness: 90, damping: 14 },
});

const SERVICES = [
  'Network Infrastructure',
  'Web Development',
  'Cloud Solutions',
  'AI & Automation',
  'Mobile App Development',
  'VPN & Security',
  'ISP Billing System',
  'MikroTik Solutions',
  'Software Maintenance',
  'General Enquiry',
];

const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const payload = {
        fullName: values.name,
        company: values.company || '',
        email: values.email,
        phone: values.phone,
        service: values.service || 'General Enquiry',
        budget: '',
        message: values.message,
      };
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed');
      setSent(true);
      form.resetFields();
      notification.success({
        message: 'Message Sent!',
        description: "We've received your message and will respond within 24 hours.",
        placement: 'topRight',
      });
    } catch {
      notification.error({
        message: 'Message Not Sent',
        description: 'Please try again or reach us directly via WhatsApp.',
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hello! I would like to get in touch with Blackie Networks.');
    window.open(`https://wa.me/254796869402?text=${msg}`, '_blank');
  };

  const infoItems = [
    { icon: FiMapPin, label: 'Address', value: 'Chuka University, Kenya', href: undefined, color: '#3b82f6' },
    { icon: FiPhone, label: 'Phone', value: '+254 796 869 402', href: 'tel:+254796869402', color: '#10b981' },
    { icon: FiMail, label: 'Email', value: 'support@blackie-networks.com', href: 'mailto:support@blackie-networks.com', color: '#8b5cf6' },
    { icon: FiClock, label: 'Working Hours', value: 'Mon – Fri, 8:00am – 6:00pm EAT', href: undefined, color: '#f59e0b' },
  ];

  const socials = [
    { icon: FiLinkedin, href: 'https://linkedin.com/company/blackienetworks', label: 'LinkedIn', color: '#0077b5' },
    { icon: FiTwitter, href: 'https://twitter.com/blackienetworks', label: 'Twitter', color: '#1da1f2' },
    { icon: FiFacebook, href: 'https://facebook.com/blackienetworks', label: 'Facebook', color: '#1877f2' },
    { icon: FiInstagram, href: 'https://instagram.com/blackienetworks', label: 'Instagram', color: '#e1306c' },
  ];

  const trust = [
    { icon: FiZap, label: '< 24h Response' },
    { icon: FiUsers, label: 'Dedicated Support' },
    { icon: FiShield, label: 'Trusted Kenyan Team' },
    { icon: FiCheckCircle, label: 'Free Consultation' },
  ];

  return (
    <>
      <SEO
        title="Contact Us | Blackie Networks"
        description="Contact Blackie Networks for IT solutions, network infrastructure, cloud, and support in Kenya."
        keywords="contact Blackie Networks, IT support Kenya, network services"
        url="/contactus"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contactus' },
        ]}
      />

      {/* ── DARK HERO BAND ── */}
      <div style={{ position: 'relative', marginTop: 64, background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 55%, #0f1e38 100%)', overflow: 'hidden' }}>
        {/* radial glow */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
        {/* blue accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #2563eb 30%, #60a5fa 70%, transparent)' }} />

        <div className="max-w-7xl mx-auto" style={{ padding: '80px 24px 72px', position: 'relative', zIndex: 1 }}>
          {/* eyebrow */}
          <motion.div {...fadeUp(0)} style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <span className="section-eyebrow">
              <FiMessageCircle style={{ marginRight: 6, verticalAlign: 'middle' }} />
              CONTACT US
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1 {...fadeUp(0.08)} style={{ textAlign: 'center', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.15, marginBottom: 20 }}>
            Let's Build Something{' '}
            <span style={{ background: 'linear-gradient(90deg, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Together
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p {...fadeUp(0.14)} style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Have questions about our IT solutions? Our Kenya-based team is ready to help — reach out via any channel and we will respond within 24 hours.
          </motion.p>

          {/* WhatsApp CTA */}
          <motion.div {...fadeUp(0.2)} style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
            <motion.button
              onClick={openWhatsApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px', background: 'linear-gradient(135deg, #25D366, #128C7E)', border: 'none', borderRadius: 14, color: '#fff', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 32px rgba(37,211,102,0.35)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              Chat with us on WhatsApp
            </motion.button>
          </motion.div>

          {/* trust chips */}
          <motion.div {...fadeUp(0.26)} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99, color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 500 }}>
                <Icon style={{ color: '#60a5fa', fontSize: 13 }} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── WHITE CONTENT ── */}
      <div style={{ background: 'var(--bg-base)', borderTop: '3px solid rgba(37,99,235,0.15)' }}>
        <div className="max-w-7xl mx-auto" style={{ padding: '80px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 40, alignItems: 'start' }}>

            {/* ── FORM ── */}
            <motion.div {...fadeUp(0)}>
              <div style={{ background: '#fff', borderRadius: 20, padding: '40px 36px', border: '1px solid rgba(37,99,235,0.12)', boxShadow: '0 4px 40px rgba(37,99,235,0.08)' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Send us a Message</h2>
                <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: 32 }}>Fill in the details below and we will get back to you promptly.</p>

                {sent && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, padding: '14px 18px', marginBottom: 24 }}>
                    <FiCheckCircle style={{ color: '#10b981', fontSize: 20, flexShrink: 0 }} />
                    <span style={{ color: '#065f46', fontWeight: 600, fontSize: '0.9rem' }}>Message sent! We will be in touch soon.</span>
                  </div>
                )}

                <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                    <Form.Item label={<span style={{ color: '#374151', fontWeight: 600, fontSize: '0.88rem' }}>Full Name *</span>} name="name" rules={[{ required: true, message: 'Required' }]}>
                      <Input placeholder="Your full name" size="large" style={inputStyle} />
                    </Form.Item>
                    <Form.Item label={<span style={{ color: '#374151', fontWeight: 600, fontSize: '0.88rem' }}>Company</span>} name="company">
                      <Input placeholder="Company name (optional)" size="large" style={inputStyle} />
                    </Form.Item>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                    <Form.Item label={<span style={{ color: '#374151', fontWeight: 600, fontSize: '0.88rem' }}>Email Address *</span>} name="email" rules={[{ required: true, message: 'Required' }, { type: 'email', message: 'Invalid email' }]}>
                      <Input placeholder="you@example.com" size="large" style={inputStyle} />
                    </Form.Item>
                    <Form.Item label={<span style={{ color: '#374151', fontWeight: 600, fontSize: '0.88rem' }}>Phone Number *</span>} name="phone" rules={[{ required: true, message: 'Required' }, { pattern: /^\+?\d{7,15}$/, message: 'Invalid number' }]}>
                      <Input placeholder="+254 796 869 402" size="large" style={inputStyle} />
                    </Form.Item>
                  </div>

                  <Form.Item label={<span style={{ color: '#374151', fontWeight: 600, fontSize: '0.88rem' }}>Service of Interest *</span>} name="service" rules={[{ required: true, message: 'Please select a service' }]}>
                    <Select placeholder="Select a service..." size="large" style={{ width: '100%' }} dropdownStyle={{ borderRadius: 10 }}>
                      {SERVICES.map(s => <Option key={s} value={s}>{s}</Option>)}
                    </Select>
                  </Form.Item>

                  <Form.Item label={<span style={{ color: '#374151', fontWeight: 600, fontSize: '0.88rem' }}>Message *</span>} name="message" rules={[{ required: true, message: 'Required' }]}>
                    <TextArea placeholder="Tell us about your project or enquiry..." rows={5} maxLength={600} showCount style={{ ...inputStyle, resize: 'none' }} />
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 0 }}>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      style={{ width: '100%', padding: '14px 0', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8, #2563eb)', border: 'none', borderRadius: 12, color: '#fff', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 4px 20px rgba(37,99,235,0.35)' }}
                    >
                      {loading ? (
                        <>
                          <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend style={{ fontSize: 17 }} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </Form.Item>
                </Form>
              </div>
            </motion.div>

            {/* ── CONTACT INFO ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <motion.div {...fadeUp(0.1)} style={{ background: '#fff', borderRadius: 20, padding: '36px', border: '1px solid rgba(37,99,235,0.12)', boxShadow: '0 4px 40px rgba(37,99,235,0.08)' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: 28 }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {infoItems.map(({ icon: Icon, label, value, href, color }) => {
                    const inner = (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', background: '#f8faff', border: '1px solid rgba(37,99,235,0.1)', borderRadius: 14, textDecoration: 'none', transition: 'all 0.2s' }}>
                        <div style={{ width: 46, height: 46, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon style={{ fontSize: 20, color }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
                          <p style={{ margin: 0, color: '#374151', fontWeight: 500, fontSize: '0.92rem' }}>{value}</p>
                        </div>
                      </div>
                    );
                    return href ? (
                      <motion.a key={label} href={href} whileHover={{ x: 4 }} style={{ textDecoration: 'none', display: 'block' }}>{inner}</motion.a>
                    ) : (
                      <motion.div key={label} whileHover={{ x: 4 }}>{inner}</motion.div>
                    );
                  })}
                </div>

                {/* social links */}
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(37,99,235,0.1)' }}>
                  <p style={{ margin: '0 0 14px', fontSize: '0.82rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Follow Us</p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {socials.map(({ icon: Icon, href, label, color }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ width: 44, height: 44, borderRadius: 12, background: `${color}12`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: 18, textDecoration: 'none' }}
                      >
                        <Icon />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div {...fadeUp(0.18)} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(37,99,235,0.12)', boxShadow: '0 4px 40px rgba(37,99,235,0.08)', height: 320 }}>
                <iframe
                  title="Blackie Networks Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19902.12345!2d37.6373!3d-0.3322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17811f1a9b2a2cbb%3A0x123456789abcdef!2sChuka%20University!5e0!3m2!1sen!2ske!4v1686712345678!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DARK CTA BAND ── */}
      <div style={{ background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 60%, #0f1e38 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)' }} />
        <div className="max-w-3xl mx-auto" style={{ padding: '72px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.p {...fadeUp(0)} style={{ fontSize: '0.8rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>READY TO GET STARTED?</motion.p>
          <motion.h2 {...fadeUp(0.07)} style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: 16, lineHeight: 1.2 }}>
            Not Sure Where to Begin?
          </motion.h2>
          <motion.p {...fadeUp(0.13)} style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: 36, lineHeight: 1.7 }}>
            Book a free 30-minute consultation and let our engineers analyse your needs — no commitment required.
          </motion.p>
          <motion.div {...fadeUp(0.19)} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              onClick={openWhatsApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
            >
              <FiMessageCircle /> Book Free Consultation
            </motion.button>
            <motion.a
              href="tel:+254796869402"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 12, color: '#cbd5e1', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}
            >
              <FiPhone /> Call Us Now
            </motion.a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .ant-form-item-label > label { font-size: 0.88rem !important; }
        .ant-input, .ant-input-affix-wrapper, .ant-select-selector, .ant-input-textarea { border-radius: 10px !important; }
        .ant-input:focus, .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused, .ant-select-focused .ant-select-selector { border-color: #2563eb !important; box-shadow: 0 0 0 2px rgba(37,99,235,0.15) !important; }
        .ant-input::placeholder, textarea::placeholder { color: #9ca3af !important; }
        .ant-select-dropdown { border-radius: 12px !important; }
      `}</style>
    </>
  );
};

const inputStyle: React.CSSProperties = {
  background: '#f8faff',
  border: '1px solid rgba(37,99,235,0.18)',
  borderRadius: 10,
  color: '#0f172a',
  fontSize: '0.93rem',
};

export default ContactUs;

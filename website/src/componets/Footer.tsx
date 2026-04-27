import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiFacebook, FiInstagram, FiZap } from 'react-icons/fi';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { path: '/',          label: 'Home' },
    { path: '/aboutus',   label: 'About Us' },
    { path: '/services',  label: 'Services' },
    { path: '/Products',  label: 'Products' },
    { path: '/blog',      label: 'Blog' },
    { path: '/faq',       label: 'FAQ' },
    { path: '/contactus', label: 'Contact' },
  ];

  const services = [
    { path: '/services/network-billing',   label: 'Network Setup & Billing' },
    { path: '/services/web-development',   label: 'Web Development' },
    { path: '/services/cloud-hosting',     label: 'Cloud Infrastructure' },
    { path: '/services/ai-systems',        label: 'AI Systems & Automation' },
    { path: '/services/mobile-apps',       label: 'Mobile App Development' },
    { path: '/services/vpn-blackieshield', label: 'VPN – Blackie Shield' },
    { path: '/services/it-consulting',     label: 'IT Consulting' },
  ];

  const socials = [
    { icon: FiFacebook,  href: 'https://facebook.com',  label: 'Facebook'  },
    { icon: FiTwitter,   href: 'https://twitter.com',   label: 'Twitter'   },
    { icon: FiLinkedin,  href: 'https://linkedin.com',  label: 'LinkedIn'  },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiGithub,    href: 'https://github.com',    label: 'GitHub'    },
  ];

  const linkStyle: React.CSSProperties = {
    color: '#64748b', textDecoration: 'none', fontSize: 14,
    transition: 'color 0.2s ease', display: 'block', paddingBottom: 2,
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #080f20 0%, #0a1628 100%)',
        borderTop: '1px solid rgba(59,130,246,0.15)',
        padding: '72px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px 32px',
          marginBottom: 56,
        }}>

          {/* ── Brand column ── */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, overflow: 'hidden',
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FiZap size={18} style={{ color: '#3b82f6' }} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9', lineHeight: 1 }}>
                  Blackie<span style={{ color: '#3b82f6' }}>Networks</span>
                </div>
                <div style={{ fontSize: 9, color: '#64748b', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', marginTop: 2 }}>
                  IT SOLUTIONS · KENYA
                </div>
              </div>
            </div>

            <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.75, marginBottom: 20, maxWidth: 280 }}>
              Empowering businesses and campuses across Kenya with cutting-edge network infrastructure, custom software, and IT consulting.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 34, height: 34,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8, color: '#64748b',
                    textDecoration: 'none', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#60a5fa';
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                    e.currentTarget.style.background = 'rgba(59,130,246,0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', marginBottom: 18, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
              Quick Links
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map(({ path, label }) => (
                <Link
                  key={path} to={path} style={linkStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Services ── */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', marginBottom: 18, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
              Services
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {services.map(({ path, label }) => (
                <Link
                  key={path} to={path} style={linkStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', marginBottom: 18, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: FiPhone,  href: 'tel:+254796869402',                     text: '+254 796 869 402' },
                { icon: FiMail,   href: 'mailto:support@blackie-networks.com',   text: 'support@blackie-networks.com' },
              ].map(({ icon: Icon, href, text }) => (
                <a
                  key={text}
                  href={href}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#64748b', fontSize: 13.5, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#3b82f6',
                  }}>
                    <Icon size={14} />
                  </div>
                  {text}
                </a>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#64748b', fontSize: 13.5 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6',
                }}>
                  <FiMapPin size={14} />
                </div>
                Parklands, Nairobi, Kenya
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/254796869402"
                target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 14px', borderRadius: 8, marginTop: 4,
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  color: '#22c55e', fontWeight: 600, fontSize: 13.5,
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(34,197,94,0.08)'; }}
              >
                💬 WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          paddingTop: 28,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>
            © {year} Blackie Networks. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { path: '/terms',   label: 'Terms of Service' },
              { path: '/privacy', label: 'Privacy Policy'   },
            ].map(({ path, label }) => (
              <Link
                key={path} to={path}
                style={{ fontSize: 13, color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

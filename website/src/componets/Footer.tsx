import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Typography, Divider } from 'antd';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiGithub,
  FiZap,
} from 'react-icons/fi';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter
      style={{
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)',
        borderTop: '1px solid rgba(148, 163, 184, 0.35)',
        padding: '60px 20px 30px',
        color: '#1e293b',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <Row gutter={[32, 32]} justify="center">
          {/* Company Overview */}
          <Col xs={24} sm={12} md={6}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <FiZap style={{ fontSize: '24px', color: '#0ea5e9' }} />
              <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Blackie Networks</Title>
            </div>
            <Paragraph style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Empowering businesses and campuses across Kenya with cutting-edge network infrastructure, 
              custom software development, and IT consulting services. Your trusted technology partner.
            </Paragraph>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              {[
                { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.04)',
                    border: '1px solid rgba(148, 163, 184, 0.5)',
                    borderRadius: '8px',
                    color: '#0ea5e9',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.06)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.04)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#0f172a', marginBottom: '20px' }}>Quick Links</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { path: '/', label: 'Home' },
                { path: '/aboutus', label: 'About Us' },
                { path: '/services', label: 'Services' },
                { path: '/Products', label: 'Products' },
                { path: '/blog', label: 'Blog' },
                { path: '/faq', label: 'FAQ' },
                { path: '/contactus', label: 'Contact Us' },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  style={{
                    color: '#475569',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#0ea5e9';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  → {label}
                </Link>
              ))}
            </div>
          </Col>

          {/* Services */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#0f172a', marginBottom: '20px' }}>Our Services</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Network Infrastructure',
                'Software Development',
                'Cloud Services',
                'IT Consulting',
                'Campus Wi-Fi Solutions',
                'VPN Services',
              ].map((service) => (
                <Text
                  key={service}
                  style={{
                    color: '#475569',
                    fontSize: '0.95rem',
                    display: 'block',
                  }}
                >
                  • {service}
                </Text>
              ))}
            </div>
          </Col>

          {/* Contact Us */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#0f172a', marginBottom: '20px' }}>Contact Us</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href="tel:+254796869402"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#475569',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0ea5e9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#475569';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.04)',
                    border: '1px solid rgba(148, 163, 184, 0.5)',
                    borderRadius: '8px',
                    color: '#0ea5e9',
                  }}
                >
                  <FiPhone size={18} />
                </div>
                <span style={{ fontSize: '0.95rem' }}>+254 796 869 402</span>
              </a>

              <a
                href="mailto:support@blackie-networks.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#475569',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0ea5e9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#475569';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.04)',
                    border: '1px solid rgba(148, 163, 184, 0.5)',
                    borderRadius: '8px',
                    color: '#0ea5e9',
                  }}
                >
                  <FiMail size={18} />
                </div>
                <span style={{ fontSize: '0.95rem' }}>support@blackie-networks.com</span>
              </a>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#475569',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.04)',
                    border: '1px solid rgba(148, 163, 184, 0.5)',
                    borderRadius: '8px',
                    color: '#0ea5e9',
                  }}
                >
                  <FiMapPin size={18} />
                </div>
                <span style={{ fontSize: '0.95rem' }}>Chuka University, Kenya</span>
              </div>
            </div>
          </Col>
        </Row>

        <Divider style={{ margin: '40px 0 30px', borderColor: 'rgba(148, 163, 184, 0.35)' }} />

        <div
          style={{
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#475569',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <p>
            © {new Date().getFullYear()} Blackie Networks. All rights reserved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link
              to="/terms"
              style={{ color: '#475569', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0ea5e9')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
            >
              Terms of Service
            </Link>
            <span style={{ color: 'rgba(148, 163, 184, 0.8)' }}>|</span>
            <Link
              to="/privacy"
              style={{ color: '#475569', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0ea5e9')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;

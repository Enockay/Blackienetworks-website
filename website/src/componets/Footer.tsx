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
        background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
        borderTop: '1px solid rgba(0, 240, 255, 0.2)',
        padding: '60px 20px 30px',
        color: '#e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <Row gutter={[32, 32]} justify="center">
          {/* Company Overview */}
          <Col xs={24} sm={12} md={6}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <FiZap style={{ fontSize: '24px', color: '#00f0ff' }} />
              <Title level={4} style={{ margin: 0, color: '#00f0ff' }}>Blackie Networks</Title>
            </div>
            <Paragraph style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.95rem' }}>
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
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#00f0ff',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 240, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
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
            <Title level={5} style={{ color: '#00f0ff', marginBottom: '20px' }}>Quick Links</Title>
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
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00f0ff';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#cbd5e1';
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
            <Title level={5} style={{ color: '#00f0ff', marginBottom: '20px' }}>Our Services</Title>
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
                    color: '#cbd5e1',
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
            <Title level={5} style={{ color: '#00f0ff', marginBottom: '20px' }}>Contact Us</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href="tel:+254796869402"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00f0ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#00f0ff',
                }}>
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
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00f0ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#00f0ff',
                }}>
                  <FiMail size={18} />
                </div>
                <span style={{ fontSize: '0.95rem' }}>support@blackie-networks.com</span>
              </a>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#cbd5e1',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#00f0ff',
                }}>
                  <FiMapPin size={18} />
                </div>
                <span style={{ fontSize: '0.95rem' }}>Chuka University, Kenya</span>
              </div>
            </div>
          </Col>
        </Row>

        <Divider style={{ margin: '40px 0 30px', borderColor: 'rgba(0, 240, 255, 0.2)' }} />

        <div style={{ 
          textAlign: 'center', 
          fontSize: '0.9rem', 
          color: '#94a3b8',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <p>
            © {new Date().getFullYear()} Blackie Networks. All rights reserved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link 
              to="/terms" 
              style={{ color: '#94a3b8', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              Terms of Service
            </Link>
            <span style={{ color: 'rgba(0, 240, 255, 0.3)' }}>|</span>
            <Link 
              to="/privacy" 
              style={{ color: '#94a3b8', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#00f0ff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
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

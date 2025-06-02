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
} from 'react-icons/fi';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ backgroundColor: '#fff', color: '#333', padding: '60px 20px' }}>
      <Row gutter={[32, 32]} justify="center">
        {/* Company Overview */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#333' }}>Blackie Networks</Title>
          <Paragraph type="secondary">
            Blackie Networks is committed to providing innovative IT solutions including software
            development, network infrastructure, and consulting services. Our goal is to empower
            businesses with reliable technology solutions that drive growth.
          </Paragraph>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Quick Links</Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/home">Home</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </Col>

        {/* Contact Us */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Contact Us</Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Text><FiPhone style={{ marginRight: 8 }} /> +254 7968 694 02</Text>
            <Text>
              <FiMail style={{ marginRight: 8 }} />
              <a href="mailto:info@blackienetworks.com">info@blackienetworks.com</a>
            </Text>
            <Text><FiMapPin style={{ marginRight: 8 }} /> Nairobi, Kenya</Text>
          </div>
        </Col>

        {/* Social Media */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Follow Us</Title>
          <div style={{ display: 'flex', gap: 16, fontSize: 24 }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
          </div>
        </Col>
      </Row>

      <Divider style={{ margin: '40px 0' }} />

      <div style={{ textAlign: 'center', fontSize: 14, color: '#888' }}>
        <p>© {new Date().getFullYear()} Blackie Networks. All rights reserved.</p>
        <p>
          <Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </AntFooter>
  );
};

export default Footer;

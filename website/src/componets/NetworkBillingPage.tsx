import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const bulletStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 8,
};

const NetworkBillingPage: React.FC = () => {
  return (
    <section
      style={{
        padding: '80px 20px 96px',
        background: '#f9fafb',
      }}
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Row gutter={[40, 32]} align="top">
          <Col xs={24} md={14}>
            <Title level={2} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              Network Setup & Billing Systems
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#475569', marginBottom: 16 }}>
              We design, install, and configure reliable networks, then connect them to a billing
              system that makes it easy to manage users and payments.
            </Paragraph>

            <Paragraph style={{ fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>
              What we handle for you:
            </Paragraph>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Complete network planning, cabling, switching, and router configuration.',
                'MikroTik setup for load balancing, failover, VPNs, VLANs, and hotspot portals.',
                'ISP / campus billing systems with packages, bundles, and automated renewals.',
                'User management, vouchers, and self‑service portals for students and customers.',
                'Real‑time usage tracking, reporting, and alerts so you see issues before users do.',
                'Full documentation and training so your team can operate the network confidently.',
              ].map((item) => (
                <li key={item} style={bulletStyle}>
                  <CheckCircleOutlined style={{ color: '#22c55e', marginTop: 4 }} />
                  <span style={{ color: '#4b5563' }}>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              type="primary"
              size="large"
              style={{ marginTop: 24, borderRadius: 999, padding: '0 28px' }}
              href="/contactus"
            >
              Talk to us about your network
            </Button>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: 24,
                background:
                  'radial-gradient(circle at top left, rgba(56, 189, 248, 0.14), transparent 60%), #ffffff',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.16)',
                padding: 24,
              }}
            >
              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Perfect for:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563', marginBottom: 20 }}>
                <li>Campus Wi‑Fi providers and student hostels</li>
                <li>Emerging ISPs and WISPs</li>
                <li>Saccos, estates, and gated communities</li>
                <li>Schools, colleges, and training centers</li>
              </ul>

              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Common outcomes:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563' }}>
                <li>Reduced downtime and support calls</li>
                <li>Clear visibility into usage and revenue</li>
                <li>Smoother onboarding for new users</li>
                <li>Secure, segmented networks for staff and guests</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default NetworkBillingPage;


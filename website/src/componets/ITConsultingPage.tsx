import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ITConsultingPage: React.FC = () => {
  const bulletStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  };

  return (
    <section
      style={{
        padding: '80px 20px 96px',
        background: '#ffffff',
      }}
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Row gutter={[40, 32]} align="top">
          <Col xs={24} md={14}>
            <Title level={2} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              IT Consulting & Managed Support
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#475569', marginBottom: 16 }}>
              Think of Blackie Networks as your external IT department — from strategy and planning
              to day‑to‑day troubleshooting.
            </Paragraph>

            <Paragraph style={{ fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>
              Typical consulting engagements:
            </Paragraph>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'IT audits that show you what is working, what is risky, and where to invest.',
                'Roadmaps for networking, cloud, software, and security over the next 12–36 months.',
                'Vendor and technology selection so you do not waste money on the wrong tools.',
                'Ongoing help desk and remote support packages.',
                'Project supervision when other vendors are doing installations.',
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
              Book an IT consultation
            </Button>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: 24,
                background:
                  'radial-gradient(circle at top left, rgba(96, 165, 250, 0.18), transparent 60%), #f9fafb',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.16)',
                padding: 24,
              }}
            >
              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Who this is for:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563', marginBottom: 20 }}>
                <li>SMEs without an internal IT team</li>
                <li>Organizations planning a major upgrade or migration</li>
                <li>Schools, NGOs, and Saccos that need a trusted long‑term partner</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ITConsultingPage;


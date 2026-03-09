import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const WebDevelopmentPage: React.FC = () => {
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
              Web & Application Development
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#475569', marginBottom: 16 }}>
              We design and build websites, portals, and internal systems that match how your
              organization actually works — not generic templates.
            </Paragraph>

            <Paragraph style={{ fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>
              We can help you with:
            </Paragraph>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Corporate websites and landing pages that clearly explain what you do.',
                'Customer/self‑service portals for payments, bookings, tickets, and results.',
                'Custom dashboards and admin panels for operations, reporting, and analytics.',
                'Integration with billing, SMS, WhatsApp, and existing CRMs or ERPs.',
                'Student and staff portals for education institutions.',
                'Ongoing maintenance, improvements, and feature development.',
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
              Start a web project
            </Button>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: 24,
                background:
                  'radial-gradient(circle at top left, rgba(96, 165, 250, 0.2), transparent 60%), #f9fafb',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.16)',
                padding: 24,
              }}
            >
              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Tech stack we love:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563', marginBottom: 20 }}>
                <li>Modern React front‑ends and mobile‑first design</li>
                <li>Laravel / Node.js APIs and business logic</li>
                <li>MySQL / PostgreSQL databases</li>
                <li>Cloud hosting on AWS, DigitalOcean and similar</li>
              </ul>

              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Ideal for:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563' }}>
                <li>Businesses that want to move away from spreadsheets</li>
                <li>Schools, Saccos, and NGOs needing custom systems</li>
                <li>Founders with a clear idea that needs a solid MVP</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default WebDevelopmentPage;


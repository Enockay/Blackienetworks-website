import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import glintParlourImg from '../assets/glintparlour.png';
import billingSystemImg from '../assets/billingsystem.png';
import backgroundImg from '../assets/background.jpg';

const { Title, Paragraph } = Typography;

const bulletStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 8,
};

const MobileAppsPage: React.FC = () => {
  return (
    <section
      style={{
        padding: '80px 20px 96px',
        background: '#f9fafb',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10">
        {/* Hero summary */}
        <Row gutter={[40, 32]} align="top">
          <Col xs={24} md={14}>
            <Title level={2} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              Mobile App Development
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#475569', marginBottom: 16 }}>
              We design and build Android and iOS apps that plug into the rest of your stack –
              billing, VPN, cloud dashboards and support tools – so your users can work and transact
              from anywhere.
            </Paragraph>

            <Paragraph style={{ fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>
              What a typical project includes:
            </Paragraph>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'UX workshops to map journeys for customers, staff, or field teams.',
                'API design and integration with your existing systems and VPN-secured backends.',
                'Offline‑first flows for checklists, forms and ticketing in low‑connectivity areas.',
                'Secure authentication with biometrics, OTP, and role‑based access.',
                'App store publishing, updates and long‑term maintenance.',
              ].map((item) => (
                <li key={item} style={bulletStyle}>
                  <CheckCircleOutlined style={{ color: '#22c55e', marginTop: 4 }} />
                  <span style={{ color: '#4b5563' }}>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              type="default"
              size="large"
              style={{
                marginTop: 24,
                borderRadius: 999,
                padding: '0 28px',
                background: '#ffffff',
                borderColor: '#1d4ed8',
                color: '#1d4ed8',
                fontWeight: 600,
              }}
              href="/contactus"
            >
              Discuss a mobile app
            </Button>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: 24,
                background:
                  'radial-gradient(circle at top left, rgba(96, 165, 250, 0.2), transparent 60%), #ffffff',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.16)',
                padding: 24,
              }}
            >
              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Ideal for:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563', marginBottom: 20 }}>
                <li>Brands that want a polished customer app, not just a website.</li>
                <li>Organizations with field teams that collect data or perform tasks on‑site.</li>
                <li>Schools, Saccos and NGOs that need secure on‑the‑go access to systems.</li>
              </ul>

              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Typical outcomes:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563' }}>
                <li>More engagement and self‑service from your users.</li>
                <li>Faster reporting from the field with fewer manual steps.</li>
                <li>A consistent, modern experience that matches your brand.</li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Detailed examples with images */}
        <div style={{ marginTop: 80 }}>
          {/* 1. Customer experience – Glint Parlour */}
          <Row gutter={[48, 40]} align="middle" style={{ marginBottom: 56 }}>
            <Col xs={24} md={11}>
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)',
                }}
              >
                <img
                  src={glintParlourImg}
                  alt="Example customer‑facing app interface"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </Col>
            <Col xs={24} md={13}>
              <Title
                level={3}
                style={{
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: 16,
                  letterSpacing: '0.01em',
                }}
              >
                1. Delightful customer apps
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                For customer‑facing apps, we focus on a smooth, visual experience – from onboarding
                and log‑in to browsing services, making payments and receiving notifications. Your
                app becomes the easiest way to interact with your brand.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Clear navigation and copy that match your website and offline brand.</li>
                <li>Integrated chat, support, or AI assistants where it makes sense.</li>
                <li>Push notifications for reminders, promotions and important updates.</li>
              </ul>
            </Col>
          </Row>

          {/* 2. Field & internal teams – background illustration */}
          <Row
            gutter={[48, 40]}
            align="middle"
            style={{ marginBottom: 56, flexDirection: 'row-reverse' }}
          >
            <Col xs={24} md={11}>
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)',
                }}
              >
                <img
                  src={backgroundImg}
                  alt="Illustration of connected teams using mobile devices"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </Col>
            <Col xs={24} md={13}>
              <Title
                level={3}
                style={{
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: 16,
                  letterSpacing: '0.01em',
                }}
              >
                2. Apps for field staff and internal teams
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                For internal apps, we design around the tasks your team performs every day –
                check‑ins, inspections, ticket resolution or data capture. Offline‑first logic
                ensures work can continue even when the connection is weak.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Configurable forms so you can evolve processes without a full rebuild.</li>
                <li>Background sync that uploads data when connectivity returns.</li>
                <li>Role‑based dashboards so supervisors see progress at a glance.</li>
              </ul>
            </Col>
          </Row>

          {/* 3. Admin, analytics & billing views */}
          <Row gutter={[48, 40]} align="middle">
            <Col xs={24} md={11}>
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)',
                }}
              >
                <img
                  src={billingSystemImg}
                  alt="Admin dashboard and billing screens"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </Col>
            <Col xs={24} md={13}>
              <Title
                level={3}
                style={{
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: 16,
                  letterSpacing: '0.01em',
                }}
              >
                3. Admin portals and analytics behind the app
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                Every mobile app we ship has a strong admin side – where your team can manage
                content, users, payments and reports. This is where real business value is tracked
                and improved over time.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Central dashboards that show usage, retention and revenue.</li>
                <li>Fine‑grained permissions for finance, support, and leadership teams.</li>
                <li>Hooks into your existing billing, CRM or ERP systems.</li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default MobileAppsPage;


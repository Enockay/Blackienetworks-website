import React, { useState } from 'react';
import { Typography, Row, Col, Button, Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import cloudInfrastructureImg from '../assets/cloudinfrustructure.png';

const { Title, Paragraph } = Typography;

const WebDevelopmentPage: React.FC = () => {
  const [isInfraImageOpen, setIsInfraImageOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10">
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

        {/* Cloud infrastructure & deployment workflow (new, non-repeated detail) */}
        <div style={{ marginTop: 64 }}>
          <Row gutter={[40, 32]} align="middle">
            <Col xs={24} md={11}>
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)',
                  cursor: 'zoom-in',
                }}
                onClick={() => setIsInfraImageOpen(true)}
              >
                <img
                  src={cloudInfrastructureImg}
                  alt="Cloud infrastructure and deployment dashboard"
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
                  marginBottom: 14,
                  letterSpacing: '0.01em',
                }}
              >
                Cloud infrastructure management for your apps
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 16, fontSize: '0.98rem' }}>
                Beyond building the application itself, we also take care of where it lives. Your
                systems run on powerful Contabo VPS servers, using Dockerised services so every
                environment – development, staging and production – behaves the same.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem', marginBottom: 16 }}>
                <li>
                  Containerised deployments (Docker / docker‑compose) for APIs, front‑ends, queues
                  and background workers.
                </li>
                <li>
                  GitHub‑based workflow with protected branches, pull‑requests and automated builds
                  for clean change history.
                </li>
                <li>
                  Environment‑specific configuration (.env) so secrets and endpoints are managed
                  safely for each stage.
                </li>
                <li>
                  Coolify as our management layer – giving you clear dashboards, logs and one‑click
                  rollbacks.
                </li>
              </ul>
              <Paragraph style={{ color: '#475569', fontSize: '0.96rem' }}>
                This means new features can move from GitHub to your users with predictable
                deployments, easy monitoring and the option to roll back quickly if something is not
                perfect yet.
              </Paragraph>
            </Col>
          </Row>
        </div>

        {/* Full-size infrastructure image modal */}
        <Modal
          open={isInfraImageOpen}
          onCancel={() => setIsInfraImageOpen(false)}
          footer={null}
          centered
          width="80vw"
          bodyStyle={{ padding: 0, backgroundColor: '#000' }}
        >
          <img
            src={cloudInfrastructureImg}
            alt="Full cloud infrastructure and deployment dashboard"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Modal>
      </div>
    </section>
  );
};

export default WebDevelopmentPage;


import React, { useState } from 'react';
import { Typography, Row, Col, Button, Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import glintParlourImg from '../assets/glintparlour.png';

const { Title, Paragraph } = Typography;

const AISystemsPage: React.FC = () => {
  const [isGlintPreviewOpen, setIsGlintPreviewOpen] = useState(false);

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
              AI Systems & Automation
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#475569', marginBottom: 16 }}>
              We design and integrate AI tools that help your team respond faster, see clearer
              reports, and automate repetitive work.
            </Paragraph>

            <Paragraph style={{ fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>
              Possible AI projects:
            </Paragraph>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Chatbots and virtual assistants for support, FAQs, and lead capture.',
                'Automated reporting that turns raw data into weekly or monthly summaries.',
                'Document and email classification to keep your workflows organized.',
                'Prediction models for churn, demand, or risk using your historical data.',
                'Workflow automations that combine AI with your CRM, billing, or ERP tools.',
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
              Explore an AI idea
            </Button>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: 24,
                background:
                  'radial-gradient(circle at top left, rgba(129, 140, 248, 0.22), transparent 60%), #f9fafb',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.16)',
                padding: 24,
              }}
            >
              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                How we work:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563', marginBottom: 20 }}>
                <li>Start with a workshop to understand your goals and data.</li>
                <li>Prototype quickly, then refine with your real users.</li>
                <li>Deploy securely and integrate with your existing systems.</li>
                <li>Provide training and support so your team can own the solution.</li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Glint Parlour case study */}
        <div style={{ marginTop: 72 }}>
          <Row gutter={[48, 40]} align="middle">
            <Col xs={24} md={11}>
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)',
                  cursor: 'zoom-in',
                }}
                onClick={() => setIsGlintPreviewOpen(true)}
              >
                <img
                  src={glintParlourImg}
                  alt="Glint Parlour AI hairstyle try‑on interface"
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
                Glint Parlour – AI hairstyle try‑on before the real cut
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 16, fontSize: '0.98rem' }}>
                Glint Parlour is a beauty brand that lets clients preview new hairstyles using AI
                image generation before they sit in the chair. Customers upload a selfie, pick a
                style, and the system generates realistic before‑and‑after shots that help them
                choose with confidence.
              </Paragraph>
              <Paragraph style={{ color: '#475569', marginBottom: 14, fontSize: '0.96rem' }}>
                We designed the AI pipeline, integrated it with their booking system, and made sure
                the experience feels fast and friendly even on mid‑range phones and flaky Wi‑Fi
                connections.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem', marginBottom: 16 }}>
                <li>Face‑aware cropping so the generated styles fit each client’s head and pose.</li>
                <li>
                  A library of salon‑approved styles and colours that can be mixed and tested in
                  seconds.
                </li>
                <li>
                  Private links so clients can save looks, share them with friends, or show the
                  stylist on their next visit.
                </li>
              </ul>
              <Paragraph style={{ color: '#475569', fontSize: '0.95rem' }}>
                For Glint Parlour, this turns “what if” conversations into a clear visual
                experience – fewer regrets after a cut, happier clients, and a salon that feels
                truly high‑tech.
              </Paragraph>
            </Col>
          </Row>
        </div>

        <Modal
          open={isGlintPreviewOpen}
          onCancel={() => setIsGlintPreviewOpen(false)}
          footer={null}
          centered
          width="80vw"
          bodyStyle={{ padding: 0, backgroundColor: '#000' }}
        >
          <img
            src={glintParlourImg}
            alt="Full Glint Parlour AI hairstyle try‑on interface"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Modal>
      </div>
    </section>
  );
};

export default AISystemsPage;


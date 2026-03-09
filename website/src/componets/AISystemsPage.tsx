import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AISystemsPage: React.FC = () => {
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
              type="primary"
              size="large"
              style={{ marginTop: 24, borderRadius: 999, padding: '0 28px' }}
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
      </div>
    </section>
  );
};

export default AISystemsPage;


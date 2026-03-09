import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const CloudInfrastructurePage: React.FC = () => {
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
        background: '#f9fafb',
      }}
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Row gutter={[40, 32]} align="top">
          <Col xs={24} md={14}>
            <Title level={2} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              Cloud Infrastructure Management & Hosting
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#475569', marginBottom: 16 }}>
              We design, deploy, and operate your cloud infrastructure so your applications stay
              fast, secure, and online.
            </Paragraph>

            <Paragraph style={{ fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>
              Our cloud services include:
            </Paragraph>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Architecture design on AWS, DigitalOcean, and similar providers.',
                'Containerized or VM‑based deployments with CI/CD pipelines.',
                '24/7 monitoring, alerting, and response for critical workloads.',
                'Automated backups, disaster recovery plans, and regular restore tests.',
                'Network security, firewalls, SSL, and access control best practices.',
                'Cost optimization so you only pay for the capacity you actually use.',
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
              Discuss your cloud setup
            </Button>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: 24,
                background:
                  'radial-gradient(circle at top left, rgba(45, 212, 191, 0.24), transparent 60%), #ffffff',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.16)',
                padding: 24,
              }}
            >
              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Platforms we work with:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563', marginBottom: 20 }}>
                <li>AWS (EC2, RDS, S3, VPC, ECS, Lambda)</li>
                <li>DigitalOcean Droplets, Kubernetes, and Spaces</li>
                <li>Traditional VPS and dedicated servers where needed</li>
              </ul>

              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Typical use‑cases:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563' }}>
                <li>Web apps that must stay online 24/7</li>
                <li>Education or business platforms with seasonal spikes</li>
                <li>Migrations from on‑prem servers to the cloud</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CloudInfrastructurePage;


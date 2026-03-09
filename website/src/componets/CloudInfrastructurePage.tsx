import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import cloudInfrastructureImg from '../assets/cloudinfrustructure.png';
import firewallImg from '../assets/FireWall.jpg';
import onPremiseVsCloudImg from '../assets/on-premise-vs-cloud.jpg';

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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10">
        {/* Hero summary */}
        <Row gutter={[40, 32]} align="top">
          <Col xs={24} md={14}>
            <Title level={2} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              Cloud Infrastructure Management & Hosting
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#475569', marginBottom: 16 }}>
              We design, deploy, and operate your cloud infrastructure so your applications stay
              fast, secure, and online – whether they serve hundreds of users or entire
              organizations across Kenya.
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

        {/* Detailed cloud workflow with alternating images */}
        <div style={{ marginTop: 80 }}>
          {/* 1. Contabo & Coolify cluster – image left */}
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
                  src={cloudInfrastructureImg}
                  alt="Coolify dashboard managing Blackie Networks infrastructure"
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
                1. Contabo VPS cluster managed with Coolify
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                Your applications run on a hardened Contabo VPS cluster, where each service is
                isolated into its own container. Coolify gives us a single pane of glass to
                provision new apps, manage networks, and roll out changes safely across
                environments.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Dedicated resources for each project, tuned to your CPU, RAM, and storage needs.</li>
                <li>Separate staging and production stacks so tests never affect paying users.</li>
                <li>Repeatable Docker and compose definitions, stored in Git for full traceability.</li>
              </ul>
            </Col>
          </Row>

          {/* 2. Security & networking – image right */}
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
                  src={firewallImg}
                  alt="Firewall rules protecting cloud workloads"
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
                2. Security, networking & access control
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                We lock down every layer around your workloads – from private networks and VPN
                access, to firewalls and SSL termination. Only the ports and services that must be
                public are exposed, and everything else stays on internal networks.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Strict firewall policies for admin panels, databases, and internal APIs.</li>
                <li>Automatic SSL certificates and secure-by-default HTTPS for your domains.</li>
                <li>VPN and bastion access so engineers never talk to servers directly over the open internet.</li>
              </ul>
            </Col>
          </Row>

          {/* 3. Monitoring, backups & migrations – image left */}
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
                  src={onPremiseVsCloudImg}
                  alt="Diagram comparing on‑premise and cloud environments"
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
                3. Monitoring, backups & smooth migrations
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                Once your systems are live, we keep watch. Metrics, logs, and uptime checks alert
                us long before users start complaining. For teams moving from on‑premise to the
                cloud, we plan migrations in phases so there is always a clear rollback path.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Application and server monitoring with meaningful alerts, not noise.</li>
                <li>Automated daily backups and regular restore drills to verify recovery.</li>
                <li>Step‑by‑step migration plans that minimise downtime and data risk.</li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default CloudInfrastructurePage;


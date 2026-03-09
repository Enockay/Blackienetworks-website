import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import blackieShieldImg from '../assets/blackieshield.png';
import mikrotikRemoteImg from '../assets/mikrotikremote.png';
import firewallImg from '../assets/FireWall.jpg';

const { Title, Paragraph } = Typography;

const bulletStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 8,
};

const VPNShieldPage: React.FC = () => {
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
              VPN Solutions – Blackie Shield
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#475569', marginBottom: 16 }}>
              Blackie Shield gives your staff and branches always‑on, encrypted access to internal
              systems – whether they are in the office, at home or in the field.
            </Paragraph>

            <Paragraph style={{ fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>
              What our VPN platform covers:
            </Paragraph>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Centralised management for users, devices and sites.',
                'Access policies based on roles, groups and locations.',
                'Optimised routes to on‑prem and cloud apps with low latency.',
                'Detailed logs to see who connected, from where, and to what.',
                'Support for laptops, phones and routers across major platforms.',
              ].map((item) => (
                <li key={item} style={bulletStyle}>
                  <CheckCircleOutlined style={{ color: '#22c55e', marginTop: 4 }} />
                  <span style={{ color: '#4b5563' }}>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Button
                type="default"
                size="large"
                style={{
                  borderRadius: 999,
                  padding: '0 28px',
                  background: '#ffffff',
                  borderColor: '#1d4ed8',
                  color: '#1d4ed8',
                  fontWeight: 600,
                }}
                href="/contactus"
              >
                Talk about VPN rollout
              </Button>
              <Button
                size="large"
                style={{
                  borderRadius: 999,
                  padding: '0 24px',
                  background: '#ffffff',
                  borderColor: '#0f172a',
                  color: '#0f172a',
                  fontWeight: 600,
                }}
                href="https://www.blackieshield.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit blackieshield.com
              </Button>
            </div>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                borderRadius: 24,
                background:
                  'radial-gradient(circle at top left, rgba(59, 130, 246, 0.22), transparent 60%), #ffffff',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.16)',
                padding: 24,
              }}
            >
              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Perfect for:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563', marginBottom: 20 }}>
                <li>Organizations with remote or hybrid staff.</li>
                <li>Companies with multiple branches sharing central systems.</li>
                <li>Field teams that must access tools from any network.</li>
              </ul>

              <Title level={4} style={{ color: '#0f172a', marginBottom: 12 }}>
                Typical results:
              </Title>
              <ul style={{ paddingLeft: 18, color: '#4b5563' }}>
                <li>Consistent, secure access for your teams wherever they work.</li>
                <li>Clear visibility into VPN usage and potential risks.</li>
                <li>Less reliance on ad‑hoc remote access tools and shared passwords.</li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Detailed VPN workflow with images */}
        <div style={{ marginTop: 80 }}>
          {/* 1. VPN dashboard – Blackie Shield */}
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
                  src={blackieShieldImg}
                  alt="Blackie Shield VPN dashboard"
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
                1. Central VPN control panel
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                The Blackie Shield dashboard gives your IT team one place to manage VPN users,
                devices and tunnels. You can see which branches are online, which users are
                connected, and where bandwidth is being used.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Per‑user and per‑device views, with connection history.</li>
                <li>Simple onboarding and off‑boarding for staff and contractors.</li>
                <li>Labels and groups for departments, branches and partners.</li>
              </ul>
            </Col>
          </Row>

          {/* 2. Network devices & remote sites – MikroTik view */}
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
                  src={mikrotikRemoteImg}
                  alt="MikroTik remote access configuration"
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
                2. Routers, branches and on‑prem networks
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                Behind the scenes we configure your MikroTik and other routers to establish secure
                tunnels back to Blackie Shield. This is what links remote branches and offices to
                central apps, databases and file servers.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Site‑to‑site VPNs for branches, hostels, or partner locations.</li>
                <li>Failover routes so branches automatically switch to backup links.</li>
                <li>Segregated networks so VPN users only see the systems they need.</li>
              </ul>
            </Col>
          </Row>

          {/* 3. Security and compliance – firewall view */}
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
                  src={firewallImg}
                  alt="Firewall and security monitoring for VPN traffic"
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
                3. Security policies, logging and alerts
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                VPN is only as strong as the security around it. We align firewall rules, access
                policies and logging so that suspicious activity is visible and contained quickly.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Firewall rules tailored to each environment – HQ, branches and cloud.</li>
                <li>Centralised logs for audits and incident investigations.</li>
                <li>Alerting when unusual logins or traffic patterns appear.</li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default VPNShieldPage;


import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import billingSystemImg from '../assets/billingsystem.png';
import mikrotikRemoteImg from '../assets/mikrotikremote.png';
import backgroundImg from '../assets/background.jpg';

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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10">
        {/* Hero summary section */}
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

        {/* Detailed walkthrough with alternating images */}
        <div style={{ marginTop: 80 }}>
          {/* Section 1: Design & cabling – image left */}
          <Row gutter={[48, 40]} align="middle" style={{ marginBottom: 56 }}>
            <Col xs={24} md={11}>
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.18)',
                }}
              >
                <img
                  src={backgroundImg}
                  alt="Campus and office network design"
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
                1. Network design, cabling & backbone
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                We start on the ground: understanding your buildings, users and existing equipment.
                From there we create a full network map – core switches, access switches, wireless
                access points and uplinks – so traffic flows smoothly today and is easy to expand
                when you add new blocks, hostels or branches.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Site survey, floor‑plans and link‑budget planning for Wi‑Fi and fibre.</li>
                <li>Structured cabling with labelled patch panels, cabinets and clear diagrams.</li>
                <li>Redundant uplinks where the budget allows, so one failure does not cut you off.</li>
                <li>Capacity planning so the network can grow without a full redesign every year.</li>
              </ul>
            </Col>
          </Row>

          {/* Section 2: MikroTik configuration – image right */}
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
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.18)',
                }}
              >
                <img
                  src={mikrotikRemoteImg}
                  alt="MikroTik router configuration and monitoring"
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
                2. MikroTik routing, firewalls & hotspots
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                Your MikroTik routers become the brains of the network – handling security, traffic
                shaping and how users authenticate. We configure them using best‑practice templates
                that we have tested across ISPs, campuses and estates, then document everything so
                your internal team is not locked out of the configuration.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Firewall policies that keep attackers out while allowing the right traffic in.</li>
                <li>Load‑balancing and automatic failover across multiple internet links.</li>
                <li>Hotspot portals, vouchers, and VLANs for staff, students and guests.</li>
                <li>Remote management and monitoring so issues can be fixed without a site visit.</li>
              </ul>
            </Col>
          </Row>

          {/* Section 3: Billing & dashboards – image left */}
          <Row gutter={[48, 40]} align="middle">
            <Col xs={24} md={11}>
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.18)',
                }}
              >
                <img
                  src={billingSystemImg}
                  alt="Billing dashboard showing packages and revenue"
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
                3. Billing system, reporting & training
              </Title>
              <Paragraph style={{ color: '#475569', marginBottom: 18, fontSize: '0.98rem' }}>
                Finally, we connect the technical side to a clear billing and reporting layer. Your
                finance and support teams get tools that make it easy to see who is paid, who is
                online and where problems are happening – without logging into routers or asking IT
                for exports.
              </Paragraph>
              <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                <li>Packages, bundles and automatic renewals for different user groups.</li>
                <li>Self‑service portals where users can check balance and buy access.</li>
                <li>Dashboards and scheduled reports, plus handover training for your team.</li>
                <li>Role‑based access so finance, support and management each see the right views.</li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default NetworkBillingPage;


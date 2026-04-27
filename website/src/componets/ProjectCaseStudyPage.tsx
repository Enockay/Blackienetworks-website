import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button, Tag } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { projects, Project } from './HomeSections';
import billingSystemImg from '../assets/billingsystem.png';
import mikrotikRemoteImg from '../assets/mikrotikremote.png';
import backgroundImg from '../assets/background.jpg';
import blackieShieldImg from '../assets/blackieshield.png';
import firewallImg from '../assets/FireWall.jpg';
import shieldImg from '../assets/shield.png';
import shield2Img from '../assets/shield2.png';
import mikrotik2Img from '../assets/mikrotik2.png';
import mikrotik3Img from '../assets/mikrotik3.png';
import glintParlourImg from '../assets/glintparlour.png';
import glintHeroImg from '../assets/glint.png';
import glintGalleryImg from '../assets/glint2.png';
import glintOutputsImg from '../assets/glint3.png';
// import toursImg from '../assets/tours.png'; // unused
import phronesisImg from '../assets/phronesis.png';
import pronesisImg from '../assets/pronesis.png';

const { Title, Paragraph } = Typography;

type CaseStudyContent = {
  heroTitle: string;
  heroSubtitle: string;
  problem: string;
  approach: string;
  results: string[];
};

const caseStudyContent: Record<string, CaseStudyContent> = {
  blackiebilling: {
    heroTitle: 'BlackieBilling ISP & Campus Billing Platform',
    heroSubtitle:
      'From scattered spreadsheets and manual vouchers to a unified billing platform for ISPs, campuses and shared networks.',
    problem:
      'Many small ISPs and campus networks start with M-Pesa statements, handwritten books, and router queues that no one fully trusts. Revenue leaks, support teams are overwhelmed, and no one can see who is paid, who is online, or which packages are working.',
    approach:
      'Working with early BlackieBilling customers, we designed a platform that connects MikroTik, RADIUS and hotspot portals with a clear web dashboard. Students and customers can buy access using vouchers or M-Pesa, while finance teams see revenue, arrears and usage trends in one place.',
    results: [
      'Single source of truth for subscribers, packages and invoices across multiple sites.',
      'Automated expiries and renewals reduce manual work for support staff.',
      'Clear reporting for management: revenue, churn, and top-up behaviour by hostel, estate or branch.',
      'Better customer experience: self‑service portal for balances, receipts and support requests.',
    ],
  },
  'blackieshield-vpn': {
    heroTitle: 'Blackie Shield VPN – Secure Access for Remote & Branch Teams',
    heroSubtitle:
      'A managed VPN platform that keeps staff, branches and field teams securely connected to internal systems from anywhere.',
    problem:
      'Before Blackie Shield, many organisations relied on ad‑hoc remote desktop tools, exposed ports and shared passwords. Access was hard to control, security teams had little visibility, and users struggled with unreliable connections.',
    approach:
      'We designed Blackie Shield as a central VPN control plane. Routers and devices establish encrypted tunnels back to the platform, where admins manage users, groups and policies. Branches and remote staff connect through user‑friendly clients while traffic is logged and monitored.',
    results: [
      'Consistent, secure access for remote staff, branches and partners.',
      'Simpler onboarding and off‑boarding for users and devices.',
      'Clear audit trails for compliance and incident investigations.',
      'Improved performance thanks to optimised routes to on‑prem and cloud systems.',
    ],
  },
  'mikrotik-remote-access': {
    heroTitle: 'MikroTik Remote Access Management',
    heroSubtitle:
      'A reverse‑proxy service that gives each MikroTik router a stable public IP and port for secure remote access, plus smart monitoring and email alerts.',
    problem:
      'As networks grow, engineers end up with dozens of MikroTik routers behind NAT, dynamic IPs and improvised port‑forwarding. Remote Winbox access breaks often, exposes devices directly to the internet and offers no clear way to know when a router has gone offline.',
    approach:
      'We built a reverse‑proxy layer that sits between engineers and their MikroTik routers. Each router registers to our service and receives a consistent public endpoint (IP + port) for Winbox or API access. A lightweight management panel (RARE) tracks router metadata and uptime, and drives automated email alerts whenever a router stops responding.',
    results: [
      'Single source of truth for routers, locations and billing status.',
      'Safer remote access because routers stay behind NAT while the proxy exposes only controlled ports.',
      'Clear internal notes and history for each router, including when alerts were triggered.',
      'Faster onboarding of new engineers using shared proxy endpoints instead of raw public IPs.',
    ],
  },
  'glint-ai-system': {
    heroTitle: 'Glint Parlour AI – Hairstyle Try‑On & Salon Platform (Client Project)',
    heroSubtitle:
      'A photorealistic hairstyle try‑on experience combined with bookings, reminders and salon management for Glint Parlour and partner salons.',
    problem:
      'Clients often arrive at the salon unsure which style will suit them, while stylists have limited tools to show realistic outcomes. At the same time, Glint Parlour needed a better way to keep clients engaged between visits and to route bookings to the right stylists and partner salons.',
    approach:
      'Working with the Glint Parlour team, we integrated an AI image generation engine into a simple web flow: clients upload a selfie, pick from curated hairstyles and colours, and instantly see photorealistic results. Behind the scenes, salons and stylists manage looks, availability and follow‑up reminders from a central dashboard. The Glint Parlour team actively use the platform with their clients and have shared how much they enjoy the realism of the results and the lift in bookings.',
    results: [
      'Higher booking conversion because clients commit after seeing a realistic preview.',
      'Better matching between clients, stylists and partner salons based on chosen looks.',
      'Automatic reminders and follow‑ups that bring clients back for maintenance visits.',
      'Rich data on popular styles and colours to guide future marketing and product decisions.',
    ],
  },
  'phronesis-tours': {
    heroTitle: 'Phronesis Africa Safaris Platform (Ongoing Client Project)',
    heroSubtitle:
      'A modern safari booking and discovery website for bespoke East Africa experiences – designed for Phronesis Africa Safaris and currently evolving with real traveller feedback.',
    problem:
      'Phronesis Africa Safaris crafts high‑touch, tailor‑made safaris across Kenya, Tanzania, Uganda and Rwanda. Their previous web presence didn’t fully communicate the depth of their expertise, nor did it make it easy for travellers to explore routes, group departures and car‑hire options in one place.',
    approach:
      'Together with the Phronesis team, we began with discovery workshops around their core pillars: considered exploration, exceptional locations and responsible travel. We then designed a new site structure that highlights safari styles, wildlife experiences, car hire, booking tools and rich travel information. The current platform is live on new.phronesistours.com and the client has been enthusiastic about how much easier it is for guests to understand and book their journeys. We continue to iterate with them as new content and features roll out.',
    results: [
      'Clear storytelling around Phronesis’s philosophy and why they are different as a safari operator.',
      'A single destination for safaris, group trips and car hire, reducing the need for long email threads.',
      'Better qualified enquiries as guests arrive having already explored routes, styles and seasonal tips.',
      'Room to grow into dynamic itineraries, deeper content and self‑service tools as the project continues.',
    ],
  },
};

const getProjectById = (id: string | undefined): Project | undefined =>
  id ? projects.find((p) => p.id === id) : undefined;

const ProjectCaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = getProjectById(id);
  const content = id ? caseStudyContent[id] : undefined;
  const isBilling = id === 'blackiebilling';
  const isVpn = id === 'blackieshield-vpn';
  const isMikrotik = id === 'mikrotik-remote-access';
  const isGlint = id === 'glint-ai-system';
  const isPhronesis = id === 'phronesis-tours';

  if (!project) {
    return (
      <section
        style={{
          padding: '80px 20px 96px',
          background: '#f9fafb',
        }}
      >
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10" style={{ textAlign: 'center' }}>
          <Title level={2} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
            Case study not found
          </Title>
          <Paragraph style={{ color: '#64748b', marginBottom: 24 }}>
            The project you are looking for does not exist or is not yet published.
          </Paragraph>
          <Button type="default" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined /> Back
          </Button>
        </div>
      </section>
    );
  }

  const bulletStyle: React.CSSProperties = { display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 };
  void bulletStyle; // suppress unused warning

  return (
    <section
      style={{
        padding: '80px 20px 96px',
        background: '#f9fafb',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10">
        {/* Back + meta */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          <Button type="default" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
            Back
          </Button>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag color="blue">{project.industry}</Tag>
            <Tag>{project.category}</Tag>
            <Tag color="geekblue">{project.client}</Tag>
          </div>
        </div>

        {/* Hero */}
        <Row gutter={[40, 32]} align="middle">
          <Col xs={24} md={13}>
            <Title level={1} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              {content?.heroTitle ?? project.name}
            </Title>
            <Paragraph style={{ fontSize: '1.02rem', color: '#475569', marginBottom: 18, lineHeight: 1.8 }}>
              {content?.heroSubtitle ?? project.summary}
            </Paragraph>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', marginBottom: 18, color: '#1d4ed8', fontWeight: 500 }}
              >
                {project.liveUrl.replace(/^https?:\/\//, '')}
              </a>
            )}
            <Paragraph style={{ color: '#64748b', fontSize: '0.95rem' }}>
              This case study shows how Blackie Networks works end‑to‑end with clients — from early
              discovery workshops to live infrastructure, monitoring and ongoing support.
            </Paragraph>
          </Col>
          <Col xs={24} md={11}>
            <div
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)',
              }}
            >
              <img
                src={
                  isVpn
                    ? shieldImg
                    : isMikrotik
                    ? mikrotik2Img
                    : isGlint
                    ? glintHeroImg
                    : isPhronesis
                    ? phronesisImg
                    : billingSystemImg
                }
                alt={project.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </Col>
        </Row>

        {/* Problem / Approach */}
        {content && (
          <div style={{ marginTop: 64 }}>
            <Row gutter={[40, 32]} align="top" style={{ marginBottom: 40 }}>
              <Col xs={24} md={12}>
                <Title level={3} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
                  The challenge
                </Title>
                <Paragraph style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.8 }}>
                  {content.problem}
                </Paragraph>
              </Col>
              <Col xs={24} md={12}>
                <Title level={3} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
                  Our approach
                </Title>
                <Paragraph style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.8 }}>
                  {content.approach}
                </Paragraph>
              </Col>
            </Row>
          </div>
        )}

        {/* Visual walkthrough – 3 images */}
        <div style={{ marginTop: 24 }}>
          {isBilling && (
            <>
              {/* 1. Admin & billing dashboard */}
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
                      src={billingSystemImg}
                      alt="Billing dashboards and revenue views"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Unified billing dashboard
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Finance and operations teams see subscribers, packages, invoices and payments from
                    one interface, instead of jumping between spreadsheets, routers and mobile money
                    statements.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Filter by estate, hostel, campus or reseller.</li>
                    <li>Drill into individual accounts to see history and device usage.</li>
                    <li>Export reports for auditors and board reviews in a few clicks.</li>
                  </ul>
                </Col>
              </Row>

              {/* 2. Network integration */}
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
                      alt="MikroTik integration with billing"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Deep MikroTik & RADIUS integration
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    The platform talks directly to MikroTik routers, RADIUS and hotspot portals. When a
                    customer pays, their access is provisioned automatically — no manual queue edits.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Auto‑create and expire user profiles based on paid time or data bundles.</li>
                    <li>Voucher and scratch card support for shared Wi‑Fi environments.</li>
                    <li>Clear logs for troubleshooting connectivity and complaints.</li>
                  </ul>
                </Col>
              </Row>

              {/* 3. Reliability & operations */}
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
                      src={backgroundImg}
                      alt="Infrastructure and monitoring background"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Reliable operations & support
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    BlackieBilling is deployed on hardened cloud infrastructure with regular backups and
                    monitoring. Our team provides ongoing updates, incident response and feature
                    enhancements.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Automated nightly backups and tested restore procedures.</li>
                    <li>24/7 monitoring for key services and transaction flows.</li>
                    <li>Roadmap discussions with early clients to prioritise new capabilities.</li>
                  </ul>
                </Col>
              </Row>
            </>
          )}

          {isVpn && (
            <>
              {/* 1. Secure login & onboarding */}
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
                      src={shield2Img}
                      alt="Blackie Shield secure login and highlights"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Secure, user‑friendly login experience
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Users sign in through a modern, guided interface with security benefits clearly
                    explained — encouraging good habits while keeping credentials protected.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Clear messaging about encryption, uptime and performance.</li>
                    <li>Support for SSO / Google sign‑in where required.</li>
                    <li>Secure password flows with options for MFA.</li>
                  </ul>
                </Col>
              </Row>

              {/* 2. Central VPN dashboard */}
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
                      src={blackieShieldImg}
                      alt="Blackie Shield VPN dashboard and tiles"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Central VPN control panel
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Admins manage VPN and proxy services, subscriptions and usage from a single
                    dashboard – with clear tiles for proxy, VPN, usage and billing.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Quick overview of service status and active subscriptions.</li>
                    <li>Entry points into detailed usage analytics and billing views.</li>
                    <li>Designed for both technical admins and non‑technical managers.</li>
                  </ul>
                </Col>
              </Row>

              {/* 3. Security & logging */}
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
                      alt="Firewall rules and security monitoring"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Security policies, logs & alerts
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Firewalls, access rules and central logging work together so suspicious behaviour is
                    visible and contained quickly.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Firewall rules tuned for VPN traffic and critical systems.</li>
                    <li>Central logs for compliance, audits and incident response.</li>
                    <li>Alerting when unusual access patterns or locations appear.</li>
                  </ul>
                </Col>
              </Row>

              {/* 3. Security & logging */}
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
                      alt="Firewall rules and security monitoring"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Security policies, logs & alerts
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Firewalls, access rules and central logging work together so suspicious behaviour is
                    visible and contained quickly.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Firewall rules tuned for VPN traffic and critical systems.</li>
                    <li>Central logs for compliance, audits and incident response.</li>
                    <li>Alerting when unusual access patterns or locations appear.</li>
                  </ul>
                </Col>
              </Row>
            </>
          )}

          {isMikrotik && (
            <>
              {/* 1. Router list & billing overview */}
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
                      src={mikrotik2Img}
                      alt="MikroTik billing and router overview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Billing & router overview in one place
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Engineers can see router‑related payments, balances and history without leaving the
                    management panel. This keeps financial context close to technical operations.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>User balance and recent payments surfaced alongside router tools.</li>
                    <li>Clear history of transactions linked to router provisioning.</li>
                <li>Less back‑and‑forth between finance and NOC teams when adding or renewing access.</li>
                  </ul>
                </Col>
              </Row>

              {/* 2. Add new router flow */}
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
                      src={mikrotik3Img}
                      alt="Add new MikroTik router screen"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Guided “Add Router” workflow
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Adding a new site or router is a guided process with clear fields for location,
                    description, internal notes and what happens next.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Standardised metadata (name, location, notes) for every router.</li>
                    <li>Inline billing warnings so teams know when to top up before provisioning.</li>
                    <li>Automatic creation of reverse‑proxy endpoints and health checks after creation.</li>
                  </ul>
                </Col>
              </Row>

              {/* 3. Remote access posture */}
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
                      src={mikrotikRemoteImg}
                      alt="Secure MikroTik remote access architecture"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Safer remote access for engineers
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Routers are accessed through the reverse proxy using documented public endpoints,
                    not ad‑hoc open ports on random IPs. This reduces risk while keeping day‑to‑day
                    operations smooth and predictable.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Access paths that work the same for in‑office and remote engineers.</li>
                    <li>Automated email alerts when a router goes offline or stops checking in.</li>
                    <li>A foundation for future automation (backups, config pushes, etc.).</li>
                  </ul>
                </Col>
              </Row>
            </>
          )}

          {isGlint && (
            <>
              {/* 1. Client hairstyle try‑on */}
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
                      alt="Glint Parlour AI hairstyle try‑on interface"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Photorealistic hairstyle try‑on for clients
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Clients upload a selfie, choose from curated hairstyles and colours, and see
                    cinema‑grade previews in seconds. This turns “what if?” conversations into clear,
                    confident decisions before any hair is cut.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Style library designed with Glint Parlour stylists for real‑world results.</li>
                    <li>Support for multiple looks so clients can compare options side‑by‑side.</li>
                    <li>Shareable links so clients can get feedback from friends before booking.</li>
                  </ul>
                </Col>
              </Row>

              {/* 2. Salon & stylist management */}
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
                      src={glintGalleryImg}
                      alt="Hairstyles gallery and style collections"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Tools for Glint Parlour and partner salons
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Salons manage available services, stylists and lookbooks from a simple dashboard.
                    When a client likes a style, they can book directly with Glint Parlour or a
                    partner salon that supports that look.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Per‑salon configuration of services, pricing and stylists.</li>
                    <li>Visibility into which looks are driving the most bookings.</li>
                    <li>Support for future expansion into more salons and cities.</li>
                  </ul>
                </Col>
              </Row>

              {/* 3. Engagement & insights */}
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
                      src={glintOutputsImg}
                      alt="Generated hairstyle outputs and favourites"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Reminders, follow‑ups and customer insights
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    The same AI platform powers smart reminders and insights: clients get nudges to
                    refresh their colour or style, while Glint Parlour sees which campaigns and
                    hairstyles drive repeat visits.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Automated emails or messages based on time since last visit or chosen style.</li>
                    <li>Aggregated analytics on most‑tried looks and colours.</li>
                    <li>Data that informs new style collections and marketing campaigns.</li>
                  </ul>
                </Col>
              </Row>
            </>
          )}

          {isPhronesis && (
            <>
              {/* 1. Safari storytelling & hero experiences */}
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
                      src={phronesisImg}
                      alt="Phronesis Africa Safaris navigation and trip styles"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Discover the soul of East Africa
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    The new site opens with a bold “Discover the Soul of Africa” story and guides
                    travellers into safaris by wildlife, style and experience. Copy throughout the
                    site mirrors how the Phronesis team actually designs trips — unhurried
                    exploration, exceptional locations and tailored itineraries.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Clear entry points for safari types, destinations and special experiences.</li>
                    <li>Space to highlight philosophy, certifications and trusted partners.</li>
                    <li>Photography and layouts chosen to feel premium but welcoming.</li>
                  </ul>
                </Col>
              </Row>

              {/* 2. Booking tools and group safaris */}
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
                      src={pronesisImg}
                      alt="Trending safaris and group departures"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    From trending safaris to group departures
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Travellers can browse trending safaris, join upcoming group trips, or start a
                    completely custom itinerary. Booking tools and quote forms are positioned around
                    real Phronesis best‑sellers, helping guests understand what is possible before
                    speaking to a consultant.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Detailed safari cards with durations, routes and quick pricing context.</li>
                    <li>Clear CTAs for “View Details”, “Reserve Spot” and “Get a Quote”.</li>
                    <li>Copy tuned in collaboration with the client to answer common questions.</li>
                  </ul>
                </Col>
              </Row>

              {/* 3. Car hire and travel information */}
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
                      src={pronesisImg}
                      alt="Car hire and travel information layout"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={13}>
                  <Title level={4} style={{ fontWeight: 800, marginBottom: 12 }}>
                    Practical tools that build trust
                  </Title>
                  <Paragraph style={{ color: '#475569', marginBottom: 12 }}>
                    Beyond safaris, the platform covers car‑hire options, booking promises and
                    pre‑travel information. This gives guests the confidence that Phronesis will
                    support them from first email to returning home — something the client has
                    already highlighted as a major improvement over their previous site.
                  </Paragraph>
                  <ul style={{ paddingLeft: 18, color: '#4b5563', fontSize: '0.95rem' }}>
                    <li>Dedicated car‑hire section with fleet details and reasons to hire direct.</li>
                    <li>Booking promise and support content surfaced early in the journey.</li>
                    <li>Foundation for future tools like live availability and account login.</li>
                  </ul>
                </Col>
              </Row>
            </>
          )}
        </div>

        {/* Outcomes */}
        {content && (
          <div style={{ marginTop: 64 }}>
            <Title level={3} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              {isVpn
                ? 'Outcomes for VPN deployments'
                : isMikrotik
                ? 'Outcomes for MikroTik remote access'
                : isGlint
                ? 'Outcomes for AI hairstyle try‑on'
                : isPhronesis
                ? 'Outcomes for Phronesis Africa Safaris'
                : 'Outcomes for billing clients'}
            </Title>
            <Row gutter={[24, 24]}>
              {content.results.map((result) => (
                <Col key={result} xs={24} md={12} lg={6}>
                  <div
                    style={{
                      borderRadius: 20,
                      background: '#ffffff',
                      padding: 18,
                      boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
                      height: '100%',
                    }}
                  >
                    <div style={{ marginBottom: 8 }}>
                      <CheckCircleOutlined style={{ color: '#22c55e', marginRight: 6 }} />
                    </div>
                    <Paragraph style={{ marginBottom: 0, color: '#334155', fontSize: '0.95rem' }}>
                      {result}
                    </Paragraph>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectCaseStudyPage;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { SEO } from './SEO';
import {
  FiServer, FiCode, FiCloud, FiCpu, FiSmartphone, FiShield,
  FiArrowRight, FiCheck, FiX, FiGlobe, FiZap,
  FiSearch, FiLayers, FiTool, FiHeadphones,
} from 'react-icons/fi';

import mikrotikRemoteImg    from '../assets/mikrotikremote.png';
import softwareCompany2Img  from '../assets/softwareCompany2.jpg';
import cloudInfrastructureImg from '../assets/cloudinfrustructure.png';
import glintParlourImg      from '../assets/glintparlour.png';
import softwareCompany3Img  from '../assets/softwareCompany3.jpg';
import blackieShieldImg     from '../assets/blackieshield.png';
import backgroundImg        from '../assets/background.jpg';

/* ── service definitions ── */
interface Service {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  tag: string;
  tagClass: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  details: string[];
  mikrotikAddons?: string[];
  siteLink?: string;
  image: string;
}

const services: Service[] = [
  {
    id: 'network',
    icon: <FiServer size={22} />,
    iconBg: 'rgba(59,130,246,0.12)', iconColor: '#3b82f6',
    tag: 'Networking', tagClass: 'tag-blue',
    title: 'Network Setup & Billing',
    short: 'Campus, ISP & enterprise networks — designed, cabled, configured and billed.',
    description: 'End-to-end network design, cabling, MikroTik configuration and ISP / campus billing systems that keep your internet stable and revenue flowing.',
    bullets: ['MikroTik firewall, hotspot & QoS', 'Radius / voucher billing systems', 'Monitoring, alerting & NOC reports'],
    details: [
      'Network assessment, structured cabling and router/switch design for campuses, Saccos and ISPs.',
      'MikroTik configuration for firewalls, hotspots, QoS and secure remote access.',
      'Radius, hotspot and voucher billing for shared networks and campus Wi-Fi.',
      'Custom ISP or campus billing setups tailored to your packages and policies.',
      'Monitoring, alerting and reporting so you can see usage, uptime and revenue in one place.',
      'Training and documentation for your internal IT or NOC teams.',
    ],
    mikrotikAddons: [
      'Advanced MikroTik firewall and security hardening',
      'Load-balancing and failover between multiple uplinks',
      'VPN and VLAN segmentation for staff, students and guests',
      'Bandwidth management and application-aware QoS',
    ],
    image: mikrotikRemoteImg,
  },
  {
    id: 'web',
    icon: <FiCode size={22} />,
    iconBg: 'rgba(139,92,246,0.12)', iconColor: '#8b5cf6',
    tag: 'Software', tagClass: 'tag-purple',
    title: 'Web Development',
    short: 'Modern websites, portals and business tools your team actually wants to use.',
    description: 'Custom business websites, portals and internal systems that are fast, secure and designed around how your team actually works.',
    bullets: ['Booking, billing & workflow systems', 'Responsive design — mobile first', 'Secure auth & audit-ready logs'],
    details: [
      'Custom business websites, school portals and customer dashboards.',
      'Booking, billing and workflow systems integrated with your existing tools.',
      'Responsive UI design that works smoothly on mobile, tablet and desktop.',
      'Secure authentication, access control and audit-ready activity logs.',
      'Ongoing support, feature enhancements and performance tuning.',
      'Deployment pipelines so changes move safely from staging to production.',
    ],
    image: softwareCompany2Img,
  },
  {
    id: 'cloud',
    icon: <FiCloud size={22} />,
    iconBg: 'rgba(6,182,212,0.1)', iconColor: '#06b6d4',
    tag: 'Cloud', tagClass: 'tag-blue',
    title: 'Cloud Infrastructure',
    short: 'AWS, DigitalOcean and beyond — designed for uptime, security and cost control.',
    description: 'Cloud infrastructure on AWS, DigitalOcean and others — designed for uptime, backups and predictable performance.',
    bullets: ['High-availability & auto-scaling', 'Automated backups & DR plans', 'Cost-optimisation reviews'],
    details: [
      'Infrastructure design for web apps, APIs, databases and background workers.',
      'High-availability setups with load balancers, auto-scaling and health checks.',
      'Automated backups, disaster-recovery plans and documented runbooks.',
      'Security best practices for firewalls, secrets, SSL and access policies.',
      'Monitoring and logging so issues are visible before users complain.',
      'Cost-optimisation reviews to keep your monthly cloud bill under control.',
    ],
    image: cloudInfrastructureImg,
  },
  {
    id: 'ai',
    icon: <FiCpu size={22} />,
    iconBg: 'rgba(16,185,129,0.1)', iconColor: '#10b981',
    tag: 'AI & Automation', tagClass: 'tag-green',
    title: 'AI Systems & Automation',
    short: 'Practical AI tools that plug into your existing systems and save hours weekly.',
    description: 'Practical AI assistants and automations that plug into your existing tools to save your team hours every week.',
    bullets: ['AI chat trained on your docs', 'Automated reporting & dashboards', 'CRM, billing & ticketing integrations'],
    details: [
      'AI chat assistants trained on your company documents and FAQs.',
      'Automated reporting and dashboards that pull data from your systems.',
      'Email, WhatsApp or SMS workflows that respond and route requests automatically.',
      'Document summarisation and knowledge-base search for internal teams.',
      'Custom integrations with CRMs, billing tools and ticketing systems.',
      'Security and data-privacy controls appropriate for Kenyan organisations.',
    ],
    image: glintParlourImg,
  },
  {
    id: 'mobile',
    icon: <FiSmartphone size={22} />,
    iconBg: 'rgba(249,115,22,0.1)', iconColor: '#f97316',
    tag: 'Mobile', tagClass: 'tag-orange',
    title: 'Mobile App Development',
    short: 'Android & iOS apps for customers or field teams, integrated with your backend.',
    description: 'Android and iOS apps for customers or internal teams, fully integrated with your web, billing and cloud infrastructure.',
    bullets: ['Customer-facing & field-team apps', 'Offline-first for low connectivity', 'App store publishing & maintenance'],
    details: [
      'Customer-facing apps for bookings, payments, loyalty and self-service.',
      'Field-team apps for checklists, data collection and incident reporting.',
      'Offline-first experiences for low-connectivity environments.',
      'Secure APIs and authentication shared with your existing systems.',
      'App store publishing, updates and long-term maintenance.',
      'Analytics and event tracking so you know how people really use the app.',
    ],
    image: softwareCompany3Img,
  },
  {
    id: 'vpn',
    icon: <FiShield size={22} />,
    iconBg: 'rgba(239,68,68,0.1)', iconColor: '#ef4444',
    tag: 'Security', tagClass: 'tag-orange',
    title: 'VPN – Blackie Shield',
    short: 'Always-on VPN and secure remote access for your teams, branches and devices.',
    description: 'Always-on VPN and secure remote access powered by our Blackie Shield platform, keeping your teams and branches safely connected.',
    bullets: ['Per-user & per-device access controls', 'Optimised routes, low-latency tunnels', '24/7 tunnel health monitoring'],
    details: [
      'Centralised VPN management for staff, branches and field teams.',
      'Per-user and per-device access controls with detailed activity logs.',
      'Optimised routes for low-latency access to your internal systems.',
      'Support for laptops, phones and routers across multiple platforms.',
      'Integration with your existing firewalls and identity providers.',
      '24/7 monitoring of tunnel health, usage and security events.',
    ],
    siteLink: 'https://www.blackieshield.com',
    image: blackieShieldImg,
  },
];

const process = [
  { icon: <FiSearch size={20} />, step: '01', title: 'Discover', desc: 'We audit your current setup and scope what you actually need.' },
  { icon: <FiLayers size={20} />, step: '02', title: 'Design', desc: 'Architecture, timeline and cost breakdown — no surprises.' },
  { icon: <FiTool size={20} />, step: '03', title: 'Build', desc: 'Delivered iteratively with your team in the loop throughout.' },
  { icon: <FiHeadphones size={20} />, step: '04', title: 'Support', desc: '24/7 monitoring and a dedicated channel for your team.' },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, type: 'spring', stiffness: 100, damping: 15 } }),
};

/* ── component ── */
const ServicesPage: React.FC = () => {
  const [selected, setSelected] = useState<Service | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="IT Services Kenya — Network, Cloud, Software, AI & Mobile | Blackie Networks"
        description="Professional IT services in Kenya: network infrastructure setup, campus Wi-Fi, MikroTik configuration, custom software development, cloud hosting, AI automation, mobile apps & VPN solutions."
        keywords="IT services Kenya, network infrastructure Kenya, campus WiFi Kenya, MikroTik Kenya, software development Kenya, cloud hosting Kenya, AI automation Kenya, VPN Kenya, mobile app development Kenya"
        url="/services"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]}
        faq={[
          { question: 'What IT services does Blackie Networks offer in Kenya?', answer: 'Blackie Networks offers network infrastructure setup, campus and business Wi-Fi solutions, MikroTik configuration, custom software development, cloud hosting, AI & automation systems, mobile app development, and VPN & security solutions across Kenya.' },
          { question: 'Does Blackie Networks set up campus Wi-Fi?', answer: 'Yes. We design and install high-speed managed Wi-Fi networks for universities, schools, hotels, hospitals, and large facilities anywhere in Kenya, including MikroTik hotspot systems and ISP billing integration.' },
          { question: 'Can Blackie Networks build custom software for my business?', answer: 'Absolutely. We build bespoke web applications, school portals, Sacco systems, admin dashboards, ISP billing platforms, and any custom business software tailored to your requirements.' },
          { question: 'How much do your IT services cost in Kenya?', answer: 'Pricing depends on the scope of your project. We offer free initial consultations to assess your needs and provide a transparent quote. Contact us via WhatsApp or our contact form to get started.' },
          { question: 'Do you offer 24/7 network monitoring and support?', answer: 'Yes. We provide remote network monitoring, managed IT support, and proactive maintenance to keep your infrastructure running around the clock.' },
        ]}
      />
      {/* ════ DARK HERO BAND ════ */}
      <div style={{
        background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 55%, #0f1e38 100%)',
        paddingTop: 120, paddingBottom: 72,
        paddingLeft: 24, paddingRight: 24,
        borderBottom: '1px solid rgba(59,130,246,0.12)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* blue accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #2563eb 30%, #3b82f6 50%, #2563eb 70%, transparent)',
        }} />
        {/* soft radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-eyebrow" style={{ margin: '0 auto 24px', display: 'inline-flex' }}
          >
            <FiZap size={11} /> Service Catalogue · Blackie Networks
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.03em', marginBottom: 20,
              color: '#f1f5f9',
            }}
          >
            Everything your business needs{' '}
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              to scale
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: 680, margin: '0 auto 36px' }}
          >
            Networking, software, cloud and security from one team — scoped, delivered and supported end-to-end so your infrastructure never becomes a blocker.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button className="btn-cta" style={{ height: 46, padding: '0 28px', fontSize: 14 }}
              onClick={() => navigate('/contactus')}>
              Get a Free IT Audit <FiArrowRight size={14} />
            </button>
            <a href="#services-grid" className="btn-outline"
              style={{ height: 46, padding: '0 24px', fontSize: 14, color: '#94a3b8', borderColor: 'rgba(255,255,255,0.12)' }}>
              Browse Services
            </a>
          </motion.div>

          {/* trust chips */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ display: 'flex', gap: '8px 24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: 32, fontSize: 13, color: '#64748b' }}
          >
            {['7 Core Services', '200+ Projects Delivered', '24/7 Support'].map(l => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiCheck size={12} style={{ color: '#10b981' }} />
                <strong style={{ color: '#cbd5e1' }}>{l}</strong>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════ SERVICES GRID ════ */}
      <div id="services-grid" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid rgba(37,99,235,0.08)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial="hidden" animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}
          >
            {services.map((svc, i) => (
              <motion.div
                key={svc.id} custom={i} variants={cardVariants}
                className="card-dark"
                style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 0, cursor: 'default' }}
              >
                {/* header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: svc.iconBg,
                    border: `1px solid ${svc.iconColor}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: svc.iconColor,
                  }}>
                    {svc.icon}
                  </div>
                  <span className={`tag ${svc.tagClass}`}>{svc.tag}</span>
                </div>

                {/* title + short desc */}
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: 8, lineHeight: 1.3 }}>
                  {svc.title}
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.7, marginBottom: 20, flexGrow: 1 }}>
                  {svc.short}
                </p>

                {/* 3 key deliverables */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {svc.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#475569' }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                        background: `${svc.iconColor}18`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: svc.iconColor,
                      }}>
                        <FiCheck size={10} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* actions */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setSelected(svc)}
                    style={{
                      flex: 1, padding: '9px 0', borderRadius: 8, border: '1.5px solid rgba(37,99,235,0.2)',
                      background: 'transparent', color: '#2563eb', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.06)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'; }}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => navigate('/contactus')}
                    style={{
                      flex: 2, padding: '9px 0', borderRadius: 8, border: 'none',
                      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                      color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.25)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    Get a Quote
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════ HOW WE WORK ════ */}
      <div style={{ background: 'var(--bg-base)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 14 }}>
              <FiZap size={11} /> How We Work
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              From first call to go-live
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {process.map(({ icon, step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-dark"
                style={{ padding: '28px 24px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb',
                  }}>
                    {icon}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>
                    STEP {step}
                  </span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ CTA BAND ════ */}
      <div style={{
        background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 100%)',
        padding: '72px 24px',
        borderTop: '1px solid rgba(59,130,246,0.12)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 20 }}>
            <FiZap size={11} /> Ready to get started?
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Let's build something great together
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.8, marginBottom: 32 }}>
            Book a free IT audit and we'll map out exactly what your business needs and what it will cost.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-cta" style={{ height: 48, padding: '0 32px', fontSize: 15 }}
              onClick={() => navigate('/contactus')}>
              Book Free IT Audit <FiArrowRight size={15} />
            </button>
            <a
              href="https://wa.me/254796869402" target="_blank" rel="noreferrer"
              style={{
                height: 48, padding: '0 24px', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                color: '#22c55e', fontWeight: 600, fontSize: 15, textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(34,197,94,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(34,197,94,0.1)'; }}
            >
              💬 WhatsApp us
            </a>
          </div>
        </div>
      </div>

      {/* ════ SERVICE DETAIL MODAL ════ */}
      <AnimatePresence>
        {selected && (
          <Modal
            open={!!selected}
            onCancel={() => setSelected(null)}
            footer={null}
            width={960}
            centered
            closeIcon={<FiX size={16} style={{ color: '#64748b' }} />}
            styles={{
              content: { padding: 0, borderRadius: 16, overflow: 'hidden', background: '#fff' },
              body: { padding: 0 },
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', minHeight: 500 }}>
              {/* left — dark panel with image */}
              <div style={{
                position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(160deg, #0a1628 0%, #060d1e 100%)',
              }}>
                <img
                  src={selected.image || backgroundImg}
                  alt={selected.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(37,99,235,0.35) 0%, rgba(6,13,30,0.9) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, marginBottom: 16,
                    background: selected.iconBg, border: `1px solid ${selected.iconColor}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: selected.iconColor,
                  }}>
                    {selected.icon}
                  </div>
                  <span className={`tag ${selected.tagClass}`} style={{ width: 'fit-content', marginBottom: 10 }}>
                    {selected.tag}
                  </span>
                  <h3 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 8 }}>
                    {selected.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                    {selected.description}
                  </p>
                  {selected.siteLink && (
                    <a href={selected.siteLink} target="_blank" rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, color: '#60a5fa', fontSize: 13, textDecoration: 'none' }}>
                      <FiGlobe size={12} /> Visit live project
                    </a>
                  )}
                </div>
              </div>

              {/* right — white content */}
              <div style={{ padding: '36px 32px', overflowY: 'auto' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                  What's included
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: 20, lineHeight: 1.7 }}>
                  Every engagement is scoped, documented and delivered with a clear outcome.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selected.details.map((d, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.875rem', color: '#334155' }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                        background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981',
                      }}>
                        <FiCheck size={11} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>

                {selected.mikrotikAddons && (
                  <>
                    <div style={{ height: 1, background: 'rgba(37,99,235,0.08)', margin: '0 0 20px' }} />
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                      MikroTik add-ons available
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {selected.mikrotikAddons.map((a, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#475569' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => { setSelected(null); navigate('/contactus'); }}
                    className="btn-primary"
                    style={{ flex: 1, height: 44, fontSize: 14 }}
                  >
                    Get a Quote <FiArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      height: 44, padding: '0 20px', borderRadius: 8, border: '1.5px solid rgba(0,0,0,0.1)',
                      background: 'transparent', color: '#475569', fontSize: 14, cursor: 'pointer',
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServicesPage;

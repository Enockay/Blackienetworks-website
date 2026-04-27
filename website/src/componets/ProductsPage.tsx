import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from './SEO';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiCheck, FiZap, FiLayers, FiCloud, FiWifi, FiShield, FiTool,
  FiPackage, FiUsers, FiBarChart2,
} from 'react-icons/fi';

import networking1 from '../assets/networking1.jpg';
import networking2 from '../assets/networking2.jpg';
import networking3 from '../assets/networking3.jpg';
import software1   from '../assets/softwareCompany1.jpeg';
import software2   from '../assets/softwareCompany2.jpg';

export interface Product {
  slug:        string;
  num:         string;
  icon:        React.ReactNode;
  iconBg:      string;
  iconColor:   string;
  tag:         string;
  tagClass:    string;
  title:       string;
  tagline:     string;
  description: string;
  highlights:  string[];
  image:       string;
}

export const products: Product[] = [
  {
    slug: 'blackie-proxy', num: '01',
    icon: <FiShield size={20} />, iconBg: 'rgba(239,68,68,0.1)', iconColor: '#ef4444',
    tag: 'Security', tagClass: 'tag-orange',
    title: 'Blackie Proxy',
    tagline: 'Secure, fast access to the open internet',
    description: 'High-performance proxy service designed for ISPs, campuses and power users who need reliable, geo-flexible connectivity.',
    highlights: ['Multiple global locations for low-latency access', 'Full traffic encryption & privacy-first design', 'Ideal for streaming, research and remote work'],
    image: networking1,
  },
  {
    slug: 'isp-billing-system', num: '02',
    icon: <FiLayers size={20} />, iconBg: 'rgba(59,130,246,0.1)', iconColor: '#3b82f6',
    tag: 'Billing', tagClass: 'tag-blue',
    title: 'ISP Billing System',
    tagline: 'End-to-end billing for internet providers',
    description: 'A full billing and customer management platform tailored for ISPs, WISPs and campus networks.',
    highlights: ['Automated invoicing, payments and reminders', 'Self-service customer portal & ticketing', 'Radius / MikroTik integration ready'],
    image: software1,
  },
  {
    slug: 'mikrotik-configuration', num: '03',
    icon: <FiWifi size={20} />, iconBg: 'rgba(6,182,212,0.1)', iconColor: '#06b6d4',
    tag: 'Networking', tagClass: 'tag-blue',
    title: 'MikroTik Configuration',
    tagline: 'Enterprise-grade router tuning',
    description: 'Expert configuration for MikroTik routers so your network stays fast, secure and stable 24/7.',
    highlights: ['Load-balancing, failover and QoS tuning', 'VPN, VLAN and hotspot setup', 'Firewall hardening and best-practice security'],
    image: networking2,
  },
  {
    slug: 'cloud-hosting', num: '04',
    icon: <FiCloud size={20} />, iconBg: 'rgba(16,185,129,0.1)', iconColor: '#10b981',
    tag: 'Cloud', tagClass: 'tag-green',
    title: 'Cloud Hosting & DevOps',
    tagline: 'Modern cloud infrastructure for your apps',
    description: 'We deploy, monitor and maintain your apps on AWS, DigitalOcean and other cloud platforms.',
    highlights: ['High-availability architecture & auto-scaling', 'Automated backups and disaster recovery', '24/7 monitoring and incident response'],
    image: networking3,
  },
  {
    slug: 'software-maintenance', num: '05',
    icon: <FiTool size={20} />, iconBg: 'rgba(139,92,246,0.1)', iconColor: '#8b5cf6',
    tag: 'Software', tagClass: 'tag-purple',
    title: 'Software Maintenance',
    tagline: 'Keep your systems healthy and secure',
    description: 'Long-term maintenance, performance tuning and security patching for your existing software.',
    highlights: ['Regular updates and bug-fix releases', 'Performance & UX improvements over time', 'Security reviews and hardening'],
    image: software2,
  },
];

const whyUs = [
  {
    icon: <FiPackage size={20} />,
    title: 'End-to-end expertise',
    body: "From last-mile internet and MikroTik routers to billing, cloud and VPNs — we design everything to work together with fewer vendors and less headache.",
  },
  {
    icon: <FiUsers size={20} />,
    title: 'Local, responsive support',
    body: 'You talk to engineers who understand Kenyan ISPs, campuses and SMEs — not generic offshore support. We troubleshoot fast and speak your language.',
  },
  {
    icon: <FiBarChart2 size={20} />,
    title: 'Scales as you grow',
    body: 'Start small in one hostel or branch, then grow to multiple sites, more users and new products without replacing your entire stack.',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, type: 'spring', stiffness: 100, damping: 15 } }),
};

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="IT Products Kenya — ISP Billing, MikroTik, Cloud Hosting & More | Blackie Networks"
        description="Blackie Networks IT products: Blackie Proxy VPN, ISP billing system, MikroTik solutions, cloud hosting infrastructure, and software maintenance — built for businesses and ISPs in Kenya."
        keywords="ISP billing system Kenya, MikroTik solutions Kenya, VPN proxy Kenya, cloud hosting Kenya, software maintenance Kenya, IT products Kenya, Blackie Networks products"
        url="/Products"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Products', url: '/Products' }]}
        faq={[
          { question: 'What products does Blackie Networks sell?', answer: 'Blackie Networks offers Blackie Proxy (business VPN), an ISP Billing System, MikroTik management solutions, cloud hosting infrastructure, and ongoing software maintenance contracts for businesses across Kenya.' },
          { question: 'Does Blackie Networks have an ISP billing system?', answer: 'Yes. Our ISP Billing System is a radius-based hotspot and internet billing platform built for Kenyan ISPs and campus networks — supporting vouchers, M-Pesa integration, usage reporting and more.' },
          { question: 'Can I get a VPN solution for my business in Kenya?', answer: 'Yes. Blackie Proxy provides enterprise-grade VPN and proxy solutions for secure remote access, site-to-site connectivity, and network security for Kenyan businesses.' },
        ]}
      />
      {/* ════ DARK HERO BAND ════ */}
      <div style={{
        background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 55%, #0f1e38 100%)',
        paddingTop: 120, paddingBottom: 72, paddingLeft: 24, paddingRight: 24,
        borderBottom: '1px solid rgba(59,130,246,0.12)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #2563eb 30%, #3b82f6 50%, #2563eb 70%, transparent)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }} />

        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-eyebrow" style={{ margin: '0 auto 24px', display: 'inline-flex' }}
          >
            <FiZap size={11} /> Flagship Products · Blackie Networks
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.03em', marginBottom: 20, color: '#f1f5f9',
            }}
          >
            Built for ISPs, campuses &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              modern businesses
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: 620, margin: '0 auto 36px' }}
          >
            Ready-made solutions built and battle-tested on real Kenyan networks. Pick a product, see the details and ask for a tailored quote.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button className="btn-cta" style={{ height: 46, padding: '0 28px', fontSize: 14 }}
              onClick={() => navigate('/contactus')}>
              Get a Tailored Quote <FiArrowRight size={14} />
            </button>
            <a href="#products-grid" className="btn-outline"
              style={{ height: 46, padding: '0 24px', fontSize: 14, color: '#94a3b8', borderColor: 'rgba(255,255,255,0.12)' }}>
              Browse Products
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ display: 'flex', gap: '8px 24px', justifyContent: 'center', flexWrap: 'wrap', marginTop: 32, fontSize: 13, color: '#64748b' }}
          >
            {['5 Products', '200+ Deployments', 'Kenyan-built & tested'].map(l => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiCheck size={12} style={{ color: '#10b981' }} />
                <strong style={{ color: '#cbd5e1' }}>{l}</strong>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════ PRODUCTS GRID ════ */}
      <div id="products-grid" style={{ background: 'var(--bg-surface)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {products.map((p, i) => (
            <motion.div
              key={p.slug} custom={i} variants={cardVariants} initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="card-dark"
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 420px' : '420px 1fr',
                overflow: 'hidden', borderRadius: 16, minHeight: 280,
              }}
            >
              {/* ── text panel ── */}
              <div style={{
                padding: '36px 40px',
                order: i % 2 === 0 ? 0 : 1,
                display: 'flex', flexDirection: 'column',
              }}>
                {/* top row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 11, flexShrink: 0,
                    background: p.iconBg, border: `1px solid ${p.iconColor}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.iconColor,
                  }}>
                    {p.icon}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace' }}>
                    PRODUCT {p.num}
                  </span>
                  <span className={`tag ${p.tagClass}`} style={{ marginLeft: 'auto' }}>{p.tag}</span>
                </div>

                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: 4 }}>
                  {p.title}
                </h2>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2563eb', marginBottom: 12 }}>
                  {p.tagline}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.75, marginBottom: 20, flexGrow: 1 }}>
                  {p.description}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.highlights.map(h => (
                    <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#475569' }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                        background: `${p.iconColor}18`, border: `1px solid ${p.iconColor}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.iconColor,
                      }}>
                        <FiCheck size={10} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link to={`/Products/${p.slug}`} style={{ textDecoration: 'none', flex: 1 }}>
                    <button style={{
                      width: '100%', padding: '9px 0', borderRadius: 8,
                      border: '1.5px solid rgba(37,99,235,0.2)', background: 'transparent',
                      color: '#2563eb', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.06)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'; }}
                    >
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => navigate('/contactus')}
                    style={{
                      flex: 2, padding: '9px 0', borderRadius: 8, border: 'none',
                      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                      color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.25)', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.25)'; }}
                  >
                    Get a Quote <FiArrowRight size={13} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                  </button>
                </div>
              </div>

              {/* ── image panel ── */}
              <div style={{
                position: 'relative', overflow: 'hidden',
                order: i % 2 === 0 ? 1 : 0,
                minHeight: 260,
              }}>
                <motion.img
                  src={p.image} alt={p.title} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(6,13,30,0.45) 100%)' }} />
                <div style={{
                  position: 'absolute', bottom: 14, left: 14,
                  padding: '6px 12px', borderRadius: 999,
                  background: 'rgba(6,13,30,0.82)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8', fontSize: 10, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  Live · Blackie Networks
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ════ WHY CHOOSE US ════ */}
      <div style={{ background: 'var(--bg-base)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 14 }}>
              <FiZap size={11} /> Why Blackie Networks
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Built by engineers who live on real networks
            </h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.8 }}>
              We don't just sell software — we run real networks in Kenyan campuses and towns, so every product is tested in the same environments our clients face daily.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {whyUs.map(({ icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-dark" style={{ padding: '28px 24px' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 11, marginBottom: 16,
                  background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb',
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ CTA BAND ════ */}
      <div style={{
        background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 100%)',
        padding: '72px 24px', borderTop: '1px solid rgba(59,130,246,0.12)', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 20 }}>
            <FiZap size={11} /> Ready to deploy?
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Let's get your product live
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.8, marginBottom: 32 }}>
            Talk to our team, describe your setup, and we'll scope what you need with clear pricing — no hidden costs.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-cta" style={{ height: 48, padding: '0 32px', fontSize: 15 }}
              onClick={() => navigate('/contactus')}>
              Book Free Consultation <FiArrowRight size={15} />
            </button>
            <a href="https://wa.me/254796869402" target="_blank" rel="noreferrer"
              style={{
                height: 48, padding: '0 24px', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                color: '#22c55e', fontWeight: 600, fontSize: 15, textDecoration: 'none', transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(34,197,94,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(34,197,94,0.1)'; }}
            >
              💬 WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;

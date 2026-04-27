import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, message, Modal, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiStar, FiExternalLink, FiCheck,
  FiServer, FiCode, FiCloud, FiCpu, FiSmartphone, FiShield,
  FiUsers, FiCalendar, FiGlobe, FiBarChart2,
} from 'react-icons/fi';
import billingSystemImg  from '../assets/billingsystem.png';
import blackieShieldImg  from '../assets/blackieshield.png';
import glintParlourImg   from '../assets/glintparlour.png';
import mikrotikRemoteImg from '../assets/mikrotikremote.png';
import aboutBgImg        from '../assets/background.jpg';
import enockPhoto        from '../assets/enock.jpeg';
import piusPhoto         from '../assets/pius.png';
import larryPhoto        from '../assets/larry.jpg';
import timothyPhoto      from '../assets/timothy .jpg';
import firewallImg       from '../assets/FireWall.jpg';
import onPremiseVsCloudImg from '../assets/on-premise-vs-cloud.jpg';
import criticalSignsImg  from '../assets/5-Critical-Signs.jpg';
import phronesisImg      from '../assets/phronesis.png';
import softwareCompany1  from '../assets/softwareCompany1.jpeg';
import mamaShieldImg     from '../assets/mamashield.png';
import mebleyImg         from '../assets/mebley.png';

const { Option } = Select;

/* ─────────────────────────────────────────
   STATS BAR
───────────────────────────────────────── */
type StatConfig = { id: string; icon: React.ReactNode; label: string; value: number; suffix: string };

const StatItem: React.FC<{ stat: StatConfig }> = ({ stat }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        setDone(true);
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / 1200, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(eased * stat.value));
          if (p < 1) requestAnimationFrame(step);
          else setVal(stat.value);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [done, stat.value]);

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '24px 20px' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
        background: 'rgba(59,130,246,0.15)',
        border: '1px solid rgba(59,130,246,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#60a5fa',
      }}>
        {stat.icon}
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
          {val}{stat.suffix}
        </div>
        <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{stat.label}</div>
      </div>
    </div>
  );
};

export const StatsBar: React.FC = () => {
  const stats: StatConfig[] = [
    { id: 'projects',      icon: <FiServer size={20} />,   label: 'Projects Delivered',   value: 200, suffix: '+' },
    { id: 'satisfaction',  icon: <FiStar size={20} />,     label: 'Client Satisfaction',  value: 98,  suffix: '%' },
    { id: 'years',         icon: <FiCalendar size={20} />, label: 'Years in IT',          value: 10,  suffix: '+' },
    { id: 'organizations', icon: <FiUsers size={20} />,    label: 'Organisations Served', value: 50,  suffix: '+' },
  ];

  return (
    <section style={{ background: '#0c1a30', borderTop: '1px solid rgba(59,130,246,0.12)', borderBottom: '1px solid rgba(59,130,246,0.12)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {stats.map((s, i) => (
            <React.Fragment key={s.id}>
              <StatItem stat={s} />
              {i < stats.length - 1 && (
                <div style={{ width: 1, background: 'rgba(59,130,246,0.08)', margin: '16px 0', display: 'none' }} className="hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   HOME SERVICES
───────────────────────────────────────── */
type ServiceConfig = {
  id: string; icon: React.ReactNode; iconBg: string; iconColor: string;
  name: string; description: string; idealFor: string; href: string;
  liveUrl?: string; liveLabel?: string;
  tag: string; tagClass: string;
};

const homeServices: ServiceConfig[] = [
  {
    id: 'network-billing',
    icon: <FiServer size={22} />,
    iconBg: 'rgba(59,130,246,0.12)', iconColor: '#60a5fa',
    name: 'Network Setup & Billing',
    description: 'End-to-end network design, structured cabling, MikroTik configuration, and ISP / campus billing systems that keep your internet stable and revenue flowing.',
    idealFor: 'ISPs, campuses, Saccos, estates, co-working spaces',
    href: '/services/network-billing',
    tag: 'Networking', tagClass: 'tag-blue',
  },
  {
    id: 'web-development',
    icon: <FiCode size={22} />,
    iconBg: 'rgba(139,92,246,0.12)', iconColor: '#a78bfa',
    name: 'Web Development',
    description: 'Modern websites, portals, and internal systems built for your workflows — from booking systems and dashboards to full business management tools.',
    idealFor: 'Businesses, schools, Saccos, and organisations',
    href: '/services/web-development',
    tag: 'Software', tagClass: 'tag-purple',
  },
  {
    id: 'cloud-services',
    icon: <FiCloud size={22} />,
    iconBg: 'rgba(6,182,212,0.12)', iconColor: '#22d3ee',
    name: 'Cloud Infrastructure',
    description: 'Design, migration, and management of cloud infrastructure on AWS, DigitalOcean, and others — with backups, security hardening, and 24/7 monitoring.',
    idealFor: 'Teams that want reliable hosting with room to scale',
    href: '/services/cloud-hosting',
    tag: 'Cloud', tagClass: 'tag-blue',
  },
  {
    id: 'ai-systems',
    icon: <FiCpu size={22} />,
    iconBg: 'rgba(16,185,129,0.12)', iconColor: '#34d399',
    name: 'AI Systems & Automation',
    description: 'Design and integration of AI tools that automate support, reporting, and decision-making — tailored to your data and business processes.',
    idealFor: 'Organisations that want to save time and unlock smarter insights',
    href: '/services/ai-systems',
    tag: 'AI/ML', tagClass: 'tag-green',
  },
  {
    id: 'mobile-apps',
    icon: <FiSmartphone size={22} />,
    iconBg: 'rgba(249,115,22,0.12)', iconColor: '#fb923c',
    name: 'Mobile App Development',
    description: 'Android and iOS apps for customers or internal teams — fully integrated with your web systems, billing, and cloud infrastructure.',
    idealFor: 'Brands and service providers that need on-the-go access',
    href: '/services/mobile-apps',
    tag: 'Mobile', tagClass: 'tag-orange',
  },
  {
    id: 'vpn-blackieshield',
    icon: <FiShield size={22} />,
    iconBg: 'rgba(59,130,246,0.12)', iconColor: '#60a5fa',
    name: 'VPN – Blackie Shield',
    description: 'Always-on VPN and secure remote access powered by Blackie Shield, keeping your teams and branches safely connected from anywhere.',
    idealFor: 'Remote staff, multiple branches, field teams',
    href: '/services/vpn-blackieshield',
    liveUrl: 'https://www.blackieshield.com',
    liveLabel: 'www.blackieshield.com',
    tag: 'Security', tagClass: 'tag-blue',
  },
];

export const HomeServicesSection: React.FC = () => (
  <section className="section-surface" style={{ padding: '88px 0', borderTop: '3px solid rgba(37,99,235,0.2)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div className="section-eyebrow" style={{ margin: '0 auto 16px' }}>
          <FiServer size={11} />
          What We Build
        </div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 14 }}>
          Services We Provide
        </h2>
        <p style={{ maxWidth: 540, margin: '0 auto', color: '#64748b', fontSize: '0.97rem' }}>
          From on-premise networks to cloud and software — Blackie Networks is your single partner for modern, reliable IT infrastructure.
        </p>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {homeServices.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
          >
            <div
              className="card-dark"
              style={{ padding: '28px 26px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
            >
              {/* Top gradient accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${svc.iconColor}60, ${svc.iconColor}20, transparent)`,
              }} />

              {/* Icon + tag row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: svc.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: svc.iconColor,
                }}>
                  {svc.icon}
                </div>
                <span className={`tag ${svc.tagClass}`}>{svc.tag}</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 10, letterSpacing: '-0.01em' }}>
                {svc.name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.7, marginBottom: 14, flexGrow: 1 }}>
                {svc.description}
              </p>

              {svc.liveUrl && (
                <a
                  href={svc.liveUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#3b82f6', marginBottom: 14, textDecoration: 'none' }}
                >
                  <FiExternalLink size={11} />
                  {svc.liveLabel ?? svc.liveUrl}
                </a>
              )}

              {/* Ideal-for tag */}
              <div style={{ fontSize: 11, color: '#475569', marginBottom: 18, fontStyle: 'italic' }}>
                Ideal for: {svc.idealFor}
              </div>

              <Link
                to={svc.href}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 600, color: svc.iconColor,
                  marginTop: 'auto', textDecoration: 'none',
                  transition: 'gap 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '10px'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '6px'; }}
              >
                Learn More <FiArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div style={{
        marginTop: 36, padding: '20px 28px', borderRadius: 12,
        background: 'rgba(59,130,246,0.06)',
        border: '1px solid rgba(37,99,235,0.2)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
          Not sure which service fits you?{' '}
          <strong style={{ color: '#1e293b' }}>Book a free consultation and we'll guide you.</strong>
        </p>
        <Link to="/contactus" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
          Book Free Consultation
        </Link>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */
type Testimonial = { id: string; name: string; role: string; company: string; quote: string };

const testimonials: Testimonial[] = [
  { id: 't1', name: 'John Mwangi',    role: 'IT Manager',          company: 'ABC Sacco, Nairobi',        quote: 'Blackie Networks transformed our entire office network. What used to crash weekly now runs perfectly. Professional, fast, and they explained everything clearly.' },
  { id: 't2', name: 'Dr. Grace Achieng', role: 'Hospital Administrator', company: 'Green Valley Hospital', quote: 'Our Wi-Fi and patient management systems are now seamless. Doctors, nurses, and patients connect without issues. Blackie Networks handled everything end-to-end.' },
  { id: 't3', name: 'Peter Njoroge',  role: 'Principal',           company: 'City Heights School',       quote: 'They designed and installed a campus-wide network for over 500 students. Uptime has been outstanding and support is always just a call away.' },
  { id: 't4', name: 'Linet Wanjiru',  role: 'General Manager',     company: 'Sunrise Hotel',             quote: 'Guest complaints about Wi-Fi dropped to almost zero after Blackie Networks stepped in. Their monitoring and support keeps us confident 24/7.' },
  { id: 't5', name: 'David Otieno',   role: 'Programs Director',   company: 'HopeBridge NGO',            quote: 'From secure cloud storage to reliable connectivity across our field offices, Blackie Networks has been an incredible long-term IT partner.' },
  { id: 't6', name: 'Sarah Kabiru',   role: 'Managing Partner',    company: 'Kabiru & Associates',       quote: 'They migrated our systems to the cloud and implemented strong security controls. Our team can now work securely from anywhere.' },
];

const initials = (n: string) => n.split(' ').slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');

export const TestimonialsSection: React.FC = () => (
  <section className="section-dark" style={{ padding: '88px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div className="section-eyebrow" style={{ margin: '0 auto 16px' }}>
          <FiStar size={11} />
          Client Stories
        </div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 12 }}>
          What Our Clients Say
        </h2>
        <p style={{ maxWidth: 500, margin: '0 auto', color: '#64748b', fontSize: '0.95rem' }}>
          Real stories from organisations that trust Blackie Networks with their critical IT infrastructure.
        </p>
      </div>

      <Carousel autoplay autoplaySpeed={5500} dots draggable>
        {testimonials.map((t) => (
          <div key={t.id}>
            <div
              className="card-dark"
              style={{
                margin: '0 4px 20px',
                padding: '36px 40px',
                display: 'flex', flexDirection: 'column', gap: 20,
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4 }}>
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                ))}
              </div>
              {/* Quote */}
              <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 8, borderTop: '1px solid rgba(59,130,246,0.1)' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 16,
                }}>
                  {initials(t.name)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   PORTFOLIO
───────────────────────────────────────── */
type ProjectCategory = 'All' | 'Networking' | 'Software' | 'Cloud' | 'Mobile';

export type Project = {
  id: string; name: string; client: string; industry: string;
  category: Exclude<ProjectCategory, 'All'>; summary: string;
  thumbnail: string; caseStudyUrl: string; liveUrl?: string;
};

export const projects: Project[] = [
  { id: 'blackiebilling',      name: 'BlackieBilling ISP & Campus Billing', client: 'Blackie Networks',     industry: 'ISPs, Campuses, Estates',  category: 'Software',    summary: 'End-to-end billing and customer portal for ISPs and shared networks, including prepaid and postpaid billing.',                                              thumbnail: billingSystemImg,  caseStudyUrl: '/case-studies/blackiebilling',      liveUrl: 'https://admin.blackie-networks.com' },
  { id: 'blackieshield-vpn',   name: 'Blackie Shield VPN Access',          client: 'Remote & Branch Teams', industry: 'Cross-industry',           category: 'Networking',  summary: 'Always-on VPN and secure remote access for staff and branches, with centralised control and monitoring.',                                                    thumbnail: blackieShieldImg,  caseStudyUrl: '/case-studies/blackieshield-vpn',   liveUrl: 'https://www.blackieshield.com' },
  { id: 'mikrotik-remote-access', name: 'MikroTik Remote Access Management', client: 'Blackie Networks NOC', industry: 'ISPs & Enterprises',       category: 'Networking',  summary: 'Centralised, secure MikroTik remote access for routers and remote sites, with audit-friendly access controls.',                                              thumbnail: mikrotikRemoteImg, caseStudyUrl: '/case-studies/mikrotik-remote-access', liveUrl: 'https://mikrotik.blackie-networks.com' },
  { id: 'glint-ai-system',     name: 'AI Customer Insights – Glint Parlour', client: 'Glint Parlour',       industry: 'Beauty & Lifestyle',       category: 'Software',    summary: 'AI-powered hairstyle try-on, booking, and customer insights system — letting clients preview looks, book stylists, and receive smart reminders.',          thumbnail: glintParlourImg,  caseStudyUrl: '/case-studies/glint-ai-system',     liveUrl: 'https://www.glintparlour.com' },
  { id: 'phronesis-tours',     name: 'Phronesis Africa Safaris Platform',   client: 'Phronesis Africa',     industry: 'Travel & Tourism',         category: 'Software',    summary: 'Modern safari booking and discovery website for bespoke East Africa experiences, currently in active development with Blackie Networks.',                       thumbnail: phronesisImg,     caseStudyUrl: '/case-studies/phronesis-tours',     liveUrl: 'https://new.phronesistours.com/' },
  { id: 'kynetraai',           name: 'KynetraAI — AI Systems Platform',     client: 'KynetraAI',           industry: 'Artificial Intelligence',   category: 'Software',    summary: 'Full AI systems platform designed and built by Blackie Networks — featuring intelligent automation, machine learning pipelines, and enterprise AI tooling.',     thumbnail: softwareCompany1, caseStudyUrl: '/case-studies/kynetraai',            liveUrl: 'https://www.kynetraai.com' },
  { id: 'mamashield',          name: 'MamaShield — Maternal Risk Intelligence', client: 'MamaShield',        industry: 'Health Technology',         category: 'Software',    summary: 'AI-powered maternal risk intelligence platform that helps hospitals and clinics auto-detect at-risk mothers before birth — using machine-learning models on routine clinical data to flag mothers who need urgent review, paired with explainable insights for every prediction.', thumbnail: mamaShieldImg,    caseStudyUrl: '/case-studies/mamashield',          liveUrl: 'https://mamashield.health' },
  { id: 'mebley',              name: 'Mebley — Intentional Dating App',     client: 'Mebley',              industry: 'Social & Dating',           category: 'Software',    summary: 'Intentional dating platform reimagined — thoughtful profiles, voice-first chemistry, and matches ranked by depth not recency. Trusted by 12k+ users across 40+ countries with a 4.8 app rating.',  thumbnail: mebleyImg,        caseStudyUrl: '/case-studies/mebley',               liveUrl: 'https://www.mebley.com' },
];

export const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory>('All');
  const [preview, setPreview] = useState<Project | null>(null);
  const filters: ProjectCategory[] = ['All', 'Networking', 'Software', 'Cloud', 'Mobile'];
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-surface" style={{ padding: '88px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-eyebrow" style={{ margin: '0 auto 16px' }}>
            <FiBarChart2 size={11} />
            Case Studies
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Recent Projects
          </h2>
          <p style={{ maxWidth: 500, margin: '0 auto', color: '#64748b', fontSize: '0.95rem' }}>
            How we've helped Kenyan businesses modernise their networks, software, and cloud infrastructure.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                background: filter === f ? '#3b82f6' : 'transparent',
                color: filter === f ? '#fff' : '#64748b',
                border: `1px solid ${filter === f ? '#3b82f6' : 'rgba(59,130,246,0.15)'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {shown.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="card-dark" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Thumbnail */}
                <div
                  style={{ height: 200, overflow: 'hidden', position: 'relative', cursor: 'zoom-in' }}
                  onClick={() => setPreview(p)}
                >
                  <img
                    src={p.thumbnail} alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 50%)' }} />
                  <span className={`tag tag-blue`} style={{ position: 'absolute', top: 12, right: 12 }}>{p.category}</span>
                </div>

                <div style={{ padding: '20px 22px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 6, letterSpacing: '-0.01em' }}>{p.name}</h3>
                  <p style={{ fontSize: 12, color: '#3b82f6', marginBottom: 10, fontWeight: 500 }}>{p.client} · {p.industry}</p>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, marginBottom: 14, flexGrow: 1 }}>{p.summary}</p>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#475569', marginBottom: 14, textDecoration: 'none' }}>
                      <FiExternalLink size={11} />
                      {p.liveUrl.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  <Link
                    to={p.caseStudyUrl}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 13, fontWeight: 600, color: '#2563eb', textDecoration: 'none',
                      transition: 'gap 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '10px'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '6px'; }}
                  >
                    View Case Study <FiArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        open={!!preview} onCancel={() => setPreview(null)}
        footer={null} centered width="80vw"
        styles={{ body: { padding: 0, background: '#000', borderRadius: 8, overflow: 'hidden' } }}
      >
        {preview && <img src={preview.thumbnail} alt={preview.name} style={{ width: '100%', height: 'auto', display: 'block' }} />}
      </Modal>
    </section>
  );
};

/* ─────────────────────────────────────────
   ABOUT US SECTION (homepage strip)
───────────────────────────────────────── */
const teamMembers = [
  { id: 'ceo',      name: 'Enock Mwema',   role: 'Founder & CEO',                bio: 'Provides overall leadership and vision, guiding strategy, partnerships, and delivery of reliable IT solutions.',                           photo: enockPhoto },
  { id: 'director', name: 'Pius Musomi',   role: 'Director',                     bio: 'Oversees major projects, key client relationships, and ensures every deployment meets our technical and business standards.',                photo: piusPhoto  },
  { id: 'timothy',  name: 'Timothy',        role: 'IT Support & Field Ops Lead',  bio: 'Leads onsite installations, support visits, and day-to-day monitoring for networks and systems across client sites.',                     photo: timothyPhoto },
  { id: 'larry',    name: 'Larry Kinuthia', role: 'Senior Java Developer',        bio: 'Experienced developer with a strong track record building robust backend services and full-stack projects for enterprise clients.',         photo: larryPhoto  },
];

const coreValues = [
  { id: 'integrity',    icon: <FiCheck size={18} />,  title: 'Integrity',    desc: 'We recommend only what you truly need and stand by our work long after deployment.' },
  { id: 'innovation',   icon: <FiCpu size={18} />,    title: 'Innovation',   desc: "We stay ahead of networking, cloud, and software trends so you don't have to." },
  { id: 'reliability',  icon: <FiShield size={18} />, title: 'Reliability',  desc: '24/7 monitoring and support so your systems are up when you need them most.' },
  { id: 'partnership',  icon: <FiUsers size={18} />,  title: 'Partnership',  desc: 'We work as an extension of your team, not just as a one-off vendor.' },
];

export const AboutUsSection: React.FC = () => (
  <section id="about" className="section-dark" style={{ padding: '88px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

      {/* Intro */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center', marginBottom: 72 }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(37,99,235,0.2)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
          <img src={aboutBgImg} alt="Blackie Networks team" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
        <div>
          <div className="section-eyebrow" style={{ marginBottom: 16 }}>
            <FiUsers size={11} />
            Who We Are
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 18 }}>
            About Blackie Networks
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 16 }}>
            Founded to solve a painful problem — businesses investing in IT systems that constantly failed them. We set out to build a team combining deep technical expertise with honest, human support.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 24 }}>
            Today we design, install, and support networks and software for organisations across Kenya — from schools, hospitals, and NGOs to fast-growing SMEs and enterprises.
          </p>
          <p style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.95rem', marginBottom: 28, fontFamily: 'JetBrains Mono, monospace' }}>
            → Mission: World-class IT infrastructure, accessible to every Kenyan business.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {coreValues.map((v) => (
              <div
                key={v.id}
                className="card-dark"
                style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ color: '#3b82f6' }}>{v.icon}</div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: '#1e293b' }}>{v.title}</span>
                </div>
                <p style={{ fontSize: 12, color: '#475569', margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: 28, letterSpacing: '-0.015em' }}>
          Meet the Team
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 18 }}>
          {teamMembers.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="card-dark" style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', overflow: 'hidden',
                  border: '2px solid rgba(59,130,246,0.2)',
                }}>
                  <img
                    src={m.photo} alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: m.id === 'larry' ? 'center 20%' : 'center' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{m.name}</div>
                  <div style={{ color: '#3b82f6', fontSize: 12, fontWeight: 500, marginTop: 2 }}>{m.role}</div>
                </div>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   PRICING
───────────────────────────────────────── */
type PricingPlan = { id: string; icon: React.ReactNode; name: string; audience: string; priceLabel: string; ctaLabel: string; ctaHref: string; badge?: string; popular?: boolean; features: string[] };

const plans: PricingPlan[] = [
  {
    id: 'website', name: 'Website Essentials',
    icon: <FiGlobe size={20} />,
    audience: 'Modern, fast website or landing page for any business.',
    priceLabel: 'Request a quote',
    ctaLabel: 'Request Website Quote', ctaHref: '#contact',
    features: [
      'Custom-designed responsive website',
      'Contact forms and lead capture',
      'On-page SEO & analytics setup',
      'CMS training for your team',
      'Cloud deployment on your provider',
      'Ongoing maintenance & security updates',
    ],
  },
  {
    id: 'business-apps', name: 'Business Apps Bundle',
    icon: <FiBarChart2 size={20} />,
    audience: 'Billing, VPN access, and dashboards in one place.',
    priceLabel: 'Custom quote by module',
    ctaLabel: 'Talk to Sales', ctaHref: '#contact',
    badge: 'Most Popular', popular: true,
    features: [
      'BlackieBilling ISP or campus billing',
      'Blackie Shield VPN for remote teams',
      'Admin dashboards & management reporting',
      'M-Pesa & card payment integration',
      'Cloud deployment on AWS, GCP, or DO',
      'Managed updates and 24/7 monitoring',
    ],
  },
  {
    id: 'enterprise', name: 'Enterprise Platforms',
    icon: <FiServer size={20} />,
    audience: 'Multiple branches and mission-critical workflows.',
    priceLabel: 'Tailored platform design',
    ctaLabel: 'Book Strategy Call', ctaHref: '#booking',
    features: [
      'End-to-end architecture & UX design',
      'Multi-tenant, multi-branch access controls',
      '24/7 monitoring, SLAs, dedicated account team',
      'Roll-out, training, and long-term support',
      'Hybrid / cloud deployment strategy',
      'Full maintenance & incident response',
    ],
  },
];

export const PricingSection: React.FC = () => (
  <section id="pricing" className="section-surface" style={{ padding: '88px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div className="section-eyebrow" style={{ margin: '0 auto 16px' }}>
          <FiBarChart2 size={11} />
          Packages
        </div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 12 }}>
          Software Products & Plans
        </h2>
        <p style={{ maxWidth: 500, margin: '0 auto', color: '#64748b', fontSize: '0.95rem' }}>
          Every product is delivered with implementation and ongoing support — no hidden surprises.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 20, alignItems: 'start' }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: i * 0.09 }}
            style={{ transform: plan.popular ? 'translateY(-8px)' : 'none' }}
          >
            <div
              style={{
                background: plan.popular ? 'rgba(37,99,235,0.08)' : 'var(--bg-card)',
                border: `1px solid ${plan.popular ? 'rgba(59,130,246,0.4)' : 'var(--border)'}`,
                borderRadius: 14, padding: '28px 26px',
                boxShadow: plan.popular ? '0 0 40px rgba(59,130,246,0.15)' : 'none',
                height: '100%', display: 'flex', flexDirection: 'column',
                position: 'relative',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: '14px 14px 0 0',
                  background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: plan.popular ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: plan.popular ? '#60a5fa' : '#3b82f6',
                }}>
                  {plan.icon}
                </div>
                {plan.badge && (
                  <span className="tag tag-blue" style={{ fontFamily: 'inherit' }}>{plan.badge}</span>
                )}
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{plan.name}</h3>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16, lineHeight: 1.6 }}>{plan.audience}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#94a3b8', marginBottom: 20 }}>{plan.priceLabel}</p>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28, flexGrow: 1 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10, fontSize: 13, color: '#94a3b8' }}>
                    <FiCheck size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: 2 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={plan.popular ? 'btn-primary' : 'btn-outline'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {plan.ctaLabel}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   BLOG
───────────────────────────────────────── */
type BlogPost = { id: string; title: string; date: string; image: string; url: string };

const blogPosts: BlogPost[] = [
  { id: 'firewall-2025',    title: 'Why Every Kenyan Business Needs a Firewall in 2025',           date: 'January 2025',  image: firewallImg,         url: '/blog/why-every-kenyan-business-needs-a-firewall-in-2025' },
  { id: 'cloud-vs-onprem',  title: "Cloud vs On-Premise: What's Right for Your Organisation?",    date: 'February 2025', image: onPremiseVsCloudImg, url: '/blog/cloud-vs-on-premise-whats-right-for-your-organization' },
  { id: 'network-upgrade',  title: '5 Signs Your Business Network Needs an Upgrade',               date: 'March 2025',    image: criticalSignsImg,    url: '/blog/5-signs-your-business-network-needs-an-upgrade' },
];

export const BlogSection: React.FC = () => (
  <section id="resources" className="section-dark" style={{ padding: '88px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div className="section-eyebrow" style={{ margin: '0 auto 16px' }}>
          <FiCode size={11} />
          Resources
        </div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 12 }}>
          IT Tips & Insights
        </h2>
        <p style={{ maxWidth: 480, margin: '0 auto', color: '#64748b', fontSize: '0.95rem' }}>
          Practical guides to help you secure, modernise, and scale your IT systems.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link to={post.url} style={{ textDecoration: 'none', display: 'block' }}>
              <div className="card-dark" style={{ overflow: 'hidden', height: '100%' }}>
                <div style={{ height: 190, overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={post.image} alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 50%)' }} />
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <span style={{ fontSize: 11, color: '#3b82f6', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{post.date}</span>
                  <h3 style={{ fontSize: '0.97rem', fontWeight: 700, color: '#0f172a', marginTop: 8, marginBottom: 14, lineHeight: 1.45, letterSpacing: '-0.01em' }}>
                    {post.title}
                  </h3>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: '#2563eb' }}>
                    Read Article <FiArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────── */
export const ContactSection: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: Record<string, string>) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || 'Failed to send.');
      message.success("Thank you! We'll respond within 2 hours.");
      form.resetFields();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      message.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg-input)', borderColor: 'var(--border)',
    color: 'var(--text-1)', borderRadius: 8, height: 44,
  };

  return (
    <section id="contact" className="section-surface" style={{ padding: '88px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-eyebrow" style={{ margin: '0 auto 16px' }}>
            <FiUsers size={11} />
            Get In Touch
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Tell Us About Your Project
          </h2>
          <p style={{ maxWidth: 480, margin: '0 auto', color: '#64748b', fontSize: '0.95rem' }}>
            Share a few details and our team will get back to you within 2 working hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>

          {/* Form */}
          <div className="card-dark" style={{ padding: '36px 32px' }}>
            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Required' }]}>
                  <Input placeholder="John Mwangi" style={inputStyle} />
                </Form.Item>
                <Form.Item name="company" label="Organisation" rules={[{ required: true, message: 'Required' }]}>
                  <Input placeholder="ABC Sacco" style={inputStyle} />
                </Form.Item>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                  <Input placeholder="you@example.com" style={inputStyle} />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Required' }]}>
                  <Input placeholder="+254 7XX XXX XXX" style={inputStyle} />
                </Form.Item>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Form.Item name="service" label="Service" rules={[{ required: true, message: 'Select a service' }]}>
                  <Select placeholder="Select service" style={inputStyle}>
                    <Option value="network-setup">Network Setup</Option>
                    <Option value="software-dev">Software Development</Option>
                    <Option value="cloud">Cloud</Option>
                    <Option value="mobile-app">Mobile App</Option>
                    <Option value="it-support">IT Support</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="budget" label="Budget (optional)">
                  <Select allowClear placeholder="Select range" style={inputStyle}>
                    <Option value="below-100k">Below KES 100K</Option>
                    <Option value="100k-500k">KES 100K – 500K</Option>
                    <Option value="500k-1m">KES 500K – 1M</Option>
                    <Option value="above-1m">Above KES 1M</Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item name="message" label="Message / Project Description" rules={[{ required: true, message: 'Tell us about your project' }]}>
                <Input.TextArea
                  rows={5}
                  placeholder="Share your current setup, challenges, and what you'd like to achieve."
                  style={{ ...inputStyle, height: 'auto', padding: '10px 12px' }}
                />
              </Form.Item>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', height: 48, fontSize: 15, marginTop: 4 }}
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </Form>
          </div>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Quick info */}
            <div className="card-dark" style={{ padding: '28px 26px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Contact Details</h3>
              {[
                { icon: '📍', label: 'Location',     value: 'Parklands, Nairobi, Kenya' },
                { icon: '📞', label: 'Phone',        value: '+254 796 869 402',           href: 'tel:+254796869402' },
                { icon: '📧', label: 'Email',        value: 'support@blackie-networks.com', href: 'mailto:support@blackie-networks.com' },
                { icon: '🕒', label: 'Working Hours',value: 'Mon – Fri, 8 am – 6 pm' },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
                    {href ? (
                      <a href={href} style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#60a5fa'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
                      >{value}</a>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: 14 }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
              <a
                href="https://wa.me/254796869402"
                target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 8, marginTop: 8,
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                  color: '#16a34a', fontWeight: 600, fontSize: 14, textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.18)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.1)'; }}
              >
                💬 Chat on WhatsApp
              </a>
            </div>

            {/* Map */}
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', flexGrow: 1, minHeight: 220 }}>
              <iframe
                title="Blackie Networks Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.807!2d36.817!3d-1.286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNairobi!5e0!3m2!1sen!2ske!4v1700000000000"
                width="100%" height="100%"
                style={{ border: 0, display: 'block', minHeight: 220, filter: 'grayscale(1) invert(0.9) hue-rotate(180deg)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   BOOKING (stub — no calendar configured)
───────────────────────────────────────── */
export const BookingSection: React.FC = () => null;

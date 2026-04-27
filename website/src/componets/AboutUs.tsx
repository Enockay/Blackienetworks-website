import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiZap, FiArrowRight, FiCheck,
  FiTarget, FiEye, FiShield, FiUsers, FiTrendingUp, FiGlobe,
  FiServer, FiCode, FiAward, FiHeadphones,
} from 'react-icons/fi';
import { SEO } from './SEO';

import enockPhoto   from '../assets/enock.jpeg';
import piusPhoto    from '../assets/pius.png';
import timothyPhoto from '../assets/timothy .jpg';
import larryPhoto   from '../assets/larry.jpg';

/* ── animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, type: 'spring' as const, stiffness: 90, damping: 14 },
});

/* ── data ── */
const team = [
  {
    name: 'Enock Mwema',
    role: 'CEO & Founder',
    bio: "Leads Blackie Networks with 3+ years in network infrastructure and software development. Passionate about bridging Kenya's digital divide.",
    photo: enockPhoto,
    tags: ['MikroTik', 'Cloud', 'Strategy'],
  },
  {
    name: 'Pius Musomi',
    role: 'Head of Software',
    bio: 'Drives full-stack engineering with a focus on secure, scalable systems. Leads backend architecture and client-facing web platforms.',
    photo: piusPhoto,
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    name: 'Timothy Kuria',
    role: 'Network Infrastructure Lead',
    bio: 'Architects seamless deployments across campuses and enterprises. Guarantees high-speed, uninterrupted connectivity in any environment.',
    photo: timothyPhoto,
    tags: ['MikroTik', 'Cisco', 'VPN'],
  },
  {
    name: 'Larry',
    role: 'Systems Engineer',
    bio: 'Handles cloud deployments, DevOps pipelines, and monitoring infrastructure that keeps Blackie Networks systems at 99.9% uptime.',
    photo: larryPhoto,
    tags: ['AWS', 'Docker', 'Linux'],
  },
];

const values = [
  { icon: <FiZap size={20} />,       color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',   title: 'Innovation First',       desc: 'We stay ahead of networking, cloud, and software trends so clients always get future-proof solutions.' },
  { icon: <FiShield size={20} />,    color: '#10b981', bg: 'rgba(16,185,129,0.1)',   title: 'Security by Design',     desc: 'Every solution is architected with zero-trust principles, end-to-end encryption and proactive threat monitoring.' },
  { icon: <FiUsers size={20} />,     color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',  title: 'Client-Centric',         desc: 'Your success is our success. We listen, scope carefully and tailor solutions to your goals and budget.' },
  { icon: <FiGlobe size={20} />,     color: '#f97316', bg: 'rgba(249,115,22,0.1)',  title: 'Accessibility',          desc: 'World-class technology should reach everyone — our pricing and solutions work for organisations of all sizes.' },
];

const achievements = [
  { icon: <FiAward size={24} />,       color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',   num: '100+', label: 'Projects Delivered',          desc: 'From campus Wi-Fi to enterprise networks — every project shipped on spec and on time.' },
  { icon: <FiUsers size={24} />,       color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',   num: '20+',  label: 'Strategic Partnerships',       desc: 'ISPs, hardware vendors, cloud providers — our ecosystem means better pricing for you.' },
  { icon: <FiTrendingUp size={24} />,  color: '#10b981', bg: 'rgba(16,185,129,0.12)',   num: '99.9%',label: 'Uptime Guarantee',             desc: 'Backed by 24/7 monitoring and documented runbooks across all managed deployments.' },
];

const industries = [
  { icon: '🎓', name: 'Education',   desc: 'Universities & colleges' },
  { icon: '🏥', name: 'Healthcare',  desc: 'Hospitals & clinics' },
  { icon: '🏢', name: 'Enterprise',  desc: 'Corporations & offices' },
  { icon: '💼', name: 'SMEs',        desc: 'Small & medium businesses' },
  { icon: '🤝', name: 'NGOs',        desc: 'Non-profit organisations' },
  { icon: '🏛️', name: 'Government', desc: 'Public sector institutions' },
];

const expertise = [
  { icon: <FiServer size={18} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'Technical Mastery', desc: 'MikroTik routing, VPN architectures, load balancing, captive portals and enterprise-grade Wi-Fi — engineered for scale.' },
  { icon: <FiCode size={18} />,   color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', title: 'Software Excellence', desc: 'React, Node.js, cloud-native APIs and billing systems — every line written to perform in Kenyan real-world conditions.' },
  { icon: <FiHeadphones size={18} />, color: '#10b981', bg: 'rgba(16,185,129,0.1)', title: 'Always-On Support', desc: '24/7 monitoring, sub-15-minute response SLA, and a dedicated channel for your team from day one.' },
];

/* ── component ── */
const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="About Us — Blackie Networks | Team & Mission"
        description="Learn about Blackie Networks — our mission, experienced team, achievements and vision for Kenya's digital infrastructure."
        keywords="Blackie Networks about, IT company Kenya, network infrastructure team"
        url="/aboutus"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'About Us', url: '/aboutus' }]}
      />

      {/* ════ DARK HERO BAND ════ */}
      <div style={{
        background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 55%, #0f1e38 100%)',
        paddingTop: 120, paddingBottom: 72, paddingLeft: 24, paddingRight: 24,
        borderBottom: '1px solid rgba(59,130,246,0.12)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #2563eb 30%, #3b82f6 50%, #2563eb 70%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />

        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="section-eyebrow" style={{ margin: '0 auto 24px', display: 'inline-flex' }}>
            <FiZap size={11} /> Our Story · Blackie Networks
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, color: '#f1f5f9' }}
          >
            Transforming Kenya's{' '}
            <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Infrastructure
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.8, maxWidth: 680, margin: '0 auto 36px' }}>
            Founded in 2021, we've grown from solving campus connectivity challenges to becoming a full-stack IT partner for institutions, businesses and enterprises across Kenya.
          </motion.p>

          {/* mini stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ display: 'flex', gap: '8px 32px', justifyContent: 'center', flexWrap: 'wrap', fontSize: 13 }}>
            {[['100+', 'Projects'], ['3+', 'Years'], ['20+', 'Partnerships'], ['24/7', 'Support']].map(([num, lab]) => (
              <div key={lab} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>{num}</div>
                <div style={{ color: '#64748b', marginTop: 2 }}>{lab}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════ MISSION & VISION ════ */}
      <div style={{ background: 'var(--bg-surface)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 14 }}><FiZap size={11} /> Our Purpose</div>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Mission & Vision</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 56 }}>
            {[
              { icon: <FiTarget size={22} />, color: '#2563eb', bg: 'rgba(37,99,235,0.08)', title: 'Our Mission', text: 'To democratise access to world-class IT infrastructure and empower every institution, business and individual with reliable, affordable and future-ready technology solutions.' },
              { icon: <FiEye size={22} />,    color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', title: 'Our Vision',  text: "To become East Africa's most trusted technology partner — known for innovation, reliability and transforming how organisations connect, operate and thrive in the digital age." },
            ].map(({ icon, color, bg, title, text }) => (
              <motion.div key={title} {...fadeUp(0.1)} className="card-dark" style={{ padding: '32px 28px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 18 }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.8, margin: 0 }}>{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Our Story */}
          <motion.div {...fadeUp(0.1)} className="card-dark" style={{ padding: '40px 44px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>
              <div>
                <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 16 }}><FiZap size={11} /> Founded 2021</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: 16 }}>How we started</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.85, marginBottom: 14 }}>
                  Blackie Networks started from a simple but powerful observation: institutions across Kenya were struggling with outdated, unreliable and expensive network solutions.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.85, margin: 0 }}>
                  What started as solving campus connectivity challenges at Chuka University has evolved into a full-stack technology partner for 100+ organisations — from universities and startups to NGOs and enterprises.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { year: '2021', event: 'Founded — first campus Wi-Fi deployment at Chuka University' },
                  { year: '2022', event: 'Expanded to ISP billing systems and MikroTik consulting' },
                  { year: '2023', event: 'Launched Blackie Shield VPN and cloud infrastructure services' },
                  { year: '2024', event: 'Crossed 100 projects and 50+ organisations served across Kenya' },
                ].map(({ year, event }) => (
                  <div key={year} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#3b82f6', fontFamily: 'JetBrains Mono, monospace', paddingTop: 2, flexShrink: 0, width: 36 }}>{year}</span>
                    <div style={{ flex: 1, paddingLeft: 16, borderLeft: '1px solid rgba(59,130,246,0.2)' }}>
                      <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════ TEAM ════ */}
      <div style={{ background: 'var(--bg-base)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 14 }}><FiUsers size={11} /> The Team</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 12 }}>Meet the engineers behind Blackie Networks</h2>
            <p style={{ maxWidth: 560, margin: '0 auto', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.8 }}>
              A lean, certified team with deep roots in Kenyan networking, software engineering and cloud infrastructure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {team.map(({ name, role, bio, photo, tags }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.08)} className="card-dark" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: '#0a1628' }}>
                  <img src={photo} alt={name} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,13,30,0.8) 0%, transparent 50%)' }} />
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{name}</h3>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2563eb', marginBottom: 10 }}>{role}</p>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.7, marginBottom: 14 }}>{bio}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {tags.map(t => <span key={t} className="tag tag-blue" style={{ fontSize: 10 }}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ CORE VALUES ════ */}
      <div style={{ background: 'var(--bg-surface)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 14 }}><FiZap size={11} /> Our Values</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>What drives us every day</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {values.map(({ icon, color, bg, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.08)} className="card-dark" style={{ padding: '28px 24px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: bg, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ EXPERTISE ════ */}
      <div style={{ background: 'var(--bg-base)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 14 }}><FiZap size={11} /> What We're Good At</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Deep expertise across the full stack</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {expertise.map(({ icon, color, bg, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.1)} className="card-dark" style={{ padding: '28px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, flexShrink: 0, background: bg, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ ACHIEVEMENTS ════ */}
      <div style={{ background: 'var(--bg-surface)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 14 }}><FiAward size={11} /> Track Record</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Numbers that speak for themselves</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {achievements.map(({ icon, color, bg, num, label, desc }, i) => (
              <motion.div key={label} {...fadeUp(i * 0.1)} className="card-dark" style={{ padding: '32px 28px', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: bg, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, margin: '0 auto 20px' }}>{icon}</div>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, marginBottom: 4 }}>{num}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#2563eb', marginBottom: 12 }}>{label}</div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ INDUSTRIES ════ */}
      <div style={{ background: 'var(--bg-base)', padding: '80px 24px', borderBottom: '1px solid rgba(37,99,235,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 14 }}><FiGlobe size={11} /> Who We Serve</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 12 }}>Industries we power</h2>
            <p style={{ maxWidth: 500, margin: '0 auto', color: '#64748b', fontSize: '0.9rem', lineHeight: 1.8 }}>From education to enterprise — tailored solutions for every sector.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
            {industries.map(({ icon, name, desc }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.06)} className="card-dark" style={{ padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{name}</h3>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ CTA BAND ════ */}
      <div style={{ background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 100%)', padding: '72px 24px', borderTop: '1px solid rgba(59,130,246,0.12)', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: 20 }}><FiZap size={11} /> Work with us</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Let's build something great for Kenya
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.8, marginBottom: 32 }}>
            Whether you need a network overhaul, a custom system or long-term IT support — we scope it, build it and stand behind it.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-cta" style={{ height: 48, padding: '0 32px', fontSize: 15 }} onClick={() => navigate('/contactus')}>
              Get in Touch <FiArrowRight size={15} />
            </button>
            <button className="btn-outline" style={{ height: 48, padding: '0 24px', fontSize: 15, color: '#94a3b8', borderColor: 'rgba(255,255,255,0.12)' }}
              onClick={() => navigate('/services')}>
              View Services
            </button>
          </div>

          {/* trust checks */}
          <div style={{ display: 'flex', gap: '6px 20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: 28, fontSize: 13, color: '#64748b' }}>
            {['Free initial audit', 'No lock-in contracts', '24/7 support included'].map(l => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiCheck size={12} style={{ color: '#10b981' }} />
                <span style={{ color: '#94a3b8' }}>{l}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClipboard, FiCheckCircle, FiZap } from 'react-icons/fi';
import {
  StatsBar,
  TestimonialsSection,
  PortfolioSection,
  AboutUsSection,
  PricingSection,
  BlogSection,
  ContactSection,
  BookingSection,
  HomeServicesSection,
} from './HomeSections';

/* ── Particle network canvas ── */
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const pts: { x: number; y: number; vx: number; vy: number }[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p, i) => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59,130,246,0.5)';
        ctx.fill();

        pts.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.18 * (1 - d / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6, pointerEvents: 'none' }}
    />
  );
};

/* ── Typewriter for rotating services ── */
const SERVICES = ['Network Infrastructure', 'Custom Software', 'Cloud Solutions', 'AI Automation', 'Mobile Apps', 'VPN Security'];

const Typewriter = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const target = SERVICES[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!erasing && text.length < target.length) {
      timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), 65);
    } else if (!erasing && text.length === target.length) {
      timeout = setTimeout(() => setErasing(true), 2200);
    } else if (erasing && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 32);
    } else if (erasing && text.length === 0) {
      setErasing(false);
      setIdx((i) => (i + 1) % SERVICES.length);
    }

    return () => clearTimeout(timeout);
  }, [text, erasing, idx]);

  return (
    <span style={{ color: '#60a5fa' }}>
      {text}
      <span style={{ display: 'inline-block', width: 2, height: '1em', background: '#3b82f6', marginLeft: 3, verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite' }} />
    </span>
  );
};

/* ── Terminal window ── */
const termLines = [
  { delay: 0,    type: 'comment',  text: '# Blackie Networks — Production NOC' },
  { delay: 400,  type: 'prompt',   text: '$ ssh ops@campus-network.ke' },
  { delay: 900,  type: 'success',  text: '✓  Connected to Blackie Networks NOC' },
  { delay: 1400, type: 'prompt',   text: '$ netstat --active-endpoints' },
  { delay: 1900, type: 'output',   text: '   1,247 endpoints online • 0 down' },
  { delay: 2400, type: 'prompt',   text: '$ blackie deploy --env production' },
  { delay: 2900, type: 'success',  text: '✓  Deployment complete (2.3 s)' },
  { delay: 3400, type: 'prompt',   text: '$ uptime --all-services' },
  { delay: 3900, type: 'success',  text: '●  99.9 % uptime — All systems operational' },
  { delay: 4400, type: 'prompt',   text: '$ _' },
];

const TerminalWindow = () => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = termLines.map((l, i) =>
      setTimeout(() => setVisible(i + 1), l.delay + 600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const color = (type: string) => {
    if (type === 'comment') return '#475569';
    if (type === 'prompt')  return '#e2e8f0';
    if (type === 'success') return '#34d399';
    return '#94a3b8';
  };

  return (
    <div
      style={{
        background: '#060d1e',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.08)',
        width: '100%',
      }}
    >
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(59,130,246,0.12)',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ marginLeft: 8, fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
          blackie-noc ~ zsh
        </span>
      </div>
      {/* Terminal body */}
      <div style={{ padding: '20px 20px 24px', fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 13, lineHeight: 1.9, minHeight: 280 }}>
        {termLines.slice(0, visible).map((l, i) => (
          <div key={i} style={{ color: color(l.type), opacity: 0.95 }}>
            {l.type === 'comment' ? (
              <span style={{ color: '#475569' }}>{l.text}</span>
            ) : (
              l.text
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Tech stack badges ── */
const STACK = ['MikroTik', 'AWS', 'Docker', 'React', 'Node.js', 'Python', 'VPN', 'PostgreSQL'];

/* ── Hero ── */
export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    el ? el.scrollIntoView({ behavior: 'smooth' }) : (window.location.href = '/Products');
  };

  return (
    <>
    {/* ── Dark hero band ── */}
    <div style={{ position: 'relative', marginTop: 64, background: 'linear-gradient(160deg, #060d1e 0%, #0a1628 55%, #0f1e38 100%)' }}>

      {/* Gradient accent top-border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 5,
        background: 'linear-gradient(90deg, transparent 0%, #2563eb 30%, #3b82f6 50%, #2563eb 70%, transparent 100%)',
      }} />

      {/* Particles — clipped to this band */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <ParticleNetwork />
      </div>

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 10, padding: isMobile ? '44px 16px 36px' : '76px 24px 68px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 36 : 60, alignItems: 'center' }}>

            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="section-eyebrow"
                style={{ marginBottom: 24 }}
              >
                <FiZap size={11} />
                Enterprise IT Solutions · Kenya
              </motion.div>

              {/* Headline */}
              <h1 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 12,
                color: '#f1f5f9',
                letterSpacing: '-0.03em',
              }}>
                Building Kenya's{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Digital Infrastructure
                </span>
              </h1>

              {/* Typewriter subtitle */}
              <div style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 500, marginBottom: 20, minHeight: 36 }}>
                <Typewriter />
              </div>

              <p style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: '#94a3b8', marginBottom: 36, lineHeight: 1.8, maxWidth: 500 }}>
                From network infrastructure to custom software — we design, build, and support the technology backbone your business needs to scale.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ width: isMobile ? '100%' : 'auto' }}>
                  <Link to="/contactus" className="btn-cta" style={{ height: 48, padding: '0 28px', fontSize: 15, gap: 8, width: isMobile ? '100%' : 'auto' }}>
                    <FiClipboard size={16} />
                    Get a Free IT Audit
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ width: isMobile ? '100%' : 'auto' }}>
                  <button
                    onClick={scrollToPortfolio}
                    className="btn-outline"
                    style={{ height: 48, padding: '0 24px', fontSize: 15, gap: 8, width: isMobile ? '100%' : 'auto' }}
                  >
                    See Our Work
                    <FiArrowRight size={15} />
                  </button>
                </motion.div>
              </div>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', fontSize: 13, color: '#64748b' }}
              >
                {[
                  { label: '200+ Projects', },
                  { label: '10+ Years',     },
                  { label: '24/7 Support',  },
                ].map(({ label }) => (
                  <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiCheckCircle size={13} style={{ color: '#10b981' }} />
                    <strong style={{ color: '#e2e8f0' }}>{label}</strong>
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — terminal */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ width: '100%' }}
            >
              <TerminalWindow />

              {/* Tech stack badges */}
              <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {STACK.map((tech) => (
                  <span
                    key={tech}
                    className="tag tag-blue"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </div>

    {/* ── Light sections ── */}
    <StatsBar />
    <HomeServicesSection />
    <TestimonialsSection />
    <PortfolioSection />
    <AboutUsSection />
    <PricingSection />
    <BlogSection />
    <ContactSection />
    <BookingSection />
    </>
  );
};

export const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { type: 'spring', stiffness: 100, damping: 14 } },
};

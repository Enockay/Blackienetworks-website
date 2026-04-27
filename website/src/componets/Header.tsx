import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer } from 'antd';
import {
  FiPhone, FiMenu, FiX, FiHome, FiInfo, FiSettings,
  FiPackage, FiBook, FiMessageCircle, FiMessageSquare,
} from 'react-icons/fi';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/',          label: 'Home' },
    { path: '/services',  label: 'Services' },
    { path: '/Products',  label: 'Products' },
    { path: '/aboutus',   label: 'About' },
    { path: '/blog',      label: 'Blog' },
    { path: '/contactus', label: 'Contact' },
  ];

  const drawerLinks = [
    { path: '/',          label: 'Home',     Icon: FiHome },
    { path: '/services',  label: 'Services', Icon: FiSettings },
    { path: '/Products',  label: 'Products', Icon: FiPackage },
    { path: '/aboutus',   label: 'About Us', Icon: FiInfo },
    { path: '/blog',      label: 'Blog',     Icon: FiBook },
    { path: '/contactus', label: 'Contact',  Icon: FiMessageCircle },
  ];

  return (
    <header
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        background: scrolled ? 'rgba(4,9,20,0.98)' : '#060d1e',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: '1px solid rgba(59,130,246,0.12)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.7)' : 'none',
        transition: 'all 0.35s ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 9, overflow: 'hidden',
              border: '1px solid rgba(59,130,246,0.25)',
              background: 'rgba(59,130,246,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img src={logo} alt="Blackie Networks" style={{ width: 28, height: 28, objectFit: 'contain' }} loading="eager" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.1, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                Blackie<span style={{ color: '#3b82f6' }}>Networks</span>
              </div>
              <div style={{ fontSize: 9, color: '#475569', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em', lineHeight: 1 }}>
                IT SOLUTIONS · KENYA
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav (lg+) ── */}
          <nav
            className="hidden lg:flex"
            style={{ alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }}
          >
            {navLinks.map(({ path, label }) => {
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    padding: '7px 13px', borderRadius: 7,
                    fontSize: 14, fontWeight: 500, textDecoration: 'none',
                    color: active ? '#60a5fa' : '#94a3b8',
                    background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                    border: `1px solid ${active ? 'rgba(59,130,246,0.2)' : 'transparent'}`,
                    transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#e2e8f0';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

            {/* WhatsApp — hidden on mobile, visible md+ */}
            <div className="hidden md:block">
              <a
                href="https://wa.me/254796869402"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 8, color: '#22c55e',
                  transition: 'all 0.2s ease', textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34,197,94,0.18)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(34,197,94,0.1)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <FiMessageSquare size={15} />
              </a>
            </div>

            {/* Phone — hidden below xl */}
            <div className="hidden xl:block">
              <a
                href="tel:+254796869402"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 11px', borderRadius: 7,
                  background: 'rgba(59,130,246,0.07)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  color: '#94a3b8', fontSize: 13, textDecoration: 'none',
                  transition: 'color 0.2s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
              >
                <FiPhone size={12} style={{ color: '#3b82f6' }} />
                +254 796 869 402
              </a>
            </div>

            {/* CTA — hidden on mobile */}
            <div className="hidden md:block">
              <Link
                to="/contactus"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--orange)',
                  color: '#fff', fontWeight: 700, fontSize: 13,
                  padding: '0 16px', height: 36, borderRadius: 8,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(249,115,22,0.25)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ea580c';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(249,115,22,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--orange)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(249,115,22,0.25)';
                }}
              >
                Free Consultation
              </Link>
            </div>

            {/* Hamburger — visible below lg */}
            <div className="lg:hidden">
              <button
                onClick={() => setDrawerVisible(true)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8, width: 38, height: 38,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#94a3b8', cursor: 'pointer',
                }}
              >
                <FiMenu size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <Drawer
        placement="right"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={280}
        closable={false}
        styles={{
          body: { background: '#0a1628', padding: 0 },
          mask: { background: 'rgba(0,0,0,0.75)' },
        }}
      >
        <div style={{ padding: '18px' }}>
          {/* Top row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingBottom: 14, marginBottom: 18,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={logo} alt="Logo" style={{ height: 28 }} />
              <div>
                <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13 }}>Blackie Networks</div>
                <div style={{ color: '#475569', fontSize: 9, fontFamily: 'monospace' }}>IT SOLUTIONS · KENYA</div>
              </div>
            </div>
            <button
              onClick={() => setDrawerVisible(false)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6, width: 30, height: 30,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748b', cursor: 'pointer',
              }}
            >
              <FiX size={14} />
            </button>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 18 }}>
            {drawerLinks.map(({ path, label, Icon }) => {
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setDrawerVisible(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 8,
                    textDecoration: 'none',
                    color: active ? '#60a5fa' : '#94a3b8',
                    background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
                    fontWeight: 500, fontSize: 14,
                  }}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />

          {/* Contact quick links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a
              href="tel:+254796869402"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 12px', borderRadius: 8,
                background: 'rgba(59,130,246,0.06)',
                border: '1px solid rgba(59,130,246,0.12)',
                textDecoration: 'none', color: '#94a3b8', fontSize: 13,
              }}
            >
              <FiPhone size={13} style={{ color: '#3b82f6' }} />
              +254 796 869 402
            </a>
            <a
              href="https://wa.me/254796869402"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 12px', borderRadius: 8,
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                textDecoration: 'none', color: '#22c55e', fontSize: 13, fontWeight: 500,
              }}
            >
              <FiMessageSquare size={13} />
              WhatsApp Chat
            </a>
            <Link
              to="/contactus"
              onClick={() => setDrawerVisible(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '11px', borderRadius: 8, marginTop: 4,
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                textDecoration: 'none', color: '#fff', fontSize: 14, fontWeight: 700,
              }}
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Button, Divider } from 'antd';
import { FiPhone, FiMenu, FiMail, FiX, FiHome, FiInfo, FiSettings, FiPackage, FiBook, FiHelpCircle, FiMessageCircle, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: '#ffffff',
        borderBottom: scrolled 
          ? '1px solid rgba(0, 0, 0, 0.1)' 
          : '1px solid transparent',
        boxShadow: scrolled 
          ? '0 2px 10px rgba(0, 0, 0, 0.1)' 
          : 'none',
      }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="relative p-2.5 rounded-xl transition-all duration-500 group-hover:scale-105"
              style={{
                background: 'transparent',
              }}
            >
              <img
                src={logo}
                alt="Blackie Networks Logo"
                className="h-10 w-auto sm:h-12 transition-all duration-500"
                width="48"
                height="48"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-xl sm:text-2xl font-extrabold tracking-tight"
                style={{
                  color: '#1e293b',
                }}
              >
                Blackie<span style={{ color: '#2563eb' }}>Networks</span>
              </span>
              <span className="text-xs font-medium hidden sm:block tracking-wide" style={{ color: '#64748b' }}>
                IT Solutions · Kenya
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/services', label: 'Services' },
              { path: '/aboutus', label: 'About Us' },
              { path: '/Products', label: 'Portfolio' },
              { path: '/blog', label: 'Blog' },
              { path: '/contactus', label: 'Contact' },
            ].map((item) => (
            <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300"
                style={{
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#2563eb' : '#475569',
                  background: isActive(item.path) 
                    ? 'rgba(37, 99, 235, 0.08)'
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = '#2563eb';
                    e.currentTarget.style.background = 'rgba(37, 99, 235, 0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Contact Info - Phone & Email */}
            <div className="hidden md:flex flex-col items-end gap-1">
              {/* Phone Number */}
              <a
                href="tel:+254796869402"
                className="flex items-center gap-2 px-2 py-1 rounded-lg font-medium transition-all duration-300"
                style={{
                  textDecoration: 'none',
                  color: '#475569',
                  fontSize: '13px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#475569';
                }}
              >
                <FiPhone size={16} />
                <span>+254 796 869 402</span>
              </a>
              {/* Email */}
              <a
                href="mailto:support@blackie-networks.com"
                className="flex items-center gap-2 px-2 py-1 rounded-lg font-medium transition-all duration-300"
                style={{
                  textDecoration: 'none',
                  color: '#475569',
                  fontSize: '13px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#475569';
                }}
              >
                <FiMail size={16} />
                <span>support@blackie-networks.com</span>
              </a>
            </div>

            {/* WhatsApp Icon */}
            <a
              href="https://wa.me/254796869402"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
              style={{
                background: '#25D366',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#20BA5A';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#25D366';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FiMessageSquare size={20} />
            </a>

            {/* CTA Button */}
            <Link to="/booking" className="hidden md:block">
              <Button
                style={{
                  background: '#f97316',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 700,
                  height: '44px',
                  padding: '0 24px',
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ea580c';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(249, 115, 22, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f97316';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get Free Consultation
              </Button>
            </Link>

            <Button
              type="text"
              icon={<FiMenu size={24} />}
              onClick={() => setDrawerVisible(true)}
              className="lg:hidden flex items-center justify-center"
              style={{
                background: 'transparent',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                height: '44px',
                width: '44px',
                color: '#1e293b',
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={320}
        closable={false}
        bodyStyle={{
          background: '#ffffff',
          padding: 0,
        }}
        headerStyle={{
          background: '#ffffff',
          border: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          padding: '20px',
        }}
        title={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Blackie Networks Logo"
                className="h-10 w-auto rounded-lg"
                width="40"
                height="40"
                loading="eager"
              />
              <div>
                <span className="text-lg font-bold block" style={{ color: '#1e293b' }}>Blackie Networks</span>
                <span className="text-xs" style={{ color: '#64748b' }}>IT Solutions · Kenya</span>
              </div>
            </div>
            <Button
              type="text"
              icon={<FiX size={20} />}
              onClick={() => setDrawerVisible(false)}
              style={{ color: '#1e293b', border: 'none' }}
            />
          </div>
        }
      >
        <div style={{ padding: '24px' }}>
          <nav className="flex flex-col space-y-2">
            {[
              { path: '/', label: 'Home', icon: FiHome },
              { path: '/services', label: 'Services', icon: FiSettings },
              { path: '/aboutus', label: 'About Us', icon: FiInfo },
              { path: '/Products', label: 'Portfolio', icon: FiPackage },
              { path: '/blog', label: 'Blog', icon: FiBook },
              { path: '/contactus', label: 'Contact', icon: FiMessageCircle },
            ].map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setDrawerVisible(false)}
                className="px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3"
                style={{ 
                  textDecoration: 'none',
                  color: isActive(path) ? '#2563eb' : '#475569',
                  background: isActive(path)
                    ? 'rgba(37, 99, 235, 0.08)'
                    : 'transparent',
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 0, 0, 0.1)' }} />

          <div className="space-y-2">
            <p className="px-2 text-[10px] uppercase font-semibold tracking-wider" style={{ color: '#64748b' }}>
              Contact
            </p>
            <a
              href="tel:+254796869402"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
              style={{ 
                textDecoration: 'none',
                background: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                color: '#475569',
              }}
            >
              <div className="p-1.5 rounded-lg" style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#2563eb' }}>
                <FiPhone size={14} />
              </div>
              <div>
                <p className="text-[10px] font-medium" style={{ color: '#64748b' }}>Phone</p>
                <p className="text-xs font-semibold">+254 796 869 402</p>
              </div>
            </a>
            <a
              href="https://wa.me/254796869402"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
              style={{ 
                textDecoration: 'none',
                background: 'rgba(37, 211, 102, 0.1)',
                border: '1px solid rgba(37, 211, 102, 0.2)',
                color: '#475569',
              }}
            >
              <div className="p-1.5 rounded-lg" style={{ background: '#25D366', color: '#ffffff' }}>
                <FiMessageSquare size={14} />
              </div>
              <div>
                <p className="text-[10px] font-medium" style={{ color: '#64748b' }}>WhatsApp</p>
                <p className="text-xs font-semibold">Chat with us</p>
              </div>
            </a>
            <Link
              to="/booking"
              onClick={() => setDrawerVisible(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all mt-4"
              style={{ 
                textDecoration: 'none',
                background: '#f97316',
                color: '#ffffff',
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

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Button, Divider, Dropdown, Menu } from 'antd';
import { FiPhone, FiMenu, FiChevronDown, FiMail, FiX, FiZap, FiHome, FiInfo, FiSettings, FiPackage, FiBook, FiHelpCircle, FiMessageCircle, FiCalendar } from 'react-icons/fi';
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

  const productMenu = (
    <Menu
      className="glass"
      style={{
        borderRadius: '12px',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        padding: '8px 0',
        background: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Menu.Item key="services" style={{ color: '#e2e8f0' }}>
        <Link to="/services" style={{ fontWeight: 600, color: '#e2e8f0' }}>Our Services</Link>
      </Menu.Item>
      <Menu.Item key="products" style={{ color: '#e2e8f0' }}>
        <Link to="/Products" style={{ fontWeight: 600, color: '#e2e8f0' }}>Products</Link>
      </Menu.Item>
      <Menu.Item key="booking" style={{ color: '#e2e8f0' }}>
        <Link to="/booking" style={{ fontWeight: 600, color: '#e2e8f0' }}>Book a Service</Link>
      </Menu.Item>
    </Menu>
  );

  const aboutMenu = (
    <Menu
      className="glass"
      style={{
        borderRadius: '12px',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        padding: '8px 0',
        background: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Menu.Item key="about" style={{ color: '#e2e8f0' }}>
        <Link to="/aboutus" style={{ fontWeight: 600, color: '#e2e8f0' }}>About Us</Link>
      </Menu.Item>
      <Menu.Item key="team" style={{ color: '#e2e8f0' }}>
        <Link to="/aboutus#team" style={{ fontWeight: 600, color: '#e2e8f0' }}>Our Team</Link>
      </Menu.Item>
      <Menu.Item key="contact" style={{ color: '#e2e8f0' }}>
        <Link to="/contactus" style={{ fontWeight: 600, color: '#e2e8f0' }}>Contact Us</Link>
      </Menu.Item>
    </Menu>
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-2xl' : 'bg-transparent'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled 
          ? '1px solid rgba(0, 240, 255, 0.3)' 
          : '1px solid transparent',
        boxShadow: scrolled 
          ? '0 10px 40px rgba(0, 240, 255, 0.1)' 
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
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)',
                boxShadow: '0 4px 20px rgba(0, 240, 255, 0.2)',
              }}
            >
              <img
                src={logo}
                alt="Blackie Networks Logo"
                className="h-10 w-auto sm:h-12 transition-all duration-500"
                width="48"
                height="48"
                loading="eager"
                style={{ 
                  filter: 'drop-shadow(0 4px 8px rgba(0, 240, 255, 0.5))',
                }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-xl sm:text-2xl font-extrabold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite',
                }}
              >
                Blackie<span style={{ 
                  background: 'linear-gradient(135deg, #00ff88 0%, #00f0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Networks</span>
              </span>
              <span className="text-xs font-semibold hidden sm:block tracking-wide" style={{ color: '#00f0ff' }}>
                IT Solutions & Infrastructure
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {[
              { path: '/', label: 'Home' },
              { path: '/blog', label: 'Blog' },
              { path: '/faq', label: 'FAQ' },
              { path: '/contactus', label: 'Contact' },
            ].map((item) => (
            <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isActive(item.path) ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
                }`}
                style={{
                  textDecoration: 'none',
                  background: isActive(item.path) 
                    ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(0, 102, 255, 0.2) 100%)'
                    : 'transparent',
                  border: isActive(item.path) ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}

            <Dropdown overlay={aboutMenu} placement="bottom" trigger={['hover']}>
              <div
                className="cursor-pointer flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 text-gray-300 hover:text-cyan-400"
                style={{
                  border: location.pathname.includes('/about') 
                    ? '1px solid rgba(0, 240, 255, 0.4)' 
                    : '1px solid transparent',
                  background: location.pathname.includes('/about')
                    ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(0, 102, 255, 0.2) 100%)'
                    : 'transparent',
                }}
              >
                About <FiChevronDown size={14} />
              </div>
            </Dropdown>

            <Dropdown overlay={productMenu} placement="bottom" trigger={['hover']}>
              <div
                className="cursor-pointer flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 text-gray-300 hover:text-cyan-400"
                style={{
                  border: (location.pathname.includes('/services') || location.pathname.includes('/Products'))
                    ? '1px solid rgba(0, 240, 255, 0.4)' 
                    : '1px solid transparent',
                  background: (location.pathname.includes('/services') || location.pathname.includes('/Products'))
                    ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(0, 102, 255, 0.2) 100%)'
                    : 'transparent',
                }}
              >
                Services <FiChevronDown size={14} />
              </div>
            </Dropdown>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <Link to="/booking" className="hidden md:block">
              <Button
                className="tech-button"
                style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                  border: 'none',
                  color: '#0a0e27',
                  fontWeight: 700,
                  height: '44px',
                  padding: '0 28px',
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                }}
              >
                <FiZap style={{ marginRight: 8 }} /> Get Started
              </Button>
            </Link>

            <a
              href="tel:+254796869402"
              className="hidden xl:flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300"
              style={{
                textDecoration: 'none',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                color: '#00f0ff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FiPhone className="text-lg" />
              <span className="text-sm font-bold">+254 796 869 402</span>
            </a>

            <Button
              type="text"
              icon={<FiMenu size={24} />}
              onClick={() => setDrawerVisible(true)}
              className="lg:hidden flex items-center justify-center"
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '12px',
                height: '44px',
                width: '44px',
                color: '#00f0ff',
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
          background: 'linear-gradient(135deg, #0a0e27 0%, #050810 100%)',
          padding: 0,
        }}
        headerStyle={{
          background: 'linear-gradient(135deg, #0a1a3a 0%, #051428 100%)',
          border: 'none',
          borderBottom: '2px solid rgba(0, 102, 255, 0.5)',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)',
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
                <span className="text-lg font-bold block" style={{ color: '#0066ff', textShadow: '0 2px 8px rgba(0, 102, 255, 0.5)' }}>Blackie Networks</span>
                <span className="text-xs" style={{ color: '#4a90e2' }}>IT Solutions</span>
              </div>
            </div>
            <Button
              type="text"
              icon={<FiX size={20} />}
              onClick={() => setDrawerVisible(false)}
              style={{ color: '#0066ff', border: 'none' }}
            />
          </div>
        }
      >
        <div style={{ padding: '24px' }}>
          <nav className="flex flex-col space-y-2">
            {[
              { path: '/', label: 'Home', icon: FiHome },
              { path: '/aboutus', label: 'About Us', icon: FiInfo },
              { path: '/services', label: 'Services', icon: FiSettings },
              { path: '/Products', label: 'Products', icon: FiPackage },
              { path: '/blog', label: 'Blog', icon: FiBook },
              { path: '/faq', label: 'FAQ', icon: FiHelpCircle },
              { path: '/contactus', label: 'Contact', icon: FiMessageCircle },
              { path: '/booking', label: 'Booking', icon: FiCalendar },
            ].map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setDrawerVisible(false)}
                className="px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-3"
                style={{ 
                  textDecoration: 'none',
                  color: isActive(path) ? '#00f0ff' : '#e2e8f0',
                  background: isActive(path)
                    ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(0, 102, 255, 0.2) 100%)'
                    : 'transparent',
                  border: isActive(path) ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid transparent',
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 102, 255, 0.2)' }} />

          <div className="space-y-2">
            <p className="px-2 text-[10px] uppercase font-semibold tracking-wider" style={{ color: '#4a90e2' }}>
              Support
            </p>
            <a
              href="tel:+254796869402"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
              style={{ 
                textDecoration: 'none',
                background: 'rgba(0, 102, 255, 0.08)',
                border: '1px solid rgba(0, 102, 255, 0.2)',
                color: '#cbd5e1',
              }}
            >
              <div className="p-1.5 rounded-lg" style={{ background: 'rgba(0, 102, 255, 0.15)', color: '#0066ff' }}>
                <FiPhone size={14} />
              </div>
              <div>
                <p className="text-[10px] font-medium" style={{ color: '#4a90e2' }}>Phone</p>
                <p className="text-xs font-semibold">+254 796 869 402</p>
              </div>
            </a>
            <a
              href="mailto:support@blackie-networks.com"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
              style={{ 
                textDecoration: 'none',
                background: 'rgba(0, 102, 255, 0.08)',
                border: '1px solid rgba(0, 102, 255, 0.2)',
                color: '#cbd5e1',
              }}
            >
              <div className="p-1.5 rounded-lg" style={{ background: 'rgba(0, 102, 255, 0.15)', color: '#0066ff' }}>
                <FiMail size={14} />
              </div>
              <div>
                <p className="text-[10px] font-medium" style={{ color: '#4a90e2' }}>Email</p>
                <p className="text-xs font-semibold">support@blackie-networks.com</p>
              </div>
            </a>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;

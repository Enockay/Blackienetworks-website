import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, Button, Divider, Dropdown, Menu } from 'antd';
import { FiPhone, FiMenu, FiChevronDown, FiMail, FiX } from 'react-icons/fi';
import logo from '../assets/logo.png';

// Add CSS for menu item hover effects
if (typeof document !== 'undefined') {
  const styleId = 'header-menu-styles';
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    styleSheet.innerHTML = `
      .ant-menu-item.menu-item-hover:hover {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
        color: white !important;
      }
      .ant-menu-item.menu-item-hover:hover a {
        color: white !important;
      }
    `;
    document.head.appendChild(styleSheet);
  }
}

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
      style={{
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '8px 0',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Menu.Item 
        key="services"
        className="menu-item-hover"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <Link to="/services" style={{ fontWeight: 600 }}>Our Services</Link>
      </Menu.Item>
      <Menu.Item 
        key="products"
        className="menu-item-hover"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <Link to="/Products" style={{ fontWeight: 600 }}>Products</Link>
      </Menu.Item>
      <Menu.Item 
        key="booking"
        className="menu-item-hover"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <Link to="/booking" style={{ fontWeight: 600 }}>Book a Service</Link>
      </Menu.Item>
    </Menu>
  );

  const aboutMenu = (
    <Menu
      style={{
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '8px 0',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Menu.Item 
        key="about"
        className="menu-item-hover"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <Link to="/aboutus" style={{ fontWeight: 600 }}>About Us</Link>
      </Menu.Item>
      <Menu.Item 
        key="team"
        className="menu-item-hover"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <Link to="/aboutus#team" style={{ fontWeight: 600 }}>Our Team</Link>
      </Menu.Item>
      <Menu.Item 
        key="contact"
        className="menu-item-hover"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <Link to="/contactus" style={{ fontWeight: 600 }}>Contact Us</Link>
      </Menu.Item>
    </Menu>
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/98 shadow-2xl'
          : 'bg-gradient-to-r from-white/90 via-indigo-50/30 to-white/90 backdrop-blur-xl'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled 
          ? '1px solid rgba(99, 102, 241, 0.2)' 
          : '1px solid rgba(99, 102, 241, 0.1)',
        boxShadow: scrolled 
          ? '0 10px 40px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.05)' 
          : '0 4px 20px rgba(99, 102, 241, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.4), 0 0 0 4px rgba(99, 102, 241, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={logo}
                alt="Blackie Networks Logo - IT Solutions and Network Infrastructure"
                className="h-10 w-auto sm:h-12 transition-all duration-500"
                style={{ 
                  filter: 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))',
                }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite',
                }}
              >
                Blackie<span style={{ 
                  background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Networks</span>
              </span>
              <span className="text-xs text-indigo-600 font-semibold hidden sm:block tracking-wide">
                IT Solutions & Infrastructure
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden ${
                isActive('/')
                  ? 'text-white'
                  : 'text-gray-700 hover:text-white'
              }`}
              style={{ 
                textDecoration: 'none',
                background: isActive('/') 
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'transparent',
                boxShadow: isActive('/') 
                  ? '0 4px 20px rgba(99, 102, 241, 0.4)' 
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive('/')) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              Home
            </Link>

            <Dropdown
              overlay={aboutMenu}
              placement="bottom"
              trigger={['hover']}
              overlayStyle={{ marginTop: '12px' }}
            >
              <div
                className={`cursor-pointer flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  location.pathname.includes('/about')
                    ? 'text-white'
                    : 'text-gray-700 hover:text-white'
                }`}
                style={{
                  background: location.pathname.includes('/about')
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'transparent',
                  boxShadow: location.pathname.includes('/about')
                    ? '0 4px 20px rgba(99, 102, 241, 0.4)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!location.pathname.includes('/about')) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!location.pathname.includes('/about')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                About <FiChevronDown size={14} style={{ transition: 'transform 0.3s' }} className="group-hover:rotate-180" />
              </div>
            </Dropdown>

            <Dropdown
              overlay={productMenu}
              placement="bottom"
              trigger={['hover']}
              overlayStyle={{ marginTop: '12px' }}
            >
              <div
                className={`cursor-pointer flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  location.pathname.includes('/services') || location.pathname.includes('/Products')
                    ? 'text-white'
                    : 'text-gray-700 hover:text-white'
                }`}
                style={{
                  background: location.pathname.includes('/services') || location.pathname.includes('/Products')
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'transparent',
                  boxShadow: location.pathname.includes('/services') || location.pathname.includes('/Products')
                    ? '0 4px 20px rgba(99, 102, 241, 0.4)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!location.pathname.includes('/services') && !location.pathname.includes('/Products')) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!location.pathname.includes('/services') && !location.pathname.includes('/Products')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                Services <FiChevronDown size={14} style={{ transition: 'transform 0.3s' }} />
              </div>
            </Dropdown>

            <Link
              to="/blog"
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isActive('/blog')
                  ? 'text-white'
                  : 'text-gray-700 hover:text-white'
              }`}
              style={{ 
                textDecoration: 'none',
                background: isActive('/blog')
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'transparent',
                boxShadow: isActive('/blog')
                  ? '0 4px 20px rgba(99, 102, 241, 0.4)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive('/blog')) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/blog')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              Blog
            </Link>
            <Link
              to="/faq"
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isActive('/faq')
                  ? 'text-white'
                  : 'text-gray-700 hover:text-white'
              }`}
              style={{ 
                textDecoration: 'none',
                background: isActive('/faq')
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'transparent',
                boxShadow: isActive('/faq')
                  ? '0 4px 20px rgba(99, 102, 241, 0.4)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive('/faq')) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/faq')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              FAQ
            </Link>
            <Link
              to="/contactus"
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isActive('/contactus')
                  ? 'text-white'
                  : 'text-gray-700 hover:text-white'
              }`}
              style={{ 
                textDecoration: 'none',
                background: isActive('/contactus')
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'transparent',
                boxShadow: isActive('/contactus')
                  ? '0 4px 20px rgba(99, 102, 241, 0.4)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive('/contactus')) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/contactus')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              Contact
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">

            {/* CTA Button */}
            <Link to="/booking" className="hidden md:block">
              <Button
                type="primary"
                className="flex items-center relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                  backgroundSize: '200% 200%',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0.5)',
                  height: '44px',
                  padding: '0 28px',
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.5), 0 0 0 4px rgba(99, 102, 241, 0.2)';
                  e.currentTarget.style.backgroundPosition = '100% 0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0.5)';
                  e.currentTarget.style.backgroundPosition = '0% 0%';
                }}
              >
                <span className="relative z-10">Get Started</span>
              </Button>
            </Link>

            {/* Contact Phone - Desktop */}
            <a
              href="tel:+254796869402"
              className="hidden xl:flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 relative group"
              style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                color: '#6366f1',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
                e.currentTarget.style.color = '#6366f1';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FiPhone className="text-lg" />
              <span className="text-sm font-bold">+254 796 869 402</span>
            </a>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<FiMenu size={24} />}
              onClick={() => setDrawerVisible(true)}
              className="lg:hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '12px',
                height: '44px',
                width: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6366f1',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
                e.currentTarget.style.color = '#6366f1';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'scale(1)';
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
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
          backgroundSize: '200% 200%',
          border: 'none',
          padding: '20px',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
        }}
        title={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Blackie Networks Logo"
                className="h-10 w-auto rounded-lg"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
              />
              <div>
                <span className="text-lg font-bold text-white block">Blackie Networks</span>
                <span className="text-xs text-blue-100">IT Solutions</span>
              </div>
            </div>
            <Button
              type="text"
              icon={<FiX size={20} />}
              onClick={() => setDrawerVisible(false)}
              style={{ color: 'white', border: 'none' }}
            />
          </div>
        }
      >
        <div style={{ padding: '24px' }}>
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setDrawerVisible(false)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive('/')
                  ? 'text-white'
                  : 'text-gray-700 hover:text-white'
              }`}
              style={{ 
                textDecoration: 'none', 
                display: 'block',
                background: isActive('/')
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'transparent',
                boxShadow: isActive('/')
                  ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive('/')) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              Home
            </Link>

            <div className="mt-2">
              <p className="px-4 py-2 text-xs uppercase font-bold text-gray-400 tracking-wider">
                About
              </p>
              <Link
                to="/aboutus"
                onClick={() => setDrawerVisible(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all block ${
                  isActive('/aboutus')
                    ? 'text-white'
                    : 'text-gray-700 hover:text-white'
                }`}
                style={{ 
                  textDecoration: 'none',
                  background: isActive('/aboutus')
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'transparent',
                  boxShadow: isActive('/aboutus')
                    ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/aboutus')) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/aboutus')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                About Us
              </Link>
              <Link
                to="/contactus"
                onClick={() => setDrawerVisible(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all block ${
                  isActive('/contactus')
                    ? 'text-white'
                    : 'text-gray-700 hover:text-white'
                }`}
                style={{ 
                  textDecoration: 'none',
                  background: isActive('/contactus')
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'transparent',
                  boxShadow: isActive('/contactus')
                    ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/contactus')) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/contactus')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-2">
              <p className="px-4 py-2 text-xs uppercase font-bold text-gray-400 tracking-wider">
                Services
              </p>
              <Link
                to="/services"
                onClick={() => setDrawerVisible(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all block ${
                  isActive('/services')
                    ? 'text-white'
                    : 'text-gray-700 hover:text-white'
                }`}
                style={{ 
                  textDecoration: 'none',
                  background: isActive('/services')
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'transparent',
                  boxShadow: isActive('/services')
                    ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/services')) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/services')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Our Services
              </Link>
              <Link
                to="/Products"
                onClick={() => setDrawerVisible(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all block ${
                  isActive('/Products')
                    ? 'text-white'
                    : 'text-gray-700 hover:text-white'
                }`}
                style={{ 
                  textDecoration: 'none',
                  background: isActive('/Products')
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'transparent',
                  boxShadow: isActive('/Products')
                    ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/Products')) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/Products')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Products
              </Link>
              <Link
                to="/booking"
                onClick={() => setDrawerVisible(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all block ${
                  isActive('/booking')
                    ? 'text-white'
                    : 'text-gray-700 hover:text-white'
                }`}
                style={{ 
                  textDecoration: 'none',
                  background: isActive('/booking')
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'transparent',
                  boxShadow: isActive('/booking')
                    ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/booking')) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/booking')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Book a Service
              </Link>
            </div>

            <Link
              to="/blog"
              onClick={() => setDrawerVisible(false)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all block ${
                isActive('/blog')
                  ? 'text-white'
                  : 'text-gray-700 hover:text-white'
              }`}
              style={{ 
                textDecoration: 'none',
                background: isActive('/blog')
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'transparent',
                boxShadow: isActive('/blog')
                  ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive('/blog')) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/blog')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              Blog
            </Link>
            <Link
              to="/faq"
              onClick={() => setDrawerVisible(false)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all block ${
                isActive('/faq')
                  ? 'text-white'
                  : 'text-gray-700 hover:text-white'
              }`}
              style={{ 
                textDecoration: 'none',
                background: isActive('/faq')
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'transparent',
                boxShadow: isActive('/faq')
                  ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive('/faq')) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/faq')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              FAQ
            </Link>
          </nav>

          <Divider style={{ margin: '24px 0', borderColor: '#e5e7eb' }} />

          {/* CTA Section */}
          <div className="flex flex-col space-y-3">
            <Link to="/booking" onClick={() => setDrawerVisible(false)}>
              <Button
                type="primary"
                block
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                  backgroundSize: '200% 200%',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 700,
                  height: '48px',
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',
                  fontSize: '15px',
                  letterSpacing: '0.5px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.5)';
                  e.currentTarget.style.backgroundPosition = '100% 0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.backgroundPosition = '0% 0%';
                }}
              >
                Get Started
              </Button>
            </Link>
          </div>

          <Divider style={{ margin: '24px 0', borderColor: '#e5e7eb' }} />

          {/* Contact Section */}
          <div className="space-y-4">
            <p className="px-4 text-xs uppercase font-bold text-gray-400 tracking-wider">
              Contact
            </p>
            <a
              href="tel:+254796869402"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white transition-all"
              style={{ 
                textDecoration: 'none',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '2px solid rgba(99, 102, 241, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="p-2.5 rounded-xl transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                }}
              >
                <FiPhone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Phone</p>
                <p className="text-sm font-bold text-gray-800 group-hover:text-white">+254 796 869 402</p>
              </div>
            </a>
            <a
              href="mailto:support@blackie-networks.com"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white transition-all"
              style={{ 
                textDecoration: 'none',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '2px solid rgba(99, 102, 241, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="p-2.5 rounded-xl transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                }}
              >
                <FiMail size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Email</p>
                <p className="text-sm font-bold text-gray-800">support@blackie-networks.com</p>
              </div>
            </a>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;

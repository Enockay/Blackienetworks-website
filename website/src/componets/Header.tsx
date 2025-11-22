import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Input, Divider, Dropdown, Menu } from 'antd';
import { FiSearch, FiPhone, FiMenu, FiChevronDown, FiMail } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const productMenu = (
    <Menu>
      <Menu.Item key="proxies">
        <Link to="/products/proxies">Proxies</Link>
      </Menu.Item>
      <Menu.Item key="vpn">
        <Link to="/products/vpn">VPN Services</Link>
      </Menu.Item>
      <Menu.Item key="api">
        <Link to="/products/api">API Access</Link>
      </Menu.Item>
    </Menu>
  );

  const aboutMenu = (
    <Menu>
      <Menu.Item key="team">
        <Link to="/about/team">Our Team</Link>
      </Menu.Item>
      <Menu.Item key="vision">
        <Link to="/about/vision">Our Vision</Link>
      </Menu.Item>
      <Menu.Item key="careers">
        <Link to="/about/careers">Careers</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Blackie Networks Logo - IT Solutions and Network Infrastructure"
            className="h-10 w-auto md:h-12 transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
          />
          <span className="text-xl font-extrabold text-gray-800 tracking-tight">
            Blackie<span className="text-blue-600">Networks</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>

          <Dropdown overlay={aboutMenu} placement="bottom">
            <div className="cursor-pointer flex items-center gap-1 hover:text-blue-600 transition">
              About Us <FiChevronDown size={14} />
            </div>
          </Dropdown>

          <Dropdown overlay={productMenu} placement="bottom">
            <div className="cursor-pointer flex items-center gap-1 hover:text-blue-600 transition">
              Products <FiChevronDown size={14} />
            </div>
          </Dropdown>

          <Link to="/blog" className="hover:text-blue-600 transition">Blog</Link>
          <Link to="/faq" className="hover:text-blue-600 transition">FAQ</Link>
          <Link to="/contactus" className="hover:text-blue-600 transition">Contact Us</Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">

          {/* Search */}
          <div className="hidden lg:flex items-center bg-gray-100 px-3 py-1.5 rounded-full shadow-inner hover:ring-2 hover:ring-blue-200 transition-all">
            <FiSearch className="text-gray-500 mr-2" />
            <Input
              placeholder="Search..."
              bordered={false}
              className="bg-transparent text-sm w-32 lg:w-48 placeholder:text-gray-500"
            />
          </div>

          {/* Contact */}
          <a
            href="tel:+254796869402"
            className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition"
          >
            <FiPhone className="text-lg" />
            <span className="text-sm">+2547 968 694 02</span>
          </a>

          {/* Mobile Menu */}
          <Button
            className="md:hidden border-none bg-transparent text-gray-700 hover:text-blue-600 focus:outline-none"
            icon={<FiMenu size={22} />}
            onClick={() => setDrawerVisible(true)}
          />
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        placement="right"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={280}
        className="custom-drawer"
        bodyStyle={{
          background:
            'linear-gradient(to bottom right, #f0f9ff, #e0f2fe, #f8fafc)',
          padding: '1.5rem',
        }}
        headerStyle={{
          background: '#f9fafb',
          borderBottom: '1px solid #e2e8f0',
        }}
        title={
          <div className="flex items-center gap-2">
            <img src={logo} alt="Blackie Networks Logo" className="h-8 w-auto rounded shadow-sm" />
            <span className="text-base font-bold text-gray-800">BlackieNetworks</span>
          </div>
        }
      >
        <nav className="flex flex-col space-y-4">
          <p className="text-xs uppercase font-semibold text-gray-500">Navigation</p>
          <Link to="/" onClick={() => setDrawerVisible(false)}>Home</Link>

          <div className="pl-2 space-y-2">
            <p className="font-semibold text-gray-700">About Us</p>
            <Link to="/about/team" onClick={() => setDrawerVisible(false)}>Our Team</Link>
            <Link to="/about/vision" onClick={() => setDrawerVisible(false)}>Our Vision</Link>
            <Link to="/about/careers" onClick={() => setDrawerVisible(false)}>Careers</Link>
          </div>

          <div className="pl-2 space-y-2 mt-4">
            <p className="font-semibold text-gray-700">Products</p>
            <Link to="/products/proxies" onClick={() => setDrawerVisible(false)}>Proxies</Link>
            <Link to="/products/vpn" onClick={() => setDrawerVisible(false)}>VPN Services</Link>
            <Link to="/products/api" onClick={() => setDrawerVisible(false)}>API Access</Link>
          </div>

          <Link to="/blog" onClick={() => setDrawerVisible(false)}>Blog</Link>
          <Link to="/faq" onClick={() => setDrawerVisible(false)}>FAQ</Link>
          <Link to="/contactus" onClick={() => setDrawerVisible(false)}>Contact Us</Link>
        </nav>

        <Divider className="my-6 border-blue-100" />

        <div className="flex flex-col space-y-3">
          <p className="text-xs uppercase font-semibold text-gray-500">Get Started</p>
          <Button
            type="primary"
            block
            className="!bg-blue-600 hover:!bg-blue-700"
            onClick={() => setDrawerVisible(false)}
          >
            Sign Up
          </Button>
          <Button
            block
            className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            onClick={() => setDrawerVisible(false)}
          >
            Login
          </Button>
        </div>

        <Divider className="my-6 border-blue-100" />

        {/* Contact Section */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FiPhone className="text-blue-600" />
            <a href="tel:+254796869402" className="hover:text-blue-600 transition">+2547 968 694 02</a>
          </div>
          <div className="flex items-center gap-2">
            <FiMail className="text-blue-600" />
            <a href="mailto:support@blackienetworks.com" className="hover:text-blue-600 transition">
              support@blackienetworks.com
            </a>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;

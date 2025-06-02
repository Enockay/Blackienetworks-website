import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Input } from 'antd';
import { FiSearch, FiPhone, FiMenu } from 'react-icons/fi';
import logo from '../assets/logo.png';

const navLinks = ['Home', 'About Us', 'Services', 'Pricing', 'Blog', 'Contact Us'];

const Header: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-xl">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-auto md:h-12" />
          <span className=" md:inline font-semibold text-gray-800 text-xm tracking-wide">
            BlackieNetworks
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          {navLinks.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(' ', '')}`}
              className="hover:text-blue-600 transition duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">

          {/* Search */}
          <div className="hidden lg:flex items-center bg-gray-100 px-3 py-1 rounded-full shadow-inner">
            <FiSearch className="text-gray-500 mr-2" />
            <Input
              placeholder="Search..."
              bordered={false}
              className="bg-transparent text-sm w-32 lg:w-48"
            />
          </div>

          {/* Contact */}
          <a
            href="tel:+254796869402"
            className="hidden lg:flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
          >
            <FiPhone className="text-lg" />
            <span className="text-sm">+2547 968 694 02</span>
          </a>

          {/* Mobile Drawer Trigger */}
          <Button
            className="md:hidden border-none bg-transparent text-gray-700 hover:text-blue-600"
            icon={<FiMenu size={22} />}
            onClick={() => setDrawerVisible(true)}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={<span className="text-base font-semibold text-gray-800">Menu</span>}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: '1.5rem' }}
      >
        <nav className="flex flex-col space-y-4">
          {navLinks.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(' ', '')}`}
              className="text-gray-800 hover:text-blue-600 transition text-base"
              onClick={() => setDrawerVisible(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col space-y-3">
          <Button type="primary" block onClick={() => setDrawerVisible(false)}>
            Sign Up
          </Button>
          <Button block className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Login
          </Button>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;

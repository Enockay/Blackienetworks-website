import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPhone } from 'react-icons/fi';
import logo from "../assets/logo.png";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg fixed top-0 w-full z-50 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-200 transition duration-300">
          <img src={logo} alt="logo" className="h-12 w-auto md:h-16" />
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6 font-medium">
          {['Home', 'About Us', 'Services', 'Pricing', 'Blog', 'Contact Us'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(' ', '')}`}
              className="hover:text-yellow-300 transition duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">

          {/* Search Bar */}
          <div className="relative hidden lg:flex items-center bg-white text-gray-700 rounded-full shadow-inner px-3 py-1">
            <FiSearch className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm placeholder-gray-500"
            />
          </div>

          {/* Contact Info */}
          <a
            href="tel:+1234567890"
            className="hidden lg:flex items-center space-x-1 text-white hover:text-yellow-300 transition duration-300"
          >
            <FiPhone className="text-xl" />
            <span>+2547 968 694 02</span>
          </a>

          {/* CTA Buttons */}
          <Link
            to="/signup"
            className="text-blue-600 bg-white px-3 md:px-4 py-1 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300 shadow-md"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-green-300 text-blue-900 px-3 md:px-4 py-1 rounded-full font-semibold hover:bg-green-400 transition duration-300 shadow-md"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white hover:text-yellow-300 transition duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full transition-all duration-300">
          <nav className="flex flex-col space-y-2 p-4 text-gray-700">
            {['Home', 'About Us', 'Services', 'Pricing', 'Blog', 'Contact Us'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '')}`}
                className="hover:text-blue-600 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

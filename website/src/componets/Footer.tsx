import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer:React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-800 text-gray-100 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* Company Overview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Blackie Networks</h3>
          <p className="text-sm text-gray-300">
            Blackie Networks is committed to providing innovative IT solutions including software development, network infrastructure, and consulting services. Our goal is to empower businesses with reliable technology solutions that drive growth.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/home" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/aboutus" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link to="/projects" className="hover:text-white transition">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <FiPhone className="mr-2 text-lg" />
              <span>+254 7968 694 02</span>
            </li>
            <li className="flex items-center">
              <FiMail className="mr-2 text-lg" />
              <a href="mailto:info@blackienetworks.com" className="hover:text-white transition">info@blackienetworks.com</a>
            </li>
            <li className="flex items-center">
              <FiMapPin className="mr-2 text-lg" />
              <span>Nairobi, Kenya</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FiFacebook className="text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FiTwitter className="text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FiLinkedin className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FiInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Blackie Networks. All rights reserved.</p>
        <p className="mt-2">
          <Link to="/terms" className="hover:text-white transition">Terms of Service</Link> | <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

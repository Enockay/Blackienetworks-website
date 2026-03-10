import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Spin, Modal, Typography } from 'antd';
import {
  ThunderboltOutlined,
  LoadingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

import mikrotikRemoteImg from '../assets/mikrotikremote.png';
import softwareCompany2Img from '../assets/softwareCompany2.jpg';
import softwareCompany3Img from '../assets/softwareCompany3.jpg';
import glintParlourImg from '../assets/glintparlour.png';
import blackieShieldImg from '../assets/blackieshield.png';
import cloudInfrastructureImg from '../assets/cloudinfrustructure.png';
import backgroundImg from '../assets/background.jpg';

const { Title, Paragraph } = Typography;

interface Service {
  title: string;
  description: string;
  details: string[];
  mikrotikAddons?: string[];
  siteLink?: string;
  image?: string;
}

// Services aligned with the homepage “Services We Provide” section
const services: Service[] = [
  {
    title: 'Network Setup & Billing Systems',
    description:
      'End‑to‑end network design, cabling, MikroTik configuration and ISP / campus billing systems that keep your internet stable and revenue flowing.',
    details: [
      'Network assessment, structured cabling and router / switch design for campuses, Saccos and ISPs.',
      'MikroTik configuration for firewalls, hotspots, QoS and secure remote access.',
      'Radius, hotspot and voucher billing for shared networks and campus Wi‑Fi.',
      'Custom ISP or campus billing setups tailored to your packages and policies.',
      'Monitoring, alerting and reporting so you can see usage, uptime and revenue in one place.',
      'Training and documentation for your internal IT or NOC teams.',
    ],
    mikrotikAddons: [
      'Advanced MikroTik firewall and security hardening',
      'Load‑balancing and failover between multiple uplinks',
      'VPN and VLAN segmentation for staff, students and guests',
      'Bandwidth management and application‑aware QoS',
    ],
    image: mikrotikRemoteImg,
  },
  {
    title: 'Web Development',
    description:
      'Modern websites, portals and internal systems that are fast, secure and designed around how your team actually works.',
    details: [
      'Custom business websites, school portals and customer dashboards.',
      'Booking, billing and workflow systems integrated with your existing tools.',
      'Responsive UI design that works smoothly on mobile, tablet and desktop.',
      'Secure authentication, access control and audit‑ready activity logs.',
      'Ongoing support, feature enhancements and performance tuning.',
      'Deployment pipelines so changes move safely from staging to production.',
    ],
    image: softwareCompany2Img,
  },
  {
    title: 'Cloud Infrastructure & Hosting',
    description:
      'Cloud infrastructure on AWS, DigitalOcean and others – designed for uptime, backups and predictable performance.',
    details: [
      'Infrastructure design for web apps, APIs, databases and background workers.',
      'High‑availability setups with load balancers, auto‑scaling and health checks.',
      'Automated backups, disaster‑recovery plans and documented runbooks.',
      'Security best practices for firewalls, secrets, SSL and access policies.',
      'Monitoring and logging so issues are visible before users complain.',
      'Cost‑optimization reviews to keep your monthly cloud bill under control.',
    ],
    image: cloudInfrastructureImg,
  },
  {
    title: 'AI Systems & Automation',
    description:
      'Practical AI assistants and automations that plug into your existing tools to save your team hours every week.',
    details: [
      'AI chat assistants trained on your company documents and FAQs.',
      'Automated reporting and dashboards that pull data from your systems.',
      'Email, WhatsApp or SMS workflows that respond and route requests automatically.',
      'Document summarisation and knowledge‑base search for internal teams.',
      'Custom integrations with CRMs, billing tools and ticketing systems.',
      'Security and data‑privacy controls appropriate for Kenyan organizations.',
    ],
    image: glintParlourImg,
  },
  {
    title: 'Mobile App Development',
    description:
      'Android and iOS apps for customers or internal teams, fully integrated with your web, billing and cloud infrastructure.',
    details: [
      'Customer‑facing apps for bookings, payments, loyalty and self‑service.',
      'Field‑team apps for checklists, data collection and incident reporting.',
      'Offline‑first experiences for low‑connectivity environments.',
      'Secure APIs and authentication shared with your existing systems.',
      'App store publishing, updates and long‑term maintenance.',
      'Analytics and event tracking so you know how people really use the app.',
    ],
    image: softwareCompany3Img,
  },
  {
    title: 'VPN Solutions – Blackie Shield',
    description:
      'Always‑on VPN and secure remote access powered by our Blackie Shield platform, keeping your teams and branches safely connected.',
    details: [
      'Centralised VPN management for staff, branches and field teams.',
      'Per‑user and per‑device access controls with detailed activity logs.',
      'Optimised routes for low‑latency access to your internal systems.',
      'Support for laptops, phones and routers across multiple platforms.',
      'Integration with your existing firewalls and identity providers.',
      '24/7 monitoring of tunnel health, usage and security events.',
    ],
    siteLink: 'https://www.blackieshield.com',
    image: blackieShieldImg,
  },
];

const ServicesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading to prevent empty pages
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const openServiceModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleBookNow = (service: Service) => {
    // Navigate to contactus page
    navigate('/contactus');
  };

  if (loading) {
    return (
      <div
        style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)',
        marginTop: '80px',
        }}
      >
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 48, color: '#0ea5e9' }} spin />}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 20px 80px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)',
        marginTop: '80px',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 102, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(124, 58, 237, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div className="container mx-auto max-w-7xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '50px',
              marginBottom: '24px',
            }}
          >
            <ThunderboltOutlined
              style={{ fontSize: '24px', color: '#0ea5e9', marginRight: '12px' }}
            />
            <span style={{ color: '#0ea5e9', fontSize: '14px', fontWeight: 600 }}>
              Blackie Networks Service Catalogue
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 60%, #0f172a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              color: '#475569',
              fontSize: '1.05rem',
              maxWidth: '760px',
              margin: '0 auto',
              lineHeight: 1.9,
            }}
          >
            Blackie Networks combines networking, software, cloud and security services into one
            reliable partner. Each engagement is scoped, documented and delivered with a clear
            outcome, so your team gets stable infrastructure and tools that support day‑to‑day
            operations and long‑term growth.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid rgba(148, 163, 184, 0.35)',
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.7)';
                e.currentTarget.style.boxShadow = '0 20px 55px rgba(15, 23, 42, 0.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.35)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(15, 23, 42, 0.12)';
              }}
            >
              {/* Animated gradient background */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)',
                    'linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                    'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '16px',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {service.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  style={{ color: '#475569', marginBottom: '24px', fontSize: '1rem', lineHeight: 1.8 }}
                >
                  {service.description}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openServiceModal(service)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(148, 163, 184, 0.6)',
                    color: '#1d4ed8',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    marginBottom: '24px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(219, 234, 254, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  View Service Details
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookNow(service)}
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                    border: 'none',
                    color: '#f9fafb',
                    padding: '14px 32px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 18px 40px rgba(37, 99, 235, 0.45)',
                    width: '100%',
                  }}
                >
                  Request Consultation
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Service detail modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1120}
        centered
        bodyStyle={{
          padding: 20,
          borderRadius: 0,
          overflow: 'visible',
          background: '#f3f4f6',
        }}
      >
        {selectedService && (
          <div
            style={{
              maxWidth: 1040,
              margin: '0 auto',
              borderRadius: 26,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 3.1fr) minmax(0, 4fr)',
              gap: 0,
              minHeight: 560,
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                position: 'relative',
                background:
                  'radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.65), transparent 55%), radial-gradient(circle at 100% 100%, #020617, #020617)',
              }}
            >
              <img
                src={selectedService.image || backgroundImg}
                alt={selectedService.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: 0.32,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.5), transparent 55%), radial-gradient(circle at 100% 100%, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.98))',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 32,
                  right: 32,
                  bottom: 32,
                  color: '#e5e7eb',
                }}
              >
                <Title
                  level={3}
                  style={{
                    color: '#f9fafb',
                    marginBottom: 6,
                    fontWeight: 800,
                    letterSpacing: '0.01em',
                  }}
                >
                  {selectedService.title}
                </Title>
                <Paragraph
                  style={{
                    margin: 0,
                    color: '#e5e7eb',
                    fontSize: 13,
                    maxWidth: 360,
                  }}
                >
                  High‑level view of how this service fits into your network and systems.
                </Paragraph>
              </div>
            </div>
            <div
              style={{
                padding: '20px 24px 18px',
                backgroundColor: '#ffffff',
              }}
            >
              <Title
                level={4}
                style={{
                  marginBottom: 6,
                  color: '#0f172a',
                  fontWeight: 800,
                  letterSpacing: '0.01em',
                }}
              >
                What you get with {selectedService.title}
              </Title>
              <Paragraph style={{ color: '#4b5563', marginBottom: 18, fontSize: 13 }}>
                {selectedService.description}
              </Paragraph>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  maxHeight: 360,
                  overflowY: 'auto',
                }}
              >
                {selectedService.details.map((detail, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      marginBottom: 10,
                      fontSize: 13,
                      color: '#4b5563',
                    }}
                  >
                    <span style={{ color: '#22c55e', marginTop: 2 }}>●</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: 22,
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {selectedService.siteLink && (
                  <a
                    href={selectedService.siteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 13,
                      color: '#93c5fd',
                    }}
                  >
                    <GlobalOutlined style={{ marginRight: 6 }} />
                    Visit live project
                  </a>
                )}
                <button
                  onClick={() => {
                    handleBookNow(selectedService);
                    setIsModalOpen(false);
                  }}
                  style={{
                    marginLeft: 'auto',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    border: 'none',
                    color: '#ecfdf5',
                    padding: '10px 24px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 13,
                    boxShadow: '0 14px 34px rgba(22, 163, 74, 0.45)',
                  }}
                >
                  Talk to our team
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ServicesPage;

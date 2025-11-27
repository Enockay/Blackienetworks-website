import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiLayers,
  FiCloud,
  FiWifi,
  FiShield,
} from 'react-icons/fi';

import networking1 from '../assets/networking1.jpg';
import networking2 from '../assets/networking2.jpg';
import networking3 from '../assets/networking3.jpg';
import software1 from '../assets/softwareCompany1.jpeg';
import software2 from '../assets/softwareCompany2.jpg';

export interface Product {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  icon: React.ReactNode;
}

export const products: Product[] = [
  {
    slug: 'blackie-proxy',
    title: 'Blackie Proxy',
    tagline: 'Secure, fast access to the open internet',
    description:
      'High‑performance proxy service designed for ISPs, campuses and power users who need reliable, geo‑flexible connectivity.',
    highlights: [
      'Multiple global locations for low‑latency access',
      'Full traffic encryption & privacy‑first design',
      'Ideal for streaming, research and remote work',
    ],
    image: networking1,
    icon: <FiShield size={26} />,
  },
  {
    slug: 'isp-billing-system',
    title: 'ISP Billing System',
    tagline: 'End‑to‑end billing for internet providers',
    description:
      'A full billing and customer management platform tailored for ISPs, WISPs and campus networks.',
    highlights: [
      'Automated invoicing, payments and reminders',
      'Self‑service customer portal & ticketing',
      'Radius / MikroTik integration ready',
    ],
    image: software1,
    icon: <FiLayers size={26} />,
  },
  {
    slug: 'mikrotik-configuration',
    title: 'MikroTik Configuration',
    tagline: 'Enterprise‑grade router tuning',
    description:
      'Expert configuration for MikroTik routers so your network stays fast, secure and stable 24/7.',
    highlights: [
      'Load‑balancing, failover and QoS tuning',
      'VPN, VLAN and hotspot setup',
      'Firewall hardening and best‑practice security',
    ],
    image: networking2,
    icon: <FiWifi size={26} />,
  },
  {
    slug: 'cloud-hosting',
    title: 'Cloud Hosting & DevOps',
    tagline: 'Modern cloud infrastructure for your apps',
    description:
      'We deploy, monitor and maintain your apps on AWS, DigitalOcean and other cloud platforms.',
    highlights: [
      'High‑availability architecture & auto‑scaling',
      'Automated backups and disaster recovery',
      '24/7 monitoring and incident response',
    ],
    image: networking3,
    icon: <FiCloud size={26} />,
  },
  {
    slug: 'software-maintenance',
    title: 'Software Maintenance',
    tagline: 'Keep your systems healthy and secure',
    description:
      'Long‑term maintenance, performance tuning and security patching for your existing software.',
    highlights: [
      'Regular updates and bug‑fix releases',
      'Performance & UX improvements over time',
      'Security reviews and hardening',
    ],
    image: software2,
    icon: <FiShield size={26} />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
};

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleQuote = (productTitle: string) => {
    navigate('/booking', { state: { selectedService: productTitle } });
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '110px 20px 80px',
        background:
          'linear-gradient(135deg, rgba(5, 8, 16, 0.96) 0%, rgba(10, 14, 39, 0.96) 100%)',
      }}
    >
      {/* Soft animated background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 10% 20%, rgba(0, 240, 255, 0.16) 0%, transparent 55%),
            radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.14) 0%, transparent 55%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div
        className="max-w-7xl mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Page intro */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 22px',
              borderRadius: 999,
              border: '1px solid rgba(0, 240, 255, 0.4)',
              background: 'rgba(0, 240, 255, 0.08)',
              marginBottom: 18,
            }}
          >
            <FiArrowRight size={18} color="#00f0ff" />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#00f0ff',
              }}
            >
              Our Flagship Products
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            style={{
              fontSize: 'clamp(2.3rem, 4.5vw, 3.4rem)',
              fontWeight: 900,
              marginBottom: 16,
              background:
                'linear-gradient(135deg, #00f0ff 0%, #0066ff 45%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Products built for ISPs, campuses & modern businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{
              maxWidth: 680,
              margin: '0 auto',
              color: '#cbd5e1',
              fontSize: '1.02rem',
              lineHeight: 1.8,
            }}
          >
            Browse our ready‑made solutions. Each product has its own page with
            deeper technical details, ideal use‑cases and a simple way to{' '}
            <span style={{ color: '#00f0ff', fontWeight: 600 }}>
              ask for a tailored quote
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Products grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.slug}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.1fr)',
                gap: 20,
                borderRadius: 22,
                border: '1px solid rgba(0, 240, 255, 0.22)',
                background: 'rgba(10, 14, 39, 0.78)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Left: text */}
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 12px',
                    borderRadius: 999,
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(148, 163, 184, 0.4)',
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 30,
                      height: 30,
                      borderRadius: '999px',
                      background:
                        'radial-gradient(circle at 30% 0%, #00f0ff, #0066ff)',
                      color: '#020617',
                    }}
                  >
                    {product.icon}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      color: '#94a3b8',
                      fontWeight: 600,
                    }}
                  >
                    Product #{idx + 1}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#e5f4ff',
                    marginBottom: 4,
                  }}
                >
                  {product.title}
                </h2>
                <p
                  style={{
                    color: '#7dd3fc',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginBottom: 14,
                  }}
                >
                  {product.tagline}
                </p>
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  {product.description}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 18px',
                    display: 'grid',
                    gap: 6,
                  }}
                >
                  {product.highlights.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        fontSize: '0.85rem',
                        color: '#e2e8f0',
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 999,
                          marginTop: 6,
                          background:
                            'linear-gradient(135deg, #00f0ff, #7c3aed)',
                          boxShadow: '0 0 10px rgba(56, 189, 248, 0.7)',
                        }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                    marginTop: 'auto',
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleQuote(product.title)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 999,
                      border: 'none',
                      background:
                        'linear-gradient(135deg, #00f0ff 0%, #0066ff 45%, #7c3aed 100%)',
                      color: '#020617',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow:
                        '0 12px 35px rgba(56, 189, 248, 0.55)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    Ask for Quote
                    <FiArrowRight size={16} />
                  </motion.button>

                  <Link
                    to={`/Products/${product.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '10px 18px',
                        borderRadius: 999,
                        border: '1px solid rgba(148, 163, 184, 0.8)',
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: '#e5e7eb',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      View details
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Right: image */}
              <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transformOrigin: 'center',
                    filter: 'brightness(0.85) contrast(1.05)',
                  }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(circle at 0% 0%, rgba(15, 23, 42, 0.4), transparent 55%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    padding: '8px 14px',
                    borderRadius: 999,
                    background: 'rgba(15, 23, 42, 0.86)',
                    border: '1px solid rgba(148, 163, 184, 0.6)',
                    color: '#e5e7eb',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    fontWeight: 600,
                  }}
                >
                  Live product • Blackie Networks
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why choose Blackie Networks */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          style={{ marginTop: 72 }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: 32,
              maxWidth: 720,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <p
              style={{
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#7dd3fc',
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Why choose Blackie Networks
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.9rem, 3vw, 2.3rem)',
                fontWeight: 800,
                marginBottom: 12,
                background:
                  'linear-gradient(135deg, #00f0ff 0%, #0066ff 40%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Built by network engineers who live on campus networks
            </h2>
            <p
              style={{
                color: '#cbd5e1',
                fontSize: '0.98rem',
                lineHeight: 1.8,
              }}
            >
              We don&apos;t just sell software – we run real networks in Kenyan
              campuses and towns, so every product is tested in the same tough
              environments our clients face daily.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'End‑to‑end expertise',
                body: 'From last‑mile internet and MikroTik routers to billing, cloud and VPNs, we design everything to work together with fewer vendors and less headache.',
              },
              {
                title: 'Local, responsive support',
                body: 'You talk to engineers who understand Kenyan ISPs, campuses and SMEs – not generic offshore support. We troubleshoot fast and speak your language.',
              },
              {
                title: 'Scales as you grow',
                body: 'Start small in one hostel or branch, then grow to multiple sites, more users and new products without replacing your entire stack.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  border: '1px solid rgba(148, 163, 184, 0.45)',
                  background: 'rgba(15, 23, 42, 0.9)',
                  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.7)',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#e5f4ff',
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#cbd5e1',
                    lineHeight: 1.7,
                  }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProductsPage;



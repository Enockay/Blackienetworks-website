import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { 
  ThunderboltOutlined, 
  CheckCircleOutlined,
  LoadingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

interface Service {
  title: string;
  description: string;
  details: string[];
  mikrotikAddons?: string[];
  siteLink?: string;
}

const services: Service[] = [
  {
    title: "Blackie Proxy",
    description: "High‑performance proxy built for Kenyan ISPs, campuses and power users who need fast, reliable and flexible access to the internet.",
    details: [
      "Multiple points of presence tuned for low‑latency streaming, research and remote work",
      "Encrypted traffic paths to keep your browsing private and your data protected",
      "Traffic policies that balance speed, fairness and cost for your users",
      "Simple onboarding for ISPs and campus IT teams with clear documentation",
      "Designed to plug into existing MikroTik, billing and hotspot setups",
      "24/7 monitored infrastructure with proactive incident response"
    ],
    siteLink: "#" // You can add the actual site link here
  },
  {
    title: "ISP Billing System",
    description: "End‑to‑end billing and customer management tailored for ISPs, WISPs and campus Wi‑Fi providers.",
    details: [
      "Automated invoicing, renewals and payment reminders to reduce manual work",
      "Customer self‑service portal for viewing usage, invoices and support tickets",
      "Integration‑ready design for mobile money, card payments and bank transfers",
      "Flexible package, bundle and promotion management for student‑friendly pricing",
      "Real‑time usage tracking and analytics dashboards for capacity planning",
      "Role‑based admin access to keep operations secure and auditable"
    ],
  },
  {
    title: "Mikrotik Configuration",
    description: "Expert MikroTik router configuration so your network stays fast, secure and stable, even at campus scale.",
    details: [
      "Router initial setup, hardening and best‑practice baseline configuration",
      "Load‑balancing and failover so users stay online even when links drop",
      "VPN and VLAN design for separating student, staff and admin networks",
      "Bandwidth management and traffic shaping to prevent single‑user abuse",
      "Firewall, hotspot and walled‑garden rules tuned for your policies",
      "QoS optimization for calls, classes and business‑critical traffic",
      "Wireless access point tuning for dense hostel and lecture environments"
    ],
  },
  {
    title: "Software Maintenance",
    description: "Long‑term care for your existing systems so they stay fast, secure and easy to use as your needs grow.",
    details: [
      "Scheduled updates, patches and dependency upgrades without breaking production",
      "Bug fixing and troubleshooting backed by real monitoring and error tracking",
      "Performance tuning to keep pages, APIs and reports feeling snappy",
      "Security monitoring and hardening to reduce your attack surface over time",
      "Database health checks, indexing and clean‑up for reliable data",
      "Backup and recovery strategies tested for real incidents",
      "Ongoing technical advisory so your roadmap and systems stay aligned"
    ],
  },
  {
    title: "Cloud Hosting",
    description: "Modern cloud infrastructure on AWS, DigitalOcean and other providers, designed for uptime and growth.",
    details: [
      "Scalable cloud architectures that handle traffic spikes without surprises",
      "High‑availability setups with redundancy across regions and zones",
      "Automated backups and disaster‑recovery playbooks you can actually follow",
      "Load‑balancers, auto‑scaling and CDNs tuned for your apps and users",
      "Security best‑practices, from firewalls to secrets management",
      "24/7 monitoring, alerting and on‑call workflows for your team",
      "Ability to mix providers (AWS, DigitalOcean, others) when it makes sense"
    ],
  },
  {
    title: "SEO Optimization",
    description: "Search Engine Optimization focused on practical wins: more relevant traffic, better leads and clearer reporting.",
    details: [
      "Full SEO audit covering speed, structure, content and technical issues",
      "Keyword and intent research tailored to your niche and geography",
      "On‑page improvements that make pages clearer for users and search engines",
      "Content recommendations or production support for high‑value topics",
      "Technical fixes for sitemaps, meta tags, indexing issues and more",
      "Clean link‑building strategies focused on long‑term authority",
      "Monthly performance reports in plain language, not just charts"
    ],
  },
  {
    title: "IoT Device Remote Access (WireGuard)",
    description: "WireGuard‑based VPN access to cameras, sensors and other IoT devices without exposing them to the open internet.",
    details: [
      "WireGuard server and client configuration tuned for low overhead and speed",
      "Secure remote access patterns that avoid unsafe port‑forwarding",
      "Multi‑device and multi‑site design for fleets of IoT hardware",
      "End‑to‑end encrypted tunnels for telemetry, control and video streams",
      "Low‑latency routes so real‑time control and monitoring stay responsive",
      "Support for laptops, phones, embedded devices and remote technicians",
      "Monitoring and support for your critical IoT fleet connectivity"
    ],
  },
  {
    title: "Internet Installation (Kitui & Chuka)",
    description: "On‑the‑ground internet installation and last‑mile connectivity in Kitui, Chuka and surrounding areas.",
    details: [
      "Site survey and signal assessment for hostels, homes, schools and businesses",
      "Fiber, wireless and hybrid installation options depending on your location",
      "Router, access point and cabling setup that is tidy and maintainable",
      "Network configuration and testing before we hand over to your team",
      "Post‑installation support so you are not left alone after day one",
      "Maintenance and troubleshooting plans for long‑term stability",
      "Affordable packages that balance performance with real‑world budgets"
    ],
  },
  {
    title: "Internet Infrastructure Setup",
    description: "Full internet infrastructure design for campuses, estates, Saccos and growing ISPs.",
    details: [
      "End‑to‑end network design from core to access layer, documented and diagrammed",
      "Cabling, racks and hardware installation that meet safety and uptime standards",
      "Core, edge and authentication servers sized and configured for your growth",
      "Security policies and firewall rules crafted around your risk profile",
      "Campus‑wide or multi‑building Wi‑Fi deployments with roaming in mind",
      "Monitoring, logging and alerting so issues are found before users complain",
      "Architectures that make it easy to add new buildings, towers or services"
    ],
  },
  {
    title: "Network Setup and Infrastructure",
    description: "Secure, robust IT and network foundations for organizations that are ready to modernize or expand.",
    details: [
      "Structured cabling, switching and routing that follow industry standards",
      "Server setup, virtualization and storage tailored to your workloads",
      "Security protocols for guest, staff and admin segments that actually get enforced",
      "Office, branch and warehouse Wi‑Fi designs that minimize dead zones",
      "Network monitoring, alerting and documentation handed over to your team",
      "Hybrid on‑prem and cloud infrastructure setups where each part fits a clear role"
    ],
    mikrotikAddons: [
      "Mikrotik router configuration",
      "Load balancing setup",
      "Initial router setup and security hardening",
      "VPN and VLAN configuration",
      "Bandwidth management and traffic shaping"
    ]
  },
];

const ServicesPage: React.FC = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [expandedMikrotik, setExpandedMikrotik] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const detailsRef = useRef<HTMLDivElement | null>(null);
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

  const handleExpand = (index: number) => {
    setExpandedService(index === expandedService ? null : index);
    setExpandedMikrotik(null);
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookNow = (service: Service) => {
    // Navigate to booking page with service pre-selected
    navigate('/booking', { state: { selectedService: service.title } });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
        marginTop: '80px',
      }}>
        <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 48, color: '#00f0ff' }} spin />} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 20px 80px',
        background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
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
            <ThunderboltOutlined style={{ fontSize: '24px', color: '#00f0ff', marginRight: '12px' }} />
            <span style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 600 }}>
              Our Services
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
              background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
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
              color: '#cbd5e1',
              fontSize: '1.125rem',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            This is the practical side of Blackie Networks: from campus internet and ISP
            billing to cloud, VPN and SEO, each service fits together to power your
            entire digital stack.
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
                border: '1px solid rgba(0, 240, 255, 0.2)',
                background: 'rgba(10, 14, 39, 0.6)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 240, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 240, 255, 0.1)';
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
                    color: '#e2e8f0',
                    marginBottom: '16px',
                    background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
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
                  style={{ color: '#cbd5e1', marginBottom: '24px', fontSize: '1rem', lineHeight: 1.8 }}
                >
                  {service.description}
                </motion.p>

                <AnimatePresence>
                  {expandedService === index ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      ref={detailsRef}
                    >
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}
                      >
                        {service.details.map((detail, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            style={{
                              padding: '12px 0',
                              color: '#cbd5e1',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                            }}
                          >
                            <CheckCircleOutlined style={{ color: '#00f0ff', fontSize: '18px', marginTop: '4px', flexShrink: 0 }} />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </motion.ul>

                      {service.mikrotikAddons && (
                        <motion.div style={{ marginBottom: '24px' }}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setExpandedMikrotik(index === expandedMikrotik ? null : index)}
                            style={{
                              background: 'rgba(0, 240, 255, 0.1)',
                              border: '1px solid rgba(0, 240, 255, 0.3)',
                              color: '#00f0ff',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: 600,
                              marginBottom: '12px',
                            }}
                          >
                            {expandedMikrotik === index ? "Hide Mikrotik Services" : "Show Mikrotik Services"}
                          </motion.button>

                          <AnimatePresence>
                            {expandedMikrotik === index && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}
                              >
                                {service.mikrotikAddons.map((addon, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    style={{
                                      padding: '8px 0',
                                      color: '#94a3b8',
                                      fontSize: '0.9rem',
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '8px',
                                    }}
                                  >
                                    <span style={{ color: '#00f0ff' }}>•</span>
                                    <span>{addon}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}

                      {service.siteLink && (
                        <motion.a
                          href={service.siteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            display: 'inline-block',
                            background: 'rgba(0, 240, 255, 0.1)',
                            border: '1px solid rgba(0, 240, 255, 0.5)',
                            color: '#00f0ff',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            marginBottom: '24px',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <GlobalOutlined style={{ marginRight: '8px' }} />
                          Visit Service Site
                        </motion.a>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExpand(index)}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        color: '#00f0ff',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        marginBottom: '24px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      See Details
                    </motion.button>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookNow(service)}
                  style={{
                    background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                    border: 'none',
                    color: '#0a0e27',
                    padding: '14px 32px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 10px 30px rgba(0, 240, 255, 0.4)',
                    width: '100%',
                  }}
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;

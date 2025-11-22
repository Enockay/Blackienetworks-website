import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Form, Input, Button as AntButton, message, Spin } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
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
  price: string;
  mikrotikAddons?: string[];
  siteLink?: string;
}

const services: Service[] = [
  {
    title: "Blackie Proxy",
    description: "High-performance proxy services for secure and anonymous browsing. Access geo-restricted content with our reliable proxy solutions.",
    details: [
      "Fast and secure proxy connections",
      "Multiple server locations",
      "Anonymous browsing protection",
      "High-speed bandwidth",
      "24/7 uptime guarantee",
      "Easy setup and configuration"
    ],
    price: "Contact for pricing",
    siteLink: "#" // You can add the actual site link here
  },
  {
    title: "ISP Billing System",
    description: "Comprehensive billing and customer management system designed specifically for Internet Service Providers to streamline operations.",
    details: [
      "Automated billing and invoicing",
      "Customer management portal",
      "Payment processing integration",
      "Usage tracking and reporting",
      "Package and plan management",
      "Multi-payment gateway support"
    ],
    price: "KES 50,000 - KES 200,000",
  },
  {
    title: "Mikrotik Configuration",
    description: "Expert Mikrotik router configuration services to optimize your network performance, security, and reliability.",
    details: [
      "Router initial setup and configuration",
      "Load balancing and failover setup",
      "VPN and VLAN configuration",
      "Bandwidth management and traffic shaping",
      "Firewall and security hardening",
      "Quality of Service (QoS) optimization",
      "Wireless access point configuration"
    ],
    price: "KES 5,000 - KES 50,000",
  },
  {
    title: "Software Maintenance",
    description: "Ongoing software maintenance and support services to keep your applications running smoothly and securely.",
    details: [
      "Regular software updates and patches",
      "Bug fixes and troubleshooting",
      "Performance optimization",
      "Security monitoring and updates",
      "Database maintenance",
      "Backup and recovery solutions",
      "Technical support and consultation"
    ],
    price: "KES 15,000 - KES 100,000/month",
  },
  {
    title: "Cloud Hosting",
    description: "Scalable cloud hosting solutions with high availability, security, and performance for your applications and websites.",
    details: [
      "Scalable cloud infrastructure",
      "High availability and uptime",
      "Automated backups and disaster recovery",
      "Load balancing and auto-scaling",
      "Security and DDoS protection",
      "24/7 monitoring and support",
      "Multiple cloud provider options"
    ],
    price: "KES 2,000 - KES 50,000/month",
  },
  {
    title: "SEO Optimization",
    description: "Search Engine Optimization services to improve your website's visibility, rankings, and organic traffic.",
    details: [
      "Website SEO audit and analysis",
      "Keyword research and optimization",
      "On-page and off-page SEO",
      "Content optimization",
      "Technical SEO improvements",
      "Link building strategies",
      "Performance and analytics reporting"
    ],
    price: "KES 10,000 - KES 80,000/month",
  },
  {
    title: "IoT Device Remote Access (WireGuard)",
    description: "Secure remote access to your IoT devices using WireGuard VPN technology for reliable and encrypted connections.",
    details: [
      "WireGuard VPN setup and configuration",
      "Secure remote device access",
      "Multi-device management",
      "Encrypted data transmission",
      "Low latency connections",
      "Cross-platform compatibility",
      "24/7 monitoring and support"
    ],
    price: "KES 5,000 - KES 30,000",
  },
  {
    title: "Internet Installation (Kitui & Chuka)",
    description: "Professional internet installation services in Kitui and Chuka regions with reliable connectivity solutions.",
    details: [
      "Site survey and assessment",
      "Fiber optic and wireless installation",
      "Router and equipment setup",
      "Network configuration and testing",
      "Post-installation support",
      "Maintenance and troubleshooting",
      "Affordable packages for homes and businesses"
    ],
    price: "KES 2,000 - KES 15,000",
  },
  {
    title: "Internet Infrastructure Setup",
    description: "Complete internet infrastructure design and implementation for businesses, campuses, and communities.",
    details: [
      "Network design and planning",
      "Cabling and hardware installation",
      "Server setup and management",
      "Security protocols and firewall configuration",
      "Wireless network deployment",
      "Network monitoring and support",
      "Scalable architecture for growth"
    ],
    price: "KES 50,000 - KES 500,000",
  },
  {
    title: "Network Setup and Infrastructure",
    description: "Enterprise-grade network and IT infrastructure services, designed to create secure, robust, and scalable systems.",
    details: [
      "Cabling and hardware installation",
      "Server setup and management",
      "Security protocols",
      "Wireless network configuration",
      "Network monitoring and support",
      "Cloud infrastructure setup"
    ],
    price: "KES 100,000 - KES 2,000,000",
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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const detailsRef = useRef<HTMLDivElement | null>(null);

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

  const handleDrawerOpen = (service: Service) => {
    setSelectedService(service);
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleFinish = (values: any) => {
    const payload = {
      ...values,
      service: selectedService?.title,
      price: selectedService?.price,
    };
    console.log('Order Submitted:', payload);
    message.success("Order submitted successfully!");
    handleDrawerClose();
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
            Comprehensive IT solutions tailored to transform your digital infrastructure
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

                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#00f0ff',
                          marginBottom: '24px',
                        }}
                      >
                        Starting at {service.price}
                      </motion.p>

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
                  onClick={() => handleDrawerOpen(service)}
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

      {/* Drawer for Booking */}
      <Drawer
        title={
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            📦 Order: {selectedService?.title}
          </motion.div>
        }
        placement="right"
        width={420}
        onClose={handleDrawerClose}
        open={drawerVisible}
        bodyStyle={{
          background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
          color: '#e2e8f0',
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: '#cbd5e1', marginBottom: '24px', fontSize: '1rem' }}
        >
          Fill out your information below to proceed with your order. We'll get in touch shortly.
        </motion.p>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            name="fullName"
            label={<span style={{ color: '#cbd5e1', fontWeight: 600 }}>Full Name</span>}
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input
              placeholder="John Doe"
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '8px',
                color: '#e2e8f0',
                padding: '10px 16px',
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={<span style={{ color: '#cbd5e1', fontWeight: 600 }}>Email Address</span>}
            rules={[{ required: true, type: 'email', message: 'Enter a valid email address' }]}
          >
            <Input
              placeholder="you@example.com"
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '8px',
                color: '#e2e8f0',
                padding: '10px 16px',
              }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label={<span style={{ color: '#cbd5e1', fontWeight: 600 }}>Phone Number</span>}
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input
              placeholder="+254..."
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '8px',
                color: '#e2e8f0',
                padding: '10px 16px',
              }}
            />
          </Form.Item>
          <Form.Item
            name="notes"
            label={<span style={{ color: '#cbd5e1', fontWeight: 600 }}>Additional Notes (Optional)</span>}
          >
            <Input.TextArea
              placeholder="Any extra requirements or questions..."
              rows={4}
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '8px',
                color: '#e2e8f0',
                padding: '10px 16px',
              }}
            />
          </Form.Item>
          <Form.Item>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <AntButton
                type="primary"
                htmlType="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                  border: 'none',
                  height: '48px',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              >
                Submit Order
              </AntButton>
            </motion.div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ServicesPage;

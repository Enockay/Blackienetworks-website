import React, { useState } from 'react';
// Collapse and Typography removed - not used
import { PlusOutlined, MinusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from './SEO';

// Typography and Collapse destructuring removed - not used

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What services does Blackie Networks offer?',
    answer:
      'Blackie Networks provides comprehensive IT solutions including campus Wi-Fi solutions, network infrastructure setup, custom software development, cloud services, mobile app integration, and IT consultancy & VPN services. We specialize in MikroTik configuration, load balancing, and secure network deployments.',
  },
  {
    question: 'How much does campus Wi-Fi cost?',
    answer:
      'Our campus Wi-Fi solutions are affordable for students, starting from KES 10/hour, KES 45/day, with discounted weekly and monthly bundles available. We offer flexible pricing packages tailored to student budgets.',
  },
  {
    question: 'Do you provide network setup for businesses?',
    answer:
      'Yes, we provide enterprise-grade network infrastructure services for businesses, including cabling, router configuration, server setup, security protocols, wireless network configuration, and ongoing network monitoring and support.',
  },
  {
    question: 'What is MikroTik configuration?',
    answer:
      'MikroTik configuration involves setting up and optimizing MikroTik routers for network management. Our services include initial router setup, security hardening, VPN and VLAN configuration, load balancing, and bandwidth management with traffic shaping.',
  },
  {
    question: 'How long does it take to set up a network?',
    answer:
      'Network setup time varies based on the scope. Small campus installations can be completed in under a week, while larger enterprise deployments may take 2-4 weeks. We provide detailed timelines during the consultation phase.',
  },
  {
    question: 'Do you offer 24/7 support?',
    answer:
      'Yes, we provide 24/7 support for all our network and IT services. Our support team is always available to assist with any technical issues or emergencies.',
  },
  {
    question: 'Can you develop custom software for our institution?',
    answer:
      'Absolutely! We specialize in custom software development including learning management systems, payment portals, attendance tracking, reporting dashboards, and responsive web/mobile applications with admin panels and APIs.',
  },
  {
    question: 'What areas in Kenya do you serve?',
    answer:
      'We primarily serve Chuka University and surrounding areas in Tharaka Nithi County, but we also provide services to institutions and businesses across Kenya. Contact us to discuss your location and requirements.',
  },
  {
    question: 'Do you provide cloud hosting services?',
    answer:
      'Yes, we offer cloud hosting and infrastructure services via AWS and DigitalOcean with 99.99% uptime guarantee. Our cloud services are ideal for high-traffic university systems and enterprise applications.',
  },
  {
    question: 'How can I book a service?',
    answer:
      'You can book a service by visiting our booking page, filling out the contact form, or calling us directly at +254 796 869 402. Our team will get back to you promptly to discuss your requirements.',
  },
];

// Generate FAQ Schema for SEO
const generateFAQSchema = (faqs: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

const FAQ: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // handleChange removed - not used

  const faqSchema = generateFAQSchema(faqData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
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

  return (
    <>
      <SEO
        title="FAQ - Frequently Asked Questions | Blackie Networks"
        description="Find answers to frequently asked questions about Blackie Networks services including campus Wi-Fi, network infrastructure, software development, pricing, and support."
        keywords="Blackie Networks FAQ, campus Wi-Fi questions, network setup questions, IT services FAQ, MikroTik configuration FAQ"
        url="/faq"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]}
      />
      <div
        style={{
          minHeight: '100vh',
          padding: '80px 20px 60px',
          background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
          position: 'relative',
          overflow: 'hidden',
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

        <div className="container mx-auto max-w-5xl" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '50px',
                marginBottom: '16px',
              }}
            >
              <QuestionCircleOutlined
                style={{
                  fontSize: '18px',
                  color: '#00f0ff',
                  marginRight: '8px',
                }}
              />
              <span style={{ color: '#00f0ff', fontSize: '12px', fontWeight: 600 }}>
                Frequently Asked Questions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Got Questions?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                color: '#cbd5e1',
                fontSize: '0.95rem',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.6',
              }}
            >
              Find answers to common questions about our IT services, network solutions, and support.
              Can't find what you're looking for?{' '}
              <a
                href="/contactus"
                style={{
                  color: '#00f0ff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  borderBottom: '2px solid rgba(0, 240, 255, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00ff88';
                  e.currentTarget.style.borderBottomColor = '#00ff88';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#00f0ff';
                  e.currentTarget.style.borderBottomColor = 'rgba(0, 240, 255, 0.3)';
                }}
              >
                Contact us
              </a>
              .
            </motion.p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {faqData.map((faq, index) => {
              const isActive = activeKeys.includes(index.toString());
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  style={{ position: 'relative' }}
                >
                  <div
                    className="glass"
                    style={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: isActive
                        ? '2px solid rgba(0, 240, 255, 0.5)'
                        : '1px solid rgba(0, 240, 255, 0.2)',
                      background: isActive
                        ? 'rgba(0, 240, 255, 0.15)'
                        : 'rgba(10, 14, 39, 0.6)',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive
                        ? '0 10px 40px rgba(0, 240, 255, 0.3)'
                        : '0 4px 20px rgba(0, 240, 255, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                        e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 240, 255, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)';
                        e.currentTarget.style.background = 'rgba(10, 14, 39, 0.6)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.1)';
                      }
                    }}
                  >
                    <div
                      onClick={() => {
                        const newKeys = isActive
                          ? activeKeys.filter((key) => key !== index.toString())
                          : [...activeKeys, index.toString()];
                        setActiveKeys(newKeys);
                      }}
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        userSelect: 'none',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#e2e8f0',
                          margin: 0,
                          flex: 1,
                          paddingRight: '16px',
                          lineHeight: '1.5',
                        }}
                      >
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{
                          rotate: isActive ? 180 : 0,
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(0, 102, 255, 0.3) 100%)'
                            : 'rgba(0, 240, 255, 0.1)',
                          border: '1px solid rgba(0, 240, 255, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {isActive ? (
                          <MinusOutlined style={{ color: '#00f0ff', fontSize: '14px' }} />
                        ) : (
                          <PlusOutlined style={{ color: '#00f0ff', fontSize: '14px' }} />
                        )}
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            style={{
                              padding: '0 20px 16px 20px',
                              color: '#cbd5e1',
                              fontSize: '0.875rem',
                              lineHeight: '1.6',
                              borderTop: '1px solid rgba(0, 240, 255, 0.2)',
                              paddingTop: '16px',
                            }}
                          >
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* FAQ Schema for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </div>
      </div>
    </>
  );
};

export default FAQ;


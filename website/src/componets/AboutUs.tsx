import React from 'react';
import { motion } from 'framer-motion';
import { Row, Col } from 'antd';
import {
  FaMedal,
  FaHandshake,
  FaCertificate,
  FaTools,
  FaChartLine,
  FaLightbulb,
  FaShieldAlt,
  FaRocket,
  FaUsers,
  FaGlobe,
  FaCode,
  FaNetworkWired,
} from 'react-icons/fa';
import {
  UserOutlined,
  RocketOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  AimOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import teamImage from '../assets/Team.jpeg';
import { SEO } from './SEO';

// Typography components removed - not used

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: 'Enock Mwema',
      role: 'CEO & Founder',
      bio:
        'With over 3 years of experience in network infrastructure and software development, Enock leads Blackie Networks with a transformative vision. Passionate about bridging digital divides, he ensures the company’s growth aligns with client success and innovation.',
    },
    {
      name: 'Pius Musomi',
      role: 'Head of Software Development',
      bio:
        'Pius brings deep expertise in full-stack systems, focusing on building secure, scalable software that meets complex business needs. His leadership drives robust backend services and intuitive frontend experiences.',
    },
    {
      name: 'Timothy Kuria',
      role: 'Network Infrastructure Lead',
      bio:
        'Timothy is the architect behind seamless network deployments. With a knack for smart designs and proactive maintenance, he guarantees clients enjoy uninterrupted, high-speed connectivity even in challenging environments.',
    },
  ];

  const achievements = [
    {
      icon: <FaMedal style={{ fontSize: 48 }} />,
      title: '100+ Projects Successfully Delivered',
      description:
        'We have executed and delivered over 100 diverse projects, ranging from large-scale campus Wi-Fi deployments and automated billing systems to secure VPN infrastructures for institutions and small businesses. Our ability to deliver complex technical solutions with precision and reliability sets us apart in the industry.',
      gradient: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    },
    {
      icon: <FaHandshake style={{ fontSize: 48 }} />,
      title: '20+ Strategic Partnerships Established',
      description:
        'We proudly maintain over 20 long-term partnerships with key industry players including Internet Service Providers, network hardware manufacturers, cloud infrastructure providers, and custom software vendors. These relationships enable us to offer scalable, cost-effective, and future-ready solutions to our clients.',
      gradient: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
    },
    {
      icon: <FaCertificate style={{ fontSize: 48 }} />,
      title: 'Team of Certified Industry Professionals',
      description:
        'Our technical team is composed of certified professionals holding credentials such as Cisco CCNA/CCNP, CompTIA Network+/Security+, and Microsoft Azure certifications. These qualifications reflect our commitment to staying at the forefront of industry standards in networking, software engineering, and cybersecurity.',
      gradient: 'linear-gradient(135deg, #00ff88 0%, #00f0ff 100%)',
    },
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
        title="About Us - Blackie Networks | Our Team & Mission"
        description="Learn about Blackie Networks - our mission, vision, experienced team, and achievements. We deliver IT solutions, network infrastructure, and software development services across Kenya."
        keywords="Blackie Networks about, IT company Kenya, network infrastructure team, software development company"
        url="/aboutus"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/aboutus' },
        ]}
      />
      <div
        style={{
          minHeight: '100vh',
          padding: '100px 20px 80px',
          background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
          position: 'relative',
          overflow: 'hidden',
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
        {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center max-w-4xl mx-auto mb-20"
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
              <RocketOutlined
                style={{
                  fontSize: '24px',
                  color: '#00f0ff',
                  marginRight: '12px',
                }}
              />
              <span style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 600 }}>
                Our Story
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
              Our Mission & Vision
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                color: '#cbd5e1',
                fontSize: '1.125rem',
                lineHeight: '1.8',
                maxWidth: '800px',
                margin: '0 auto 32px',
              }}
            >
              At <span style={{ fontWeight: 700, color: '#00f0ff' }}>Blackie Networks</span>, we're not just another IT company—we're digital transformation architects. Born from a vision to bridge Kenya's digital divide, we've evolved into a powerhouse delivering cutting-edge network infrastructure, innovative software solutions, and seamless connectivity experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ color: '#00f0ff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  Our Mission
                </h3>
                <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>
                  To democratize access to world-class IT infrastructure and empower every institution, business, and individual with reliable, affordable, and future-ready technology solutions.
                </p>
              </div>
              <div
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'rgba(0, 102, 255, 0.1)',
                  border: '1px solid rgba(0, 102, 255, 0.2)',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ color: '#0066ff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  Our Vision
                </h3>
                <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>
                  To become East Africa's most trusted technology partner, known for innovation, reliability, and transforming how organizations connect, operate, and thrive in the digital age.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginBottom: '80px' }}
          >
            <div
              className="glass"
              style={{
                borderRadius: '24px',
                padding: '48px',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                background: 'rgba(10, 14, 39, 0.6)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <FaLightbulb
                  style={{
                    fontSize: '48px',
                    color: '#00f0ff',
                    marginBottom: '16px',
                  }}
                />
                <h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '16px',
                  }}
                >
                  Our Story
                </h2>
              </div>
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '1.125rem',
                    lineHeight: '1.9',
                    marginBottom: '24px',
                    textAlign: 'center',
                  }}
                >
                  Founded in 2021, <span style={{ fontWeight: 700, color: '#00f0ff' }}>Blackie Networks</span> emerged from a simple yet powerful observation: institutions across Kenya were struggling with outdated, unreliable, and expensive network solutions. What started as a mission to solve campus connectivity challenges at Chuka University has evolved into a comprehensive technology powerhouse.
                </p>
                <p
                  style={{
                    color: '#cbd5e1',
                    fontSize: '1.125rem',
                    lineHeight: '1.9',
                    textAlign: 'center',
                  }}
                >
                  Today, we're proud to have transformed digital infrastructure for over 100 organizations, from universities and startups to NGOs and enterprises. Our journey is fueled by relentless innovation, client-centricity, and an unwavering commitment to excellence.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Values Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ marginBottom: '80px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '48px' }}
            >
              <HeartOutlined
                style={{
                  fontSize: '32px',
                  color: '#00f0ff',
                  marginBottom: '16px',
                }}
              />
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Our Core Values
              </h2>
            </motion.div>
            <Row gutter={[24, 24]} justify="center">
              {[
                {
                  icon: <ThunderboltOutlined style={{ fontSize: 32 }} />,
                  title: 'Innovation First',
                  description: 'We stay ahead of the curve, constantly exploring emerging technologies and methodologies to deliver solutions that aren\'t just current—they\'re future-proof.',
                  color: '#00f0ff',
                },
                {
                  icon: <SafetyOutlined style={{ fontSize: 32 }} />,
                  title: 'Security & Reliability',
                  description: 'Every solution we deploy is built with security at its core. We guarantee 99.9% uptime and implement enterprise-grade security protocols to protect your digital assets.',
                  color: '#00ff88',
                },
                {
                  icon: <AimOutlined style={{ fontSize: 32 }} />,
                  title: 'Client-Centric',
                  description: 'Your success is our success. We listen, understand, and tailor solutions that perfectly align with your unique needs, budget, and long-term goals.',
                  color: '#0066ff',
                },
                {
                  icon: <FaGlobe style={{ fontSize: 32 }} />,
                  title: 'Accessibility',
                  description: 'We believe world-class technology should be accessible to everyone. Our pricing models and solutions are designed to empower organizations of all sizes.',
                  color: '#7c3aed',
                },
              ].map(({ icon, title, description, color }, index) => (
                <Col xs={24} sm={12} md={6} key={title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      style={{
                        textAlign: 'center',
                        padding: '32px 24px',
                        borderRadius: '20px',
                        border: `1px solid ${color}40`,
                        background: 'rgba(10, 14, 39, 0.6)',
                        backdropFilter: 'blur(20px)',
                        height: '100%',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = color;
                        e.currentTarget.style.boxShadow = `0 10px 40px ${color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${color}40`;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '16px',
                          borderRadius: '16px',
                          background: `${color}20`,
                          marginBottom: '20px',
                          color: color,
                        }}
                      >
                        {icon}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: color,
                          marginBottom: '12px',
                        }}
                      >
                        {title}
                      </h3>
                      <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0, fontSize: '0.95rem' }}>
                        {description}
                      </p>
                    </motion.div>
                  </motion.div>
                </Col>
              ))}
            </Row>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              className="glass"
              style={{
                borderRadius: '24px',
                padding: '48px',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                background: 'rgba(10, 14, 39, 0.6)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
                marginBottom: '80px',
              }}
            >
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '32px',
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
              Our Experience
              </h2>
              <p
                style={{
                  textAlign: 'center',
                  maxWidth: '900px',
                  margin: '0 auto 48px',
                  color: '#cbd5e1',
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                }}
              >
                With over <span style={{ fontWeight: 700, color: '#00f0ff' }}>3+ years</span> of proven excellence, we've become the go-to technology partner for institutions, businesses, and organizations across Kenya. From massive campus Wi-Fi deployments serving thousands of students to enterprise-grade network infrastructures powering mission-critical operations, we've mastered the art of delivering complex technical solutions with precision, speed, and unwavering reliability.
              </p>
              <p
                style={{
                  textAlign: 'center',
                  maxWidth: '900px',
                  margin: '0 auto 48px',
                  color: '#cbd5e1',
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                }}
              >
                Our expertise spans the entire technology spectrum: cutting-edge network infrastructure, custom software development, cloud solutions, cybersecurity, and intelligent automation. We don't just implement technology—we architect digital ecosystems that drive growth, efficiency, and competitive advantage.
              </p>
              <Row gutter={[32, 32]} justify="center">
              <Col xs={24} md={12}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 10 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '20px',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(0, 102, 255, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FaTools style={{ fontSize: 32, color: '#00f0ff' }} />
                    </div>
                  <div>
                      <h3
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#00f0ff',
                          marginBottom: '12px',
                        }}
                      >
                        Technical Mastery
                      </h3>
                      <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
                        We're masters of network engineering—specializing in MikroTik routing, advanced VPN architectures, intelligent load balancing, seamless captive portals, precision bandwidth management, and enterprise-grade Wi-Fi deployments. Our team leverages industry-leading tools and methodologies to craft network environments that are not just stable, but blazingly fast and infinitely scalable.
                      </p>
                  </div>
                  </motion.div>
              </Col>
              <Col xs={24} md={12}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 10 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '20px',
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.3) 0%, rgba(0, 240, 255, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FaChartLine style={{ fontSize: 32, color: '#00ff88' }} />
                    </div>
                  <div>
                      <h3
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#00ff88',
                          marginBottom: '12px',
                        }}
                      >
                        Results-Oriented
                      </h3>
                      <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
                        With a <span style={{ fontWeight: 700, color: '#00ff88' }}>95% client satisfaction rate</span>, we've consistently delivered measurable results: 40% average improvement in network speeds, 99.9% uptime guarantees, and zero security breaches across all deployments. Every project is backed by data-driven outcomes and real-world impact.
                      </p>
                  </div>
                  </motion.div>
              </Col>
            </Row>
            </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginBottom: '80px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '48px' }}
            >
              <UserOutlined
                style={{
                  fontSize: '32px',
                  color: '#00f0ff',
                  marginBottom: '16px',
                }}
              />
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
            Meet Our Team
              </h2>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
          <Row gutter={[32, 32]} justify="center">
                {teamMembers.map(({ name, role, bio }) => (
              <Col xs={24} sm={12} md={8} key={name}>
                    <motion.div variants={itemVariants}>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{
                          borderRadius: '24px',
                          overflow: 'hidden',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          background: 'rgba(10, 14, 39, 0.6)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
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
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        alt={`${name} - ${role} at Blackie Networks`}
                        src={teamImage}
                            style={{
                              width: '100%',
                              height: '280px',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                        loading="lazy"
                          />
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: '60%',
                              background: 'linear-gradient(to top, rgba(10, 14, 39, 0.95) 0%, transparent 100%)',
                            }}
                          />
                        </div>
                        <div style={{ padding: '32px' }}>
                          <h3
                            style={{
                              fontSize: '1.5rem',
                              fontWeight: 700,
                              color: '#e2e8f0',
                              marginBottom: '8px',
                            }}
                          >
                      {name}
                          </h3>
                          <p
                            style={{
                              color: '#00f0ff',
                              fontWeight: 600,
                              marginBottom: '20px',
                              fontSize: '1rem',
                            }}
                          >
                      {role}
                          </p>
                          <div
                            style={{
                              height: '1px',
                              background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent)',
                              marginBottom: '20px',
                            }}
                          />
                          <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
                            {bio}
                          </p>
                        </div>
                      </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
            </motion.div>
          </motion.div>

          {/* What Makes Us Different */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ marginBottom: '80px' }}
          >
            <div
              className="glass"
              style={{
                borderRadius: '24px',
                padding: '48px',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                background: 'rgba(10, 14, 39, 0.6)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <FaRocket
                  style={{
                    fontSize: '48px',
                    color: '#00f0ff',
                    marginBottom: '16px',
                  }}
                />
                <h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '16px',
                  }}
                >
                  What Sets Us Apart
                </h2>
              </div>
              <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(0, 102, 255, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FaCode style={{ fontSize: 28, color: '#00f0ff' }} />
                    </div>
                    <div>
                      <h3 style={{ color: '#00f0ff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                        Full-Stack Expertise
                      </h3>
                      <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
                        Unlike traditional IT vendors, we're a one-stop solution. From network infrastructure to custom software, cloud deployment to cybersecurity—we handle it all. No vendor juggling, no communication gaps, just seamless integration.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.3) 0%, rgba(0, 240, 255, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FaNetworkWired style={{ fontSize: 28, color: '#00ff88' }} />
                    </div>
                    <div>
                      <h3 style={{ color: '#00ff88', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                        Campus-First Approach
                      </h3>
                      <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
                        Born from solving real campus challenges, we understand the unique needs of educational institutions. Our solutions are battle-tested in high-density environments with thousands of concurrent users, ensuring reliability when it matters most.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(0, 102, 255, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FaShieldAlt style={{ fontSize: 28, color: '#7c3aed' }} />
                    </div>
                    <div>
                      <h3 style={{ color: '#7c3aed', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                        Security by Design
                      </h3>
                      <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
                        Every solution is architected with security as a foundational principle, not an afterthought. We implement zero-trust architectures, end-to-end encryption, and proactive threat monitoring to keep your digital assets bulletproof.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 237, 78, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FaUsers style={{ fontSize: 28, color: '#ffd700' }} />
                    </div>
                    <div>
                      <h3 style={{ color: '#ffd700', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                        24/7 Proactive Support
                      </h3>
                      <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
                        Our support doesn't wait for problems—we monitor, optimize, and prevent issues before they impact your operations. With round-the-clock availability and average response times under 15 minutes, we're always in your corner.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '48px' }}
            >
              <TrophyOutlined
                style={{
                  fontSize: '32px',
                  color: '#00f0ff',
                  marginBottom: '16px',
                }}
              />
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
            Our Achievements
              </h2>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Row gutter={[32, 32]} justify="center">
                {achievements.map(({ icon, title, description, gradient }, index) => (
                  <Col xs={24} sm={12} md={8} key={title}>
                    <motion.div variants={itemVariants}>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{
                          textAlign: 'center',
                          padding: '40px 32px',
                          borderRadius: '24px',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          background: 'rgba(10, 14, 39, 0.6)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
                          height: '100%',
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
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                          style={{
                            display: 'inline-block',
                            padding: '20px',
                            borderRadius: '20px',
                            background: gradient,
                            marginBottom: '24px',
                            boxShadow: '0 8px 30px rgba(0, 240, 255, 0.3)',
                          }}
                        >
                          <div style={{ color: '#0a0e27' }}>{icon}</div>
                        </motion.div>
                        <h3
                          style={{
                            fontSize: '1.375rem',
                            fontWeight: 700,
                            color: '#e2e8f0',
                            marginBottom: '16px',
                          }}
                        >
                          {title}
                        </h3>
                        <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0 }}>
                          {description}
                        </p>
                      </motion.div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </motion.div>
          {/* Industries We Serve */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ marginBottom: '80px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '48px' }}
            >
              <FaGlobe
                style={{
                  fontSize: '32px',
                  color: '#00f0ff',
                  marginBottom: '16px',
                }}
              />
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Industries We Power
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.125rem', maxWidth: '700px', margin: '16px auto 0' }}>
                From education to enterprise, we deliver tailored solutions across diverse sectors
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
          <Row gutter={[24, 24]} justify="center">
                {[
                  { name: 'Education', description: 'Universities, colleges, and schools', icon: '🎓' },
                  { name: 'Healthcare', description: 'Hospitals and medical facilities', icon: '🏥' },
                  { name: 'Enterprise', description: 'Corporations and large businesses', icon: '🏢' },
                  { name: 'SMEs', description: 'Small and medium enterprises', icon: '💼' },
                  { name: 'NGOs', description: 'Non-profit organizations', icon: '🤝' },
                  { name: 'Government', description: 'Public sector institutions', icon: '🏛️' },
                ].map(({ name, description, icon }) => (
                  <Col xs={24} sm={12} md={8} lg={4} key={name}>
                    <motion.div variants={itemVariants}>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        style={{
                          textAlign: 'center',
                          padding: '32px 24px',
                          borderRadius: '20px',
                          border: '1px solid rgba(0, 240, 255, 0.2)',
                          background: 'rgba(10, 14, 39, 0.6)',
                          backdropFilter: 'blur(20px)',
                          transition: 'all 0.3s ease',
                          height: '100%',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)';
                          e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 240, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
                        <h3
                          style={{
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            color: '#00f0ff',
                            marginBottom: '8px',
                          }}
                        >
                          {name}
                        </h3>
                        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>
                          {description}
                        </p>
                      </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
          </motion.div>

          {/* Future Vision */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            style={{ marginBottom: '40px' }}
          >
            <div
              className="glass"
              style={{
                borderRadius: '24px',
                padding: '48px',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 40px rgba(0, 240, 255, 0.2)',
                textAlign: 'center',
              }}
            >
              <RocketOutlined
                style={{
                  fontSize: '64px',
                  color: '#00f0ff',
                  marginBottom: '24px',
                }}
              />
              <h2
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '24px',
                }}
              >
                The Future We're Building
              </h2>
              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '1.25rem',
                  lineHeight: '1.9',
                  maxWidth: '900px',
                  margin: '0 auto',
                }}
              >
                As we look ahead, we're not just keeping pace with technology—we're defining it. Our roadmap includes AI-powered network optimization, IoT integration platforms, blockchain-based security solutions, and next-generation cloud architectures. We're building the infrastructure that will power Kenya's digital economy for decades to come.
              </p>
              <p
                style={{
                  color: '#00f0ff',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginTop: '32px',
                  marginBottom: 0,
                }}
              >
                Join us on this journey. Together, we'll transform how Kenya connects, innovates, and thrives.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

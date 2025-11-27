import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, List, Button } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LaptopOutlined,
  TeamOutlined,
  TrophyOutlined,
  RocketOutlined,
  CloudOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import heroImage1 from '../assets/networking1.jpg';
import heroImage2 from '../assets/networking2.jpg';
import heroImage3 from '../assets/networking3.jpg';
import { FiZap, FiArrowRight } from 'react-icons/fi';

const { Title, Paragraph } = Typography;

const projects = [
  {
    title: 'Network Infrastructure',
    summary: 'Enterprise-grade network solutions for seamless connectivity.',
    details: [
      'Scalable architecture supporting 1000+ concurrent users',
      'Advanced firewall and security configurations',
      'Optimized Wi-Fi coverage and bandwidth management',
      '24/7 monitoring and proactive maintenance',
    ],
    icon: <ThunderboltOutlined style={{ fontSize: '32px', color: '#00f0ff' }} />,
  },
  {
    title: 'Cloud Services',
    summary: 'Scalable cloud infrastructure with 99.99% uptime.',
    details: [
      'AWS and DigitalOcean deployment',
      'Automated backups and disaster recovery',
      'High-traffic system optimization',
      'Comprehensive monitoring solutions',
    ],
    icon: <CloudOutlined style={{ fontSize: '32px', color: '#00ff88' }} />,
  },
  {
    title: 'Software Development',
    summary: 'Custom solutions tailored to your business needs.',
    details: [
      'Web and mobile application development',
      'API integration and microservices',
      'Modern UI/UX design principles',
      'Agile development methodology',
    ],
    icon: <RocketOutlined style={{ fontSize: '32px', color: '#7c3aed' }} />,
  },
];

// Animation variants shared across components
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

export const HeroSection = () => {
  const images = [heroImage1, heroImage2, heroImage3];
  const [_backgroundImage, setBackgroundImage] = useState(images[0]);
  const [_fadeClass, setFadeClass] = useState('opacity-100');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Preload images to prevent empty pages
  useEffect(() => {
    const imagePromises = images.map((img) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = img;
        image.onload = resolve;
        image.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)); // Still show page even if some images fail
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setImageIndex((prev) => {
          const nextIndex = (prev + 1) % images.length;
          setBackgroundImage(images[nextIndex]);
          return nextIndex;
        });
        setFadeClass('opacity-100');
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <div style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        marginTop: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(0, 240, 255, 0.3)',
            borderTopColor: '#00f0ff',
            borderRadius: '50%',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', marginTop: '80px' }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt="Network infrastructure background"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: idx === imageIndex ? 1 : 0,
            }}
            transition={{ duration: 0.8 }}
            style={{ 
              position: 'absolute',
              inset: 0,
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              filter: 'brightness(0.3) contrast(1.2)',
            }}
            width="1920"
            height="1080"
            loading="eager"
          />
        ))}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(5, 8, 16, 0.95) 100%)',
        }} />
          </div>

      {/* Hero Content */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '80px 20px' }}>
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: 900, textAlign: 'center', margin: '0 auto' }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '50px',
                marginBottom: '24px',
                cursor: 'default',
              }}
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(0, 240, 255, 0.5)',
                    '0 0 20px rgba(0, 240, 255, 0.8)',
                    '0 0 10px rgba(0, 240, 255, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 600 }}
              >
                <FiZap style={{ display: 'inline', marginRight: 8 }} />
                Next-Gen IT Solutions
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Title
                level={1}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 900,
                  marginBottom: '24px',
                  background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.2,
                  textShadow: '0 0 40px rgba(0, 240, 255, 0.3)',
                }}
              >
                Empowering Digital
                <br />
                <motion.span
                  animate={{
                    background: [
                      'linear-gradient(135deg, #00ff88 0%, #00f0ff 100%)',
                      'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                      'linear-gradient(135deg, #00ff88 0%, #00f0ff 100%)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Transformation
                </motion.span>
              </Title>
            </motion.div>

            <Paragraph
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: '#cbd5e1',
                marginBottom: '40px',
                maxWidth: '700px',
                margin: '0 auto 40px',
                lineHeight: 1.8,
              }}
            >
              Delivering cutting-edge network infrastructure, custom software development, and IT consulting services. 
              Connecting campuses and businesses across Kenya with reliable, high-speed solutions.
            </Paragraph>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}
            >
              <Link to="/services">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="tech-button"
                    size="large"
                    style={{
                      background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                      border: 'none',
                      color: '#0a0e27',
                      fontWeight: 700,
                      height: '56px',
                      padding: '0 40px',
                      fontSize: '16px',
                      boxShadow: '0 10px 30px rgba(0, 240, 255, 0.4)',
                    }}
                  >
                    Explore Services <FiArrowRight style={{ marginLeft: 8 }} />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/booking">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="large"
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(0, 240, 255, 0.5)',
                      color: '#00f0ff',
                      fontWeight: 700,
                      height: '56px',
                      padding: '0 40px',
                      fontSize: '16px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Book Consultation
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '60px' }}>
              {[
                { value: '1000+', label: 'Active Users' },
                { value: '99.99%', label: 'Uptime' },
                { value: '24/7', label: 'Support' },
                { value: '3+', label: 'Years Experience' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#00f0ff', marginBottom: '8px' }}>
                    {stat.value}
                </div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{stat.label}</div>
              </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Achievements Section */}
      <AchievementsAndSpecializations />

      {/* Projects Section */}
            <LatestProjectsSection />
    </div>
  );
};

const AchievementsAndSpecializations = () => {
  return (
    <div style={{ position: 'relative', zIndex: 10, padding: '100px 30px', background: 'rgba(5, 8, 16, 0.8)' }}>
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 18px',
            borderRadius: 999,
            border: '1px solid rgba(0, 240, 255, 0.4)',
            background: 'rgba(0, 240, 255, 0.08)',
            marginBottom: 18,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#00f0ff',
            fontWeight: 600,
          }}
        >
          Trusted by campuses, ISPs & SMEs
        </motion.div>
        <Title
          level={2}
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Why Choose Blackie Networks?
        </Title>
        <Paragraph
          style={{
            color: '#cbd5e1',
            maxWidth: 720,
            margin: '0 auto',
            fontSize: '1.05rem',
            lineHeight: 1.8,
          }}
        >
          We build and run real networks for Kenyan campuses and businesses, so our
          products and services are tested in the same demanding environments you
          operate in every day.
        </Paragraph>
        <div
          style={{
            marginTop: 18,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {[
            'Campus‑first internet & Wi‑Fi',
            'ISP‑ready billing & automation',
            'Software, cloud & VPN under one roof',
          ].map((pill) => (
            <span
              key={pill}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                border: '1px solid rgba(148, 163, 184, 0.7)',
                background: 'rgba(15, 23, 42, 0.9)',
                fontSize: '0.8rem',
                color: '#e5e7eb',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Row gutter={[32, 32]} justify="center">
        {[
          {
            icon: <LaptopOutlined style={{ fontSize: '48px', color: '#00f0ff' }} />,
            title: 'End-to-end expertise',
            text: 'From last‑mile internet and MikroTik routers to billing, cloud and VPNs, we design everything to work together with fewer vendors and less headache.',
            color: '#00f0ff',
          },
          {
            icon: <TeamOutlined style={{ fontSize: '48px', color: '#00ff88' }} />,
            title: 'Local, responsive support',
            text: 'You talk directly to engineers who understand Kenyan ISPs, campuses and SMEs – we troubleshoot fast and in your context, not from a generic script.',
            color: '#00ff88',
          },
          {
            icon: <TrophyOutlined style={{ fontSize: '48px', color: '#7c3aed' }} />,
            title: 'Built to scale with you',
            text: 'Start with one hostel or branch and scale to multiple sites, more users and new services without ripping out your entire stack.',
            color: '#7c3aed',
          },
        ].map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
            <Card
              hoverable
              className="glass"
              style={{
                textAlign: 'center',
                borderRadius: '20px',
                padding: '40px 30px',
                height: '100%',
                border: `1px solid ${item.color}40`,
                background: 'rgba(10, 14, 39, 0.6)',
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 20px ${item.color}40`,
                      `0 0 40px ${item.color}60`,
                      `0 0 20px ${item.color}40`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    padding: '20px',
                    borderRadius: '50%',
                    background: `${item.color}20`,
                    border: `2px solid ${item.color}40`,
                  }}
                >
                  {item.icon}
                </motion.div>
              </motion.div>
              <Title level={4} style={{ color: item.color, marginBottom: '16px', fontSize: '1.5rem' }}>
                {item.title}
              </Title>
              <Paragraph style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6 }}>
                {item.text}
              </Paragraph>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
    </motion.div>

    {/* CTA under Why Choose section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <Link to="/Products">
        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="large"
            style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
              border: 'none',
              color: '#0a0e27',
              fontWeight: 700,
              height: '48px',
              padding: '0 32px',
              fontSize: '14px',
              boxShadow: '0 10px 30px rgba(0, 240, 255, 0.4)',
            }}
          >
            View Products <FiArrowRight style={{ marginLeft: 8 }} />
          </Button>
        </motion.div>
      </Link>
      <Link to="/booking">
        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="large"
            style={{
              background: 'transparent',
              border: '2px solid rgba(0, 240, 255, 0.5)',
              color: '#00f0ff',
              fontWeight: 700,
              height: '48px',
              padding: '0 32px',
              fontSize: '14px',
            }}
          >
            Ask for Quote
          </Button>
        </motion.div>
      </Link>
    </motion.div>
    </div>
  );
};

const LatestProjectsSection = () => {
  return (
  <div style={{ position: 'relative', zIndex: 10, padding: '100px 30px', background: 'rgba(10, 14, 39, 0.6)' }}>
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Title
          level={2}
    style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Our Solutions
        </Title>
        <Paragraph style={{ color: '#cbd5e1', maxWidth: 700, margin: '0 auto', fontSize: '1.125rem' }}>
          Comprehensive IT services designed to transform your digital infrastructure
        </Paragraph>
      </motion.div>
    </div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Row gutter={[32, 32]} justify="center">
        {projects.map((project) => (
          <Col xs={24} sm={12} lg={8} key={project.title}>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
            <Card
              hoverable
              className="glass"
              style={{
                borderRadius: '20px',
                padding: '30px',
                height: '100%',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                background: 'rgba(10, 14, 39, 0.6)',
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '20px' }}
              >
                {project.icon}
              </motion.div>
              <Title level={4} style={{ color: '#00f0ff', marginBottom: '12px', fontSize: '1.5rem' }}>
                {project.title}
              </Title>
              <Paragraph style={{ color: '#cbd5e1', marginBottom: '20px', fontSize: '1rem' }}>
                {project.summary}
              </Paragraph>
              <List
                size="small"
                dataSource={project.details}
                renderItem={(item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <List.Item style={{ padding: '8px 0', border: 'none', color: '#94a3b8' }}>
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{ color: '#00f0ff', marginRight: '8px', display: 'inline-block' }}
                      >
                        ▹
                      </motion.span>
                      {item}
                    </List.Item>
                  </motion.div>
                )}
              />
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
    </motion.div>
    </div>
  );
};


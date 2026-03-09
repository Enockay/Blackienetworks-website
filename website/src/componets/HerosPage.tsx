import { useEffect, useRef, useState } from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClipboard } from 'react-icons/fi';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
  StatsBar,
  TestimonialsSection,
  PortfolioSection,
  AboutUsSection,
  PricingSection,
  BlogSection,
  ContactSection,
  BookingSection,
  HomeServicesSection,
} from './HomeSections';

const { Title, Paragraph } = Typography;

// Particle Network Animation Component
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    />
  );
};

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If portfolio section doesn't exist, navigate to Products page
      window.location.href = '/Products';
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        marginTop: '80px',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Cool Separator between Header and Hero */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '2px', 
        zIndex: 5,
        background: 'linear-gradient(90deg, transparent 0%, #2563eb 20%, #0066ff 50%, #2563eb 80%, transparent 100%)',
        boxShadow: '0 2px 10px rgba(37, 99, 235, 0.5)',
      }}>
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, #2563eb 20%, #0066ff 50%, #2563eb 80%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* Particle Network Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ParticleNetwork />
      </div>

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          padding: '32px 16px 44px',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Row gutter={[32, 48]} align="middle">
            {/* Left Side - Text Content */}
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Title
                  level={1}
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                    fontWeight: 900,
                    marginBottom: '20px',
                    color: '#1e293b',
                    lineHeight: 1.2,
                  }}
                  className="text-left sm:text-left"
                >
                  Reliable IT Solutions for Businesses & Organizations in Kenya
                </Title>

                <Paragraph
                  style={{
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                    color: '#475569',
                    marginBottom: '32px',
                    lineHeight: 1.8,
                  }}
                  className="text-left sm:text-left"
                >
                  From network infrastructure to custom software — we build the technology backbone your business needs to grow.
                </Paragraph>

                {/* CTA Buttons */}
                <div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-7"
                  style={{ marginBottom: '28px' }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="w-full sm:w-auto"
                  >
                    <Link to="/contactus" className="block w-full sm:w-auto">
                      <Button
                        type="primary"
                        size="large"
                        block={isMobile}
                        className="w-full sm:w-auto"
                        style={{
                          height: isMobile ? '48px' : '56px',
                          padding: isMobile ? '0 24px' : '0 32px',
                          fontSize: isMobile ? '14px' : '16px',
                          fontWeight: 700,
                          background: '#f97316',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#ea580c';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(249, 115, 22, 0.4)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#f97316';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.3)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <FiClipboard style={{ marginRight: 8 }} />
                        Get a Free IT Audit
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="large"
                      block={isMobile}
                      onClick={scrollToPortfolio}
                      className="w-full sm:w-auto"
                      style={{
                        height: isMobile ? '48px' : '56px',
                        padding: isMobile ? '0 24px' : '0 32px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: 600,
                        background: 'transparent',
                        border: '2px solid #2563eb',
                        color: '#2563eb',
                        borderRadius: '8px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      See Our Work
                      <FiArrowRight style={{ marginLeft: 8 }} />
                    </Button>
                  </motion.div>
                </div>

                {/* Trust Line */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-center"
                  style={{
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#64748b',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircleOutlined style={{ color: '#00ff88', fontSize: isMobile ? '14px' : '16px' }} />
                    <strong style={{ color: '#1e293b' }}>200+</strong> Projects Completed
                  </span>
                  <span style={{ color: '#cbd5e1' }} className="hidden sm:inline">·</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircleOutlined style={{ color: '#00ff88', fontSize: isMobile ? '14px' : '16px' }} />
                    <strong style={{ color: '#1e293b' }}>10+</strong> Years Experience
                  </span>
                  <span style={{ color: '#cbd5e1' }} className="hidden sm:inline">·</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircleOutlined style={{ color: '#00ff88', fontSize: isMobile ? '14px' : '16px' }} />
                    <strong style={{ color: '#1e293b' }}>24/7</strong> Support
                  </span>
                </motion.div>
              </motion.div>
            </Col>

            {/* Right Side - Image/Visual */}
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden flex items-center justify-center mt-8 lg:mt-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)',
                }}
              >
                {/* Network Diagram Illustration */}
                <div className="relative w-full h-full p-5 md:p-10">
                  {/* Animated Network Nodes */}
                  {[1, 2, 3, 4, 5, 6].map((_, idx) => {
                    const positions = [
                      { top: '20%', left: '20%' },
                      { top: '20%', right: '20%' },
                      { top: '50%', left: '10%' },
                      { top: '50%', right: '10%' },
                      { bottom: '20%', left: '30%' },
                      { bottom: '20%', right: '30%' },
                    ];
                    return (
                      <motion.div
                        key={idx}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.3,
                        }}
                        className="absolute w-10 h-10 md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl"
                        style={{
                          ...positions[idx],
                          background: 'linear-gradient(135deg, #2563eb 0%, #0066ff 100%)',
                          boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
                        }}
                      >
                        {idx + 1}
                      </motion.div>
                    );
                  })}

                  {/* Connection Lines */}
                  <svg
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none',
                    }}
                  >
                    {[
                      { x1: '20%', y1: '20%', x2: '80%', y2: '20%' },
                      { x1: '20%', y1: '20%', x2: '10%', y2: '50%' },
                      { x1: '80%', y1: '20%', x2: '90%', y2: '50%' },
                      { x1: '10%', y1: '50%', x2: '30%', y2: '80%' },
                      { x1: '90%', y1: '50%', x2: '70%', y2: '80%' },
                      { x1: '30%', y1: '80%', x2: '70%', y2: '80%' },
                    ].map((line, idx) => (
                      <motion.line
                        key={idx}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(0, 240, 255, 0.3)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: idx * 0.2, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    ))}
                  </svg>
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Stats / Social Proof Bar */}
      <StatsBar />

      {/* Services Overview Section */}
      <HomeServicesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Portfolio / Case Studies Section */}
      <PortfolioSection />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Pricing / Packages Section */}
      <PricingSection />

      {/* Blog / Resources Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Booking / Calendar Section */}
      <BookingSection />
    </div>
  );
};

// Keep the existing components below for compatibility
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

// Export other components that might be used elsewhere
export { containerVariants, itemVariants };

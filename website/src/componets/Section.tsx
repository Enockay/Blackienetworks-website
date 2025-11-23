import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaWifi,
  FaServer,
  FaCode,
  FaQuoteLeft,
  FaUserShield,
  FaCloud,
  FaMobileAlt,
} from "react-icons/fa";

import { Button, Card, Typography } from "antd";
import { FiZap, FiArrowRight } from "react-icons/fi";

const { Title, Paragraph } = Typography;

// Define service structure
interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

// Service Data with tech colors
const services: Service[] = [
  {
    icon: <FaWifi size={32} />,
    title: "Campus Wi-Fi Solutions",
    description:
      "We install and maintain secure high-speed Wi-Fi networks across hostels, lecture halls, libraries, and admin blocks. Our packages include setup of hotspot access points, captive portals for student login, and bandwidth control. Users can access internet at affordable rates starting from KES 10/hour, KES 45/day, and discounted weekly/monthly bundles.",
    color: "#00f0ff",
  },
  {
    icon: <FaServer size={32} />,
    title: "Network Infrastructure & Billing Systems",
    description:
      "We provide full-scale infrastructure: cabling, routers, MikroTik configs, load balancing, Radius billing, and user management systems for monetized or managed access.",
    color: "#0066ff",
  },
  {
    icon: <FaCode size={32} />,
    title: "Custom Software Development",
    description:
      "Tailored portals for learning, payments, attendance, and reporting. Includes responsive web/mobile UIs, admin dashboards, and APIs.",
    color: "#7c3aed",
  },
  {
    icon: <FaCloud size={32} />,
    title: "Cloud Services",
    description:
      "Hosting, backups, server deployment via AWS/DigitalOcean with 99.99% uptime. Ideal for high-traffic university systems.",
    color: "#00ff88",
  },
  {
    icon: <FaMobileAlt size={32} />,
    title: "Mobile App Integration",
    description:
      "Android/iOS apps for learning, communication, and reminders. Supports offline mode, push notifications, and brand styling.",
    color: "#ff006e",
  },
  {
    icon: <FaUserShield size={32} />,
    title: "IT Consultancy & VPN Services",
    description:
      "We audit, train, and optimize networks. Secure VPN (OpenVPN, WireGuard) for staff/student remote access and compliance.",
    color: "#00f0ff",
  },
];

const testimonials = [
  {
    name: "John Mwangi",
    quote:
      "Blackie Networks transformed our hostel experience. We now stream lectures and take exams without a single drop.",
    role: "4th Year ICT Student, Kenyatta University",
  },
  {
    name: "Esther Njeri",
    quote:
      "Before them, Zoom classes were a nightmare. Now I use cloud tools and attend all sessions buffer-free.",
    role: "Student, Mount Kenya University",
  },
  {
    name: "John Kamau",
    quote:
      "They installed our faculty network in under a week—top planning, delivery, and post-support.",
    role: "Dean of Engineering, TUK",
  },
  {
    name: "Faith Wambui",
    quote:
      "The KES 10/hour Wi-Fi changed everything. Affordable and works flawlessly during exams.",
    role: "Student Rep, Umoja Hostels",
  },
  {
    name: "Mr. Otieno",
    quote:
      "Their VPN setup was flawless and training exceptional. Highly recommend for secure network access.",
    role: "ICT Manager, NGO Kenya",
  },
];

export default function CompanySections() {
  const navigate = useNavigate();

  const handleBook = (service: Service) => {
    // Navigate to booking page with service pre-selected
    navigate('/booking', { state: { selectedService: service.title } });
  };

  return (
    <div style={{ 
      padding: '80px 20px', 
      marginTop: '80px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
      position: 'relative',
    }}>
      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
          aria-labelledby="products-heading"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '50px',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 600 }}>
              <FiZap style={{ display: 'inline', marginRight: 8 }} />
              Our Products & Services
            </span>
          </motion.div>

          <Title
            id="products-heading"
            level={1}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Revolutionary IT Solutions
          </Title>
          <Paragraph style={{ 
            color: '#cbd5e1', 
            fontSize: '1.125rem',
            lineHeight: 1.8,
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            We are a Chuka-based tech company revolutionizing internet access and digital systems. 
            From blazing-fast Wi-Fi to smart software and VPNs, we're your campus tech ally.
          </Paragraph>
        </motion.section>

        {/* Services Grid */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          aria-labelledby="services-heading"
          style={{ marginBottom: '100px' }}
        >
          <h2 id="services-heading" className="sr-only">Our Services</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card
                  hoverable
                  className="glass"
                  style={{
                    height: '100%',
                    borderRadius: '20px',
                    padding: '30px',
                    border: `1px solid ${service.color}40`,
                    background: 'rgba(10, 14, 39, 0.6)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${service.color}20`,
                    border: `2px solid ${service.color}40`,
                    borderRadius: '50%',
                    color: service.color,
                  }}>
                    {service.icon}
                  </div>
                  
                  <Title level={4} style={{ 
                    color: service.color, 
                    marginBottom: '16px',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}>
                    {service.title}
                  </Title>
                  
                  <Paragraph style={{ 
                    color: '#cbd5e1', 
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                    minHeight: '120px',
                  }}>
                    {service.description}
                  </Paragraph>
                  
                  <Button
                    onClick={() => handleBook(service)}
                    className="tech-button"
                    style={{
                      width: '100%',
                      background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`,
                      border: 'none',
                      color: '#0a0e27',
                      fontWeight: 700,
                      height: '44px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 8px 30px ${service.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Book Now <FiArrowRight style={{ marginLeft: 8 }} />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          aria-labelledby="testimonials-heading"
        >
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title
              id="testimonials-heading"
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
              What Our Clients Say
            </Title>
            <Paragraph style={{ color: '#cbd5e1', fontSize: '1.125rem' }}>
              Trusted by students, faculty, and businesses across Kenya
            </Paragraph>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card
                  className="glass"
                  style={{
                    height: '100%',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    background: 'rgba(10, 14, 39, 0.6)',
                  }}
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <FaQuoteLeft style={{ fontSize: '32px', color: '#00f0ff', marginBottom: '16px' }} />
                  <Paragraph 
                    style={{ 
                      color: '#cbd5e1', 
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                      marginBottom: '20px',
                    }}
                    itemProp="reviewBody"
                  >
                    "{t.quote}"
                  </Paragraph>
                  <footer style={{ textAlign: 'right' }} itemScope itemType="https://schema.org/Person">
                    <cite style={{ 
                      fontSize: '0.95rem', 
                      color: '#00f0ff', 
                      fontWeight: 700, 
                      fontStyle: 'normal',
                      display: 'block',
                      marginBottom: '4px',
                    }} itemProp="name">
                      — {t.name}
                    </cite>
                    <p style={{ 
                      fontSize: '0.8rem', 
                      color: '#94a3b8',
                      margin: 0,
                    }} itemProp="jobTitle">
                      {t.role}
                    </p>
                  </footer>
                  <div itemScope itemType="https://schema.org/Rating" style={{ display: 'none' }}>
                    <meta itemProp="ratingValue" content="5" />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Aggregate Rating Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Blackie Networks',
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: testimonials.length.toString(),
                  bestRating: '5',
                  worstRating: '1',
                },
              }),
            }}
          />
        </motion.section>
      </div>
    </div>
  );
}

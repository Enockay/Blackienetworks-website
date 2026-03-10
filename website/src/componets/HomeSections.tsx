import React, { useEffect, useRef, useState } from 'react';
import {
  Typography,
  Button,
  Row,
  Col,
  Card,
  Carousel,
  Form,
  Input,
  Select,
  message,
  Modal,
} from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import billingSystemImg from '../assets/billingsystem.png';
import blackieShieldImg from '../assets/blackieshield.png';
import glintParlourImg from '../assets/glintparlour.png';
import mikrotikRemoteImg from '../assets/mikrotikremote.png';
import aboutBgImg from '../assets/background.jpg';
import enockPhoto from '../assets/enock.jpeg';
import piusPhoto from '../assets/pius.png';
import larryPhoto from '../assets/larry.jpg';
import timothyPhoto from '../assets/timothy .jpg';
import firewallImg from '../assets/FireWall.jpg';
import onPremiseVsCloudImg from '../assets/on-premise-vs-cloud.jpg';
import criticalSignsImg from '../assets/5-Critical-Signs.jpg';
import phronesisImg from '../assets/phronesis.png';

const { Title, Paragraph } = Typography;
const { Option } = Select;

// Thin stats bar with animated numbers
type StatConfig = {
  id: string;
  icon: string;
  label: string;
  value: number;
  suffix?: string;
};

const StatItem: React.FC<{ stat: StatConfig }> = ({ stat }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 1200;
            const start = performance.now();

            const step = (timestamp: number) => {
              const progress = Math.min((timestamp - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out
              setDisplayValue(Math.floor(eased * stat.value));
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setDisplayValue(stat.value);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, stat.value]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 justify-center sm:justify-start"
      style={{ padding: '18px 12px', color: '#0f172a' }}
    >
      <span style={{ fontSize: 32 }}>{stat.icon}</span>
      <div style={{ lineHeight: 1.35 }}>
        <div style={{ fontSize: 34, fontWeight: 800 }}>
          {displayValue}
          {stat.suffix ?? '+'}
        </div>
        <div style={{ fontSize: 16, color: '#64748b' }}>{stat.label}</div>
      </div>
    </div>
  );
};

export const StatsBar: React.FC = () => {
  const stats: StatConfig[] = [
    {
      id: 'projects',
      icon: '🏢',
      value: 200,
      suffix: '+',
      label: 'Projects Delivered',
    },
    {
      id: 'satisfaction',
      icon: '😊',
      value: 98,
      suffix: '%',
      label: 'Client Satisfaction',
    },
    {
      id: 'years',
      icon: '📅',
      value: 10,
      suffix: '+',
      label: 'Years in IT',
    },
    {
      id: 'organizations',
      icon: '🌍',
      value: 50,
      suffix: '+',
      label: 'Organizations Served',
    },
  ];

  return (
    <div
      style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(15, 23, 42, 0.05)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-wrap sm:flex-nowrap justify-between gap-4 py-4 sm:py-5 md:py-6 overflow-x-auto"
          style={{ alignItems: 'center' }}
        >
          {stats.map((stat) => (
            <div key={stat.id} className="flex-1 min-w-[160px] flex justify-center">
              <StatItem stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// =========================
// Testimonials Section
// =========================

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo: string;
  photo: string;
  quote: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 'abc-sacco',
    name: 'John Mwangi',
    role: 'IT Manager',
    company: 'ABC Sacco, Nairobi',
    companyLogo: '/images/logos/abc-sacco.png',
    photo: '/images/testimonials/john-mwangi.jpg',
    quote:
      'Blackie Networks transformed our entire office network. What used to crash weekly now runs perfectly. Their team was professional, fast, and explained everything clearly.',
    rating: 5,
  },
  {
    id: 'green-hospital',
    name: 'Dr. Grace Achieng',
    role: 'Hospital Administrator',
    company: 'Green Valley Hospital',
    companyLogo: '/images/logos/green-valley.png',
    photo: '/images/testimonials/grace-achieng.jpg',
    quote:
      'Our Wi‑Fi and patient management systems are now seamless. Doctors, nurses, and patients connect without issues. Blackie Networks handled everything end‑to‑end.',
    rating: 5,
  },
  {
    id: 'city-school',
    name: 'Peter Njoroge',
    role: 'Principal',
    company: 'City Heights School',
    companyLogo: '/images/logos/city-heights.png',
    photo: '/images/testimonials/peter-njoroge.jpg',
    quote:
      'They designed and installed a campus‑wide network for over 500 students. Uptime has been outstanding and support is always just a call away.',
    rating: 5,
  },
  {
    id: 'hospitality',
    name: 'Linet Wanjiru',
    role: 'General Manager',
    company: 'Sunrise Hotel',
    companyLogo: '/images/logos/sunrise-hotel.png',
    photo: '/images/testimonials/linet-wanjiru.jpg',
    quote:
      'Guest complaints about Wi‑Fi dropped to almost zero after Blackie Networks stepped in. Their monitoring and support keeps us confident 24/7.',
    rating: 5,
  },
  {
    id: 'ngo',
    name: 'David Otieno',
    role: 'Programs Director',
    company: 'HopeBridge NGO',
    companyLogo: '/images/logos/hopebridge.png',
    photo: '/images/testimonials/david-otieno.jpg',
    quote:
      'From secure cloud storage to reliable connectivity across our field offices, Blackie Networks has been an incredible long‑term IT partner.',
    rating: 5,
  },
  {
    id: 'law-firm',
    name: 'Sarah Kabiru',
    role: 'Managing Partner',
    company: 'Kabiru & Associates',
    companyLogo: '/images/logos/kabiru-associates.png',
    photo: '/images/testimonials/sarah-kabiru.jpg',
    quote:
      'They migrated our systems to the cloud and implemented strong security controls. Our team can now work securely from anywhere.',
    rating: 5,
  },
];

const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      style={{
        background: '#f9fafb',
        padding: '64px 0',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title
            level={2}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: 8,
            }}
          >
            What Our Clients Say
          </Title>
          <Paragraph
            style={{
              maxWidth: 640,
              margin: '0 auto',
              color: '#64748b',
            }}
          >
            Real stories from organizations that trust Blackie Networks with their critical IT
            infrastructure.
          </Paragraph>
        </div>

        <Carousel autoplay autoplaySpeed={5000} dots draggable>
          {testimonials.map((t) => (
            <div key={t.id}>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-shrink-0">
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '999px',
                      padding: 4,
                      background:
                        'linear-gradient(135deg, rgba(56, 189, 248, 0.85), rgba(59, 130, 246, 0.85))',
                      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '999px',
                        background:
                          'radial-gradient(circle at 30% 0, #e0f2fe, rgba(15, 23, 42, 0.9))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f9fafb',
                        fontWeight: 800,
                        fontSize: 36,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {getInitials(t.name)}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div style={{ fontSize: 20, marginBottom: 12 }}>⭐⭐⭐⭐⭐</div>
                  <Paragraph
                    style={{
                      fontSize: '1.05rem',
                      color: '#0f172a',
                      lineHeight: 1.8,
                      marginBottom: 16,
                    }}
                  >
                    “{t.quote}”
                  </Paragraph>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ color: '#64748b', fontSize: 14 }}>
                    {t.role} · {t.company}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <img
                      src={t.companyLogo}
                      alt={t.company}
                      style={{ height: 28, objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

// =========================
// Portfolio / Case Studies
// =========================

type ProjectCategory = 'All' | 'Networking' | 'Software' | 'Cloud' | 'Mobile';

export type Project = {
  id: string;
  name: string;
  client: string;
  industry: string;
  category: Exclude<ProjectCategory, 'All'>;
  summary: string;
  thumbnail: string;
  caseStudyUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'blackiebilling',
    name: 'BlackieBilling ISP & Campus Billing Platform',
    client: 'Blackie Networks',
    industry: 'ISPs, Campuses, Estates',
    category: 'Software',
    summary:
      'End‑to‑end billing and customer portal for ISPs and shared networks, including prepaid and postpaid billing.',
    thumbnail: billingSystemImg,
    caseStudyUrl: '/case-studies/blackiebilling',
    liveUrl: 'https://admin.blackie-networks.com',
  },
  {
    id: 'blackieshield-vpn',
    name: 'Blackie Shield VPN Access',
    client: 'Remote & Branch Teams',
    industry: 'Cross‑industry',
    category: 'Networking',
    summary:
      'Always‑on VPN and secure remote access for staff and branches, with centralized control and monitoring.',
    thumbnail: blackieShieldImg,
    caseStudyUrl: '/case-studies/blackieshield-vpn',
    liveUrl: 'https://www.blackieshield.com',
  },
  {
    id: 'mikrotik-remote-access',
    name: 'MikroTik Remote Access Management',
    client: 'Blackie Networks NOC',
    industry: 'ISPs & Enterprises',
    category: 'Networking',
    summary:
      'Centralized, secure MikroTik remote access for routers and remote sites, with audit‑friendly access controls.',
    thumbnail: mikrotikRemoteImg,
    caseStudyUrl: '/case-studies/mikrotik-remote-access',
    liveUrl: 'https://mikrotik.blackie-networks.com',
  },
  {
    id: 'glint-ai-system',
    name: 'AI Customer Insights for Glint Parlour',
    client: 'Glint Parlour',
    industry: 'Beauty & Lifestyle',
    category: 'Software',
    summary:
      'AI‑powered hairstyle try‑on, booking and customer insights system for Glint Parlour – letting clients preview new looks, book stylists and receive smart reminders.',
    thumbnail: glintParlourImg,
    caseStudyUrl: '/case-studies/glint-ai-system',
    liveUrl: 'https://www.glintparlour.com',
  },
  {
    id: 'phronesis-tours',
    name: 'Phronesis Africa Safaris Platform (Ongoing)',
    client: 'Phronesis Africa Safaris',
    industry: 'Travel & Tourism',
    category: 'Software',
    summary:
      'Modern safari booking and discovery website for bespoke East Africa experiences, currently in active development with Blackie Networks.',
    thumbnail: phronesisImg,
    caseStudyUrl: '/case-studies/phronesis-tours',
    liveUrl: 'https://new.phronesistours.com/',
  },
];

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  const filters: ProjectCategory[] = ['All', 'Networking', 'Software', 'Cloud', 'Mobile'];

  return (
    <section
      id="portfolio"
      style={{
        background: '#ffffff',
        padding: '64px 0 72px',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title
            level={2}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: 8,
            }}
          >
            Recent Projects & Case Studies
          </Title>
          <Paragraph
            style={{
              maxWidth: 640,
              margin: '0 auto',
              color: '#64748b',
            }}
          >
            Explore how we have helped Kenyan businesses modernize their networks, software, and
            cloud infrastructure.
          </Paragraph>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeFilter === filter
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:text-sky-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <Row gutter={[24, 24]}>
          {filteredProjects.map((project) => (
            <Col key={project.id} xs={24} sm={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -6, boxShadow: '0 18px 45px rgba(15, 23, 42, 0.18)' }}
                transition={{ duration: 0.35 }}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      alt={project.name}
                      src={project.thumbnail}
                      style={{ height: 200, objectFit: 'cover', cursor: 'zoom-in' }}
                      onClick={() => setPreviewProject(project)}
                    />
                  }
                  style={{ borderRadius: 16, overflow: 'hidden' }}
                >
                  <Title level={4} style={{ marginBottom: 4 }}>
                    {project.name}
                  </Title>
                  <Paragraph style={{ marginBottom: 4, color: '#0f172a' }}>
                    {project.client} · {project.industry}
                  </Paragraph>
                  <Paragraph
                    style={{
                      fontSize: 14,
                      color: '#64748b',
                      marginBottom: project.liveUrl ? 6 : 12,
                    }}
                  >
                    {project.summary}
                  </Paragraph>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        marginBottom: 12,
                        fontSize: 13,
                        color: '#1d4ed8',
                        fontWeight: 500,
                      }}
                    >
                      {project.liveUrl.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  <Link to={project.caseStudyUrl}>
                    <Button
                      type="default"
                      icon={<FiArrowRight />}
                      style={{
                        borderRadius: 999,
                        background: '#ffffff',
                        borderColor: '#1d4ed8',
                        color: '#1d4ed8',
                        fontWeight: 600,
                      }}
                    >
                      View Case Study
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
        <Modal
          open={!!previewProject}
          onCancel={() => setPreviewProject(null)}
          footer={null}
          centered
          width="80vw"
          bodyStyle={{ padding: 0, backgroundColor: '#000' }}
        >
          {previewProject && (
            <img
              src={previewProject.thumbnail}
              alt={previewProject.name}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          )}
        </Modal>
      </div>
    </section>
  );
};

// =========================
// About Us Section
// =========================

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 'ceo',
    name: 'Enock Mwema',
    role: 'Founder & Chief Executive Officer',
    bio: 'Provides overall leadership and vision for Blackie Networks, guiding strategy, partnerships, and delivery of reliable IT solutions.',
    photo: enockPhoto,
  },
  {
    id: 'director',
    name: 'Pius Musomi',
    role: 'Director',
    bio: 'Oversees major projects, key client relationships, and ensures every deployment meets our technical and business standards.',
    photo: piusPhoto,
  },
  {
    id: 'timothy',
    name: 'Timothy',
    role: 'IT Support & Field Operations Lead',
    bio: 'Leads onsite installations, support visits, and day‑to‑day monitoring for networks and systems across our client sites.',
    photo: timothyPhoto,
  },
  {
    id: 'larry',
    name: 'Larry Kinuthia',
    role: 'Proficient Java Developer',
    bio: 'Experienced Java developer with a strong track record building robust backend services and full Java projects for clients.',
    photo: larryPhoto,
  },
];

const coreValues = [
  {
    id: 'integrity',
    icon: '🤝',
    title: 'Integrity',
    description: 'We recommend only what you truly need and stand by our work long after deployment.',
  },
  {
    id: 'innovation',
    icon: '💡',
    title: 'Innovation',
    description: 'We stay ahead of modern networking, cloud, and software trends so you don’t have to.',
  },
  {
    id: 'reliability',
    icon: '🛡️',
    title: 'Reliability',
    description: '24/7 monitoring and support so your systems are up when you need them most.',
  },
  {
    id: 'partnership',
    icon: '🤝',
    title: 'Partnership',
    description: 'We work as an extension of your team, not just as a one‑off vendor.',
  },
];

export const AboutUsSection: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        background: '#f9fafb',
        padding: '72px 0',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <div
              style={{
                borderRadius: 0,
                overflow: 'hidden',
                boxShadow: '0 18px 45px rgba(15, 23, 42, 0.25)',
              }}
            >
              <img
                src={aboutBgImg}
                alt="Blackie Networks team"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Title level={2} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
              About Blackie Networks
            </Title>
            <Paragraph style={{ color: '#4b5563', fontSize: '0.98rem', marginBottom: 16 }}>
              Blackie Networks was founded in Nairobi to solve a simple but painful problem:
              businesses were investing in IT systems that constantly failed them. We set out to
              build a team that combines deep technical expertise with honest, human support.
            </Paragraph>
            <Paragraph style={{ color: '#4b5563', fontSize: '0.98rem', marginBottom: 16 }}>
              Today, we design, install, and support networks and software for organizations across
              Kenya — from schools, hospitals, and NGOs to fast‑growing SMEs and enterprises.
            </Paragraph>
            <Paragraph
              style={{
                color: '#0f172a',
                fontWeight: 700,
                fontSize: '1rem',
                marginBottom: 20,
              }}
            >
              Mission: To make world‑class IT infrastructure accessible to every Kenyan business.
            </Paragraph>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              {coreValues.map((value) => (
                <Col key={value.id} xs={12} sm={6}>
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: 16,
                      padding: '14px 12px',
                      textAlign: 'center',
                      boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)',
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{value.icon}</div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: '#0f172a',
                        marginBottom: 4,
                      }}
                    >
                      {value.title}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{value.description}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Team members */}
        <div style={{ marginTop: 40 }}>
          <Title level={3} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
            Meet the Team
          </Title>
          <Row gutter={[24, 24]}>
            {teamMembers.map((member) => (
              <Col key={member.id} xs={24} sm={8}>
                <motion.div
                  className="relative"
                  style={{ perspective: 1000 }}
                  whileHover={{ y: -8, boxShadow: '0 18px 45px rgba(15, 23, 42, 0.22)' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      minHeight: 260,
                      borderRadius: 20,
                      boxShadow: '0 14px 35px rgba(15, 23, 42, 0.16)',
                      background: '#ffffff',
                      padding: 28,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '999px',
                          overflow: 'hidden',
                          marginBottom: 12,
                        }}
                      >
                        <img
                          src={member.photo}
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: member.id === 'larry' ? 'center 20%' : 'center',
                          }}
                        />
                      </div>
                      <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                        {member.name}
                      </div>
                      <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>
                        {member.role}
                      </div>
                      <Paragraph style={{ fontSize: 13, color: '#4b5563' }}>
                        {member.bio}
                      </Paragraph>
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

// =========================
// Pricing / Packages
// =========================

type PricingPlan = {
  id: string;
  name: string;
  audience: string;
  priceLabel: string;
  ctaLabel: string;
  ctaHref: string;
  icon: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: 'website',
    name: 'Website Essentials',
    audience: 'Ideal for businesses that need a modern, fast website or landing page.',
    priceLabel: 'Request a quote for your site',
    ctaLabel: 'Request Website Quote',
    ctaHref: '#contact',
    icon: '🌐',
    features: [
      'Custom-designed responsive website',
      'Contact forms and lead capture',
      'Basic on‑page SEO & analytics setup',
      'Content management training for your team',
      'Cloud deployment & hosting on your provider (billed to your account)',
      'Ongoing site maintenance and security updates',
    ],
  },
  {
    id: 'business-apps',
    name: 'Business Apps Bundle',
    audience: 'For growing teams that need billing, VPN access, and dashboards in one place.',
    priceLabel: 'Custom quote based on modules',
    ctaLabel: 'Talk to Sales',
    ctaHref: '#contact',
    icon: '📊',
    badge: 'Most Popular',
    isPopular: true,
    features: [
      'BlackieBilling ISP or campus billing platform',
      'Blackie Shield VPN access for remote teams',
      'Admin dashboards & reporting for management',
      'Integration with payments (M‑Pesa, cards, etc.)',
      'Cloud deployment & hosting on AWS, GCP, or DigitalOcean (customer account)',
      'Managed updates and monitoring for all deployed apps',
    ],
  },
  {
    id: 'enterprise-platforms',
    name: 'Enterprise Platforms',
    audience: 'For organizations with multiple branches and mission‑critical workflows.',
    priceLabel: 'Let’s design a tailored platform',
    ctaLabel: 'Book Strategy Call',
    ctaHref: '#booking',
    icon: '🏢',
    features: [
      'End‑to‑end system architecture & UX design',
      'Multi‑tenant, multi‑branch access controls',
      '24/7 monitoring, SLAs, and dedicated account team',
      'Roll‑out, training, and long‑term support',
      'Hybrid / cloud deployment strategy and hosting at customer cost',
      'Full system maintenance, incident response, and roadmap reviews',
    ],
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section
      id="pricing"
      style={{
        background: '#ffffff',
        padding: '72px 0',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title
            level={2}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: 8,
            }}
          >
            Software Products & Plans
          </Title>
          <Paragraph style={{ maxWidth: 640, margin: '0 auto', color: '#64748b' }}>
            Choose the software bundle that matches where you are today — from a first website to
            full business platforms. Every product is delivered with implementation and support.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {pricingPlans.map((plan) => (
            <Col key={plan.id} xs={24} md={8}>
              <Card
                style={{
                  borderRadius: 20,
                borderColor: plan.isPopular ? '#0ea5e9' : 'rgba(148, 163, 184, 0.35)',
                boxShadow: plan.isPopular
                  ? '0 24px 60px rgba(37, 99, 235, 0.35)'
                  : '0 16px 40px rgba(15, 23, 42, 0.14)',
                transform: plan.isPopular ? 'translateY(-8px)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        'radial-gradient(circle at 20% 0, rgba(56,189,248,0.95), rgba(59,130,246,1))',
                      color: '#ecfeff',
                      fontSize: 22,
                    }}
                  >
                    {plan.icon}
                  </div>
                  {plan.badge && (
                    <div
                      style={{
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: '#0ea5e9',
                        color: '#e0f2fe',
                        fontSize: 11,
                        fontWeight: 700,
                        alignSelf: 'center',
                      }}
                    >
                      {plan.badge}
                    </div>
                  )}
                </div>

                <Title level={3} style={{ marginBottom: 4 }}>
                  {plan.name}
                </Title>
                <Paragraph style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                  {plan.audience}
                </Paragraph>
                <Paragraph
                  style={{
                    fontWeight: 800,
                    fontSize: 18,
                    color: '#0f172a',
                    marginBottom: 16,
                  }}
                >
                  {plan.priceLabel}
                </Paragraph>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16, fontSize: 13 }}>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <span role="img" aria-hidden="true">
                        ✅
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  type="default"
                  block
                  style={{
                    borderRadius: 999,
                    borderColor: '#1d4ed8',
                    background: '#ffffff',
                    color: '#1d4ed8',
                    fontWeight: 600,
                  }}
                  href={plan.ctaHref}
                >
                  {plan.ctaLabel}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

// =========================
// Blog / Resources
// =========================

type BlogPost = {
  id: string;
  title: string;
  date: string;
  image: string;
  url: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 'firewall-2025',
    title: 'Why Every Kenyan Business Needs a Firewall in 2025',
    date: 'January 2025',
    image: firewallImg,
    url: '/blog/why-every-kenyan-business-needs-a-firewall-in-2025',
  },
  {
    id: 'cloud-vs-onprem',
    title: 'Cloud vs On‑Premise: What’s Right for Your Organization?',
    date: 'February 2025',
    image: onPremiseVsCloudImg,
    url: '/blog/cloud-vs-on-premise-whats-right-for-your-organization',
  },
  {
    id: 'network-upgrade',
    title: '5 Signs Your Business Network Needs an Upgrade',
    date: 'March 2025',
    image: criticalSignsImg,
    url: '/blog/5-signs-your-business-network-needs-an-upgrade',
  },
];

export const BlogSection: React.FC = () => {
  return (
    <section
      id="resources"
      style={{
        background: '#f9fafb',
        padding: '72px 0',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title
            level={2}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: 8,
            }}
          >
            IT Tips & Resources for Kenyan Businesses
          </Title>
          <Paragraph style={{ maxWidth: 640, margin: '0 auto', color: '#64748b' }}>
            Practical guides to help you secure, modernize, and scale your IT systems.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {blogPosts.map((post) => (
            <Col key={post.id} xs={24} md={8}>
              <Card
                hoverable
                cover={
                  <img
                    alt={post.title}
                    src={post.image}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                style={{ borderRadius: 18, overflow: 'hidden' }}
              >
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{post.date}</div>
                <Title level={4} style={{ marginBottom: 8 }}>
                  {post.title}
                </Title>
                <Link to={post.url}>
                  <Button type="link" style={{ paddingLeft: 0 }}>
                    Read More
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

// =========================
// Contact Section
// =========================

export const ContactSection: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to send your message. Please try again.');
      }

      message.success("Thank you! We've received your message and will respond within 2 hours.");
      form.resetFields();
    } catch (error: any) {
      console.error('Contact form submission failed:', error);
      message.error(
        error?.message || 'Sorry, something went wrong while sending your message. Please try again.'
      );
    }
    finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: '#ffffff',
        padding: '72px 0',
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={14}>
            <Title level={2} style={{ fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
              Tell Us About Your Project
            </Title>
            <Paragraph style={{ color: '#64748b', marginBottom: 24 }}>
              Share a few details and our team will get back to you within 2 working hours.
            </Paragraph>

            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                  >
                    <Input placeholder="e.g. John Mwangi" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="company"
                    label="Organization / Company Name"
                    rules={[{ required: true, message: 'Please enter your organization name' }]}
                  >
                    <Input placeholder="e.g. ABC Sacco" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please enter your email address' },
                      { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                  >
                    <Input placeholder="you@example.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <Input placeholder="+254 7XX XXX XXX" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="service"
                    label="Service Interested In"
                    rules={[{ required: true, message: 'Please select a service' }]}
                  >
                    <Select placeholder="Select a service">
                      <Option value="network-setup">Network Setup</Option>
                      <Option value="software-dev">Software Development</Option>
                      <Option value="cloud">Cloud</Option>
                      <Option value="mobile-app">Mobile App</Option>
                      <Option value="it-support">IT Support</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="budget" label="Budget Range (optional)">
                    <Select allowClear placeholder="Select a range">
                      <Option value="below-100k">Below KES 100,000</Option>
                      <Option value="100k-500k">KES 100,000 – 500,000</Option>
                      <Option value="500k-1m">KES 500,000 – 1,000,000</Option>
                      <Option value="above-1m">Above KES 1,000,000</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="message"
                label="Message / Project Description"
                rules={[{ required: true, message: 'Please tell us a bit about your project' }]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="Share your current setup, challenges, and what you would like to achieve."
                />
              </Form.Item>

              <Button
                type="default"
                htmlType="submit"
                size="large"
                loading={submitting}
                style={{
                  borderRadius: 999,
                  padding: '0 32px',
                  marginTop: 4,
                  borderColor: '#0f172a',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontWeight: 600,
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
                }}
              >
                Send Message
              </Button>
            </Form>
          </Col>

          <Col xs={24} md={10}>
            <div
              style={{
                background: '#ffffff',
                color: '#0f172a',
                borderRadius: 20,
                padding: 24,
              }}
            >
              <Title level={4} style={{ color: '#0f172a', marginBottom: 16 }}>
                Contact Details
              </Title>
              <Paragraph style={{ marginBottom: 8 }}>📍 Parklands, Nairobi, Kenya</Paragraph>
              <Paragraph style={{ marginBottom: 8 }}>
                📞{' '}
                <a href="tel:+254796869402" style={{ color: '#0ea5e9' }}>
                  +254 796 869 402
                </a>
              </Paragraph>
              <Paragraph style={{ marginBottom: 8 }}>
                📧{' '}
                <a href="mailto:support@blackie-networks.com" style={{ color: '#0ea5e9' }}>
                  support@blackie-networks.com
                </a>
              </Paragraph>
              <Paragraph style={{ marginBottom: 16 }}>🕒 Monday – Friday, 8am – 6pm</Paragraph>

              <div style={{ marginBottom: 16 }}>
                <a
                  href="https://wa.me/254796869402"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    borderRadius: 999,
                    background: '#22c55e',
                    color: '#ecfdf5',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  💬 Chat with us on WhatsApp
                </a>
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                  Facebook
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                  Twitter
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </div>

              <div
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(148, 163, 184, 0.4)',
                }}
              >
                <iframe
                  title="Blackie Networks Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.807!2d36.817!3d-1.286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNairobi!5e0!3m2!1sen!2ske!4v1700000000000"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

// =========================
// Booking / Calendar
// =========================

export const BookingSection: React.FC = () => {
  // Booking section temporarily disabled until a new calendar link is configured.
  // Keeping the component export so imports elsewhere don't break.
  return null;
};

// Services overview cards on the home page
type HomeServiceConfig = {
  id: string;
  icon: string;
  name: string;
  description: string;
  idealFor: string;
  href: string;
  liveUrl?: string;
  liveLabel?: string;
};

const homeServices: HomeServiceConfig[] = [
  {
    id: 'network-billing',
    icon: '🌐',
    name: 'Network Setup & Billing Systems',
    description:
      'End‑to‑end network design, cabling, MikroTik configuration, and ISP / campus billing systems that keep your internet stable and revenue flowing.',
    idealFor: 'Ideal for ISPs, campuses, Saccos, estates, and co‑working spaces.',
    href: '/services/network-billing',
  },
  {
    id: 'web-development',
    icon: '💻',
    name: 'Web Development',
    description:
      'Modern websites, portals, and internal systems built for your workflows — from booking systems and dashboards to full business management tools.',
    idealFor: 'Best for businesses, schools, Saccos, and organizations that need custom software.',
    href: '/services/web-development',
  },
  {
    id: 'cloud-services',
    icon: '☁️',
    name: 'Cloud Infrastructure & Hosting',
    description:
      'Design, migration, and management of cloud infrastructure on AWS, DigitalOcean and others — including backups, security, and 24/7 monitoring.',
    idealFor: 'Great for teams that want reliable hosting and room to scale without downtime.',
    href: '/services/cloud-hosting',
  },
  {
    id: 'ai-systems',
    icon: '🤖',
    name: 'AI Systems & Automation',
    description:
      'Design and integration of AI tools that automate support, reporting, and decision‑making — tailored to your data and business processes.',
    idealFor: 'Perfect for organizations that want to save time and unlock smarter insights.',
    href: '/services/ai-systems',
  },
  {
    id: 'mobile-apps',
    icon: '📱',
    name: 'Mobile App Development',
    description:
      'Android and iOS apps for customers or internal teams — fully integrated with your web systems, billing, and cloud infrastructure.',
    idealFor: 'Ideal for brands and service providers that need on‑the‑go access for users.',
  href: '/services/mobile-apps',
  },
  {
    id: 'vpn-blackieshield',
    icon: '🛡️',
    name: 'VPN Solutions – Blackie Shield',
    description:
      'Always‑on VPN and secure remote access powered by our Blackie Shield platform, keeping your teams and branches safely connected.',
    idealFor:
      'Ideal for organizations with remote staff, multiple branches, or field teams that need secure access from anywhere.',
  href: '/services/vpn-blackieshield',
    liveUrl: 'https://www.blackieshield.com',
    liveLabel: 'www.blackieshield.com',
  },
];

export const HomeServicesSection: React.FC = () => {
  return (
    <section
      id="home-services"
      style={{
        background: '#f5f7fb',
        padding: '72px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(191, 219, 254, 0.6) 1px, transparent 0)',
          backgroundSize: '26px 26px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title
            level={2}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: 8,
            }}
          >
            Services We Provide
          </Title>
          <Paragraph
            style={{
              maxWidth: 640,
              margin: '0 auto',
              color: '#64748b',
              fontSize: '0.95rem',
            }}
          >
            From on‑premise networks to cloud and software — Blackie Networks is your single partner
            for modern, reliable IT infrastructure.
          </Paragraph>
        </div>

        {/* Services card grid */}
        <div
          style={{
            borderRadius: 28,
            background:
              'radial-gradient(circle at top left, rgba(56, 189, 248, 0.1), transparent 55%), #ffffff',
            boxShadow: '0 28px 80px rgba(15, 23, 42, 0.12)',
          padding: '36px 26px 32px',
          }}
        >
          <Row gutter={[24, 24]}>
            {homeServices.map((service) => (
              <Col
                key={service.id}
                xs={24}
                sm={12}
                lg={8}
                style={{
                  display: 'flex',
                  height: '100%',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{
                    y: -6,
                  }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="h-full"
                >
                  <div
                    className="group"
                    style={{
                      position: 'relative',
                    height: '100%',
                    padding: '30px 24px 24px',
                    borderRadius: 22,
                      background:
                        'radial-gradient(circle at top left, rgba(219, 234, 254, 0.9), transparent 55%), #ffffff',
                      overflow: 'hidden',
                    boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
                    }}
                  >
                    {/* Accent line */}
                    <motion.div
                      className="absolute left-0 top-0 h-1"
                      style={{
                        width: '0%',
                        background:
                          'linear-gradient(90deg, #0ea5e9, #38bdf8, transparent)',
                      }}
                      whileHover={{ width: '100%' }}
                    />

                    {/* Icon box */}
                    <motion.div
                      whileHover={{
                        y: -3,
                        boxShadow:
                          '0 18px 60px rgba(56, 189, 248, 0.35), 0 0 0 1px rgba(34, 211, 238, 0.4)',
                      }}
                      transition={{ duration: 0.25 }}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        background:
                          'radial-gradient(circle at 30% 0, rgba(56, 189, 248, 0.95), rgba(59,130,246,1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 18,
                        fontSize: 24,
                        color: '#ecfeff',
                      }}
                    >
                      {service.icon}
                    </motion.div>

                    <Title
                      level={4}
                      style={{
                        marginBottom: 10,
                        color: '#0f172a',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {service.name}
                    </Title>

                    <Paragraph
                      style={{
                        fontSize: '0.95rem',
                        color: '#4b5563',
                        marginBottom: service.liveUrl ? 6 : 10,
                      }}
                    >
                      {service.description}
                    </Paragraph>
                    {service.liveUrl && (
                      <a
                        href={service.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          marginBottom: 10,
                          fontSize: 12,
                          color: '#1d4ed8',
                          fontWeight: 500,
                        }}
                      >
                        {service.liveLabel ?? service.liveUrl}
                      </a>
                    )}

                    {/* Target audience tag */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 9px',
                        borderRadius: 999,
                        background: 'rgba(219, 234, 254, 0.9)',
                        color: '#1d4ed8',
                        fontSize: 11,
                        marginBottom: 16,
                      }}
                    >
                      <span style={{ fontSize: 14 }}>🎯</span>
                      <span>{service.idealFor}</span>
                    </div>

                    <Link to={service.href} style={{ textDecoration: 'none' }}>
                      <Button
                        type="default"
                        size="middle"
                        style={{
                          borderRadius: 999,
                          borderColor: 'rgba(59, 130, 246, 0.9)',
                          fontWeight: 600,
                          padding: '0 20px',
                          background: 'transparent',
                          color: '#ffffff',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            'linear-gradient(90deg, rgba(191, 219, 254, 0.9), rgba(56, 189, 248, 0.12))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <span>Learn More</span>
                        <FiArrowRight
                          style={{
                            marginLeft: 6,
                            transition: 'transform 0.25s ease',
                          }}
                          className="group-hover:translate-x-1"
                        />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Bottom CTA strip */}
        <div
          style={{
            marginTop: 32,
            borderRadius: 999,
            padding: '12px 20px',
            background:
              'linear-gradient(90deg, rgba(191, 219, 254, 0.9), rgba(59, 130, 246, 0.16))',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <Paragraph
            style={{
              margin: 0,
              color: '#0f172a',
              fontSize: '0.95rem',
            }}
          >
            Not sure which service fits you?{' '}
            <strong>Book a free consultation and we’ll guide you.</strong>
          </Paragraph>
          <Button
            type="primary"
            style={{
              borderRadius: 999,
              padding: '0 22px',
              background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
              border: 'none',
              boxShadow: '0 12px 35px rgba(59, 130, 246, 0.45)',
            }}
            href="#booking"
          >
            Book Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};


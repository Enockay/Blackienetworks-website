// Enhanced HeroSection with Pro Styling, Animation & SVG Curve
import { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  List,
  Button,
  Layout,
  Menu,
  Avatar,
  Dropdown,
} from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LaptopOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import heroImage1 from '../assets/networking1.jpg';
import heroImage2 from '../assets/networking2.jpg';
import heroImage3 from '../assets/networking3.jpg';

const { Title, Paragraph } = Typography;
const { Header, Content } = Layout;

const projects = [
  {
    title: 'Project Alpha',
    summary: 'Revolutionizing user experience for a global client.',
    details: [
      'Developed a scalable web and mobile platform to enhance user engagement.',
      'Integrated advanced UX/UI design principles to boost usability and reduce user friction.',
      'Implemented personalized content algorithms that increased user retention by 30%.',
      'Enhanced performance with a modular architecture, supporting over 1 million monthly active users.',
      'Provided training for the client’s in-house team to ensure smooth adoption and ongoing support.'
    ]
  },
  {
    title: 'Network Expansion',
    summary: 'Advanced network setup for a corporate campus.',
    details: [
      'Designed a secure and high-speed network to support 500+ employees.',
      'Implemented advanced firewall configurations.',
      'Optimized Wi-Fi coverage for seamless communication.',
      'Integrated VLANs and traffic segmentation.',
      'Provided ongoing monitoring and maintenance.'
    ]
  },
  {
    title: 'IT Transformation',
    summary: 'Optimizing IT processes for enhanced productivity.',
    details: [
      'Conducted an IT audit for inefficiencies.',
      'Migrated core operations to the cloud.',
      'Automated repetitive tasks.',
      'Implemented a help desk system.',
      'Delivered comprehensive documentation and training.'
    ]
  }
];

const userMenu = (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>Profile</Menu.Item>
    <Menu.Item key="2" icon={<SettingOutlined />}>Settings</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" icon={<LogoutOutlined />} danger>Logout</Menu.Item>
  </Menu>
);

export const HeroSection = () => {
  const images = [heroImage1, heroImage2, heroImage3];
  const [backgroundImage, setBackgroundImage] = useState(images[0]);
  const [fadeClass, setFadeClass] = useState('opacity-100');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFadeClass('opacity-0');
      setTimeout(() => {
        index = (index + 1) % images.length;
        setBackgroundImage(images[index]);
        setFadeClass('opacity-100');
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Title level={4} style={{ margin: 0 }}>Welcome</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <BellOutlined style={{ fontSize: 20 }} />
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content>
          <div style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${fadeClass}`}
              style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              role="img"
              aria-label="Network infrastructure and IT solutions background image"
            ></div>
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.55)' }}>
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} style={{ maxWidth: 800, textAlign: 'center', padding: 20, color: 'white' }}>
                <Title level={2} style={{ color: 'white' }}>Welcome to Blackie-Networks</Title>
                <Paragraph style={{ fontSize: '18px', color: '#f0f0f0' }}>
                  Driving innovation in software development, network infrastructure, and IT consulting.
                </Paragraph>
                <Paragraph style={{ fontSize: '16px', color: '#e0e0e0', marginTop: 20 }}>
                  We bring affordable, high-speed internet to campus students. No more buffering—just reliable, wallet-friendly Wi-Fi. Our 24/7 support team is always available.
                </Paragraph>
                <div style={{ marginTop: 30 }}>
                  <Link to="/products">
                    <Button type="primary" size="large" style={{ marginRight: 16 }}>Explore Services</Button>
                  </Link>
                  <Link to="/products">
                    <Button size="large">Book a Service</Button>
                  </Link>
                </div>
              </motion.div>

            </div>
            {/* Bottom Curve Separator with Gradient */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-10">
              <svg
                className="relative block w-[calc(150%+1.3px)] h-[100px]"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
              >
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f9fafb" />
                    <stop offset="100%" stopColor="#edf2f7" />
                  </linearGradient>
                </defs>
                <path
                  d="M985.66,65.54C914.12,91.09,836.77,104.77,756,105.52c-80.69.74-157.57-11.32-231.11-36.31C449,43.9,373.6,7.45,292,2.82,222.41-1.41,153.66,14.29,88.49,35.62,59.9,44.67,30.86,54.5,0,60V0H1200V27.35C1138.07,44.57,1061.86,39.5,985.66,65.54Z"
                  fill="url(#curveGradient)"
                />
              </svg>
            </div>


          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <AchievementsAndSpecializations />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <LatestProjectsSection />
          </motion.div>
        </Content>

      </Layout>

    </Layout>
  );
};

const AchievementsAndSpecializations = () => (
  <div
    style={{
      padding: '80px 30px',
      background: 'linear-gradient(to bottom right, #f9fafb, #edf2f7)', // light gradient
    }}
  >
    <Typography style={{ textAlign: 'center' }}>
      <Title level={3} style={{ color: '#1f2937', fontWeight: 700 }}>
        🏆 Our Achievements & Specializations
      </Title>
      <Paragraph style={{ color: '#4b5563', maxWidth: 720, margin: '0 auto', fontSize: 16 }}>
        Dedicated to delivering high-speed internet to students at an affordable price — empowering campus communities to stay connected and succeed.
      </Paragraph>
    </Typography>

    <Row gutter={[32, 32]} justify="center" style={{ marginTop: 60 }}>
      {[
        {
          icon: (
            <LaptopOutlined
              style={{
                fontSize: '40px',
                color: '#1d4ed8',
                background: '#e0f2fe',
                borderRadius: '50%',
                padding: 12,
              }}
            />
          ),
          title: 'High-Speed Network',
          text: 'Fast, reliable network supporting students’ academic and personal needs at Chuka University.',
        },
        {
          icon: (
            <TeamOutlined
              style={{
                fontSize: '40px',
                color: '#d97706',
                background: '#fef3c7',
                borderRadius: '50%',
                padding: 12,
              }}
            />
          ),
          title: 'Affordable for Students',
          text: 'Low-cost services ensure students stay connected without breaking the bank.',
        },
        {
          icon: (
            <TrophyOutlined
              style={{
                fontSize: '40px',
                color: '#16a34a',
                background: '#dcfce7',
                borderRadius: '50%',
                padding: 12,
              }}
            />
          ),
          title: 'Milestones Reached',
          text: 'Over 1,000 student subscriptions with consistent positive feedback.',
        },
      ].map((item, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.25, duration: 0.7 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card
              hoverable
              style={{
                textAlign: 'center',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                padding: '30px 20px',
                background: 'white',
                border: '1px solid #f0f0f0',
              }}
            >
              <div style={{ marginBottom: 20 }}>{item.icon}</div>
              <Title level={4} style={{ color: '#111827', marginBottom: 10 }}>
                {item.title}
              </Title>
              <Paragraph style={{ color: '#4b5563', fontSize: 15 }}>{item.text}</Paragraph>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </div>
);


const LatestProjectsSection = () => (
  <div
    style={{
      padding: '80px 30px',
      background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)', // subtle Tailwind gray-50 to gray-200
    }}
  >
    <Typography style={{ textAlign: 'center' }}>
      <Title level={3} style={{ color: '#1f2937', fontWeight: 700 }}>
        🌟 Our Latest Projects
      </Title>
      <Paragraph style={{ color: '#4b5563', maxWidth: 700, margin: '0 auto', fontSize: '16px' }}>
        Explore some of our most impactful client work — designed to deliver measurable results and superior user experiences.
      </Paragraph>
    </Typography>

    <Row gutter={[32, 32]} justify="center" style={{ marginTop: 50 }}>
      {projects.map((project, index) => (
        <Col xs={24} sm={12} lg={8} key={project.title}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card
              hoverable
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
                border: '1px solid #e5e7eb',
                padding: '20px',
              }}
            >
              <Title level={4} style={{ marginBottom: 10, color: '#111827' }}>
                {project.title}
              </Title>
              <Paragraph style={{ color: '#374151', fontSize: '15px' }}>
                {project.summary}
              </Paragraph>
              <List
                size="small"
                dataSource={project.details}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none', color: '#4b5563' }}>
                    <span>• {item}</span>
                  </List.Item>
                )}
              />
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </div>
);

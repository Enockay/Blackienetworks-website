// Redesigned HeroSection with Ant Design + Dashboard Component
import  { useEffect, useState } from 'react';
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
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>Welcome</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <BellOutlined style={{ fontSize: 20 }} />
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content>
          <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${fadeClass}`}
              style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.75)' }}>
              <div style={{ maxWidth: 800, textAlign: 'center', padding: 20 }}>
                <Title level={1} style={{ color: '#1f1f1f' }}>Welcome to Blackie-Networks</Title>
                <Paragraph style={{ fontSize: '18px', color: '#595959' }}>
                  Driving innovation in software development, network infrastructure, and IT consulting.
                </Paragraph>
                <Paragraph style={{ fontSize: '16px', color: '#262626', marginTop: 20 }}>
                  We bring affordable, high-speed internet to campus students. No more buffering—just reliable, wallet-friendly Wi-Fi. Our 24/7 support team is always available.
                </Paragraph>
                <div style={{ marginTop: 30 }}>
                  <Link to="/service">
                    <Button type="primary" size="large" style={{ marginRight: 16 }}>Explore Services</Button>
                  </Link>
                  <Link to="/contact us">
                    <Button size="large">Book a Service</Button>
                  </Link>
                </div>
              </div>
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
  <div style={{ padding: '60px 30px', backgroundColor: '#ffffff' }}>
    <Typography style={{ textAlign: 'center' }}>
      <Title level={2} style={{ color: '#1f1f1f' }}>Our Achievements & Specializations</Title>
      <Paragraph style={{ color: '#595959', maxWidth: 700, margin: '0 auto' }}>
        Dedicated to delivering high-speed internet to students at an affordable price,
        empowering campus communities to stay connected and succeed.
      </Paragraph>
    </Typography>
    <Row gutter={[24, 24]} justify="center" style={{ marginTop: 40 }}>
      {[{
        icon: <LaptopOutlined style={{ fontSize: '36px', color: '#1890ff' }} />, title: 'High-Speed Network',
        text: 'Fast, reliable network supporting students’ academic and personal needs at Chuka University.'
      }, {
        icon: <TeamOutlined style={{ fontSize: '36px', color: '#faad14' }} />, title: 'Affordable for Students',
        text: 'Low-cost services ensure students stay connected without breaking the bank.'
      }, {
        icon: <TrophyOutlined style={{ fontSize: '36px', color: '#52c41a' }} />, title: 'Milestones Reached',
        text: 'Over 1,000 student subscriptions with consistent positive feedback.'
      }].map((item, index) => (
        <Col xs={24} md={8} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <Card hoverable style={{ textAlign: 'center' }}>
              {item.icon}
              <Title level={4}>{item.title}</Title>
              <Paragraph>{item.text}</Paragraph>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </div>
);

const LatestProjectsSection = () => (
  <div style={{ padding: '60px 30px', backgroundColor: '#f0f2f5' }}>
    <Title level={4} style={{ textAlign: 'center', color: '#1f1f1f' }}>Our Latest Projects</Title>
    <Row gutter={[24, 24]} justify="center">
      {projects.map((project, index) => (
        <Col xs={24} sm={12} lg={8} key={project.title}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card title={project.title} bordered={false} hoverable>
              <Paragraph>{project.summary}</Paragraph>
              <List
                dataSource={project.details}
                renderItem={item => <List.Item style={{ padding: '4px 0' }}>• {item}</List.Item>}
              />
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </div>
);

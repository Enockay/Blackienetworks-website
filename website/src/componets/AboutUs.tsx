import React from 'react';
import { motion } from 'framer-motion';
import { Row, Col, Card, Typography, Space, Divider } from 'antd';
import {
  FaMedal,
  FaHandshake,
  FaCertificate,
  FaTools,
  FaChartLine,
} from 'react-icons/fa';
import teamImage from '../assets/Team.jpeg';

const { Title, Paragraph, Text } = Typography;

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
      icon: <FaMedal className="text-yellow-500" style={{ fontSize: 48 }} />,
      title: '100+ Projects Successfully Delivered',
      description:
        'We have executed and delivered over 100 diverse projects, ranging from large-scale campus Wi-Fi deployments and automated billing systems to secure VPN infrastructures for institutions and small businesses. Our ability to deliver complex technical solutions with precision and reliability sets us apart in the industry.',
    },
    {
      icon: <FaHandshake className="text-blue-500" style={{ fontSize: 48 }} />,
      title: '20+ Strategic Partnerships Established',
      description:
        'We proudly maintain over 20 long-term partnerships with key industry players including Internet Service Providers, network hardware manufacturers, cloud infrastructure providers, and custom software vendors. These relationships enable us to offer scalable, cost-effective, and future-ready solutions to our clients.',
    },
    {
      icon: <FaCertificate className="text-green-500" style={{ fontSize: 48 }} />,
      title: 'Team of Certified Industry Professionals',
      description:
        'Our technical team is composed of certified professionals holding credentials such as Cisco CCNA/CCNP, CompTIA Network+/Security+, and Microsoft Azure certifications. These qualifications reflect our commitment to staying at the forefront of industry standards in networking, software engineering, and cybersecurity.',
    },
  ];


  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12 mt-5">
      <div className="container mx-auto max-w-7xl">
        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Title level={3}>Our Mission & Vision</Title>
          <Paragraph className="text-lg text-gray-700">
            At <Text strong>Blackie Networks</Text>, we’re committed to empowering institutions, businesses, and communities through secure, scalable, and affordable IT and network solutions. We envision a digitally connected society powered by innovation, transparency, and efficiency.
          </Paragraph>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card
            bordered={false}
            className="shadow-lg rounded-lg"
            style={{ backgroundColor: 'white' }}
          >
            <Title level={3} className="text-center mb-8">
              Our Experience
            </Title>
            <Paragraph className="text-center max-w-4xl mx-auto mb-12 text-gray-700 text-lg">
              With over <Text strong>3+ years</Text> of proven success, our team has delivered projects across campuses, startups, NGOs, and SMEs — ranging from hotspot access point installations to full-stack system development, MikroTik & Radius configurations, and customized billing platforms. We pride ourselves on building future-ready IT environments with uncompromising quality.
            </Paragraph>
            <Row gutter={[48, 24]} justify="center">
              <Col xs={24} md={12}>
                <Space align="start">
                  <FaTools
                    style={{ fontSize: 50, color: '#1890ff', marginTop: 4 }}
                  />
                  <div>
                    <Title level={4}>Technical Mastery</Title>
                    <Paragraph className="text-gray-600">
                      Skilled in MikroTik routing, VPNs, load balancing, captive portals, bandwidth throttling, and enterprise Wi-Fi setups. We leverage cutting-edge tools to deliver stable, efficient network environments.
                    </Paragraph>
                  </div>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space align="start">
                  <FaChartLine
                    style={{ fontSize: 50, color: '#52c41a', marginTop: 4 }}
                  />
                  <div>
                    <Title level={4}>Results-Oriented</Title>
                    <Paragraph className="text-gray-600">
                      95% client satisfaction rate, with measurable improvements in network uptime, speed, and security across all deployments. We focus on delivering tangible benefits to every client.
                    </Paragraph>
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <Title level={3} className="text-center mb-10">
            Meet Our Team
          </Title>
          <Row gutter={[32, 32]} justify="center">
            {teamMembers.map(({ name, role, bio }) => (
              <Col xs={24} sm={12} md={8} key={name}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={name}
                        src={teamImage}
                        className="object-cover h-48 w-full rounded-t-lg"
                      />
                    }
                    className="rounded-lg shadow-md"
                  >
                    <Title level={4} className="mb-1">
                      {name}
                    </Title>
                    <Text type="secondary" strong>
                      {role}
                    </Text>
                    <Divider />
                    <Paragraph className="text-gray-700">{bio}</Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <Title level={3} className="text-center mb-10">
            Our Achievements
          </Title>
          <Row gutter={[24, 24]} justify="center">
            {achievements.map(({ icon, title, description }) => (
              <Col xs={24} sm={12} md={8} key={title}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Card className="text-center p-8 rounded-lg shadow-md" bordered={false}>
                    <div className="mb-4">{icon}</div>
                    <Title level={4}>{title}</Title>
                    <Paragraph className="text-gray-600">{description}</Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;

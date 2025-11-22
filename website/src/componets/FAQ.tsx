import React, { useState } from 'react';
import { Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { SEO } from './SEO';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

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

  const handleChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };

  const faqSchema = generateFAQSchema(faqData);

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
      <div className="bg-gray-50 min-h-screen py-16 px-6 md:px-12 mt-5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Title level={2} className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our IT services, network solutions, and support.
              Can't find what you're looking for?{' '}
              <a href="/contactus" className="text-indigo-600 hover:underline">
                Contact us
              </a>
              .
            </Paragraph>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Collapse
              activeKey={activeKeys}
              onChange={handleChange}
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusOutlined className="text-indigo-600" />
                ) : (
                  <PlusOutlined className="text-indigo-600" />
                )
              }
              className="bg-white rounded-lg shadow-md"
            >
              {faqData.map((faq, index) => (
                <Panel
                  header={
                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  }
                  key={index.toString()}
                  className="border-b border-gray-200"
                >
                  <Paragraph className="text-gray-700 text-base leading-relaxed">
                    {faq.answer}
                  </Paragraph>
                </Panel>
              ))}
            </Collapse>
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


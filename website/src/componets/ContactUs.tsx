import React, { useState } from 'react';
import { Form, Input, Button, notification, Spin } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MessageOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { SEO } from './SEO';

const { TextArea } = Input;

const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notification.success({
        message: 'Message Sent',
        description:
          'Thank you for contacting Blackie Networks. We will get back to you shortly.',
        placement: 'topRight',
      });
      form.resetFields();
    }, 2000);
  };

  const [form] = Form.useForm();

  // WhatsApp contact function
  const handleWhatsAppClick = () => {
    const phoneNumber = '254796869402'; // Remove + for WhatsApp URL
    const message = encodeURIComponent('Hello! I would like to get in touch with Blackie Networks.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

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
        title="Contact Us - Get in Touch | Blackie Networks"
        description="Contact Blackie Networks for IT solutions, campus Wi-Fi, network infrastructure, and support. Reach us via phone, email, WhatsApp, or fill out our contact form."
        keywords="contact Blackie Networks, IT support Kenya, campus Wi-Fi contact, network services contact"
        url="/contactus"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contactus' },
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

        <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center mb-16"
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
              <MessageOutlined
                style={{
                  fontSize: '24px',
                  color: '#00f0ff',
                  marginRight: '12px',
                }}
              />
              <span style={{ color: '#00f0ff', fontSize: '14px', fontWeight: 600 }}>
                Get In Touch
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
              Contact Blackie Networks
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                color: '#cbd5e1',
                fontSize: '1.125rem',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.8',
              }}
            >
              Have questions or need support? Fill out the form below, reach us via WhatsApp, or contact us through any of the channels provided. We're here to help you connect.
            </motion.p>
          </motion.div>

          {/* WhatsApp Quick Contact Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}
          >
            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '20px 40px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                border: 'none',
                borderRadius: '16px',
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 40px rgba(37, 211, 102, 0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(37, 211, 102, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(37, 211, 102, 0.4)';
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Chat with us on WhatsApp</span>
            </motion.button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div
                className="glass"
                style={{
                  borderRadius: '24px',
                  padding: '40px',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  background: 'rgba(10, 14, 39, 0.6)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
                }}
              >
                <h2
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#e2e8f0',
                    marginBottom: '32px',
                    background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Send us a Message
                </h2>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  requiredMark={false}
                  scrollToFirstError
                >
                  <Form.Item
                    label={
                      <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Full Name</span>
                    }
                    name="name"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                  >
                    <Input
                      placeholder="Your full name"
                      size="large"
                      style={{
                        background: 'rgba(0, 240, 255, 0.1)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        padding: '12px 16px',
                      }}
                      className="glass-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Email Address</span>
                    }
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                  >
                    <Input
                      placeholder="you@example.com"
                      size="large"
                      prefix={<MailOutlined style={{ color: '#00f0ff' }} />}
                      className="glass-input"
                      style={{
                        background: 'rgba(0, 240, 255, 0.1)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        padding: '12px 16px',
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Phone Number</span>
                    }
                    name="phone"
                    rules={[
                      { required: true, message: 'Please enter your phone number' },
                      { pattern: /^\+?\d{7,15}$/, message: 'Enter a valid phone number' },
                    ]}
                  >
                    <Input
                      placeholder="+254796869402"
                      size="large"
                      prefix={<PhoneOutlined style={{ color: '#00f0ff' }} />}
                      className="glass-input"
                      style={{
                        background: 'rgba(0, 240, 255, 0.1)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        padding: '12px 16px',
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Subject</span>
                    }
                    name="subject"
                    rules={[{ required: true, message: 'Please enter a subject' }]}
                  >
                    <Input
                      placeholder="Subject of your message"
                      size="large"
                      className="glass-input"
                      style={{
                        background: 'rgba(0, 240, 255, 0.1)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        padding: '12px 16px',
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Message</span>
                    }
                    name="message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <TextArea
                      placeholder="Write your message here..."
                      rows={6}
                      size="large"
                      maxLength={500}
                      showCount
                      className="glass-input"
                      style={{
                        background: 'rgba(0, 240, 255, 0.1)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        padding: '12px 16px',
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        htmlType="submit"
                        block
                        size="large"
                        disabled={loading}
                        style={{
                          height: '52px',
                          background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: '#0a0e27',
                          marginTop: '8px',
                        }}
                        icon={loading ? <Spin /> : <SendOutlined />}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </motion.div>
                  </Form.Item>
                </Form>
              </div>
            </motion.div>

            {/* Contact Info + Map */}
            <motion.div variants={itemVariants} className="flex flex-col gap-8">
              <div
                className="glass"
                style={{
                  borderRadius: '24px',
                  padding: '40px',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  background: 'rgba(10, 14, 39, 0.6)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
                }}
              >
                <h2
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#e2e8f0',
                    marginBottom: '32px',
                    background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Contact Information
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '20px',
                      borderRadius: '16px',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(0, 102, 255, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                        flexShrink: 0,
                      }}
                    >
                      <EnvironmentOutlined style={{ fontSize: '24px', color: '#00f0ff' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#00f0ff', margin: 0, marginBottom: '4px' }}>
                        Address
                      </p>
                      <p style={{ color: '#cbd5e1', margin: 0 }}>Chuka University, Kenya</p>
                    </div>
                  </motion.div>

                  <motion.a
                    href="tel:+254796869402"
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '20px',
                      borderRadius: '16px',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(0, 102, 255, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                        flexShrink: 0,
                      }}
                    >
                      <PhoneOutlined style={{ fontSize: '24px', color: '#00f0ff' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#00f0ff', margin: 0, marginBottom: '4px' }}>
                        Phone
                      </p>
                      <p style={{ color: '#cbd5e1', margin: 0 }}>+254 796 869 402</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="mailto:support@blackie-networks.com"
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '20px',
                      borderRadius: '16px',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(0, 102, 255, 0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                        flexShrink: 0,
                      }}
                    >
                      <MailOutlined style={{ fontSize: '24px', color: '#00f0ff' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#00f0ff', margin: 0, marginBottom: '4px' }}>
                        Email
                      </p>
                      <p style={{ color: '#cbd5e1', margin: 0 }}>support@blackie-networks.com</p>
                    </div>
                  </motion.a>
                </div>

                <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(0, 240, 255, 0.2)' }}>
                  <p style={{ fontWeight: 700, color: '#00f0ff', marginBottom: '16px' }}>Follow Us</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {[
                      { icon: LinkedinOutlined, href: 'https://linkedin.com/company/blackienetworks', label: 'LinkedIn' },
                      { icon: TwitterOutlined, href: 'https://twitter.com/blackienetworks', label: 'Twitter' },
                      { icon: FacebookOutlined, href: 'https://facebook.com/blackienetworks', label: 'Facebook' },
                      { icon: InstagramOutlined, href: 'https://instagram.com/blackienetworks', label: 'Instagram' },
                    ].map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: 'rgba(0, 240, 255, 0.1)',
                          border: '1px solid rgba(0, 240, 255, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#00f0ff',
                          fontSize: '20px',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Icon />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <motion.div
                variants={itemVariants}
                style={{
                  overflow: 'hidden',
                  borderRadius: '24px',
                  height: '400px',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)',
                }}
              >
                <iframe
                  title="Blackie Networks Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19902.12345!2d37.6373!3d-0.3322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17811f1a9b2a2cbb%3A0x123456789abcdef!2sChuka%20University!5e0!3m2!1sen!2ske!4v1686712345678!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <style>{`
        .glass-input input::placeholder,
        .glass-input textarea::placeholder {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        .glass-input input:focus,
        .glass-input textarea:focus {
          border-color: rgba(0, 240, 255, 0.5) !important;
          box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.2) !important;
        }
      `}</style>
    </>
  );
};

export default ContactUs;

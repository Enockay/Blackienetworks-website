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
} from '@ant-design/icons';

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

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 md:px-16 mt-7">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-extrabold text-center mb-8 text-gray-900">
          Contact Blackie Networks
        </h1>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Have questions or need support? Fill out the form below or reach us through any of the channels provided. We're here to help you connect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              scrollToFirstError
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input placeholder="Your full name" size="large" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input placeholder="you@example.com" size="large" prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  { pattern: /^\+?\d{7,15}$/, message: 'Enter a valid phone number' },
                ]}
              >
                <Input placeholder="+254796869402" size="large" prefix={<PhoneOutlined />} />
              </Form.Item>

              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input placeholder="Subject of your message" size="large" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea
                  placeholder="Write your message here..."
                  rows={6}
                  size="large"
                  maxLength={500}
                  showCount
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  disabled={loading}
                >
                  {loading ? <Spin /> : 'Send Message'}
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Contact Info + Map */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Contact Information</h2>

              <div className="flex items-center mb-4 text-gray-700">
                <EnvironmentOutlined className="text-2xl mr-4 text-indigo-600" />
                <div>
                  <p className="font-medium">Address</p>
                  <p>Chuka University, Kenya</p>
                </div>
              </div>

              <div className="flex items-center mb-4 text-gray-700">
                <PhoneOutlined className="text-2xl mr-4 text-indigo-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+254 796 869 402</p>
                </div>
              </div>

              <div className="flex items-center mb-4 text-gray-700">
                <MailOutlined className="text-2xl mr-4 text-indigo-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p>support@blackienetworks.co.ke</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="font-medium text-gray-900 mb-3">Follow Us</p>
                <div className="flex space-x-6 text-indigo-600 text-2xl">
                  <a
                    href="https://linkedin.com/company/blackienetworks"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-indigo-800 transition"
                  >
                    <LinkedinOutlined />
                  </a>
                  <a
                    href="https://twitter.com/blackienetworks"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="hover:text-indigo-800 transition"
                  >
                    <TwitterOutlined />
                  </a>
                  <a
                    href="https://facebook.com/blackienetworks"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="hover:text-indigo-800 transition"
                  >
                    <FacebookOutlined />
                  </a>
                  <a
                    href="https://instagram.com/blackienetworks"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-indigo-800 transition"
                  >
                    <InstagramOutlined />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-lg shadow-lg h-72">
              <iframe
                title="Blackie Networks Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19902.12345!2d37.6373!3d-0.3322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17811f1a9b2a2cbb%3A0x123456789abcdef!2sChuka%20University!5e0!3m2!1sen!2ske!4v1686712345678!5m2!1sen!2ske"
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

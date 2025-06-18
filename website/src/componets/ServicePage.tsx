import React, { useState, useRef } from 'react';
import { Drawer, Form, Input, Button as AntButton, message } from 'antd';
import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  details: string[];
  price: string;
  mikrotikAddons?: string[];
}

const services: Service[] = [
  {
    title: "Network Setup and Infrastructure",
    description: "Enterprise-grade network and IT infrastructure services, designed to create secure, robust, and scalable systems.",
    details: [
      "Cabling and hardware installation",
      "Server setup and management",
      "Security protocols",
      "Wireless network configuration",
      "Network monitoring and support",
      "Cloud infrastructure setup"
    ],
    price: "$2,000 - $20,000",
    mikrotikAddons: [
      "Mikrotik router configuration",
      "Load balancing setup",
      "Initial router setup and security hardening",
      "VPN and VLAN configuration",
      "Bandwidth management and traffic shaping"
    ]
  },
];

const ServicesPage: React.FC = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [expandedMikrotik, setExpandedMikrotik] = useState<number | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [form] = Form.useForm();
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleExpand = (index: number) => {
    setExpandedService(index === expandedService ? null : index);
    setExpandedMikrotik(null);
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDrawerOpen = (service: Service) => {
    setSelectedService(service);
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const handleFinish = (values: any) => {
    const payload = {
      ...values,
      service: selectedService?.title,
      price: selectedService?.price,
    };
    console.log('Order Submitted:', payload);
    message.success("Order submitted successfully!");
    handleDrawerClose();
  };

  return (
    <div className="relative mt-14 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 min-h-screen py-10 text-white">
      <div className="absolute inset-0 bg-black opacity-20 z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center mb-12"
        >
          Our Services
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-gray-900"
            >
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-blue-500 to-purple-500" />
              <h2 className="text-2xl font-semibold mb-4 relative z-10">{service.title}</h2>
              <p className="text-gray-600 mb-4 relative z-10">{service.description}</p>

              {expandedService === index ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  ref={detailsRef}
                  className="relative z-10"
                >
                  <ul className="list-disc list-inside mb-4 text-gray-500">
                    {service.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>

                  {service.mikrotikAddons && (
                    <div className="mb-4">
                      <button
                        onClick={() => setExpandedMikrotik(index === expandedMikrotik ? null : index)}
                        className="text-blue-600 underline"
                      >
                        {expandedMikrotik === index ? "Hide Mikrotik Services" : "Show Mikrotik Services"}
                      </button>

                      {expandedMikrotik === index && (
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 list-decimal list-inside pl-4 text-sm text-gray-600"
                        >
                          {service.mikrotikAddons.map((addon, i) => (
                            <li key={i}>{addon}</li>
                          ))}
                        </motion.ul>
                      )}
                    </div>
                  )}

                  <p className="text-lg font-bold text-indigo-600 mb-4">
                    Starting at {service.price}
                  </p>
                </motion.div>
              ) : (
                <button
                  onClick={() => handleExpand(index)}
                  className="relative z-10 text-indigo-600 underline mb-4"
                >
                  See Details
                </button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition ml-14"
                onClick={() => handleDrawerOpen(service)}
              >
                Book Now
              </motion.button>

              {/* Animated bubbles */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-400 rounded-full opacity-50 transform translate-x-20 -translate-y-10 animate-pulse" />
              <div className="absolute bottom-0 left-0 h-20 w-20 bg-purple-400 rounded-full opacity-50 transform -translate-x-10 translate-y-10 animate-pulse delay-200" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Drawer for Booking */}
      <Drawer
        title={
          <div className="text-xl font-semibold text-indigo-700">
            📦 Order: {selectedService?.title}
          </div>
        }
        placement="right"
        width={420}
        onClose={handleDrawerClose}
        open={drawerVisible}
        bodyStyle={{ backgroundColor: '#f7f9fc' }}
      >
        <p className="text-gray-600 mb-4">
          Fill out your information below to proceed with your order. We’ll get in touch shortly.
        </p>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, type: 'email', message: 'Enter a valid email address' }]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="+254..." />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Additional Notes (Optional)"
          >
            <Input.TextArea placeholder="Any extra requirements or questions..." />
          </Form.Item>
          <Form.Item>
            <AntButton type="primary" htmlType="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              Submit Order
            </AntButton>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ServicesPage;

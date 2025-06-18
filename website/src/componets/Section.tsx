import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaWifi,
  FaServer,
  FaCode,
  FaQuoteLeft,
  FaUserShield,
  FaCloud,
  FaMobileAlt,
} from "react-icons/fa";
import { Drawer, Button, Form, Input, message } from "antd";

// Define service structure
interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  price: number;
}

// Service Data
const services: Service[] = [
  {
    icon: <FaWifi />,
    title: "Campus Wi-Fi Solutions",
    description:
      "We install and maintain secure high-speed Wi-Fi networks across hostels, lecture halls, libraries, and admin blocks. Our packages include setup of hotspot access points, captive portals for student login, and bandwidth control. Users can access internet at affordable rates starting from KES 10/hour, KES 45/day, and discounted weekly/monthly bundles.",
    price: 700,
  },
  {
    icon: <FaServer />,
    title: "Network Infrastructure & Billing Systems",
    description:
      "We provide full-scale infrastructure: cabling, routers, MikroTik configs, load balancing, Radius billing, and user management systems for monetized or managed access.",
    price: 5000,
  },
  {
    icon: <FaCode />,
    title: "Custom Software Development",
    description:
      "Tailored portals for learning, payments, attendance, and reporting. Includes responsive web/mobile UIs, admin dashboards, and APIs.",
    price: 10000,
  },
  {
    icon: <FaCloud />,
    title: "Cloud Services",
    description:
      "Hosting, backups, server deployment via AWS/DigitalOcean with 99.99% uptime. Ideal for high-traffic university systems.",
    price: 3000,
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile App Integration",
    description:
      "Android/iOS apps for learning, communication, and reminders. Supports offline mode, push notifications, and brand styling.",
    price: 4500,
  },
  {
    icon: <FaUserShield />,
    title: "IT Consultancy & VPN Services",
    description:
      "We audit, train, and optimize networks. Secure VPN (OpenVPN, WireGuard) for staff/student remote access and compliance.",
    price: 2000,
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const handleBook = (service: Service) => {
    setSelectedService(service);
    setDrawerOpen(true);
  };

  const handleFinish = (values: any) => {
    message.success("Booking submitted successfully!");
    form.resetFields();
    setDrawerOpen(false);
    console.log("Booking Info:", values, selectedService?.title);
  };

  return (
    <div className="p-6 md:p-12 space-y-28 mt-7 bg-gradient-to-b from-slate-100 via-white to-slate-200">
      {/* About Us */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-2 text-indigo-700">Our Products</h2>
        <p className="text-gray-700 text-lg">
          We are a Chuka-based tech company revolutionizing internet access and digital systems. From blazing-fast Wi-Fi to smart software and VPNs, we’re your campus tech ally.
        </p>
      </motion.section>

      {/* Services */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white hover:bg-blue-50 rounded-2xl shadow-xl border border-gray-100 hover:border-indigo-500 text-center space-y-4 transition-all duration-300"
            >
              <div className="text-5xl text-indigo-600 mx-auto">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-5">{service.description}</p>
              <p className="text-green-600 font-semibold text-sm">
                Starting from KES {service.price.toLocaleString()}
              </p>
              <button
                onClick={() => handleBook(service)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 text-sm"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Drawer Booking */}
      <Drawer
        title={
          <div className="flex flex-col space-y-1">
            <span className="text-lg font-semibold text-indigo-700">
              {selectedService?.title}
            </span>
            <span className="text-sm text-gray-500">
              Starting from KES {selectedService?.price.toLocaleString()}
            </span>
          </div>
        }
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={500}
        bodyStyle={{ background: "linear-gradient(to bottom right, #f9fafb, #eef2ff)" }}
      >
        <p className="text-sm text-gray-700 mb-4">{selectedService?.description}</p>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="space-y-2"
        >
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="john@example.com" />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
            <Input placeholder="+2547..." />
          </Form.Item>
          <Form.Item name="note" label="Describe your request">
            <Input.TextArea rows={3} placeholder="e.g., We need setup in 2 lecture halls..." />
          </Form.Item>
          <Button htmlType="submit" type="primary" className="w-full">
            Submit Booking
          </Button>
        </Form>
      </Drawer>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center mb-10 text-indigo-700">
          What Our Clients Say
        </h2>
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white via-purple-50 to-indigo-100 p-6 rounded-xl shadow-lg space-y-4 border border-indigo-100"
            >
              <FaQuoteLeft className="text-3xl text-purple-600" />
              <p className="text-gray-800 italic text-sm">“{t.quote}”</p>
              <p className="text-sm text-indigo-700 font-bold text-right">— {t.name}</p>
              <p className="text-xs text-gray-500 text-right">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

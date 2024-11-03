import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  details: string[];
  price: string;
}

const services: Service[] = [
    {
      "title": "Software Development",
      "description": "End-to-end custom software solutions for web, mobile, and enterprise platforms, designed to meet unique business needs.",
      "details": [
        "Full-stack development: Expert front-end and back-end development tailored to modern user experiences and scalable architectures.",
        "Agile methodology: Collaborative and iterative development process that ensures faster delivery, continuous feedback, and adaptability to changes.",
        "UI/UX design: Focused on user-centric design, creating intuitive interfaces that enhance user experience.",
        "Maintenance and support: Comprehensive maintenance plans for software updates, feature enhancements, and bug fixes.",
        "API Integration: Custom API development and integration to seamlessly connect with third-party services and applications.",
        "Cloud and on-premises deployment: Flexible deployment options to fit infrastructure requirements and security needs."
      ],
      "price": "$5,000 - $50,000 (Pricing varies based on project scope, technology stack, and complexity)"
    },
    {
      "title": "Network Setup and Infrastructure",
      "description": "Enterprise-grade network and IT infrastructure services, designed to create secure, robust, and scalable systems.",
      "details": [
        "Cabling and hardware installation: Structured cabling solutions and hardware setup for optimal network performance and reliability.",
        "Server setup and management: Configuration and management of physical and virtual servers, optimized for performance and scalability.",
        "Security protocols: Implementation of firewalls, intrusion detection systems, and encryption protocols to safeguard network data.",
        "Wireless network configuration: Design and configuration of wireless networks for seamless connectivity across large office spaces.",
        "Network monitoring and support: 24/7 monitoring, maintenance, and support for uninterrupted network performance.",
        "Cloud infrastructure setup: Integration with cloud providers (AWS, Azure, Google Cloud) to leverage cloud scalability and resilience."
      ],
      "price": "$2,000 - $20,000 (Pricing based on infrastructure scale, network complexity, and security requirements)"
    },
    {
      "title": "IT Consulting",
      "description": "Professional consulting services to optimize IT systems, improve security, and support digital transformation.",
      "details": [
        "Network audits: Comprehensive analysis of current IT infrastructure to identify performance bottlenecks and security vulnerabilities.",
        "Security assessments: Evaluation of current cybersecurity measures, risk management, and compliance with industry standards.",
        "Cloud migration strategies: Detailed plan for migrating workloads, applications, and data to the cloud securely and efficiently.",
        "IT strategy and planning: Tailored IT strategy for scalable growth, technology adoption, and cost management.",
        "Data backup and disaster recovery planning: Solutions for data protection, backup strategies, and business continuity in case of data loss.",
        "Compliance consulting: Guidance on meeting industry-specific regulations, such as GDPR, HIPAA, or SOC 2, for data protection."
      ],
      "price": "$1,000 - $15,000 (Pricing depends on the extent of consulting and analysis required)"
    },
    {
      "title": "Training and Support",
      "description": "Comprehensive training programs and ongoing IT support for businesses, ensuring teams are equipped to use and manage IT resources effectively.",
      "details": [
        "IT training for teams: Custom training modules for staff, including software, cybersecurity awareness, and network management.",
        "Dedicated support contracts: Fixed-fee support plans with guaranteed response times for priority issue resolution.",
        "On-demand support: Flexible support for occasional needs, such as troubleshooting or technical advice.",
        "Remote and onsite assistance: Support delivered either remotely or on-site, depending on client preference and issue requirements.",
        "Knowledgebase and documentation: Customized documentation and resources provided to ensure effective self-service and knowledge transfer.",
        "Proactive system monitoring and alerts: Monitoring systems to identify potential issues early, reducing downtime and disruptions."
      ],
      "price": "$500 - $10,000 (Pricing varies by scope, number of team members, and support duration)"
    }
  ]
  

const ServicesPage: React.FC = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleExpand = (index: number) => {
    setExpandedService(index);
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-14 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 min-h-screen py-10 text-white">
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

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
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-blue-500 to-purple-500"></div>

              <h2 className="text-2xl font-semibold mb-4 relative z-10">{service.title}</h2>
              <p className="text-gray-600 mb-4 relative z-10">{service.description}</p>

              {expandedService === index ? (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  ref={detailsRef}
                >
                  <ul className="list-disc list-inside mb-4 text-gray-500 relative z-10">
                    {service.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                  <p className="text-lg font-bold text-indigo-600 mb-6 relative z-10">Starting at {service.price}</p>
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
                onClick={() => window.location.href = "/booking"}
              >
                Book Now
              </motion.button>

              {/* Animated background elements */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-400 rounded-full opacity-50 transform translate-x-20 -translate-y-10 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 h-20 w-20 bg-purple-400 rounded-full opacity-50 transform -translate-x-10 translate-y-10 animate-pulse delay-200"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

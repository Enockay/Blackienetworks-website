import React from 'react';
import { motion } from 'framer-motion';
import teamImage from "../assets/Team.jpeg"; // Replace with an image of the team or logo
import { FaMedal, FaHandshake, FaCertificate } from 'react-icons/fa';

const AboutUs:React.FC = () => {
  return (
    <div className="bg-gray-50 py-10 mt-14">
      <div className="container mx-auto px-4 space-y-12">
        
        {/* Mission and Vision Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            At Blackie Networks, our mission is to empower businesses and communities through
            innovative IT solutions and unparalleled network services. Our vision is to lead the 
            digital transformation journey across the region by fostering technological 
            advancements and delivering exceptional value.
          </p>
        </motion.section>

        {/* Team Introduction Section */}
        <motion.section
          className="bg-white py-8 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Enock Mwema",
                role: "CEO & Founder",
                bio: "With over 3 years of experience in network infrastructure and software development, Enock leads Blackie Networks with a vision of transforming the tech landscape.",
                img: teamImage // Replace with actual image URLs
              },
              {
                name: "Pius Musomi",
                role: "Head of Software Development",
                bio: "Musomi brings a wealth of knowledge in full-stack development, specializing in creating robust and scalable software solutions.",
                img: teamImage
              },
              {
                name: "Timothy Kuria",
                role: "Network Infrastructure Lead",
                bio: "Timothy is an expert in network setup and management, ensuring reliable and secure connections for all clients.",
                img: teamImage
              }
              // Add more team members as needed
            ].map((member) => (
              <motion.div
                key={member.name}
                className="text-center p-4 bg-gray-50 shadow-md rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={member.img}
                  alt={`${member.name}`}
                  className="mx-auto rounded-full w-24 h-24 object-cover mb-4"
                />
                <h4 className="text-xl font-semibold text-gray-700">{member.name}</h4>
                <p className="text-sm font-medium text-blue-500">{member.role}</p>
                <p className="mt-2 text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Company Achievements Section */}
        <motion.section
          className="py-8 bg-gray-100 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Our Achievements</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-center">
            <motion.div
              className="flex flex-col items-center bg-white p-6 shadow-md rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FaMedal className="text-yellow-500 text-4xl mb-2" />
              <h4 className="text-xl font-semibold text-gray-700">Milestones</h4>
              <p className="text-gray-600">
                Successfully completed 100+ projects across network setups, software solutions, and IT consulting.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center bg-white p-6 shadow-md rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FaHandshake className="text-blue-500 text-4xl mb-2" />
              <h4 className="text-xl font-semibold text-gray-700">Partnerships</h4>
              <p className="text-gray-600">
                Strategic partnerships with leading technology firms to deliver top-notch services.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center bg-white p-6 shadow-md rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FaCertificate className="text-green-500 text-4xl mb-2" />
              <h4 className="text-xl font-semibold text-gray-700">Certifications</h4>
              <p className="text-gray-600">
                Certified in advanced network configurations and cloud solutions, ensuring the highest standards of service.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;

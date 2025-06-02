
import { motion } from "framer-motion";
import { FaWifi, FaServer, FaCode, FaQuoteLeft, FaUserShield, FaCloud, FaMobileAlt } from "react-icons/fa";

const services = [
  { icon: <FaWifi />, title: "Campus Wi-Fi Solutions", description: "Seamless, secure internet access across campus environments with 24/7 support." },
  { icon: <FaServer />, title: "Network Infrastructure", description: "Structured cabling, routers, firewalls and optimized network setup for institutions." },
  { icon: <FaCode />, title: "Custom Software Development", description: "Web & mobile solutions tailored for students, universities, and local enterprises." },
  { icon: <FaCloud />, title: "Cloud Services", description: "Robust cloud integration, storage, and deployment solutions for scale and reliability." },
  { icon: <FaMobileAlt />, title: "Mobile App Integration", description: "Intuitive mobile apps for e-learning, admin, and communication needs." },
  { icon: <FaUserShield />, title: "IT Consultancy", description: "Expert guidance to streamline IT operations and future-proof your institution." },
];

const testimonials = [
  { name: "John Mwangi", quote: "Blackie Networks transformed our connectivity — lectures and online exams now run without a hitch!" },
  { name: "Esther Njeri", quote: "Reliable service, fast support. I can finally attend Zoom classes without buffering!" },
  { name: "Prof. Kamau", quote: "Professional and timely — they installed our campus network in record time." },
];

export default function CompanySections() {
  return (
    <div className="p-6 md:p-12 space-y-24">
      {/* About Us Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-4 text-blue-600">About Blackie Networks</h2>
        <p className="text-gray-700 text-lg">
          We are a Chuka-based tech company revolutionizing internet access and tech services for students and institutions. From blazing-fast Wi-Fi to reliable tech support and smart software, we’re your campus tech ally.
        </p>
        <div className="mt-6 w-full h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg animate-pulse opacity-70 blur-sm"></div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-bold text-center mb-10 text-blue-600">Our Services</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow-lg text-center space-y-4 border hover:border-blue-500 transition"
            >
              <div className="text-5xl text-blue-500 mx-auto">{service.icon}</div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-bold text-center mb-10 text-blue-600">What Our Clients Say</h2>
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-200 p-6 rounded-xl shadow-md space-y-4"
            >
              <FaQuoteLeft className="text-3xl text-purple-600" />
              <p className="text-gray-800 italic">“{t.quote}”</p>
              <p className="text-sm text-blue-700 font-bold text-right">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

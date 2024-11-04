import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage1 from '../assets/networking1.jpg';
import heroImage2 from '../assets/networking2.jpg';
import heroImage3 from '../assets/networking3.jpg';
import { FaNetworkWired, FaUsers, FaAward } from 'react-icons/fa';

const projects = [
    {
        title: "Project Alpha",
        summary: "Revolutionizing user experience for a global client.",
        details: [
            "Developed a scalable web and mobile platform to enhance user engagement.",
            "Integrated advanced UX/UI design principles to boost usability and reduce user friction.",
            "Implemented personalized content algorithms that increased user retention by 30%.",
            "Enhanced performance with a modular architecture, supporting over 1 million monthly active users.",
            "Provided training for the client’s in-house team to ensure smooth adoption and ongoing support."
        ]
    },
    {
        title: "Network Expansion",
        summary: "Advanced network setup for a corporate campus.",
        details: [
            "Designed a secure and high-speed network to support 500+ employees across multiple departments.",
            "Implemented advanced firewall configurations to safeguard sensitive corporate data.",
            "Optimized Wi-Fi coverage and connectivity, ensuring seamless communication and collaboration.",
            "Integrated VLANs and traffic segmentation to enhance network performance and security.",
            "Provided ongoing monitoring and maintenance, ensuring uptime and efficient issue resolution."
        ]
    },
    {
        title: "IT Transformation",
        summary: "Optimizing IT processes for enhanced productivity.",
        details: [
            "Conducted an IT audit to identify inefficiencies and recommended a streamlined approach.",
            "Migrated core operations to the cloud, improving accessibility and reducing infrastructure costs.",
            "Automated repetitive tasks with custom scripts, saving an estimated 200 hours monthly.",
            "Implemented a new help desk system to enhance support response times and tracking.",
            "Delivered comprehensive documentation and training for smooth transition and ongoing productivity."
        ]
    }
];
const LatestProjectsSection = () => {
    return (
        <div className="bg-sky-300 py-8 lg:py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Latest Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6, type: 'spring', stiffness: 100 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                            <p className="text-gray-700 mb-4">{project.summary}</p>
                            <ul className="list-disc list-inside text-gray-600">
                                {project.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AchievementsAndSpecializations: React.FC = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4 text-center">

                {/* Section Header */}
                <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Achievements & Specializations</h2>
                <p className="text-lg text-gray-600 mb-12">
                    Dedicated to delivering high-speed internet to students at an affordable price, empowering campus communities to stay connected and succeed.
                </p>

                {/* Achievements and Specializations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Networking Achievement */}
                    <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition duration-300">
                        <FaNetworkWired className="text-blue-600 text-5xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">High-Speed Network</h3>
                        <p className="text-gray-600">
                            We specialize in providing a fast, reliable network that supports students’ academic and personal needs, especially on campus at Chuka University.
                        </p>
                    </div>

                    {/* Low-Cost Service */}
                    <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition duration-300">
                        <FaUsers className="text-yellow-500 text-5xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Affordable for Students</h3>
                        <p className="text-gray-600">
                            By focusing on low-cost services, we ensure campus students can stay connected without breaking the bank. This commitment has made us a preferred choice at Chuka University.
                        </p>
                    </div>

                    {/* Achievement Milestone */}
                    <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition duration-300">
                        <FaAward className="text-green-500 text-5xl mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Milestones Reached</h3>
                        <p className="text-gray-600">
                            Proud to have achieved over 1,000 subscriptions from campus students, with positive feedback on our quality and service. This milestone reflects our commitment to excellence.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};


const HeroSection: React.FC = () => {
    // Cycle through images for a background slideshow effect
    const images = [heroImage1, heroImage2, heroImage3];
    const [backgroundImage, setBackgroundImage] = useState(images[0]);
    const [fadeClass, setFadeClass] = useState("opacity-100");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            // Start fade-out
            setFadeClass("opacity-0");
            setTimeout(() => {
                // Change image and fade back in
                index = (index + 1) % images.length;
                setBackgroundImage(images[index]);
                setFadeClass("opacity-100");
            }, 500); // Half-second fade-out duration
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-gradient-to-b from-blue-800 to-indigo-800 text-white mt-8">

            <div className="relative w-full h-[700px] lg:h-[500px]">
                {/* Background Image */}
                <div
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${fadeClass}`}
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
                {/* Hero Content */}
                <div className="container relative mx-auto px-4 py-16 lg:py-24 text-center">
                    <div className="flex flex-col lg:flex-row items-center justify-center">

                        <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-800 p-4 opacity-70">
                            <div className="lg:w-full">
                                <h1 className="text-xl lg:text-3xl font-bold mb-4 text-white">
                                    Welcome to Blackie-Networks
                                </h1>
                                <p className="text-lg lg:text-xl mb-2 text-white">
                                    Our mission is to drive innovation through top-notch software development, network infrastructure, and IT consulting services.
                                </p>
                                <div className=" text-gray-200 p-4 text-center">
                                    <h2 className="text-xl lg:text-2xl font-bold mb-3 text-lime-300">
                                        What We Do at Blackie Networks
                                    </h2>
                                    <p className="text-lg lg:text-xl mb-4">
                                        At Blackie Networks, we bring affordable, high-speed internet to campus students. No more buffering, just reliable, wallet-friendly Wi-Fi!
                                    </p>
                                    <p className="text-lg lg:text-xl mb-4 hidden md:block">
                                        Need help at midnight? Our 24/7 support team is here, ready for your 3 a.m. tech emergencies (we’ve got your back).
                                    </p>
                                    <p className="text-lg lg:text-xl hidden md:blocl">
                                        So, whether you're streaming, studying, or just “studying,” count on Blackie Networks to keep you connected.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link to="/service"
                                        className="bg-sky-300 text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300"
                                    >
                                        Explore Services
                                    </Link>
                                    <Link to="/contact us"
                                        className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
                                    >
                                        Book a Service
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Standalone Image for Large Screens */}
                        <div className="hidden lg:hidden lg:w-1/2 mt-8 lg:mt-0">
                            <img
                                src={backgroundImage}
                                alt="Our team in action"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* What We Do Section */}
            <div className="container mx-auto px-4 py-4 lg:py-8 text-center">
                <h2 className="text-3xl font-bold mb-6">What We Do</h2>
                <div className="flex flex-col lg:flex-row justify-center gap-8">
                    {[
                        {
                            title: "Software Development",
                            description: "Our team specializes in designing, developing, and deploying custom software solutions that drive business growth and streamline operations. We work closely with clients to understand their unique requirements, crafting applications that are both scalable and secure. Our services include:",
                            details: [
                                "Web and Mobile App Development",
                                "Custom CRM and ERP Systems",
                                "E-commerce Solutions",
                                "API Integration and Development",
                                "Ongoing Maintenance and Support"
                            ]
                        },
                        {
                            title: "Network Infrastructure Setup",
                            description: "We provide end-to-end network infrastructure setup to ensure a fast, reliable, and secure network environment. From small businesses to large corporate offices, we tailor network solutions to meet your connectivity needs, incorporating the latest technologies. Our offerings include:",
                            details: [
                                "Local Area Network (LAN) and Wide Area Network (WAN) Setup",
                                "Wi-Fi Design and Implementation",
                                "Network Security and Firewall Configurations",
                                "Cloud Network Integration",
                                "Ongoing Network Monitoring and Maintenance"
                            ]
                        },
                        {
                            title: "IT Consulting",
                            description: "Our IT consulting services focus on aligning your technology strategy with your business goals. We offer expert guidance in optimizing IT processes, leveraging modern tools, and enhancing system security. With a client-centric approach, we assist with:",
                            details: [
                                "IT Strategy Development",
                                "Digital Transformation Roadmaps",
                                "Cybersecurity Assessments and Risk Management",
                                "Cloud Migration and Optimization",
                                "IT Cost Optimization and Vendor Management"
                            ]
                        },
                        {
                            title: "Server Hosting and Management",
                            description: "We provide robust, secure, and scalable hosting solutions to ensure your website or application is always accessible and performs optimally. With 24/7 monitoring and dedicated support, we take the complexity out of server management. Our services include:",
                            details: [
                                "Managed Server Hosting (Shared, VPS, and Dedicated)",
                                "Website Performance Optimization and Load Balancing",
                                "Regular Backups and Disaster Recovery Planning",
                                "Security Hardening and DDoS Protection",
                                "Scalable Infrastructure for Traffic Growth"
                            ]
                        }
                        ,
                    ].map((service) => (
                        <div key={service.title} className="bg-white text-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-700">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <AchievementsAndSpecializations />
            <LatestProjectsSection />
            {/* Client Testimonials Section */}
            <div className="container mx-auto px-4 py-8 lg:py-16 text-center">
                <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
                <div className="flex flex-col lg:flex-row justify-center gap-8">
                    {[
                        {
                            name: "Jane Doe",
                            feedback: "Exceptional service and support. Highly recommend!",
                        },
                        {
                            name: "John Smith",
                            feedback: "Their expertise in network infrastructure is outstanding.",
                        },
                        {
                            name: "Anna Johnson",
                            feedback: "Amazing team! They truly understand our business needs.",
                        },
                    ].map((testimonial) => (
                        <div key={testimonial.name} className="bg-white text-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <p className="text-gray-700 italic mb-2">&ldquo;{testimonial.feedback}&rdquo;</p>
                            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

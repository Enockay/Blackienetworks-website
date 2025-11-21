import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import image1 from "../assets/softwareCompany1.jpeg";
import image2 from "../assets/softwareCompany2.jpg";
import image3 from "../assets/softwareCompany3.jpg";

interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: Date | null;
    time: string;
    desciption :string;
}

const BookingPage: React.FC = () => {
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: null,
        time: '',
        desciption:""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const services = ["Software Development", "Network Setup", "IT Consulting", "Training and Support"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({ ...formData, date });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Call to backend here for Google Calendar integration and confirmation email
    };

    // Image gallery with three alternating images
    const images = [
        image1,
        image2,
        image3
    ];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className=" min-h-screen  mt-12 bg-gradient-to-r  from-green-500 via-blue-600 to-purple-700 text-white">
            <div className='flex flex-col md:flex-row'>
                {/* Left section with image gallery */}
                <div className="hidden md:flex flex-1 pt-20 ">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 5 }}
                        className="w-full  h-4/6 bg-cover bg-center rounded-lg shadow-lg"
                        style={{ backgroundImage: `url(${images[currentImage]})` }}
                        role="img"
                        aria-label="IT services and software development showcase"
                    ></motion.div>
                </div>

                {/* Right section with booking form */}
                <div className="flex-1 p-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl font-bold text-center mb-4"
                    >
                        Booking Form
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-md mx-auto"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 max-h-fit overflow-y-auto">
                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service</label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                >
                                    <option value="" disabled>Select a service</option>
                                    {services.map((service) => (
                                        <option key={service} value={service}>{service}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date</label>
                                <DatePicker
                                    selected={formData.date}
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    placeholderText="Choose a date"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Describe your idea below
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Share your idea or requirements in detail..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                                value={formData.desciption} // Bind the textarea value to the state
                                onChange={handleChange} // Use the same change handler
                                required
                            />
                        </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition"
                            >
                                Book Now
                            </motion.button>
                        </form>




                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                            >
                                <div className="bg-white rounded-lg p-6 max-w-sm text-center">
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Booking Confirmed!</h2>
                                    <p className="text-gray-700">
                                        Thank you, {formData.name}. Your booking for {formData.service} is confirmed.
                                    </p>
                                    <p className="text-gray-700">
                                        We’ve sent a confirmation email to {formData.email}.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;

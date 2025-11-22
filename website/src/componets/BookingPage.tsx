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
    description: string;
}

const BookingPage: React.FC = () => {
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: null,
        time: '',
        description: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // API base URL - use environment variable or default to localhost
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';
    
    const services = [
        "Blackie Proxy",
        "ISP Billing System",
        "Mikrotik Configuration",
        "Software Maintenance",
        "Cloud Hosting",
        "SEO Optimization",
        "IoT Device Remote Access (WireGuard)",
        "Internet Installation (Kitui & Chuka)",
        "Internet Infrastructure Setup",
        "Network Setup and Infrastructure"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({ ...formData, date });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Validate required fields
        if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.date || !formData.time) {
            setError('Please fill in all required fields');
            setIsLoading(false);
            return;
        }

        try {
            // Format date as YYYY-MM-DD
            const formattedDate = formData.date ? formData.date.toISOString().split('T')[0] : '';

            const response = await fetch(`${API_BASE_URL}/api/bookings/book/public`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    service: formData.service,
                    date: formattedDate,
                    time: formData.time,
                    description: formData.description.trim() || ''
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors
                if (data.errors && Array.isArray(data.errors)) {
                    const errorMessages = data.errors.map((err: any) => err.message).join(', ');
                    setError(errorMessages);
                } else {
                    setError(data.message || 'Failed to submit booking. Please try again.');
                }
                setIsLoading(false);
                return;
            }

            // Success - show confirmation modal
            setIsSubmitted(true);
            setIsLoading(false);
            
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                date: null,
                time: '',
                description: ''
            });

        } catch (error) {
            console.error('Error submitting booking:', error);
            setError('Network error. Please check your connection and try again.');
            setIsLoading(false);
        }
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
        }, 6000); // Change image every 6 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div 
            style={{
                position: 'relative',
                minHeight: '100vh',
                padding: '100px 20px 80px',
                background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
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

            <div className="container mx-auto max-w-7xl" style={{ position: 'relative', zIndex: 1 }}>
                <div className='flex flex-col lg:flex-row gap-8'>
                {/* Left section with image gallery */}
                    <div className="hidden lg:flex flex-1 items-center justify-center">
                    <motion.div
                        key={currentImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: '1px solid rgba(0, 240, 255, 0.2)',
                                boxShadow: '0 20px 60px rgba(0, 240, 255, 0.2)',
                                position: 'relative',
                            }}
                    >
                        <img
                            src={images[currentImage]}
                            alt="IT services and software development showcase"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'brightness(0.7) contrast(1.1)',
                                }}
                            width="800"
                            height="600"
                            loading="lazy"
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                                }}
                        />
                    </motion.div>
                </div>

                {/* Right section with booking form */}
                    <div className="flex-1 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                style={{
                                    borderRadius: '24px',
                                    padding: '40px',
                                    border: '1px solid rgba(0, 240, 255, 0.2)',
                                    background: 'rgba(10, 14, 39, 0.6)',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: '0 20px 60px rgba(0, 240, 255, 0.1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Animated gradient background */}
                                <motion.div
                                    animate={{
                                        background: [
                                            'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)',
                                            'linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                                            'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 102, 255, 0.1) 100%)',
                                        ],
                                    }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        opacity: 0.3,
                                        zIndex: 0,
                                    }}
                                />

                                <div style={{ position: 'relative', zIndex: 1 }}>
                    <motion.h1
                                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        style={{
                                            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                                            fontWeight: 800,
                                            marginBottom: '8px',
                                            background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Book a Consultation
                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        style={{
                                            color: '#cbd5e1',
                                            fontSize: '1rem',
                                            textAlign: 'center',
                                            marginBottom: '32px',
                                        }}
                                    >
                                        Fill out the form below and we'll get back to you shortly
                                    </motion.p>

                                    {/* Error Message */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            style={{
                                                padding: '12px 16px',
                                                borderRadius: '8px',
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                                color: '#fca5a5',
                                                marginBottom: '24px',
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            ⚠️ {error}
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <label htmlFor="service" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                                                Select Service
                                            </label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                                    background: 'rgba(0, 240, 255, 0.1)',
                                                    color: '#e2e8f0',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.6)';
                                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <option value="" disabled style={{ background: '#0a0e27', color: '#e2e8f0' }}>Select a service</option>
                                    {services.map((service) => (
                                                    <option key={service} value={service} style={{ background: '#0a0e27', color: '#e2e8f0' }}>
                                                        {service}
                                                    </option>
                                    ))}
                                </select>
                                        </motion.div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <label htmlFor="date" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                                                    Select Date
                                                </label>
                                <div style={{ width: '100%' }}>
                                    <DatePicker
                                        selected={formData.date}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        placeholderText="Choose a date"
                                        required
                                        wrapperClassName="date-picker-wrapper"
                                        className="date-picker-input"
                                    />
                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <label htmlFor="time" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                                                    Preferred Time
                                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(0, 240, 255, 0.3)',
                                                        background: 'rgba(0, 240, 255, 0.1)',
                                                        color: '#e2e8f0',
                                                        fontSize: '1rem',
                                                        outline: 'none',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                    onFocus={(e) => {
                                                        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.6)';
                                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                />
                                            </motion.div>
                            </div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                                                Full Name
                                            </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                                placeholder="John Doe"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                                    background: 'rgba(0, 240, 255, 0.1)',
                                                    color: '#e2e8f0',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.6)';
                                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                                                Email Address
                                            </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                                placeholder="you@example.com"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                                    background: 'rgba(0, 240, 255, 0.1)',
                                                    color: '#e2e8f0',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.6)';
                                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                                                Phone Number
                                            </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                                placeholder="+254..."
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                                    background: 'rgba(0, 240, 255, 0.1)',
                                                    color: '#e2e8f0',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.6)';
                                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.0 }}
                                        >
                                            <label htmlFor="description" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem' }}>
                                                Describe Your Requirements
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Share your idea or requirements in detail..."
                                                value={formData.description}
                                                onChange={handleChange}
                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                                    background: 'rgba(0, 240, 255, 0.1)',
                                                    color: '#e2e8f0',
                                                    fontSize: '1rem',
                                                    outline: 'none',
                                                    resize: 'vertical',
                                                    fontFamily: 'inherit',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.6)';
                                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            />
                                        </motion.div>

                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                                whileTap={!isLoading ? { scale: 0.98 } : {}}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                style={{
                                    width: '100%',
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    background: isLoading 
                                        ? 'rgba(0, 240, 255, 0.5)' 
                                        : 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                                    border: 'none',
                                    color: '#0a0e27',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 10px 30px rgba(0, 240, 255, 0.4)',
                                    transition: 'all 0.3s ease',
                                    opacity: isLoading ? 0.7 : 1,
                                }}
                                onMouseEnter={(e) => {
                                    if (!isLoading) {
                                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 240, 255, 0.6)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 240, 255, 0.4)';
                                }}
                            >
                                {isLoading ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            style={{ display: 'inline-block' }}
                                        >
                                            ⏳
                                        </motion.span>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Book Consultation'
                                )}
                            </motion.button>
                        </form>
                                </div>
                            </motion.div>
                    </motion.div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isSubmitted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 1000,
                    }}
                    onClick={() => setIsSubmitted(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'rgba(10, 14, 39, 0.95)',
                            borderRadius: '24px',
                            padding: '40px',
                            maxWidth: '500px',
                            width: '90%',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            boxShadow: '0 20px 60px rgba(0, 240, 255, 0.3)',
                            textAlign: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                                fontSize: '40px',
                            }}
                        >
                            ✓
                        </motion.div>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            marginBottom: '16px',
                            background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Booking Confirmed!
                        </h2>
                        <p style={{ color: '#cbd5e1', marginBottom: '8px', fontSize: '1rem' }}>
                            Thank you, <strong style={{ color: '#00f0ff' }}>{formData.name}</strong>.
                        </p>
                        <p style={{ color: '#cbd5e1', marginBottom: '24px', fontSize: '1rem' }}>
                            Your booking for <strong style={{ color: '#00f0ff' }}>{formData.service}</strong> is confirmed.
                            We've sent a confirmation email to <strong style={{ color: '#00f0ff' }}>{formData.email}</strong>.
                        </p>
                        <motion.button
                            onClick={() => setIsSubmitted(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                                border: 'none',
                                color: '#0a0e27',
                                padding: '12px 32px',
                                borderRadius: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontSize: '1rem',
                                boxShadow: '0 10px 30px rgba(0, 240, 255, 0.4)',
                            }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}

            {/* Custom styles for DatePicker */}
            <style>{`
                .date-picker-wrapper {
                    width: 100%;
                }
                .date-picker-input {
                    width: 100%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: 1px solid rgba(0, 240, 255, 0.3);
                    background: rgba(0, 240, 255, 0.1);
                    color: #e2e8f0;
                    font-size: 1rem;
                    outline: none;
                }
                .date-picker-input:focus {
                    border-color: rgba(0, 240, 255, 0.6);
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
                }
                .react-datepicker {
                    background: rgba(10, 14, 39, 0.95);
                    border: 1px solid rgba(0, 240, 255, 0.3);
                    border-radius: 12px;
                    font-family: inherit;
                }
                .react-datepicker__header {
                    background: rgba(0, 240, 255, 0.1);
                    border-bottom: 1px solid rgba(0, 240, 255, 0.3);
                    border-radius: 12px 12px 0 0;
                }
                .react-datepicker__current-month {
                    color: #00f0ff;
                    font-weight: 600;
                }
                .react-datepicker__day-name {
                    color: #cbd5e1;
                }
                .react-datepicker__day {
                    color: #e2e8f0;
                }
                .react-datepicker__day:hover {
                    background: rgba(0, 240, 255, 0.2);
                }
                .react-datepicker__day--selected {
                    background: linear-gradient(135deg, #00f0ff 0%, #0066ff 100%);
                    color: #0a0e27;
                }
                .react-datepicker__day--keyboard-selected {
                    background: rgba(0, 240, 255, 0.3);
                }
            `}</style>
        </div>
    );
}

export default BookingPage;

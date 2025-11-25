import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      // Store token and user info
      if (data.data && data.data.token) {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data.user));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid response from server');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Network error. Please check your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '100px 20px 80px',
        background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
        marginTop: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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

      <div className="container mx-auto max-w-md" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgba(0, 102, 255, 0.15)',
              border: '1px solid rgba(0, 102, 255, 0.4)',
              borderRadius: '50px',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: '#0066ff', fontSize: '14px', fontWeight: 600 }}>
              Admin Access
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #0066ff 0%, #00f0ff 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            Admin Login
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              color: '#94a3b8',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Sign in to access the admin dashboard
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            borderRadius: '16px',
            padding: '32px',
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
                  fontSize: '0.875rem',
                }}
              >
                ⚠️ {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontWeight: 500, fontSize: '0.875rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    background: 'rgba(0, 240, 255, 0.08)',
                    color: '#e2e8f0',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
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
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontWeight: 500, fontSize: '0.875rem' }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    background: 'rgba(0, 240, 255, 0.08)',
                    color: '#e2e8f0',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
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
                whileHover={!isLoading ? { scale: 1.01, y: -1 } : {}}
                whileTap={!isLoading ? { scale: 0.99 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  borderRadius: '8px',
                  background: isLoading
                    ? 'rgba(0, 240, 255, 0.5)'
                    : 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                  border: 'none',
                  color: '#0a0e27',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 240, 255, 0.3)',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.7 : 1,
                  letterSpacing: '0.02em',
                  marginTop: '8px',
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
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;


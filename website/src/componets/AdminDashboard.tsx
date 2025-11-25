import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TokenManagement from './TokenManagement';
import IPBlacklist from './IPBlacklist';
import APIDocs from './APIDocs';

interface DashboardStats {
  totalTokens: number;
  activeTokens: number;
  inactiveTokens: number;
  totalUsers: number;
  totalBlacklistedIPs: number;
}

interface RecentToken {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  usageCount: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tokens' | 'ip-blacklist' | 'api-docs'>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentTokens, setRecentTokens] = useState<RecentToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  const token = localStorage.getItem('adminToken');
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          navigate('/login');
          return;
        }
        setError(data.message || 'Failed to fetch dashboard stats');
        return;
      }

      if (data.success) {
        setStats(data.data.stats);
        setRecentTokens(data.data.recentTokens || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const StatCard: React.FC<{ title: string; value: number | string; icon: string; color: string }> = ({ title, value, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(10, 14, 39, 0.6)',
        border: '1px solid rgba(0, 240, 255, 0.2)',
        borderRadius: '12px',
        padding: '24px',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '32px' }}>{icon}</span>
        <div style={{ fontSize: '32px', fontWeight: 700, color }}>{value}</div>
      </div>
      <div style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }}>{title}</div>
    </motion.div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
        padding: '100px 20px 40px',
        marginTop: '80px',
      }}
    >
      {/* Header */}
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #0066ff 0%, #00f0ff 50%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
              }}
            >
              Admin Dashboard
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
              Welcome back, {adminUser.email || 'Admin'}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#fca5a5',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Logout
          </motion.button>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '32px',
            flexWrap: 'wrap',
            borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
            paddingBottom: '16px',
          }}
        >
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'tokens', label: 'Tokens', icon: '🔑' },
            { id: 'ip-blacklist', label: 'IP Blacklist', icon: '🚫' },
            { id: 'api-docs', label: 'API Docs', icon: '📚' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab.id
                  ? 'rgba(0, 240, 255, 0.2)'
                  : 'rgba(0, 240, 255, 0.05)',
                border: `1px solid ${activeTab === tab.id ? 'rgba(0, 240, 255, 0.4)' : 'rgba(0, 240, 255, 0.2)'}`,
                borderRadius: '8px',
                color: activeTab === tab.id ? '#00f0ff' : '#94a3b8',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Area */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key="dashboard"
          >
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '48px', display: 'inline-block', marginBottom: '16px' }}
                >
                  ⏳
                </motion.div>
                <p>Loading dashboard...</p>
              </div>
            ) : error ? (
              <div
                style={{
                  padding: '20px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#fca5a5',
                  marginBottom: '20px',
                }}
              >
                ⚠️ {error}
              </div>
            ) : stats ? (
              <>
                {/* Stats Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '32px',
                  }}
                >
                  <StatCard title="Total Tokens" value={stats.totalTokens} icon="🔑" color="#00f0ff" />
                  <StatCard title="Active Tokens" value={stats.activeTokens} icon="✅" color="#00ff88" />
                  <StatCard title="Inactive Tokens" value={stats.inactiveTokens} icon="⏸️" color="#f59e0b" />
                  <StatCard title="Total Users" value={stats.totalUsers} icon="👥" color="#0066ff" />
                  <StatCard title="Blacklisted IPs" value={stats.totalBlacklistedIPs} icon="🚫" color="#ef4444" />
                </div>

                {/* Recent Tokens */}
                {recentTokens.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      background: 'rgba(10, 14, 39, 0.6)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '24px',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: '#e2e8f0' }}>
                      Recent Tokens
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {recentTokens.map((token) => (
                        <div
                          key={token._id}
                          style={{
                            padding: '16px',
                            background: 'rgba(0, 240, 255, 0.05)',
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>
                              {token.name}
                            </div>
                            {token.description && (
                              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                                {token.description}
                              </div>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span
                              style={{
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                background: token.isActive
                                  ? 'rgba(0, 255, 136, 0.1)'
                                  : 'rgba(245, 158, 11, 0.1)',
                                color: token.isActive ? '#00ff88' : '#f59e0b',
                                border: `1px solid ${token.isActive ? 'rgba(0, 255, 136, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                              }}
                            >
                              {token.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                              Used {token.usageCount} times
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            ) : null}
          </motion.div>
        )}

        {/* Render other tabs based on activeTab */}
        {activeTab === 'tokens' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key="tokens"
          >
            <TokenManagement />
          </motion.div>
        )}

        {activeTab === 'ip-blacklist' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key="ip-blacklist"
          >
            <IPBlacklist />
          </motion.div>
        )}

        {activeTab === 'api-docs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key="api-docs"
          >
            <APIDocs />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BlacklistedIP {
  id: string;
  ip: string;
  tokenId?: string;
  tokenName?: string;
  reason?: string;
  blockedBy?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Token {
  id: string;
  name: string;
  token: string;
}

const IPBlacklist: React.FC = () => {
  const [blacklistedIPs, setBlacklistedIPs] = useState<BlacklistedIP[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    ip: '',
    tokenId: '',
    reason: '',
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchBlacklistedIPs();
    fetchTokens();
  }, []);

  const fetchBlacklistedIPs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/ip-blacklist`, {
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
          window.location.href = '/login';
          return;
        }
        setError(data.message || 'Failed to fetch blacklisted IPs');
        return;
      }

      if (data.success) {
        setBlacklistedIPs(data.data.ips || []);
      }
    } catch (error) {
      console.error('Error fetching blacklisted IPs:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTokens = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/tokens`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setTokens(data.data.tokens || []);
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const handleAddBlacklist = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.ip || !formData.tokenId) {
      setError('IP address and token are required');
      return;
    }

    // Validate IP format
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(formData.ip)) {
      setError('Invalid IP address format');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/ip-blacklist`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip: formData.ip.trim(),
          tokenId: formData.tokenId,
          reason: formData.reason.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          setError(data.details.map((d: any) => d.msg || d.message).join(', '));
        } else {
          setError(data.message || 'Failed to blacklist IP');
        }
        return;
      }

      if (data.success) {
        setFormData({ ip: '', tokenId: '', reason: '' });
        setShowAddModal(false);
        fetchBlacklistedIPs();
      }
    } catch (error) {
      console.error('Error blacklisting IP:', error);
      setError('Network error. Please check your connection.');
    }
  };

  const handleToggleBlacklist = async (blacklistId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/ip-blacklist/${blacklistId}/toggle`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to update blacklist');
        return;
      }

      if (data.success) {
        fetchBlacklistedIPs();
      }
    } catch (error) {
      console.error('Error toggling blacklist:', error);
      setError('Network error. Please check your connection.');
    }
  };

  const handleDeleteBlacklist = async (blacklistId: string) => {
    if (!confirm('Are you sure you want to remove this IP from the blacklist?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/ip-blacklist/${blacklistId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to remove IP from blacklist');
        return;
      }

      if (data.success) {
        fetchBlacklistedIPs();
      }
    } catch (error) {
      console.error('Error removing IP from blacklist:', error);
      setError('Network error. Please check your connection.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      {/* Header with Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0' }}>
          IP Blacklist Management
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0e27',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          + Add IP to Blacklist
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#fca5a5',
            marginBottom: '20px',
            fontSize: '0.875rem',
          }}
        >
          ⚠️ {error}
        </motion.div>
      )}

      {/* Add Blacklist Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => {
            setShowAddModal(false);
            setFormData({ ip: '', tokenId: '', reason: '' });
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(10, 14, 39, 0.95)',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '100%',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 240, 255, 0.3)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', color: '#e2e8f0' }}>
              Add IP to Blacklist
            </h3>

            <form onSubmit={handleAddBlacklist}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>
                    IP Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ip}
                    onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                    placeholder="192.168.1.1"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      background: 'rgba(0, 240, 255, 0.08)',
                      color: '#e2e8f0',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>
                    Token *
                  </label>
                  <select
                    required
                    value={formData.tokenId}
                    onChange={(e) => setFormData({ ...formData, tokenId: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      background: 'rgba(0, 240, 255, 0.08)',
                      color: '#e2e8f0',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  >
                    <option value="" style={{ background: '#0a0e27', color: '#e2e8f0' }}>
                      Select a token
                    </option>
                    {tokens.map((t) => (
                      <option key={t.id} value={t.id} style={{ background: '#0a0e27', color: '#e2e8f0' }}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>
                    Reason (Optional)
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="Reason for blacklisting this IP"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      background: 'rgba(0, 240, 255, 0.08)',
                      color: '#e2e8f0',
                      fontSize: '0.875rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ ip: '', tokenId: '', reason: '' });
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: 'rgba(148, 163, 184, 0.1)',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#0a0e27',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Add to Blacklist
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Blacklisted IPs List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '48px', display: 'inline-block', marginBottom: '16px' }}
          >
            ⏳
          </motion.div>
          <p>Loading blacklisted IPs...</p>
        </div>
      ) : blacklistedIPs.length === 0 ? (
        <div
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            background: 'rgba(10, 14, 39, 0.6)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '12px',
            color: '#94a3b8',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
          <p>No blacklisted IPs found. Add an IP to the blacklist to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {blacklistedIPs.map((blacklist) => (
            <motion.div
              key={blacklist.id}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#e2e8f0', fontFamily: 'monospace' }}>
                      {blacklist.ip}
                    </h3>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        background: blacklist.isActive
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'rgba(148, 163, 184, 0.1)',
                        color: blacklist.isActive ? '#ef4444' : '#94a3b8',
                        border: `1px solid ${blacklist.isActive ? 'rgba(239, 68, 68, 0.3)' : 'rgba(148, 163, 184, 0.3)'}`,
                      }}
                    >
                      {blacklist.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {blacklist.tokenName && (
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '8px' }}>
                      <span style={{ color: '#cbd5e1' }}>Token:</span> {blacklist.tokenName}
                    </p>
                  )}
                  {blacklist.reason && (
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '8px' }}>
                      <span style={{ color: '#cbd5e1' }}>Reason:</span> {blacklist.reason}
                    </p>
                  )}
                  {blacklist.blockedBy && (
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '8px' }}>
                      <span style={{ color: '#cbd5e1' }}>Blocked by:</span> {blacklist.blockedBy}
                    </p>
                  )}
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                    <div>
                      <span style={{ color: '#cbd5e1' }}>Created:</span> {formatDate(blacklist.createdAt)}
                    </div>
                    {blacklist.updatedAt !== blacklist.createdAt && (
                      <div>
                        <span style={{ color: '#cbd5e1' }}>Updated:</span> {formatDate(blacklist.updatedAt)}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleToggleBlacklist(blacklist.id, blacklist.isActive)}
                    style={{
                      padding: '8px 16px',
                      background: blacklist.isActive
                        ? 'rgba(148, 163, 184, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      border: `1px solid ${blacklist.isActive ? 'rgba(148, 163, 184, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                      borderRadius: '8px',
                      color: blacklist.isActive ? '#94a3b8' : '#ef4444',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {blacklist.isActive ? 'Deactivate' : 'Activate'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteBlacklist(blacklist.id)}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#fca5a5',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IPBlacklist;


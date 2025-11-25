import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AssignedServer {
  serverName: string;
  serverId: string;
  serverIP?: string;
  description?: string;
  assignedAt: string;
  lastUsed?: string;
  usageCount: number;
}

interface Token {
  id: string;
  token: string;
  name: string;
  description?: string;
  isActive: boolean;
  allowedChannels: string[];
  rateLimit: number;
  usageCount: number;
  lastUsed?: string;
  expiresAt?: string;
  createdAt: string;
  metadata?: any;
  assignedServers?: AssignedServer[];
  maxServers?: number;
  serverCount?: number;
}

const TokenManagement: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    userEmail: '',
    allowedChannels: ['email', 'sms'] as string[],
    rateLimit: 1000,
    expiresAt: '',
    maxServers: 5,
    assignedServers: [] as Array<{ serverId: string; serverName: string; serverIP?: string; description?: string }>,
  });
  const [showServerModal, setShowServerModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [serverFormData, setServerFormData] = useState({
    serverId: '',
    serverName: '',
    serverIP: '',
    description: '',
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/tokens`, {
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
        setError(data.message || 'Failed to fetch tokens');
        return;
      }

      if (data.success) {
        setTokens(data.data.tokens || []);
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/tokens/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
          userEmail: formData.userEmail.trim() || undefined,
          allowedChannels: formData.allowedChannels,
          rateLimit: formData.rateLimit,
          expiresAt: formData.expiresAt || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          setError(data.details.map((d: any) => d.msg || d.message).join(', '));
        } else {
          setError(data.message || 'Failed to generate token');
        }
        return;
      }

      if (data.success) {
        setGeneratedToken(data.data.token);
        setFormData({
          name: '',
          description: '',
          userEmail: '',
          allowedChannels: ['email', 'sms'],
          rateLimit: 1000,
          expiresAt: '',
          maxServers: 5,
          assignedServers: [],
        });
        fetchTokens();
      }
    } catch (error) {
      console.error('Error generating token:', error);
      setError('Network error. Please check your connection.');
    }
  };

  const handleToggleToken = async (tokenId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/tokens/${tokenId}/disable`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to update token');
        return;
      }

      if (data.success) {
        fetchTokens();
      }
    } catch (error) {
      console.error('Error toggling token:', error);
      setError('Network error. Please check your connection.');
    }
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (!confirm('Are you sure you want to delete this token? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/tokens/${tokenId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to delete token');
        return;
      }

      if (data.success) {
        fetchTokens();
      }
    } catch (error) {
      console.error('Error deleting token:', error);
      setError('Network error. Please check your connection.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Token copied to clipboard!');
  };

  const handleAssignServer = async (tokenId: string) => {
    setSelectedTokenId(tokenId);
    setServerFormData({ serverId: '', serverName: '', serverIP: '', description: '' });
    setShowServerModal(true);
  };

  const handleSubmitServer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTokenId) return;

    setError(null);

    if (!serverFormData.serverId || !serverFormData.serverName) {
      setError('Server ID and Server Name are required');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/tokens/${selectedTokenId}/servers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serverFormData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to assign server');
        return;
      }

      if (data.success) {
        setShowServerModal(false);
        setServerFormData({ serverId: '', serverName: '', serverIP: '', description: '' });
        fetchTokens();
      }
    } catch (error) {
      console.error('Error assigning server:', error);
      setError('Network error. Please check your connection.');
    }
  };

  const handleRemoveServer = async (tokenId: string, serverId: string) => {
    if (!confirm('Are you sure you want to remove this server from the token?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/tokens/${tokenId}/servers/${serverId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to remove server');
        return;
      }

      if (data.success) {
        fetchTokens();
      }
    } catch (error) {
      console.error('Error removing server:', error);
      setError('Network error. Please check your connection.');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      {/* Header with Generate Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0' }}>
          Access Token Management
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowGenerateModal(true)}
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
          + Generate New Token
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

      {/* Generate Token Modal */}
      {showGenerateModal && (
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
            setShowGenerateModal(false);
            setGeneratedToken(null);
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
              maxWidth: '600px',
              width: '100%',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 240, 255, 0.3)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {generatedToken ? (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', color: '#00f0ff' }}>
                  Token Generated Successfully!
                </h3>
                <div
                  style={{
                    padding: '16px',
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    wordBreak: 'break-all',
                    color: '#e2e8f0',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                  }}
                >
                  {generatedToken}
                </div>
                <div
                  style={{
                    padding: '12px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '8px',
                    color: '#fbbf24',
                    fontSize: '0.875rem',
                    marginBottom: '20px',
                  }}
                >
                  ⚠️ Save this token now. You will not be able to see it again!
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(generatedToken)}
                    style={{
                      flex: 1,
                      padding: '10px 20px',
                      background: 'rgba(0, 240, 255, 0.2)',
                      border: '1px solid rgba(0, 240, 255, 0.4)',
                      borderRadius: '8px',
                      color: '#00f0ff',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Copy Token
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowGenerateModal(false);
                      setGeneratedToken(null);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#0a0e27',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGenerateToken}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', color: '#e2e8f0' }}>
                  Generate New Access Token
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>
                      Token Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Production API Token"
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
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Optional description"
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

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>
                      User Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.userEmail}
                      onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                      placeholder="user@example.com"
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
                      Allowed Channels
                    </label>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {['email', 'sms', 'push', 'whatsapp'].map((channel) => (
                        <label
                          key={channel}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            background: formData.allowedChannels.includes(channel)
                              ? 'rgba(0, 240, 255, 0.2)'
                              : 'rgba(0, 240, 255, 0.05)',
                            border: `1px solid ${formData.allowedChannels.includes(channel) ? 'rgba(0, 240, 255, 0.4)' : 'rgba(0, 240, 255, 0.2)'}`,
                            borderRadius: '8px',
                            color: formData.allowedChannels.includes(channel) ? '#00f0ff' : '#94a3b8',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.allowedChannels.includes(channel)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  allowedChannels: [...formData.allowedChannels, channel],
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  allowedChannels: formData.allowedChannels.filter((c) => c !== channel),
                                });
                              }
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                          {channel}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>
                      Rate Limit
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={formData.rateLimit}
                      onChange={(e) => setFormData({ ...formData, rateLimit: parseInt(e.target.value) || 1000 })}
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
                      Expires At (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.expiresAt}
                      onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
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
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowGenerateModal(false)}
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
                    Generate Token
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Tokens List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '48px', display: 'inline-block', marginBottom: '16px' }}
          >
            ⏳
          </motion.div>
          <p>Loading tokens...</p>
        </div>
      ) : tokens.length === 0 ? (
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔑</div>
          <p>No tokens found. Generate your first token to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tokens.map((token) => (
            <motion.div
              key={token.id}
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
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#e2e8f0' }}>
                      {token.name}
                    </h3>
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
                  </div>
                  {token.description && (
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px' }}>
                      {token.description}
                    </p>
                  )}
                  <div
                    style={{
                      padding: '12px',
                      background: 'rgba(0, 240, 255, 0.05)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      borderRadius: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Token</div>
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        color: '#e2e8f0',
                        wordBreak: 'break-all',
                      }}
                    >
                      {token.token}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.875rem', color: '#94a3b8' }}>
                    <div>
                      <span style={{ color: '#cbd5e1' }}>Channels:</span>{' '}
                      {token.allowedChannels.join(', ')}
                    </div>
                    <div>
                      <span style={{ color: '#cbd5e1' }}>Rate Limit:</span> {token.rateLimit}/min
                    </div>
                    <div>
                      <span style={{ color: '#cbd5e1' }}>Usage:</span> {token.usageCount} times
                    </div>
                    <div>
                      <span style={{ color: '#cbd5e1' }}>Last Used:</span> {formatDate(token.lastUsed)}
                    </div>
                    {token.expiresAt && (
                      <div>
                        <span style={{ color: '#cbd5e1' }}>Expires:</span> {formatDate(token.expiresAt)}
                      </div>
                    )}
                    <div>
                      <span style={{ color: '#cbd5e1' }}>Servers:</span>{' '}
                      {token.serverCount || 0}/{token.maxServers || 5}
                    </div>
                  </div>

                  {/* Assigned Servers Section */}
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0, 240, 255, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0' }}>
                        Assigned Servers ({token.serverCount || 0}/{token.maxServers || 5})
                      </h4>
                      {(token.serverCount || 0) < (token.maxServers || 5) && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAssignServer(token.id)}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(0, 240, 255, 0.1)',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            borderRadius: '6px',
                            color: '#00f0ff',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}
                        >
                          + Add Server
                        </motion.button>
                      )}
                    </div>
                    {token.assignedServers && token.assignedServers.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {token.assignedServers.map((server, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '10px',
                              background: 'rgba(0, 240, 255, 0.05)',
                              border: '1px solid rgba(0, 240, 255, 0.2)',
                              borderRadius: '6px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.875rem' }}>
                                {server.serverName}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                                ID: {server.serverId}
                              </div>
                              {server.serverIP && (
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                  IP: {server.serverIP}
                                </div>
                              )}
                              {server.usageCount > 0 && (
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                  Used {server.usageCount} times
                                </div>
                              )}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRemoveServer(token.id, server.serverId)}
                              style={{
                                padding: '4px 8px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '4px',
                                color: '#fca5a5',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                              }}
                            >
                              Remove
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: '#94a3b8', fontSize: '0.875rem', fontStyle: 'italic' }}>
                        No servers assigned. Click "Add Server" to assign one.
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(token.token)}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#00f0ff',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Copy
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleToggleToken(token.id, token.isActive)}
                    style={{
                      padding: '8px 16px',
                      background: token.isActive
                        ? 'rgba(245, 158, 11, 0.1)'
                        : 'rgba(0, 255, 136, 0.1)',
                      border: `1px solid ${token.isActive ? 'rgba(245, 158, 11, 0.3)' : 'rgba(0, 255, 136, 0.3)'}`,
                      borderRadius: '8px',
                      color: token.isActive ? '#f59e0b' : '#00ff88',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {token.isActive ? 'Disable' : 'Enable'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteToken(token.id)}
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
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Server Assignment Modal */}
      {showServerModal && (
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
            setShowServerModal(false);
            setServerFormData({ serverId: '', serverName: '', serverIP: '', description: '' });
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
              Assign Server to Token
            </h3>

            <form onSubmit={handleSubmitServer}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 500 }}>
                    Server ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={serverFormData.serverId}
                    onChange={(e) => setServerFormData({ ...serverFormData, serverId: e.target.value })}
                    placeholder="server-001"
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
                    Server Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={serverFormData.serverName}
                    onChange={(e) => setServerFormData({ ...serverFormData, serverName: e.target.value })}
                    placeholder="Production Server 1"
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
                    Server IP (Optional)
                  </label>
                  <input
                    type="text"
                    value={serverFormData.serverIP}
                    onChange={(e) => setServerFormData({ ...serverFormData, serverIP: e.target.value })}
                    placeholder="192.168.1.100"
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
                    Description (Optional)
                  </label>
                  <textarea
                    value={serverFormData.description}
                    onChange={(e) => setServerFormData({ ...serverFormData, description: e.target.value })}
                    placeholder="Server description or location"
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
                    setShowServerModal(false);
                    setServerFormData({ serverId: '', serverName: '', serverIP: '', description: '' });
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
                  Assign Server
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TokenManagement;


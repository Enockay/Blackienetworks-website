import React from 'react';
import { motion } from 'framer-motion';

const APIDocs: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

  const apiEndpoints = [
    {
      title: 'Admin Authentication',
      endpoints: [
        {
          method: 'POST',
          path: '/api/admin/login',
          description: 'Admin login endpoint',
          auth: false,
          body: {
            email: 'string (required)',
            password: 'string (required)',
          },
          response: {
            success: true,
            message: 'Login successful',
            data: {
              token: 'JWT token',
              user: { id: 'string', email: 'string', role: 'admin' },
            },
          },
        },
      ],
    },
    {
      title: 'Dashboard',
      endpoints: [
        {
          method: 'GET',
          path: '/api/admin/dashboard/stats',
          description: 'Get dashboard statistics',
          auth: true,
          response: {
            success: true,
            data: {
              stats: {
                totalTokens: 'number',
                activeTokens: 'number',
                inactiveTokens: 'number',
                totalUsers: 'number',
                totalBlacklistedIPs: 'number',
              },
              recentTokens: 'array',
            },
          },
        },
      ],
    },
    {
      title: 'Token Management',
      endpoints: [
        {
          method: 'POST',
          path: '/api/admin/tokens/generate',
          description: 'Generate a new access token',
          auth: true,
          body: {
            name: 'string (required)',
            description: 'string (optional)',
            userEmail: 'string (optional)',
            allowedChannels: 'array (optional, default: ["email", "sms"])',
            rateLimit: 'number (optional, default: 1000)',
            expiresAt: 'ISO8601 date (optional)',
          },
          response: {
            success: true,
            message: 'Access token created successfully',
            data: {
              token: 'string',
              id: 'string',
              name: 'string',
              // ... other fields
            },
          },
        },
        {
          method: 'GET',
          path: '/api/admin/tokens',
          description: 'Get all access tokens',
          auth: true,
          response: {
            success: true,
            data: {
              tokens: 'array',
              total: 'number',
            },
          },
        },
        {
          method: 'PUT',
          path: '/api/admin/tokens/:id/disable',
          description: 'Enable or disable a token',
          auth: true,
          body: {
            isActive: 'boolean',
          },
        },
        {
          method: 'DELETE',
          path: '/api/admin/tokens/:id',
          description: 'Delete a token',
          auth: true,
        },
      ],
    },
    {
      title: 'IP Blacklist Management',
      endpoints: [
        {
          method: 'GET',
          path: '/api/admin/ip-blacklist',
          description: 'Get all blacklisted IPs',
          auth: true,
          response: {
            success: true,
            data: {
              ips: 'array',
              total: 'number',
            },
          },
        },
        {
          method: 'POST',
          path: '/api/admin/ip-blacklist',
          description: 'Add an IP to blacklist',
          auth: true,
          body: {
            ip: 'string (required, IPv4 format)',
            tokenId: 'string (required, MongoDB ObjectId)',
            reason: 'string (optional)',
          },
        },
        {
          method: 'PUT',
          path: '/api/admin/ip-blacklist/:id/toggle',
          description: 'Activate or deactivate a blacklist entry',
          auth: true,
          body: {
            isActive: 'boolean',
          },
        },
        {
          method: 'DELETE',
          path: '/api/admin/ip-blacklist/:id',
          description: 'Remove an IP from blacklist',
          auth: true,
        },
      ],
    },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return { bg: 'rgba(0, 255, 136, 0.1)', border: 'rgba(0, 255, 136, 0.3)', color: '#00ff88' };
      case 'POST':
        return { bg: 'rgba(0, 102, 255, 0.1)', border: 'rgba(0, 102, 255, 0.3)', color: '#0066ff' };
      case 'PUT':
        return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', color: '#f59e0b' };
      case 'DELETE':
        return { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.1)', border: 'rgba(148, 163, 184, 0.3)', color: '#94a3b8' };
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>
          API Documentation
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
          Base URL: <code style={{ color: '#00f0ff', fontFamily: 'monospace' }}>{API_BASE_URL}</code>
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '8px' }}>
          All authenticated endpoints require an Authorization header: <code style={{ color: '#00f0ff', fontFamily: 'monospace' }}>Authorization: Bearer {'<token>'}</code>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {apiEndpoints.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            style={{
              background: 'rgba(10, 14, 39, 0.6)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              borderRadius: '12px',
              padding: '24px',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '20px' }}>
              {section.title}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {section.endpoints.map((endpoint, endpointIndex) => {
                const methodColor = getMethodColor(endpoint.method);
                return (
                  <div
                    key={endpointIndex}
                    style={{
                      padding: '20px',
                      background: 'rgba(0, 240, 255, 0.05)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: methodColor.bg,
                          border: `1px solid ${methodColor.border}`,
                          color: methodColor.color,
                        }}
                      >
                        {endpoint.method}
                      </span>
                      <code
                        style={{
                          color: '#e2e8f0',
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          background: 'rgba(0, 240, 255, 0.1)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {endpoint.path}
                      </code>
                      {endpoint.auth && (
                        <span
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            color: '#f59e0b',
                          }}
                        >
                          🔒 Auth Required
                        </span>
                      )}
                    </div>

                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '12px' }}>
                      {endpoint.description}
                    </p>

                    {'body' in endpoint && endpoint.body && (
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
                          Request Body:
                        </div>
                        <pre
                          style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            padding: '12px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            color: '#e2e8f0',
                            overflowX: 'auto',
                            fontFamily: 'monospace',
                          }}
                        >
                          {JSON.stringify(endpoint.body, null, 2)}
                        </pre>
                      </div>
                    )}

                    {endpoint.response && (
                      <div>
                        <div style={{ color: '#cbd5e1', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
                          Response:
                        </div>
                        <pre
                          style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                            padding: '12px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            color: '#e2e8f0',
                            overflowX: 'auto',
                            fontFamily: 'monospace',
                          }}
                        >
                          {JSON.stringify(endpoint.response, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '32px',
          padding: '20px',
          background: 'rgba(0, 240, 255, 0.05)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: '12px',
          color: '#94a3b8',
          fontSize: '0.875rem',
        }}
      >
        <div style={{ fontWeight: 600, color: '#00f0ff', marginBottom: '8px' }}>
          📚 Full API Documentation
        </div>
        <p>
          For complete API documentation with examples and detailed descriptions, visit:{' '}
          <a
            href={`${API_BASE_URL}/api-docs.html`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#00f0ff', textDecoration: 'underline' }}
          >
            {API_BASE_URL}/api-docs.html
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default APIDocs;


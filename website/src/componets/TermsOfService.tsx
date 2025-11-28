import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

const TermsOfService: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        marginTop: '80px',
        padding: '80px 20px',
        background:
          'linear-gradient(135deg, rgba(5, 8, 16, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)',
      }}
    >
      <div
        className="max-w-4xl mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <Title
            level={1}
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 900,
              marginBottom: 8,
              background:
                'linear-gradient(135deg, #00f0ff 0%, #0066ff 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Terms of Service
          </Title>
          <Paragraph
            style={{
              color: '#cbd5e1',
              maxWidth: 640,
              margin: '0 auto',
              fontSize: '1rem',
            }}
          >
            These Terms of Service (&quot;Terms&quot;) govern your use of the
            website, products and services provided by Blackie Networks
            (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;).
          </Paragraph>
          <Paragraph style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Last updated: {new Date().toLocaleDateString()}
          </Paragraph>
        </motion.div>

        <div
          style={{
            borderRadius: 20,
            border: '1px solid rgba(148, 163, 184, 0.4)',
            background: 'rgba(15, 23, 42, 0.9)',
            padding: 24,
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.8)',
          }}
        >
          <Title level={3} style={{ color: '#e5e7eb', marginTop: 0 }}>
            1. Acceptance of terms
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            By accessing or using our website, booking a service, connecting to
            our internet or network, or using any of our products (including
            Blackie Proxy, ISP Billing, cloud and software services), you agree
            to be bound by these Terms. If you do not agree, you should not use
            our services.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            2. Services we provide
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Blackie Networks provides, among others:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Internet connectivity and campus Wi‑Fi solutions</li>
            <li>Network infrastructure design and implementation</li>
            <li>MikroTik configuration and management</li>
            <li>Proxy, ISP billing and authentication platforms</li>
            <li>Custom software, cloud hosting and VPN solutions</li>
            <li>IT consulting, maintenance and related services</li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Specific service descriptions, prices and service levels may be
            documented in separate proposals, quotes or contracts. In case of a
            conflict, those specific agreements prevail over these general
            Terms.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            3. Eligibility
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            You must be at least 18 years old, or the age of majority in your
            jurisdiction, to enter into a binding agreement with Blackie
            Networks. If you are using our services on behalf of an
            organization, you represent that you are authorized to accept these
            Terms on its behalf.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            4. User responsibilities & acceptable use
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            You agree to use our services in compliance with applicable law and
            to avoid activities that could harm our network, other users or
            third parties. You agree not to:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>
              Use our network or services for illegal content, fraud or abuse
            </li>
            <li>
              Attempt to gain unauthorized access to systems, accounts or
              devices
            </li>
            <li>
              Interfere with, disrupt or overload our network or other users
            </li>
            <li>
              Send spam, malware or conduct phishing or hacking activities
            </li>
            <li>
              Share accounts or credentials in a way that breaches our policies
            </li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We reserve the right to suspend or terminate access where we detect
            serious or repeated violations, or where required by law or our
            upstream providers.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            5. Accounts, security and passwords
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Where a service requires an account or login, you are responsible
            for:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Providing accurate and up‑to‑date information</li>
            <li>Keeping your credentials confidential and secure</li>
            <li>
              Notifying us promptly if you suspect unauthorized access to your
              account
            </li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We are not liable for losses arising from unauthorized use of your
            credentials where you failed to keep them safe.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            6. Service availability & maintenance
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We aim to provide stable and reliable services, but availability may
            be affected by maintenance, upgrades, power issues, upstream
            providers or events beyond our control. Where possible, we will:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Schedule maintenance during off‑peak hours</li>
            <li>Provide notice of planned outages where practicable</li>
            <li>
              Restore service as quickly as reasonably possible after an
              incident
            </li>
          </ul>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            7. Fees, billing and refunds
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Pricing, billing cycles and payment terms for each service are
            specified in the relevant offer, bundle, invoice or contract. Unless
            stated otherwise:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Fees are payable in advance for the agreed period</li>
            <li>
              Late or missing payments may lead to suspension or termination of
              service
            </li>
            <li>
              Pre‑paid bundles and usage‑based services are generally non‑refundable
              once consumed or activated
            </li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Any agreed credits or refunds will be handled on a case‑by‑case
            basis and documented in writing.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            8. Intellectual property
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            All content, software, branding and documentation provided by
            Blackie Networks remain our property or that of our licensors. You
            are granted a limited, non‑exclusive, non‑transferable license to
            use our services for your internal purposes, subject to these Terms
            and any specific agreements.
          </Paragraph>
          <Paragraph style={{ color: '#cbd5e1' }}>
            You may not copy, modify, resell, reverse engineer or create
            derivative works from our software or systems except where
            explicitly permitted by law or written agreement.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            9. Limitation of liability
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            To the maximum extent permitted by law, Blackie Networks is not
            liable for:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>
              Indirect, incidental, special or consequential damages (including
              loss of profits, data or business opportunities)
            </li>
            <li>
              Losses caused by factors outside our reasonable control, such as
              power outages, third‑party failures or force majeure events
            </li>
            <li>
              Misconfiguration or misuse of your own devices, software or
              networks
            </li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Where liability cannot be excluded, our total aggregate liability in
            connection with a specific service is limited to the fees paid for
            that service in the three (3) months immediately before the event
            giving rise to the claim.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            10. Indemnity
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            You agree to indemnify and hold Blackie Networks and its team
            harmless from any claims, losses or damages arising from:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Your breach of these Terms</li>
            <li>Your misuse of our services</li>
            <li>
              Any content or activity carried out using your accounts or
              connections
            </li>
          </ul>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            11. Termination
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Either party may terminate a service or contract in accordance with
            its specific terms. We may also suspend or terminate access
            immediately if:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>There is non‑payment of fees after reasonable notice</li>
            <li>
              We detect serious security, abuse or legal issues related to your
              usage
            </li>
            <li>We are required to do so by law or a competent authority</li>
          </ul>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            12. Changes to these Terms
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We may update these Terms from time to time. When we do, we will
            revise the &quot;Last updated&quot; date at the top, and in the
            case of material changes, we may provide additional notice on our
            website or by email. Continued use of our services after changes
            take effect constitutes your acceptance of the updated Terms.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            13. Governing law
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            These Terms are governed by the laws of Kenya, without regard to its
            conflict of law rules. Any disputes will be handled by the
            competent courts in Kenya, unless otherwise agreed in writing.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            14. Contact
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            If you have questions about these Terms or need clarification about
            how they apply to a specific project or service, please contact us:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>
              Email:{' '}
              <a
                href="mailto:support@blackie-networks.com"
                style={{ color: '#00f0ff', textDecoration: 'none' }}
              >
                support@blackie-networks.com
              </a>
            </li>
            <li>Phone: +254 796 869 402</li>
            <li>Address: Chuka University, Kenya</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;



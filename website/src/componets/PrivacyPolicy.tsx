import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicy: React.FC = () => {
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
            Privacy Policy
          </Title>
          <Paragraph
            style={{
              color: '#cbd5e1',
              maxWidth: 640,
              margin: '0 auto',
              fontSize: '1rem',
            }}
          >
            This Privacy Policy explains how Blackie Networks (&quot;we&quot;,
            &quot;our&quot;, &quot;us&quot;) collects, uses and protects your
            information when you use our website, products and services.
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
            1. Who we are
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Blackie Networks is a technology company based in Kenya providing
            internet connectivity, network infrastructure, cloud and software
            solutions to campuses, ISPs, SMEs and individuals. We are the data
            controller responsible for the personal data collected through this
            website and related services.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            2. Information we collect
          </Title>

          <Title level={4} style={{ color: '#e5e7eb' }}>
            2.1 Information you provide directly
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We collect personal information when you interact with us, for
            example when you:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Submit a booking or consultation request form</li>
            <li>Contact us by phone, email or social media</li>
            <li>Request a quote for our products or services</li>
            <li>Create or manage an account with us (where applicable)</li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            This may include your:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Full name</li>
            <li>Phone number and email address</li>
            <li>Organization name and role</li>
            <li>Location or site details (e.g. campus, hostel, office)</li>
            <li>
              Project or service details you describe in the booking form or
              messages
            </li>
          </ul>

          <Title level={4} style={{ color: '#e5e7eb', marginTop: 16 }}>
            2.2 Information collected automatically
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            When you browse our website or use our online services, we
            automatically collect some technical information such as:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>IP address and approximate location</li>
            <li>Browser type, device type and operating system</li>
            <li>
              Pages you visit, time spent and how you interact with the site
            </li>
            <li>Referring website or campaign links</li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We may use cookies and similar technologies (such as analytics
            scripts) to help us understand how visitors use the site and to
            improve performance and security.
          </Paragraph>

          <Title level={4} style={{ color: '#e5e7eb', marginTop: 16 }}>
            2.3 Network & service usage data
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            For connectivity and network services (for example campus Wi‑Fi,
            proxy and ISP billing), we may process:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Account identifiers and login events</li>
            <li>Session times, bandwidth and general usage volumes</li>
            <li>
              Device identifiers (such as MAC address) where required for
              network access control
            </li>
          </ul>
          <Paragraph style={{ color: '#64748b', fontSize: '0.9rem' }}>
            We do <Text strong>not</Text> inspect the content of your personal
            communications (such as message text or email bodies), except where
            required by law or for security investigations.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            3. How we use your information
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We use the information we collect for the following purposes:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>
              To provide, operate and maintain our internet, network, software
              and cloud services
            </li>
            <li>
              To respond to your enquiries, quote requests and support tickets
            </li>
            <li>
              To process bookings and manage projects and service delivery
            </li>
            <li>
              To improve and optimize our network performance and user
              experience
            </li>
            <li>
              To send you service updates, security alerts and important notices
            </li>
            <li>
              To comply with legal obligations, regulatory requests and ISP
              requirements
            </li>
          </ul>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            4. Legal bases for processing
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Depending on your location, we rely on one or more of the following
            legal bases to process your personal data:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>
              <Text strong>Contract</Text> – where processing is necessary to
              deliver a service you have requested or agreed to.
            </li>
            <li>
              <Text strong>Legitimate interests</Text> – for example to secure
              our network, prevent abuse or improve our services, provided these
              interests are not overridden by your rights.
            </li>
            <li>
              <Text strong>Consent</Text> – where required for certain types of
              communication or analytics, and where you have clearly agreed.
            </li>
            <li>
              <Text strong>Legal obligation</Text> – where we must retain or
              share data to comply with applicable laws or lawful requests from
              authorities.
            </li>
          </ul>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            5. How we share your information
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We do not sell your personal data. We may share information with:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>
              Trusted service providers who help us operate our infrastructure,
              such as cloud hosting, email and analytics platforms.
            </li>
            <li>
              Technical partners and subcontractors assisting with deployment,
              support or maintenance, under appropriate confidentiality
              agreements.
            </li>
            <li>
              Law enforcement or regulators when required by applicable law or
              to protect our legal rights, users or infrastructure.
            </li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Where data is transferred outside your country, we take reasonable
            steps to ensure that appropriate safeguards are in place.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            6. Data retention
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We keep your personal data only for as long as it is needed for the
            purposes described in this Policy, including:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>For the duration of an active service or contract with you</li>
            <li>
              For a reasonable period after service termination to handle
              queries, disputes or backups
            </li>
            <li>
              As required by law, regulation or accounting and taxation rules
            </li>
          </ul>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            7. Your rights
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Depending on your jurisdiction, you may have the right to:
          </Paragraph>
          <ul style={{ color: '#cbd5e1', paddingLeft: 20 }}>
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>
              Request deletion of your data, where there is no legal reason for
              us to keep it
            </li>
            <li>
              Object to certain types of processing, including direct marketing
            </li>
            <li>
              Withdraw consent where we rely on consent (this will not affect
              prior lawful processing)
            </li>
          </ul>
          <Paragraph style={{ color: '#cbd5e1' }}>
            To exercise any of these rights, please contact us using the details
            below.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            8. Security
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We use reasonable technical and organizational measures to protect
            your personal data, including secure hosting, access controls and
            encryption where appropriate. However, no system is completely
            secure, and we cannot guarantee absolute security of information
            transmitted over the internet.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            9. Third‑party websites
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            Our website may contain links to third‑party sites or services that
            are not operated by Blackie Networks. This Privacy Policy does not
            cover those sites, and we are not responsible for their content or
            privacy practices. We recommend reviewing the privacy policy of any
            third‑party site you visit.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            10. Changes to this Policy
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            We may update this Privacy Policy from time to time to reflect
            changes in our services, legal requirements or best practices. When
            we make material changes, we will update the &quot;Last updated&quot;
            date at the top and, where appropriate, notify you through our
            website or by email.
          </Paragraph>

          <Title level={3} style={{ color: '#e5e7eb', marginTop: 24 }}>
            11. Contact us
          </Title>
          <Paragraph style={{ color: '#cbd5e1' }}>
            If you have any questions about this Privacy Policy or how we handle
            your personal data, you can contact us at:
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

export default PrivacyPolicy;



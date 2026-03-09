
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css'; // Ant Design v5 reset (or v4 import 'antd/dist/antd.css')

import Header from './componets/Header';
import { HeroSection } from './componets/HerosPage';
import AboutUs from './componets/AboutUs';
import Footer from './componets/Footer';
import ServicesPage from './componets/ServicePage';
import BookingPage from './componets/BookingPage';
import Section from './componets/Section';
import ContactUs from './componets/ContactUs';
import Blog from './componets/Blog';
import FAQ from './componets/FAQ';
import { SEO } from './componets/SEO';
import { Analytics } from './componets/Analytics';
import ScrollToTop from './componets/ScrollToTop';
import LoginPage from './componets/LoginPage';
import AdminDashboard from './componets/AdminDashboard';
import ProtectedRoute from './componets/ProtectedRoute';
import ProductsPage from './componets/ProductsPage';
import ProductDetail from './componets/ProductDetail';
import PrivacyPolicy from './componets/PrivacyPolicy';
import TermsOfService from './componets/TermsOfService';
import NetworkBillingPage from './componets/NetworkBillingPage';
import WebDevelopmentPage from './componets/WebDevelopmentPage';
import CloudInfrastructurePage from './componets/CloudInfrastructurePage';
import AISystemsPage from './componets/AISystemsPage';
import ITConsultingPage from './componets/ITConsultingPage';
import MobileAppsPage from './componets/MobileAppsPage';
import VPNShieldPage from './componets/VPNShieldPage';
import ProjectCaseStudyPage from './componets/ProjectCaseStudyPage';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Analytics />
      <Layout className="min-h-screen" style={{ background: 'transparent' }}>
        <Header />
        <MainContent />
        <Footer />
      </Layout>
    </Router>
  );
}

function MainContent() {

  return (
    <Content>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SEO 
                title="Network Infrastructure & Internet Services Kenya | Blackie Networks"
                description="Blackie Networks delivers affordable high-speed internet, network infrastructure, software development, and IT consulting for campuses and businesses across Kenya."
                keywords="internet service provider Kenya, campus internet Kenya, network infrastructure Kenya, affordable internet Nairobi, business internet Kenya, IT solutions Nairobi"
                url="/"
                googleSiteVerification={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION}
              />
              <HeroSection />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <SEO 
                title="Home - Affordable High-Speed Internet & IT Solutions"
                description="Blackie Networks provides affordable high-speed internet for campus students, network infrastructure setup, software development, and IT consulting services. Serving Chuka University and businesses across Kenya."
                url="/home"
              />
              <HeroSection />
            </>
          }
        />

        <Route 
          path="/aboutus" 
          element={
            <>
              <SEO 
                title="About Blackie Networks — IT Solutions Provider in Kenya"
                description="Learn about Blackie Networks - Kenya's trusted IT partner delivering network infrastructure, software development, and IT consulting services. Meet our experienced team serving campuses and businesses across Kenya."
                keywords="about Blackie Networks, IT company Kenya, network infrastructure team, software development company, IT consultants Kenya, Blackie Networks team"
                url="/aboutus"
                breadcrumbs={[
                  { name: 'Home', url: '/' },
                  { name: 'About Us', url: '/aboutus' },
                ]}
              />
              <AboutUs />
            </>
          } 
        />
        <Route 
          path="/services" 
          element={
            <>
              <SEO 
                title="IT Services: Networking, Internet & Software Development | Blackie Networks"
                description="From campus WiFi and structured cabling to software development and IT consulting — explore Blackie Networks' full range of IT solutions for Kenyan businesses."
                keywords="IT consulting Kenya, software development Kenya, campus WiFi installation Kenya, structured cabling Kenya, managed IT services Kenya, network infrastructure Kenya"
                url="/services"
                breadcrumbs={[
                  { name: 'Home', url: '/' },
                  { name: 'Services', url: '/services' },
                ]}
              />
              <ServicesPage />
            </>
          } 
        />
        <Route
          path="/services/network-billing"
          element={
            <>
              <SEO
                title="Network Setup & Billing Systems - Blackie Networks"
                description="Design and implementation of reliable networks, MikroTik configuration, and ISP/campus billing systems for Wi‑Fi providers, ISPs, Saccos, and campuses."
                url="/services/network-billing"
              />
              <NetworkBillingPage />
            </>
          }
        />
        <Route
          path="/services/web-development"
          element={
            <>
              <SEO
                title="Web & Application Development - Blackie Networks"
                description="Custom websites, portals, and internal systems built around your workflows, integrated with billing, SMS, and existing tools."
                url="/services/web-development"
              />
              <WebDevelopmentPage />
            </>
          }
        />
        <Route
          path="/services/cloud-hosting"
          element={
            <>
              <SEO
                title="Cloud Infrastructure Management & Hosting - Blackie Networks"
                description="Cloud architecture, deployment, monitoring, and backup strategies on AWS, DigitalOcean and similar providers."
                url="/services/cloud-hosting"
              />
              <CloudInfrastructurePage />
            </>
          }
        />
        <Route
          path="/services/ai-systems"
          element={
            <>
              <SEO
                title="AI Systems & Automation - Blackie Networks"
                description="AI assistants, automation, and data‑driven tools that streamline support, reporting, and decision‑making."
                url="/services/ai-systems"
              />
              <AISystemsPage />
            </>
          }
        />
        <Route
          path="/services/mobile-apps"
          element={
            <>
              <SEO
                title="Mobile App Development - Blackie Networks"
                description="Android and iOS apps for customers and internal teams, integrated with your billing, VPN and cloud infrastructure."
                url="/services/mobile-apps"
              />
              <MobileAppsPage />
            </>
          }
        />
        <Route
          path="/services/vpn-blackieshield"
          element={
            <>
              <SEO
                title="VPN Solutions – Blackie Shield - Blackie Networks"
                description="Always-on VPN and secure remote access for staff, branches and field teams, powered by the Blackie Shield platform."
                url="/services/vpn-blackieshield"
              />
              <VPNShieldPage />
            </>
          }
        />
        <Route
          path="/services/it-consulting"
          element={
            <>
              <SEO
                title="IT Consulting & Managed Support - Blackie Networks"
                description="Strategic IT audits, roadmaps, vendor selection, and managed support so your technology keeps up with your growth."
                url="/services/it-consulting"
              />
              <ITConsultingPage />
            </>
          }
        />
        <Route 
          path="/booking" 
          element={
            <>
              <SEO 
                title="Contact Blackie Networks — IT Support & Consultation Kenya"
                description="Get in touch with Blackie Networks for fast, affordable IT support, internet installation, and network solutions across Kenya. Call or email us today."
                keywords="contact Blackie Networks, IT support Kenya, campus WiFi contact, network services contact, Blackie Networks phone number"
                url="/contactus"
              />
              <BookingPage />
            </>
          } 
        />
        <Route 
          path="/Products" 
          element={
            <>
              <SEO 
                title="Our Products - Blackie Proxy, ISP Billing, MikroTik & Cloud Solutions"
                description="Dive into Blackie Networks products including Blackie Proxy, ISP Billing System, MikroTik configuration bundles, cloud hosting and long-term software maintenance."
                keywords="Blackie Proxy, ISP billing system, Mikrotik configuration, cloud hosting, software maintenance"
                url="/Products"
                breadcrumbs={[
                  { name: 'Home', url: '/' },
                  { name: 'Products', url: '/Products' },
                ]}
              />
              <ProductsPage />
            </>
          } 
        />
        <Route 
          path="/Products/:slug" 
          element={<ProductDetail />} 
        />
        <Route
          path="/case-studies/:id"
          element={<ProjectCaseStudyPage />}
        />
        <Route 
          path="/contactus" 
          element={
            <>
              <SEO 
                title="Contact Blackie Networks — IT Support & Consultation Kenya"
                description="Get in touch with Blackie Networks for fast, affordable IT support, internet installation, and network solutions across Kenya. Call or email us today."
                keywords="contact Blackie Networks, IT support Kenya, campus WiFi contact, network services contact, Blackie Networks phone number"
                url="/contactus"
                breadcrumbs={[
                  { name: 'Home', url: '/' },
                  { name: 'Contact Us', url: '/contactus' },
                ]}
              />
              <ContactUs />
            </>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <>
              <SEO 
                title="Blog - IT News, Network Tips & Technology Insights"
                description="Read the latest articles, tips, and insights about network infrastructure, software development, IT best practices, and technology trends from Blackie Networks."
                keywords="IT blog, network tips, software development blog, technology news Kenya"
                url="/blog"
                type="blog"
                breadcrumbs={[
                  { name: 'Home', url: '/' },
                  { name: 'Blog', url: '/blog' },
                ]}
              />
              <Blog />
            </>
          } 
        />
        <Route 
          path="/faq" 
          element={<FAQ />} 
        />
        <Route 
          path="/terms" 
          element={
            <>
              <SEO 
                title="Terms of Service - Blackie Networks"
                description="Read the Terms of Service that govern your use of Blackie Networks' website, internet services, network infrastructure, software, cloud and related solutions."
                url="/terms"
                noindex={false}
              />
              <TermsOfService />
            </>
          } 
        />
        <Route 
          path="/privacy" 
          element={
            <>
              <SEO 
                title="Privacy Policy - Blackie Networks"
                description="Learn how Blackie Networks collects, uses, and protects your personal data when you use our website, internet services, network infrastructure, cloud and software solutions."
                url="/privacy"
                noindex={false}
              />
              <PrivacyPolicy />
            </>
          } 
        />
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        {/* Catch-all route for 404 */}
        <Route 
          path="*" 
          element={
            <>
              <SEO 
                title="404 - Page Not Found"
                description="The page you are looking for does not exist."
                url="/404"
                noindex={true}
              />
              <NotFound />
            </>
          } 
        />
      </Routes>
    </Content>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#ff4d4f' }}>404</h1>
      <p style={{ fontSize: '20px' }}>Page Not Found</p>
      <a href="/" style={{ color: '#1890ff' }}>Return to Home</a>
    </div>
  );
}

export default App;


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

const { Content } = Layout;

function App() {
  return (
    <Router>
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
                title="Blackie Networks - IT Solutions & Network Infrastructure"
                description="Affordable high-speed internet, network infrastructure, software development, and IT consulting services for campuses and businesses in Kenya."
                url="/"
                googleSiteVerification={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION}
              />
              <HeroSection />
              <Section />
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
              <Section />
            </>
          }
        />

        <Route 
          path="/aboutus" 
          element={
            <>
              <SEO 
                title="About Us - Our Mission, Vision & Team"
                description="Learn about Blackie Networks - a leading IT solutions provider in Kenya. Meet our certified team of professionals with 3+ years of experience delivering network infrastructure, software development, and IT consulting services."
                keywords="about Blackie Networks, IT company Kenya, network infrastructure team, software development company, IT consultants Kenya"
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
                title="Our Services - Network Infrastructure, Software Development & IT Consulting"
                description="Comprehensive IT services including network setup, MikroTik configuration, campus Wi-Fi solutions, custom software development, cloud services, VPN solutions, and IT consultancy. Professional services starting from $2,000."
                keywords="network setup services, MikroTik configuration, Wi-Fi installation, software development services, cloud services, VPN setup, IT consulting Kenya"
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
          path="/booking" 
          element={
            <>
              <SEO 
                title="Book a Service - Get Started with Blackie Networks"
                description="Book network infrastructure, software development, or IT consulting services with Blackie Networks. Fill out our booking form and our team will get back to you shortly."
                url="/booking"
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
                title="Our Products & Services - Campus Wi-Fi, Network Infrastructure & More"
                description="Explore our range of IT products and services including campus Wi-Fi solutions, network infrastructure, billing systems, custom software development, cloud services, and mobile app integration."
                keywords="campus Wi-Fi, network products, billing systems, software products, cloud services Kenya"
                url="/Products"
                breadcrumbs={[
                  { name: 'Home', url: '/' },
                  { name: 'Products', url: '/Products' },
                ]}
              />
              <Section/>
            </>
          } 
        />
        <Route 
          path="/contactus" 
          element={
            <>
              <SEO 
                title="Contact Us - Get in Touch with Blackie Networks"
                description="Contact Blackie Networks for IT solutions, network infrastructure, and software development services. Located at Chuka University, Kenya. Phone: +254 796 869 402, Email: support@blackie-networks.com"
                keywords="contact Blackie Networks, IT support Kenya, network support, software development contact"
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

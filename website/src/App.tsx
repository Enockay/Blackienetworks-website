
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

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="min-h-screen">
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
              <HeroSection />
              <Section />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <HeroSection />
              <Section />
            </>
          }
        />

        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/Products" element={<Section/>} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/blog" element={<Blog />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
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

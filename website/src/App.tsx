
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './componets/Header';
import  { HeroSection } from './componets/HerosPage';
import AboutUs from './componets/AboutUs';
import Footer from './componets/Footer';
import ServicesPage from './componets/ServicePage';
import BookingPage from './componets/BookingPage';
import Section from './componets/Section';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Header />
        <MainContent />
        <Section />
        <Footer/>
      </Router>
    </div>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <div className='min-h-screen'>
      {/* Only show HeroSection on the root route ('/') */}
      {location.pathname === '/' && <HeroSection />}
      
      <Routes>
        <Route path="/home" element={<HeroSection />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/booking' element={<BookingPage/>}/>
        {/* Add other routes here, and HeroSection will not display on these routes */}
      </Routes>
    </div>
  );
}

export default App;

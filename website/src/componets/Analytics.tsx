import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics Configuration
// Vite uses import.meta.env and requires VITE_ prefix
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Facebook Pixel Configuration
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '';

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

// Initialize Google Analytics (internal function, not exported to avoid Fast Refresh issues)
const initGoogleAnalytics = () => {
  if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    // Load gtag.js
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Initialize Facebook Pixel (internal function, not exported to avoid Fast Refresh issues)
const initFacebookPixel = () => {
  if (FB_PIXEL_ID && typeof window !== 'undefined') {
    !(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
};

// Track page views for React Router
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }

    if (FB_PIXEL_ID && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);
};

// Google Analytics Event Tracking
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Facebook Pixel Event Tracking
export const trackFacebookEvent = (eventName: string, parameters?: any) => {
  if (FB_PIXEL_ID && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Component to initialize analytics
export const Analytics: React.FC = () => {
  useEffect(() => {
    initGoogleAnalytics();
    initFacebookPixel();
  }, []);

  usePageTracking();

  return null;
};


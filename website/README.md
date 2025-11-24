# Blackie Networks Website

A modern, responsive website for Blackie Networks - IT Solutions & Network Infrastructure provider. Built with React, TypeScript, and Vite.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Development](#development)
7. [Environment Variables](#environment-variables)
8. [API Integration](#api-integration)
9. [Deployment](#deployment)
10. [SEO & Analytics](#seo--analytics)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)

---

## 🎯 Overview

Blackie Networks website is a full-featured business website showcasing IT solutions, services, and enabling customer bookings. The website includes:

- **Service Showcase**: Display of all IT services and products
- **Booking System**: Integrated booking form with backend API
- **Blog**: Content management for articles and news
- **Contact Forms**: Multiple ways for customers to reach out
- **SEO Optimized**: Full SEO implementation with meta tags, structured data, and sitemap
- **Analytics**: Google Analytics and Facebook Pixel integration
- **Responsive Design**: Mobile-first design that works on all devices

---

## ✨ Features

### Core Features
- ✅ **Multi-page Navigation**: Home, About, Services, Products, Blog, FAQ, Contact, Booking
- ✅ **Service Auto-selection**: When clicking "Book Now" from a service, it auto-selects in booking form
- ✅ **Scroll to Top**: Automatic scroll to top on route changes
- ✅ **Responsive Header**: Fixed header with mobile drawer menu
- ✅ **Dark Theme**: Modern dark blue gradient theme
- ✅ **Animations**: Smooth animations using Framer Motion
- ✅ **Form Validation**: Client-side validation for all forms
- ✅ **Error Handling**: User-friendly error messages

### Technical Features
- ✅ **TypeScript**: Full type safety
- ✅ **React Router**: Client-side routing
- ✅ **Ant Design**: UI component library
- ✅ **Tailwind CSS**: Utility-first CSS framework
- ✅ **Vite**: Fast build tool and dev server
- ✅ **SEO Components**: Dynamic meta tags and structured data
- ✅ **Analytics Integration**: Google Analytics and Facebook Pixel

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 5.4** - Build tool and dev server
- **React Router 6.30** - Routing
- **Ant Design 5.25** - UI components
- **Framer Motion 11.11** - Animations
- **Tailwind CSS 3.4** - Styling
- **React Icons 5.5** - Icon library
- **React DatePicker 7.5** - Date selection
- **React Helmet Async 2.0** - SEO meta tags

### Backend Integration
- **REST API** - Express.js backend
- **MongoDB** - Database
- **JWT Authentication** - Secure API access

---

## 📁 Project Structure

```
website/
├── public/                 # Static assets
│   ├── robots.txt         # SEO robots file
│   ├── sitemap.xml        # SEO sitemap
│   └── _redirects         # Netlify redirects
├── src/
│   ├── assets/            # Images and static files
│   ├── componets/         # React components
│   │   ├── AboutUs.tsx
│   │   ├── Analytics.tsx  # Analytics integration
│   │   ├── Blog.tsx
│   │   ├── BookingPage.tsx
│   │   ├── ContactUs.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HerosPage.tsx
│   │   ├── ScrollToTop.tsx # Auto-scroll on route change
│   │   ├── Section.tsx
│   │   ├── SEO.tsx        # SEO meta tags component
│   │   └── ServicePage.tsx
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── docs/                  # Documentation
├── package.json
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- **Backend API** running (see Backend documentation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blackienetworks-website/website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your values (see Environment Variables section)
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Check SEO
npm run seo:check
```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow TypeScript best practices
   - Use existing component patterns
   - Add proper error handling

3. **Test your changes**
   - Test on multiple screen sizes
   - Verify API integration works
   - Check browser console for errors

4. **Build and test production build**
   ```bash
   npm run build
   npm run preview
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

### Code Style

- Use **TypeScript** for all new files
- Follow **React Hooks** patterns
- Use **functional components** only
- Follow **ESLint** rules
- Use **Tailwind CSS** for styling
- Keep components **small and focused**

---

## 🔐 Environment Variables

Create a `.env` file in the `website` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3002

# Google Search Console Verification
VITE_GOOGLE_SITE_VERIFICATION=your_verification_code

# Google Analytics Measurement ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel ID
VITE_FB_PIXEL_ID=1234567890123456
```

**Important Notes:**
- All Vite env variables must start with `VITE_`
- Access via `import.meta.env.VITE_*`
- Restart dev server after changing `.env`
- Never commit `.env` to git

See `docs/ENV_SETUP.md` for detailed setup instructions.

---

## 🔌 API Integration

### Backend API

The website connects to a Node.js/Express backend API. Default API URL: `http://localhost:3002`

### Key API Endpoints

#### Booking API
```typescript
POST /api/bookings/book/public
Body: {
  name: string
  email: string
  phone: string
  service: string
  date: string (YYYY-MM-DD)
  time: string (HH:mm)
  description?: string
}
```

### API Configuration

The API base URL is configured in:
- `BookingPage.tsx`: Uses `VITE_API_URL` or defaults to `http://localhost:3002`
- Other components can access API via the same pattern

### Error Handling

All API calls should:
- Handle network errors
- Display user-friendly error messages
- Show loading states
- Validate input before submission

See `docs/API_CONNECTION.md` for detailed API documentation.

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

#### Netlify
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables: Add all `VITE_*` variables in Netlify dashboard

#### Vercel
1. Connect your repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variables: Add in Vercel dashboard

#### Traditional Hosting
1. Build the project: `npm run build`
2. Upload `dist/` folder to your web server
3. Configure server to serve `index.html` for all routes (SPA routing)
4. Set up environment variables on server

### Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test API connections
- [ ] Verify analytics tracking
- [ ] Check SEO meta tags
- [ ] Test on mobile devices
- [ ] Verify all forms work
- [ ] Check console for errors

---

## 📊 SEO & Analytics

### SEO Features

- ✅ Dynamic meta tags per page
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Breadcrumbs
- ✅ Semantic HTML

### Analytics

- **Google Analytics**: Track page views and user behavior
- **Facebook Pixel**: Track conversions and retargeting

### SEO Component Usage

```tsx
<SEO
  title="Page Title"
  description="Page description"
  url="/page-url"
  keywords="keyword1, keyword2"
  type="website"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Page', url: '/page' }
  ]}
/>
```

See `docs/SEO_SETUP_GUIDE.md` for detailed SEO documentation.

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Error: Port 5173 is already in use
# Solution: Kill the process or use a different port
npm run dev -- --port 5174
```

#### API Connection Failed
- Check backend server is running
- Verify `VITE_API_URL` in `.env`
- Check CORS settings in backend
- Verify network connectivity

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### TypeScript Errors
- Run `npm run lint` to see all errors
- Check `tsconfig.json` configuration
- Ensure all imports are correct

#### Styling Issues
- Verify Tailwind CSS is configured
- Check `tailwind.config.js`
- Ensure classes are not purged in production

### Getting Help

1. Check existing documentation in `docs/` folder
2. Review component code for examples
3. Check browser console for errors
4. Verify environment variables are set correctly

---

## 🤝 Contributing

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
   - Follow code style guidelines
   - Add comments for complex logic
   - Update documentation if needed
4. **Test thoroughly**
   - Test on multiple browsers
   - Test responsive design
   - Verify API integration
5. **Commit your changes**: `git commit -m "Add amazing feature"`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] Components are properly typed
- [ ] Error handling is implemented
- [ ] Responsive design works
- [ ] No console errors
- [ ] Documentation updated
- [ ] Tests pass (if applicable)

---

## 📝 Additional Documentation

- **API Integration**: `docs/API_CONNECTION.md`
- **Environment Setup**: `docs/ENV_SETUP.md`
- **SEO Guide**: `docs/SEO_SETUP_GUIDE.md`
- **Backend Documentation**: `../Backend/docs/`

---

## 🎨 Design System

### Colors

- **Primary Blue**: `#0066ff`
- **Cyan**: `#00f0ff`
- **Purple**: `#7c3aed`
- **Background Dark**: `#0a0e27`
- **Text Light**: `#e2e8f0`
- **Text Muted**: `#94a3b8`

### Typography

- **Headings**: Bold, gradient text
- **Body**: Regular weight, light color
- **Links**: Cyan with hover effects

### Components

- **Cards**: Glass morphism effect with borders
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Dark theme with cyan accents
- **Navigation**: Fixed header with mobile drawer

---

## 🔄 Recent Updates

### Latest Features
- ✅ Scroll to top on route change
- ✅ Service auto-selection in booking form
- ✅ Dark blue sidebar header
- ✅ Minimized FAQ section
- ✅ Icons in sidebar navigation
- ✅ Network IP address support for backend

### Known Issues
- None currently

### Planned Features
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced search functionality
- [ ] User dashboard
- [ ] Real-time chat support

---

## 📄 License

[Add your license information here]

---

## 👥 Team

**Blackie Networks**
- Website: [Your Website]
- Email: support@blackie-networks.com
- Phone: +254 796 869 402

---

## 🙏 Acknowledgments

- React Team
- Vite Team
- Ant Design Team
- Framer Motion Team
- All contributors

---

**Last Updated**: 2024
**Version**: 1.0.0

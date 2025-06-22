
# MeteoConnect Rwanda

A comprehensive multi-channel digital platform for the Rwanda Meteorology Agency that disseminates real-time weather alerts, forecasts, and advisory content to citizens through web, mobile, SMS, USSD, and WhatsApp interfaces.

## 🌟 Features

### Core Modules
- **Real-time Weather Dashboard** - Live weather data with interactive forecasts
- **Multi-Channel Alert System** - Weather warnings via web, SMS, WhatsApp, and USSD
- **Interactive Weather Map** - GIS-enabled visualization of weather zones and risks
- **Community Feedback Engine** - Citizen weather reports for improved accuracy
- **Agricultural Advisory System** - Crop-specific weather guidance
- **Multilingual Support** - Available in Kinyarwanda, English, and French
- **Progressive Web App** - Offline functionality for mobile and desktop
- **Admin Dashboard** - Comprehensive content and alert management

### Technical Features
- Progressive Web App (PWA) with offline capabilities
- Responsive design optimized for mobile devices
- Multi-language support with real-time switching
- Role-based access control (citizen, admin, moderator)
- Real-time alerts and notifications
- Community feedback integration
- Interactive weather mapping
- Voice synthesis for accessibility

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meteoconnect-rwanda
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── admin/           # Admin dashboard components
│   ├── alerts/          # Alert system components
│   ├── community/       # Community feedback components
│   ├── dashboard/       # Main dashboard components
│   ├── forecast/        # Weather forecast components
│   ├── layout/          # Layout and navigation components
│   ├── map/            # Interactive mapping components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── weather/        # Weather display components
├── contexts/           # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── pages/             # Main application pages
```

## 🌍 Multi-Channel Architecture

### Web Platform
- Progressive Web App with offline capabilities
- Responsive design for all screen sizes
- Real-time weather updates and alerts

### SMS Integration (Simulated)
- Placeholder functions for Twilio integration
- Text-based weather queries and alerts
- USSD menu simulation for feature phones

### WhatsApp Bot (Simulated)
- Webhook simulation for WhatsApp Business API
- Interactive chat menu for weather services
- Image and map sharing capabilities

## 🔧 Configuration

### Environment Setup
For production deployment, configure the following services:

1. **SMS Service (Twilio)**
   - Add Twilio credentials for SMS functionality
   - Configure webhook endpoints

2. **WhatsApp Business API**
   - Set up WhatsApp Business account
   - Configure webhook for bot interactions

3. **GIS Services**
   - Integrate with PostGIS for spatial data
   - Configure map tile services

### Language Support
The platform supports three languages:
- **English** (en) - Default
- **Kinyarwanda** (rw) - Local language
- **French** (fr) - Official language

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for trust and reliability
- **Weather Colors**: Context-specific colors for weather conditions
- **Status Colors**: Standard success, warning, and error colors
- **Accessibility**: High contrast ratios for readability

### Components
Built with modern design principles:
- Clean, minimalist interface
- Consistent spacing and typography
- Accessible form controls and navigation
- Weather-specific iconography

## 📱 PWA Features

### Offline Capabilities
- Cached weather data for offline viewing
- Service worker for background updates
- Offline-first architecture

### Mobile Optimization
- Touch-friendly interface design
- Optimized for various screen sizes
- Native app-like experience

## 👥 User Roles

### Citizens
- View weather forecasts and alerts
- Submit community weather reports
- Access agricultural advisories
- Receive multi-channel notifications

### Administrators
- Create and manage weather alerts
- Review community reports
- Upload forecast data
- Monitor system analytics

### Moderators
- Verify community reports
- Manage content quality
- Assist with user support

## 🔐 Security Features

- Role-based access control
- Input validation and sanitization
- Secure authentication system
- Data privacy compliance

## 📊 Analytics & Monitoring

### Platform Metrics
- User engagement tracking
- Alert delivery statistics
- Channel performance monitoring
- Community report accuracy

### System Health
- Uptime monitoring
- Performance metrics
- Error tracking and alerting

## 🌐 Deployment

### Docker Support
```bash
# Build the application
npm run build

# Docker deployment (when available)
docker build -t meteoconnect .
docker run -p 8080:8080 meteoconnect
```

### Cloud Deployment
Optimized for deployment on:
- Google Cloud Platform
- Government Cloud Services
- Rwanda ICT Infrastructure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is developed for the Rwanda Meteorology Agency. Please ensure compliance with government IT policies and data protection regulations.

## 🆘 Support

For technical support or feature requests:
- Email: support@meteoconnect.rw
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

---

**MeteoConnect Rwanda** - Connecting communities through accurate, accessible weather information.


# 🎫 Online Ticket Booking System

A modern, responsive web application for booking tickets online built with React, Vite, and Firebase. This platform provides a seamless experience for users to browse, select, and purchase tickets for various services.

Live Link : https://online-ticket-booking-4cc7f.web.app
## ✨ Features

- 🔐 **User Authentication** - Secure login and registration system
- 🎫 **Ticket Booking** - Browse and book tickets for different services
- 💳 **Payment Integration** - Secure payment processing
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔄 **Real-time Updates** - Live ticket availability and booking status
- 📊 **Dashboard** - User-friendly dashboard for managing bookings
- 🎨 **Modern UI** - Beautiful interface with smooth animations
- 🔍 **Search & Filter** - Easy ticket discovery with advanced filters

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **React Router** - Client-side routing
- **React Hook Form** - Efficient form handling
- **Lottie React** - Smooth animations

### Backend & Services
- **Firebase** - Authentication, hosting, and backend services
- **React Query** - Server state management
- **Axios** - HTTP client for API requests

### UI/UX Libraries
- **Heroicons** - Beautiful SVG icons
- **React Icons** - Comprehensive icon library
- **AOS** - Animate On Scroll library
- **SweetAlert2** - Beautiful alert dialogs
- **React Toastify** - Elegant notifications
- **Recharts** - Data visualization

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kantho202/online-ticket-booking.git
   cd online-ticket-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
online-ticket-booking/
├── public/                 # Static assets
│   ├── images/            # Public images
│   └── serviceCenter.json # Service configuration
├── src/
│   ├── animation/         # Lottie animation files
│   ├── assets/           # Images and static files
│   ├── components/       # Reusable UI components
│   │   ├── Error/        # Error handling components
│   │   ├── Forbidden/    # Access control components
│   │   ├── Loading/      # Loading states
│   │   └── Logo/         # Brand components
│   ├── firebase/         # Firebase configuration
│   ├── hook/            # Custom React hooks
│   ├── layouts/         # Page layout components
│   ├── pages/           # Application pages
│   └── routes/          # Routing configuration
├── .env                 # Environment variables
├── firebase.json        # Firebase hosting config
└── package.json         # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🚀 Deployment

This project is configured for Firebase Hosting:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports

If you find a bug, please create an issue on [GitHub Issues](https://github.com/kantho202/online-ticket-booking/issues).

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues for solutions

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Firebase team for the excellent backend services
- All contributors who help improve this project

---

<div align="center">
  <p>Made with ❤️ by the Online Ticket Booking Team</p>
  <p>
    <a href="https://github.com/kantho202/online-ticket-booking">⭐ Star this repo</a> •
    <a href="https://github.com/kantho202/online-ticket-booking/issues">🐛 Report Bug</a> •
    <a href="https://github.com/kantho202/online-ticket-booking/issues">💡 Request Feature</a>
  </p>
</div>

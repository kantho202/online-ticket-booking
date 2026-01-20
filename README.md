# Online Ticket Booking System

🔗 **Live Demo**: [https://online-ticket-booking-4cc7f.web.app](https://online-ticket-booking-4cc7f.web.app)

## Project Description

A comprehensive online ticket booking platform built with React and Firebase that enables users to browse, book, and manage tickets across different service categories. The application features role-based access control with separate dashboards for users, vendors, and administrators, integrated payment processing, and real-time booking management.

## Major Features/Services

• **Multi-Role Dashboard System** - Separate interfaces for Users (booking & payment), Vendors (ticket management & revenue tracking), and Admins (system-wide control & user management)

• **Secure Payment Integration** - Complete payment processing with transaction history, payment success/failure handling, and revenue analytics for vendors

• **Real-time Ticket Management** - Live ticket availability updates, booking confirmation system, and dynamic pricing with Firebase real-time database integration
## Setup & Installation Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kantho202/online-ticket-booking.git
   cd online-ticket-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open `http://localhost:5173` in your browser

## Route Summary

### Public Routes
- `/` - Home page with featured tickets
- `/login` - User authentication
- `/register` - User registration
- `/forget-password` - Password recovery

### Protected Routes
- `/allTickets` - Browse all available tickets
- `/seeDetails/:id` - View ticket details

### Dashboard Routes (Role-based)

**User Dashboard:**
- `/dashboard/userProfile` - User profile management
- `/dashboard/myBookedTickets` - View booked tickets
- `/dashboard/transactionHistory` - Payment history
- `/dashboard/payment/:ticketId` - Payment processing
- `/dashboard/payment-success` - Payment confirmation
- `/dashboard/payment-canceled` - Payment cancellation

**Vendor Dashboard:**
- `/dashboard/vendorProfile` - Vendor profile management
- `/dashboard/addTicket` - Create new tickets
- `/dashboard/myAddedTickets` - Manage created tickets
- `/dashboard/RequestedBooking` - Handle booking requests
- `/dashboard/RevenueOverview` - Revenue analytics

**Admin Dashboard:**
- `/dashboard/adminProfile` - Admin profile management
- `/dashboard/manageTickets` - System-wide ticket management
- `/dashboard/mangeUsers` - User management
- `/dashboard/advertiseTickets` - Ticket promotion management

## List of Implemented Features

### Authentication & Authorization
- User registration and login
- Password recovery system
- Role-based access control (User, Vendor, Admin)
- Protected routes with authentication guards

### Ticket Management
- Browse and search tickets
- Detailed ticket information display
- Category-based ticket organization
- Real-time availability updates

### Booking System
- Secure ticket booking process
- Booking confirmation system
- Booking history tracking
- Booking status management

### Payment Integration
- Secure payment processing
- Payment success/failure handling
- Transaction history
- Revenue tracking for vendors

### Dashboard Features
- Role-specific dashboards
- Profile management
- Analytics and reporting
- Administrative controls

### User Experience
- Responsive design for all devices
- Loading states and error handling
- Toast notifications
- Smooth animations and transitions

## Project Structure

```
online-ticket-booking/
├── 📁 public/                    # Static assets
├── 📁 src/
│   ├── � components/           # Reusable UI components
│   ├── � pages/               # Application pages
│   │   ├── Auth/               # Login, Register, Password Reset
│   │   ├── Home/               # Home page & ticket details
│   │   └── Dashboard/          # User/Vendor/Admin dashboards
│   ├── 📁 layouts/             # Page layouts
│   ├── 📁 routes/              # Routing & route protection
│   ├── 📁 firebase/            # Firebase configuration
│   ├── 📁 hook/                # Custom React hooks
│   └── 📁 assets/              # Images & static files
├── ⚙️ firebase.json            # Firebase hosting config
├── ⚙️ package.json             # Dependencies
└── � README.md                # Documentation
```

## Brief Explanation of Features

**React Query**: Manages server state, caching, and data synchronization for optimal performance and user experience.

**Firebase Authentication**: Provides secure user authentication with email/password and handles user sessions.

**Role-based Routing**: Implements three user roles (User, Vendor, Admin) with specific route access and dashboard features.

**Payment Processing**: Integrated payment system with success/failure handling and transaction tracking.

**Responsive Design**: Built with TailwindCSS and DaisyUI for consistent, mobile-first design across all devices.

**Real-time Updates**: Uses Firebase for real-time data synchronization across booking status and ticket availability.

**Form Handling**: React Hook Form provides efficient form validation and submission with minimal re-renders.

**State Management**: Combines React Context for authentication state with React Query for server state management.

**Animation System**: Lottie React and AOS library provide smooth, professional animations throughout the application.

**Error Handling**: Comprehensive error boundaries and user-friendly error messages with SweetAlert2 and React Toastify.

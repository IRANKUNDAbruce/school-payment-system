# School QR Code Payment System

A comprehensive mobile app and backend system for managing school canteen payments using QR codes on student ID cards, integrated with MTN MoMo and Airtel Money.

## 🎯 Project Overview

This system enables:
- **Students**: View balance, deposit money via MoMo (MTN/Airtel), make canteen purchases
- **Vendors/Canteen Staff**: Scan QR codes, process transactions, view daily reports
- **Administrators**: Manage users, view analytics, monitor transactions, generate reports
- **Backend**: Handle MoMo integration, transactions, authentication, security

## 📱 Tech Stack

### Frontend
- **Framework**: React Native / Expo
- **State Management**: Redux Toolkit
- **QR Code**: react-native-qrcode-svg, expo-camera
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **MoMo Integration**: MTN & Airtel APIs
- **QR Code**: qrcode library

### DevOps & Deployment
- **Frontend Deployment**: Expo EAS Build / Expo Go
- **Backend**: Docker, Node.js
- **Hosting Options**: DigitalOcean, AWS, Heroku, or Render
- **Database**: PostgreSQL (managed service or self-hosted)

## ✨ Key Features

### 1. User Management
- ✅ Student registration with unique ID
- ✅ Vendor (Canteen staff) registration
- ✅ Admin account creation
- ✅ Role-based access control (RBAC)
- ✅ JWT authentication

### 2. QR Code System
- ✅ Unique QR code per student ID
- ✅ QR code generation (for printing on ID cards)
- ✅ QR code scanning via mobile camera
- ✅ Transaction verification via QR

### 3. Payment Integration
- ✅ **MTN MoMo**: Account deposit via USSD/Web
- ✅ **Airtel Money**: Account deposit via USSD/Web
- ✅ Transaction history tracking
- ✅ Balance management
- ✅ Transaction status updates

### 4. Transaction Processing
- ✅ Canteen purchases via QR scan
- ✅ Real-time transaction processing
- ✅ Transaction receipts
- ✅ Refund handling
- ✅ Transaction logging & audit trail

### 5. Analytics & Reporting
- ✅ Transaction reports (daily/weekly/monthly)
- ✅ Revenue analytics
- ✅ Student spending patterns
- ✅ Top items sold
- ✅ Vendor performance metrics
- ✅ Export reports (CSV/PDF)

## 📁 Project Structure

```
school-payment-system/
├── backend/                    # Node.js Express API
│   ├── src/
│   │   ├── models/            # Database models (Sequelize/TypeORM)
│   │   ├── routes/            # API routes
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Auth, validation, error handling
│   │   ├── services/           # MoMo, QR, email services
│   │   ├── utils/              # Helper functions
│   │   ├── config/            # Database, MoMo config
│   │   ├── migrations/        # Database migrations
│   │   └── app.js             # Main app entry
│   ├── tests/                 # Unit & integration tests
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
│
├── mobile-app/                # React Native Expo
│   ├── app/
│   │   ├── screens/           # Student, Vendor, Admin screens
│   │   ├── components/        # Reusable components
│   │   ├── navigation/        # Navigation setup
│   │   ├── services/          # API calls, auth
│   │   ├── store/             # Redux setup
│   │   ├── utils/             # Helpers
│   │   ├── assets/            # Images, fonts
│   │   └── App.js
│   ├── app.json
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── API.md                 # Complete API documentation
│   ├── SETUP.md               # Installation & setup guide
│   ├── DEPLOYMENT.md          # Deployment instructions
│   ├── MOMO_SETUP.md          # MoMo integration guide
│   ├── DATABASE.md            # Database schema & design
│   ├── SECURITY.md            # Security best practices
│   └── TROUBLESHOOTING.md     # Common issues & fixes
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- PostgreSQL 12+ installed
- Expo CLI: `npm install -g expo-cli`
- Git installed

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm start
```

### Mobile App Setup
```bash
cd mobile-app
npm install
cp .env.example .env
# Edit .env with backend API URL
expo start
```

## 📊 Database Schema (Overview)

**Main Tables:**
- `users` - All user accounts (students, vendors, admins)
- `students` - Extended student information
- `vendors` - Canteen staff information
- `qr_codes` - Student ID QR codes
- `transactions` - Canteen purchase transactions
- `accounts` - Student digital wallets/balance
- `momo_transactions` - MoMo deposit tracking
- `items` - Canteen menu items
- `reports` - Generated reports

*See `docs/DATABASE.md` for complete schema*

## 🔌 API Endpoints (Overview)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Students
- `GET /api/students/me` - Get student profile
- `GET /api/students/me/balance` - Get current balance
- `GET /api/students/me/transactions` - Transaction history
- `POST /api/students/me/deposit` - Initiate deposit

### MoMo Payments
- `POST /api/momo/initiate-mtn` - Initiate MTN MoMo payment
- `POST /api/momo/initiate-airtel` - Initiate Airtel Money payment
- `GET /api/momo/status/:transactionId` - Check payment status

### Transactions
- `POST /api/transactions` - Create transaction (QR scan)
- `GET /api/transactions` - Get transaction history
- `GET /api/transactions/:id` - Get transaction details

### Vendors
- `GET /api/vendors/transactions` - Vendor's daily transactions
- `GET /api/vendors/reports` - Vendor reports

### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/reports` - Analytics & reports
- `POST /api/admin/items` - Add canteen items
- `GET /api/admin/transactions` - All transactions

*See `docs/API.md` for complete API reference*

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ HTTPS/TLS encryption
- ✅ Rate limiting on API endpoints
- ✅ Input validation & sanitization
- ✅ CORS configuration
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF tokens
- ✅ Audit logging

## 📈 Performance Metrics

Designed for:
- **2000 students** - Easily scalable
- **~10,000 monthly transactions** - Optimized queries
- **Concurrent users** - Connection pooling
- **Real-time QR scanning** - Sub-second response times

Optimizations:
- Database indexing on frequently queried fields
- Connection pooling (20-30 connections)
- Optional Redis caching layer
- API rate limiting
- Pagination on list endpoints

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📧 Support & Contact

For issues, questions, or support:
1. Check `docs/TROUBLESHOOTING.md`
2. Open a GitHub issue
3. Contact: [your-email]

---

**Status**: 🚀 In Development  
**Version**: 1.0.0  
**Last Updated**: 2026-07-22  
**Maintainer**: IRANKUNDAbruce

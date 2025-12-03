# React Account Manager 🚀

A modern, responsive React application for user account management featuring authentication, profile management, and secure data persistence using localStorage.
---
⚠️ DEMO PROJECT ONLY - NOT FOR PRODUCTION USE
## 🌐 Live Demo

**[View Live Application](https://react-account-app-ten.vercel.app/)**

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Components Overview](#-components-overview)
- [Key Functionalities](#-key-functionalities)
- [Validation Rules](#-validation-rules)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality
- **User Registration** - Create new accounts with email and password
- **User Authentication** - Secure login/logout system
- **Profile Management** - View and edit account information
- **Protected Routes** - Access control for authenticated users
- **Data Persistence** - LocalStorage integration for data retention
- **Error Handling** - Comprehensive error boundaries and validation

### User Experience
- **Responsive Design** - Mobile-first Bootstrap 5 styling
- **Form Validation** - Real-time client-side validation
- **Loading States** - User feedback during async operations
- **Clean UI/UX** - Modern gradient background with card-based layouts
- **Intuitive Navigation** - Navbar with conditional rendering based on auth state

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19.2.0** | UI framework with hooks |
| **Vite 7.2.4** | Build tool and dev server |
| **React Router DOM 7.10.0** | Client-side routing |
| **Bootstrap 5.3.8** | CSS framework for styling |
| **Context API** | Global state management |
| **LocalStorage API** | Client-side data persistence |

---

## 📁 Project Structure

```
react-account-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx    # Error handling wrapper
│   │   ├── FormInput.jsx        # Reusable form input component
│   │   ├── Navbar.jsx           # Navigation bar with auth state
│   │   └── ProtectedRoute.jsx   # Route guard for auth
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context provider
│   ├── pages/
│   │   ├── Dashboard.jsx        # User profile dashboard
│   │   ├── Login.jsx            # Login page
│   │   └── Register.jsx         # Registration page
│   ├── utils/
│   │   └── validation.js        # Validation helper functions
│   ├── App.jsx                  # Main app component with routing
│   ├── index.css                # Global styles
│   └── main.jsx                 # Application entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v20.19.0 or v22.12.0+)
- npm (v8.0.0+)

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd react-account-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

---

## 💻 Usage

### Registration Flow
1. Navigate to `/register`
2. Fill in required fields:
   - Full name (required)
   - Email (required, valid format)
   - Password (required, min 8 chars with number)
   - Confirm password (must match)
   - Phone (optional, 10 digits)
   - Address (optional)
3. Click "Register"
4. Automatically redirected to Dashboard

### Login Flow
1. Navigate to `/login`
2. Enter registered email and password
3. Click "Login"
4. Access Dashboard

### Profile Management
1. View current profile information
2. Click "Edit profile" to enable editing
3. Update desired fields
4. Optionally change password
5. Click "Save changes" or "Cancel"

---

## 🧩 Components Overview

### Core Components

#### **AuthContext** (`src/context/AuthContext.jsx`)
- Manages global authentication state
- Provides: `register`, `login`, `logout`, `updateProfile` functions
- Handles localStorage synchronization
- Current user session management

#### **ProtectedRoute** (`src/components/ProtectedRoute.jsx`)
- Route wrapper for authenticated-only pages
- Redirects to login if user not authenticated

#### **ErrorBoundary** (`src/components/ErrorBoundary.jsx`)
- Catches React errors in child components
- Displays user-friendly error messages
- Prevents app crashes

#### **FormInput** (`src/components/FormInput.jsx`)
- Reusable controlled input component
- Built-in error display
- Bootstrap styling integration

#### **Navbar** (`src/components/Navbar.jsx`)
- Responsive navigation bar
- Conditional rendering based on auth state
- Logout functionality

### Page Components

#### **Register** (`src/pages/Register.jsx`)
- User registration form
- Real-time validation
- Phone and address as optional fields

#### **Login** (`src/pages/Login.jsx`)
- User authentication form
- Error handling for incorrect credentials

#### **Dashboard** (`src/pages/Dashboard.jsx`)
- Profile viewing mode
- Inline editing with validation
- Password change functionality
- Avatar with user initials

---

## 🔑 Key Functionalities

### Authentication System
```javascript
// Register new user
const result = register({ name, email, password, phone, address });

// Login existing user
const result = login({ email, password });

// Logout
logout();

// Update profile
const result = updateProfile({ id, name, phone, address, password });
```

### LocalStorage Structure
```javascript
// Users array
localStorage.getItem('ra_users')
// [{ id, name, email, password, phone, address }, ...]

// Current logged-in user
localStorage.getItem('ra_current_user')
// { id, name, email, phone, address }
```

---

## ✅ Validation Rules

### Email Validation
- Required field
- Must match pattern: `example@domain.com`
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Password Validation
- Required field (for registration/login)
- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number
- Regex: `/^(?=.*[A-Za-z])(?=.*\d).{8,}$/`

### Phone Validation
- Optional field
- Exactly 10 digits (Indian format)
- Regex: `/^[0-9]{10}$/`

### Name Validation
- Required field
- Cannot be empty or whitespace only

---

## 🎨 Styling

### Color Palette
- **Primary**: Blue gradient (`#1d4ed8` to `#3b82f6`)
- **Dark background**: Deep navy (`#0f172a` to `#020617`)
- **Card background**: White (`#ffffff`)
- **Text**: Dark gray (`#111827`)
- **Muted text**: Light gray (`#9ca3af`)

### Responsive Breakpoints
- Mobile-first design
- Bootstrap 5 grid system
- Centered layouts on large screens

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🐛 Known Limitations

1. **LocalStorage Only** - Data persists per browser/device only
2. **No Backend** - Authentication is client-side simulation
3. **Password Storage** - Passwords stored in plain text (demo purposes only)
4. **No Email Verification** - Registration is instant without confirmation

---

## 🔒 Security Notes

⚠️ **This is a demonstration project**

- Passwords are NOT encrypted
- No server-side authentication
- LocalStorage is NOT secure for production
- Use proper backend authentication for real applications

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

Built with ❤️ using React + Vite

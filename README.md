# React Account App

A simple **user account management** app built with **React + Vite**.  
It simulates authentication using **Context API + localStorage**, and provides:

- Registration
- Login
- Protected Dashboard
- Profile view & edit (with optional password change)

> ⚠️ This is a **frontend-only demo**. Passwords are stored in `localStorage` for simulation purposes only and must **never** be used like this in real production apps.

---

## 🚀 Live Demo

<!-- Replace this with your deployed URL once you host it on Vercel/Netlify -->
**Demo:** _coming soon_

---

## 🛠 Tech Stack

- **React (Vite)** – fast dev environment & build tool  
- **React Router** – client-side routing (`/login`, `/register`, `/dashboard`)  
- **Context API** – global auth state (`users`, `currentUser`, auth actions)  
- **Bootstrap 5** – layout & styling  
- **localStorage** – to simulate backend persistence  
- **ESLint** – basic linting (from Vite template)

---

## ✨ Features

### Authentication & User Management

- Register a new account
  - Fields: `name`, `email`, `password`, `confirm password`, `phone` (optional), `address` (optional)
  - Client-side validation on all required fields
  - Email uniqueness check (case-insensitive)
  - Auto-login after successful registration

- Login
  - Email + password authentication
  - Friendly error messages:
    - “User not found”
    - “Incorrect password”

- Dashboard (Protected)
  - Accessible only when logged in (`ProtectedRoute`)
  - Shows current user details:
    - Name, Email, Phone, Address
  - “Edit Profile” mode:
    - Update name, phone, address
    - Optional password change:
      - Only validated if user types a new password
      - Must be strong (min 8 chars, at least 1 letter & 1 digit)
    - Password fields are cleared after a successful update

- Logout
  - Clears current user from context + localStorage
  - Redirects back to login

---

## ✅ Validation Rules

Validation is done in a shared **`utils/validation.js`** file.

- **Email**
  - Must be non-empty
  - Must follow `something@domain.tld` pattern

- **Password**
  - At least 8 characters
  - Must contain at least 1 letter and 1 digit
  - Special characters are allowed

- **Confirm Password**
  - Must match the `password` field

- **Phone**
  - Optional
  - If provided, must be **exactly 10 digits** (no `+91`, no spaces, no symbols)

- **Name**
  - Required
  - Cannot be only whitespace

---

## 🧠 Architecture Overview

### 1. AuthContext (`src/context/AuthContext.jsx`)

Central place for all auth-related logic:

- **State**
  - `users` – array of registered users
  - `currentUser` – currently logged-in user (without password)
  - `loading` – used when updating profile

- **Persistence**
  - Reads/Writes `users` to `localStorage["ra_users"]`
  - Reads/Writes `currentUser` to `localStorage["ra_current_user"]`
  - Safe JSON parsing with try/catch and fallback values

- **Public API**
  - `register({ name, email, password, phone, address })`
    - Checks email uniqueness
    - Creates user with `id = Date.now()`
    - Auto-logs in the new user
    - Returns `{ success: boolean, message?: string }`
  - `login({ email, password })`
    - Finds matching user
    - Verifies password
    - Returns `{ success: boolean, message?: string }`
  - `updateProfile({ id, name, phone, address, password? })`
    - Updates user by `id`
    - Only updates password if provided
    - Keeps `currentUser` in sync
    - Uses `loading` to signal saving state
    - Returns `{ success: boolean, message?: string }`
  - `logout()`
    - Clears `currentUser`

Components use this via:

```js
const { currentUser, register, login, updateProfile, logout } = useAuth();

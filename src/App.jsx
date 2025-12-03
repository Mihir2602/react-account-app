// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const App = () => {
  return (
    <>
      <Navbar />

       <main className="app-main">
        <ErrorBoundary>
          <Routes>
            {/* Default route -> redirect to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} /> {/*// Used this replace to overwrite the history stack instead of pushing a new entry. */}

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected route: only logged-in users can see Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all for unknown routes */}
            <Route path="*" element={<h3>404 - Page not found</h3>} />
          </Routes>
        </ErrorBoundary>
        </main>
    </>
  );
};

export default App;

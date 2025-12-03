import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import FormInput from '../components/FormInput.jsx';
import { isValidEmail } from '../utils/validation.js';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError('');

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    const result = login({
      email: form.email.trim(),
      password: form.password,
    });

    setSubmitting(false);

    if (!result.success) {
      setServerError(result.message || 'Login failed');
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="card-body">
          <h3>Login</h3>
          <p className="text-muted-sm mb-3">
            Welcome back! Enter your credentials to access your dashboard.
          </p>

          {serverError && (
            <div className="alert alert-danger" role="alert">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <FormInput
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />

            <div className="d-grid mb-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Signing in...' : 'Login'}
              </button>
            </div>

            <p className="text-center text-muted-sm mb-0">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

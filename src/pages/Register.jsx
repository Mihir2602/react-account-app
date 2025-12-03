import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import FormInput from '../components/FormInput.jsx';
import { isValidEmail, isStrongPassword,isValidPhone } from '../utils/validation.js';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  //handling input form data.
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev, //Keeping existing data as it is.
      [id]: value, //Updating ONLY the specific field that changed.
    }));
  };

  const validate = () => {
    const newErrors = {};

    // checking if name is not empty!
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // phone no. validation 
if (form.phone && !isValidPhone(form.phone)) {
  newErrors.phone = 'Phone number must be 10 digits';
}

    // checking email format using our regex.
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!isStrongPassword(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include a number';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerError('');

    // checking for any errors in validation.
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // If There are client-side validation errors.
      return;
    }

    setSubmitting(true);

    const result = register({
      name: form.name.trim(), //sanitizing the inputs...
      email: form.email.trim(),
      password: form.password, // no need to sanitise here because, password is secret and can consist spaces and all.
      phone: form.phone.trim(),
      address: form.address.trim(),
    });

    setSubmitting(false);

    if (!result.success) {
      setServerError(result.message || 'Registration failed');
      return;
    }

    // On success, go to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="card-body">
          <h3>Create an account</h3>
          <p className="text-muted-sm mb-3">
            Sign up to create your account and manage your profile.
          </p>

          {serverError && (
            <div className="alert alert-danger" role="alert">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <FormInput
              id="name"
              label="Full name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

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

            <FormInput
              id="confirmPassword"
              label="Confirm password"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <FormInput
              id="phone"
              label="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address (optional)
              </label>
              <textarea
                id="address"
                className="form-control"
                rows="2"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="d-grid mb-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Registering...' : 'Register'}
              </button>
            </div>

            <p className="text-center text-muted-sm mb-0">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

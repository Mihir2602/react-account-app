import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import FormInput from '../components/FormInput.jsx';
import { isStrongPassword, isValidPhone } from '../utils/validation.js';

const Dashboard = () => {
  const { currentUser, updateProfile, loading } = useAuth();

  //this state decides, if to use <p> tag for viewing or to use  form components for editing.
  const [editing, setEditing] = useState(false);
  //Initialising the form with current user data so the inputs do not be empty when editing starts.
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    password: '', // Password starts empty because we only send it if it is changed.
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);
  //Prevents from crashing, if it is accessed before the auth loads.
  if (!currentUser) {
    return null;
  }

  const handleChange = (event) => {
    const { id, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // phone no. validation
if (form.phone && !isValidPhone(form.phone)) {
  newErrors.phone = 'Phone number must be 10 digits';
}

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    // Only validate the password if the user has actually typed something in the password field.
    // If they leave it blank, we assume that they want to keep their old password as it is.
    if (form.password) {
      if (!isStrongPassword(form.password)) {
        newErrors.password =
          'Password must be at least 8 characters and include a number';
      }

      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const handleSave = (event) => {
    event.preventDefault();
    setServerMsg(null); // Clear any old success/error messages.

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Sending the data to Context.
    // Note: We send 'undefined' for the password if it is empty, so the context knows not to update it.
    const result = updateProfile({
      id: currentUser.id,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      password: form.password || undefined,
    });

    if (!result.success) {
      setServerMsg({
        type: 'danger',
        text: result.message || 'Failed to update profile',
      });
      return;
    }

    setServerMsg({
      type: 'success',
      text: 'Profile updated successfully',
    });

    setEditing(false);

    // Clearng the password fields specifically, so they are clean for next time.
    setForm((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card dashboard-card">
            <div className="card-body">
              {/* Header with avatar + small description */}
              <div className="d-flex align-items-center mb-4">
                <div className="dashboard-avatar me-3">
                  {currentUser.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h4 className="mb-0">Account Dashboard</h4>
                  <p className="text-muted-sm mb-0">
                    View and update your personal information.
                  </p>
                </div>
              </div>

              {serverMsg && (
                <div className={`alert alert-${serverMsg.type}`} role="alert">
                  {serverMsg.text}
                </div>
              )}

              {!editing && (
                <>
                  <div className="mb-3">
                    <strong>Name:</strong> <br />
                    {currentUser.name}
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong> <br />
                    {currentUser.email}
                  </div>
                  <div className="mb-3">
                    <strong>Phone:</strong> <br />
                    {currentUser.phone || '-'}
                  </div>
                  <div className="mb-4">
                    <strong>Address:</strong> <br />
                    {currentUser.address || '-'}
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setEditing(true)}
                  >
                    Edit profile
                  </button>
                </>
              )}

              {editing && (
                <form onSubmit={handleSave}>
                  <FormInput
                    id="name"
                    label="Full name"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />

                  {/* Email is read-only because it's the unique ID for login */}
                  <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled
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

                  <hr />

                  <p className="mb-1">
                    <small>
                      Change password (leave blank to keep current password)
                    </small>
                  </p>

                  <FormInput
                    id="password"
                    label="New password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                  />

                  <FormInput
                    id="confirmPassword"
                    label="Confirm new password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                  />

                  <div className="d-flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save changes'}
                    </button>

                    {/* Cancel Button: Must reset form state back to original user data */}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditing(false);
                        setErrors({});
                        setServerMsg(null);
                        // Resetting the form to match the saved database values while discarding any unsaved typing.
                        setForm((prev) => ({
                          ...prev,
                          name: currentUser.name || '',
                          phone: currentUser.phone || '',
                          address: currentUser.address || '',
                          password: '',
                          confirmPassword: '',
                        }));
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

export const isValidEmail = (email) => {
  if (!email) return false;
//regex to check the email.
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// Password must be atleast 8 chars and must have atleast one letter and one number in it.
export const isStrongPassword = (password) => {
  if (!password) return false;
  //regex for the same.
  const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return pattern.test(password);
};

// it validates Indian phone number as per the exact 10 digits.
export const isValidPhone = (phone) => {
  if (!phone) return true; // optional field
  const pattern = /^[0-9]{10}$/;
  return pattern.test(phone);
};


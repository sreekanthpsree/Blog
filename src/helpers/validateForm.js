export function validateForm(values) {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email required";
  } else if (!regex.test(values.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!values.password) {
    errors.password = "Password required";
  }

  return errors;
}

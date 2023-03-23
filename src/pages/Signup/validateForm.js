export const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.username) {
    errors.username = "User name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!values.phone) {
    errors.phone = "Phone number required";
  }
  if (!values.password) {
    errors.password = " Password is required";
  }
  return errors;
};

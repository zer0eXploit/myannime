export default (rule, value) => {
  let valid = true;
  if (rule.required) {
    valid = value.trim() !== "" && valid;
  }

  if (rule.minLength) {
    valid = value.trim().length >= rule.minLength && valid;
  }

  if (rule.maxLength) {
    valid = value.trim().length <= rule.maxLength && valid;
  }

  if (rule.email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = pattern.test(value.trim()) && valid;
  }

  return valid;
};

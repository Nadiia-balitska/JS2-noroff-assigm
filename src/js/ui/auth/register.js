import { registerUser } from '../../api/auth/register.js';

document.forms.register.addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  // Simple validations
  const errorBox = document.getElementById('errorMessages');
  const successBox = document.getElementById('successMessages');
  errorBox.textContent = '';
  successBox.textContent = '';

  if (!user.email.endsWith('@stud.noroff.no') && !user.email.endsWith('@noroff.no')) {
    errorBox.textContent = 'You must use a @stud.noroff.no or @noroff.no email.';
    return;
  }

  try {
    await registerUser(user);
    successBox.textContent = 'Registration successful! Redirecting...';
    setTimeout(() => {
      window.location.href = '/auth/login/';
    }, 1500);
  } catch (error) {
    console.error('Registration failed:', error);
    errorBox.textContent = error.message || 'Registration failed. Try again.';
  }
});

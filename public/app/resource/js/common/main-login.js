// main.js
import { checkAdminCredentials } from './process-login-admin.js';

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form-control');

  if (form) {
    form.addEventListener("submit", async function(event) {
      event.preventDefault();

      const usernameAdmin = document.getElementById("usernameAdmin").value;
      const passwordAdmin = document.getElementById("password").value;

      try {
        const isValid = await checkAdminCredentials(usernameAdmin, passwordAdmin);
        if (isValid) {
          Swal.fire({
            icon: 'success',
            title: 'Login berhasil!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            sessionStorage.setItem('loggedInAdmin', usernameAdmin);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = "dashboard.html";
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login gagal',
            text: 'Username atau password salah.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      }
    });
  } else {
    console.error('Form element not found.');
  }
});

import { auth } from '../configfb.js';
import { sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

window.forgotPassword = function(event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Display success message
      successReset();
      document.getElementById("reset-password-form").reset();
    })
    .catch((error) => {
      // Display error message
      var errorMessage = error.message;
      showErrorMessage(errorMessage);
    });
}

function showErrorMessage(message) {
  // Implement display of error message
  console.error(message);
  document.getElementById("message").textContent = message;
}

function successReset() {
  // Implement display of success message
    Swal.fire({
        icon: 'success',
        title: 'Reset successful!',
        text: 'Please check your email.',
        confirmButtonText: 'OK'
    }).then(() => {
        console.log("Password reset successful");
    });
}

import { auth } from '../configfb.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully signed in
            const user = userCredential.user;
            console.log('User signed in:', user);

            localStorage.setItem('isLoggedIn', 'true');

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
                timer: 2000, // Show for 2 seconds
                showConfirmButton: false
            }).then(() => {
                // Redirect to the admin dashboard or another page after the alert is closed
                window.location.href = 'dashboard.html'; // Update with the actual page
            });
        })
        .catch((error) => {
            console.error('Error signing in:', error);
            
            // Display an error message to the user
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
            });
        });
});

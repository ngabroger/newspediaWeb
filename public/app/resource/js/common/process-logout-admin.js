import { auth } from '../configfb.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

document.getElementById('signOut').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Show confirmation dialog using SweetAlert
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'No, stay logged in'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, sign out from Firebase
            signOut(auth).then(() => {
                // Sign-out successful
                console.log('User signed out');

                // Redirect to the login page or another page
                window.location.href = 'admin-login.html'; // Update with the actual login page
            }).catch((error) => {
                console.error('Error signing out:', error);

                // Display an error message to the user
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: error.message,
                });
            });
        }
    });
});

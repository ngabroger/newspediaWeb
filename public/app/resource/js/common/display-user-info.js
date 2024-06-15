import { auth } from '../configfb.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, get the user info
            const displayName = user.displayName || 'No Username';
            const email = user.email;

            // Display the user info in the appropriate elements
            // document.getElementById('username').textContent = displayName;
            document.getElementById('email').textContent = email;
        } else {
            // No user is signed in, redirect to the login page
            window.location.href = 'admin-login.html';
        }
    });
});

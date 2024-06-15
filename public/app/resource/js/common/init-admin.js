import { db } from '../configfb.js'; // Make sure this path is correct
import { ref, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Ensure Swal is loaded and accessible (usually through a <script> tag in your HTML)
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('adminForm');
    // const modal = document.getElementById('crud-modal');
    
    if (form) { // Check if the form element exists
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const usernameAdmin = document.getElementById("usernameAdmin").value;
            const passwordAdmin = document.getElementById("password").value;
            // console.log('Username:', usernameAdmin);
            // console.log('Password:', passwordAdmin);
            if (usernameAdmin && passwordAdmin) { // Ensure the input values are not null or undefined
                const adminRef = ref(db, 'Admin');

        push(adminRef, {
            username: usernameAdmin,
            password: passwordAdmin,
        }).then(() => {
            // Tampilkan SweetAlert untuk informasi sukses
            Swal.fire({
                icon: 'success',
                title: 'Admin berhasil ditambahkan!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                form.reset();
                // modal.classList.add('hidden'); // Hide the modal
            });

                }).catch((error) => {
                    console.error("Error writing to database:", error);
                    // Display SweetAlert for error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Terjadi kesalahan saat menambahkan admin.',
                    });
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Input tidak lengkap',
                    text: 'Silakan isi username dan password.',
                });
            }
        });
    } else {
        console.error('Form element with id "adminForm" not found.');
    }
});

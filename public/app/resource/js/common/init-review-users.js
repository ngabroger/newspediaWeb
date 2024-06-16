import { db } from '../configfb.js'; // Make sure this path is correct
import { ref, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Ensure Swal is loaded and accessible (usually through a <script> tag in your HTML)
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('reviewForm');
    
    if (form) { // Check if the form element exists
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const reviewName = document.getElementById("reviewName").value;
            const description = document.getElementById("description").value;
            // console.log('Username:', usernameAdmin);
            // console.log('Password:', passwordAdmin);
            if (reviewName && description) { // Ensure the input values are not null or undefined
                const reviewRef = ref(db, 'Review');

        push(reviewRef, {
            reviewName: reviewName,
            description: description,
        }).then(() => {
            // Tampilkan SweetAlert untuk informasi sukses
            Swal.fire({
                icon: 'success',
                title: 'Review berhasil ditambahkan!',
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
                    text: 'Silakan isi reviewName dan description.',
                });
            }
        });
    } else {
        console.error('Form element with id "adminForm" not found.');
    }
});

import { db } from '../configfb.js';
import { ref, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('adminForm');
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const emailAdmin = document.getElementById("email").value;
        const usernameAdmin = document.getElementById("username").value;
        const passwordAdmin = document.getElementById("password").value;
        const adminRef = ref(db, 'Admin');

        push(adminRef, {
            email: emailAdmin,
            username: usernameAdmin,
            password: passwordAdmin,
        }).then(() => {
            // Tampilkan SweetAlert untuk informasi sukses
            Swal.fire({
                icon: 'success',
                title: 'Admin berhasil ditambahkan!',
                showConfirmButton: false,
                timer: 1500
            });

            form.reset();
        }).catch((error) => {
            console.error("Error writing to database:", error);
            // Tampilkan SweetAlert untuk pesan kesalahan
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan saat menambahkan admin.',
            });
        });
    });
});

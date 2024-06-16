import { db } from '../configfb.js'; // Make sure this path is correct
import { ref, get, child } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Ensure Swal is loaded and accessible (usually through a <script> tag in your HTML)
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form-control');

    if (form) { // Check if the form element exists
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const usernameAdmin = document.getElementById("usernameAdmin").value;
            const passwordAdmin = document.getElementById("password").value;

            if (usernameAdmin && passwordAdmin) { // Ensure the input values are not null or undefined
                const dbRef = ref(db);
                get(child(dbRef, 'Admin')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const admins = snapshot.val();
                        let adminFound = false;
                        for (let key in admins) {
                            if (admins[key].username === usernameAdmin && admins[key].password === passwordAdmin) {
                                adminFound = true;
                                break;
                            }
                        }

                        if (adminFound) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Login berhasil!',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                // Store the logged-in admin username in sessionStorage
                                sessionStorage.setItem('loggedInAdmin', usernameAdmin);
                                localStorage.setItem('isLoggedIn', 'true');
                                // Redirect or perform other actions upon successful login
                                window.location.href = "dashboard.html"; // Change this to your dashboard page
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Login gagal',
                                text: 'Username atau password salah.',
                            });
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Login gagal',
                            text: 'Tidak ada data admin yang ditemukan.',
                        });
                    }
                }).catch((error) => {
                    console.error("Error reading from database:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Terjadi kesalahan saat memproses login.',
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
        console.error('Form element not found.');
    }
});

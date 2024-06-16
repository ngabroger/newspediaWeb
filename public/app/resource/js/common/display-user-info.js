// display-admin-info.js

import { db } from '../configfb.js'; // Sesuaikan path jika berbeda
import { ref, get, child } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
    const usernameAdminElement = document.getElementById('infoAdmin');

    if (usernameAdminElement) {
        // Get the logged-in admin username from session storage
        const loggedInAdmin = sessionStorage.getItem('loggedInAdmin');

        if (loggedInAdmin) {
            const dbRef = ref(db);
            get(child(dbRef, `Admin`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const admins = snapshot.val();
                    let adminUsername = '';

                    for (let key in admins) {
                        if (admins[key].username === loggedInAdmin) {
                            adminUsername = admins[key].username; // Ambil username admin dari Firebase
                            break; // Hentikan loop setelah menemukan admin yang sesuai
                        }
                    }

                    if (adminUsername) {
                        usernameAdminElement.textContent = adminUsername;
                    } else {
                        console.log('Admin dengan username tersebut tidak ditemukan.');
                    }
                } else {
                    console.log('Tidak ada data admin yang ditemukan.');
                }
            }).catch((error) => {
                console.error('Error reading from database:', error);
            });
        } else {
            console.error('No admin is logged in.');
        }
    } else {
        console.error('Element dengan ID infoAdmin tidak ditemukan.');
    }
});

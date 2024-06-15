// display-admin-info.js

import { db } from '../configfb.js'; // Sesuaikan path jika berbeda
import { ref, get, child } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
    const usernameAdminElement = document.getElementById('infoAdmin');

    if (usernameAdminElement) {
        const dbRef = ref(db);
        get(child(dbRef, 'Admin')).then((snapshot) => {
            if (snapshot.exists()) {
                const admins = snapshot.val();
                let adminUsername = '';

                for (let key in admins) {
                    // Misalkan Anda ingin menampilkan admin pertama yang ditemukan
                    adminUsername = admins[key].username; // Ambil username admin dari Firebase
                    break; // Hentikan loop setelah menemukan admin pertama
                }

                usernameAdminElement.textContent = adminUsername;
            } else {
                console.log('Tidak ada data admin yang ditemukan.');
            }
        }).catch((error) => {
            console.error('Error reading from database:', error);
        });
    } else {
        console.error('Element dengan ID usernameAdmin tidak ditemukan.');
    }
});

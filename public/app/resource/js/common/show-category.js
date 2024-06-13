import { db } from '../configfb.js'
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
const categoryRef = ref(db, 'category');
onValue(categoryRef, (snapshot) => {
    const data = snapshot.val();
    const dataList = document.getElementById("listCategory");
    dataList.innerHTML = ""; // Kosongkan elemen sebelum menambahkan opsi baru

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const row = data[key];
            const option = document.createElement("option");
            option.textContent = row.nameCategory; // Set nama kategori sebagai teks option
            option.value = row.nameCategory; // Set nilai option ke kunci (atau ke nilai lain jika diinginkan)
            dataList.appendChild(option); // Tambahkan option ke dalam select
        }
    }
});
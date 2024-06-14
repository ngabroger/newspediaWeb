import { db } from '../configfb.js'
import { ref, push  } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('categoryForm');
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const nameCategory = document.getElementById("nameCategory").value;
      const categoryRef = ref(db, 'category');
  
      push(categoryRef, {
        nameCategory: nameCategory
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Data berhasil dikirim!',
          showConfirmButton: false,
          timer: 1500
      });
        form.reset();
      })
      .catch((error) => {
        console.error("Error writing to database:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Terjadi kesalahan saat mengirim data.',
      });
      });
    });
  });
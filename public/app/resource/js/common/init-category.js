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
        alert("Data berhasil dikirim!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error writing to database:", error);
      });
    });
  });
// init-news.js
import { db, storage } from '../configfb.js'; // Mengimpor db dan storage dari configfb.js
import { ref, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('newsForm');
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const nameNews = document.getElementById("nameNews").value;
      const listCategory = document.getElementById("listCategory").value;
      const datePublish = document.getElementById("datePublish").value;
      const imageNews = document.getElementById("imageNews").files[0]; // Use files[0] to get file object
      const description = document.getElementById("description").value;
      
      // Menggunakan Firebase Storage yang telah diimpor dari configfb.js
      const storageReference = storageRef(storage, "images/" + imageNews.name); // Generate a unique path for the image// Menggunakan storage dari configfb.js
      
      const metadata = {
        contentType: imageNews.type,
    };
    
    
            uploadBytes(storageReference, imageNews, metadata)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                console.log(url);
                // Set image URL to the appropriate element
                document.getElementById("imageNews").src = url;
                
                // Push data to Firebase Realtime Database
                const newsRef = ref(db, 'NewsList');
                push(newsRef, {
                    nameNews: nameNews,
                    category: listCategory,
                    datePublish: datePublish,
                    imageNews: url, // Use the image URL obtained from Firebase Storage
                    description: description,
                }).then(() => {
                    alert("Data berhasil dikirim!");
                    form.reset();
                }).catch((error) => {
                    console.error("Error writing to database:", error);
                });
            }).catch((error) => {
                console.error("Error uploading image:", error);
            });
    });
});

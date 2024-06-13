import { db, storage } from '../configfb.js';
import { ref, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('newsForm');
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const nameNews = document.getElementById("nameNews").value;
        const listCategory = document.getElementById("listCategory").value;
        const datePublish = document.getElementById("datePublish").value;
        const imageNews = document.getElementById("imageNews").files[0];
        const description = document.getElementById("description").value;
        
        const storageReference = storageRef(storage, "images/" + imageNews.name);
        const metadata = {
            contentType: imageNews.type,
        };

        uploadBytes(storageReference, imageNews, metadata)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                console.log(url);
                document.getElementById("imageNews").src = url;
                
                const newsRef = ref(db, 'NewsList');
                push(newsRef, {
                    nameNews: nameNews,
                    category: listCategory,
                    datePublish: datePublish,
                    imageNews: url,
                    description: description,
                }).then(() => {
                    // Tampilkan SweetAlert untuk informasi sukses
                    Swal.fire({
                        icon: 'success',
                        title: 'Data berhasil dikirim!',
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
                        text: 'Terjadi kesalahan saat mengirim data.',
                    });
                });
            }).catch((error) => {
                console.error("Error uploading image:", error);
                // Tampilkan SweetAlert untuk pesan kesalahan
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan saat mengunggah gambar.',
                });
            });
    });
});

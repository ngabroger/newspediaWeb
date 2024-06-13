// Menangani pengiriman formulir
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah pengiriman formulir secara default

    // Mengambil nilai-nilai masukan
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var date = document.getElementById("date").value;
    var message = document.getElementById("message").value;

    // Membuat objek data dari nilai-nilai masukan
    var formData = {
        "name": name,
        "email": email,
        "date": date,
        "message": message
    };

    // Mengonversi objek data menjadi format JSON
    var jsonData = JSON.stringify(formData, null, 2);

    // Menampilkan pesan SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        html: 'Thank you for your message, <strong>' + name + '</strong>!<br>Your message has been sent successfully.',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            // Membuat tautan unduh untuk file JSON
            var blob = new Blob([jsonData], { type: "application/json" });
            var url = URL.createObjectURL(blob);

            // Membuat elemen tautan unduh dan mengkliknya secara otomatis
            var a = document.createElement("a");
            a.href = url;
            a.download = "contact_form_data.json";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    });
});

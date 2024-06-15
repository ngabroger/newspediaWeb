document.getElementById('logoutAdmin').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Show confirmation dialog using SweetAlert
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'No, stay logged in'
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, remove isLoggedIn from localStorage
            localStorage.removeItem('isLoggedIn');

            // Redirect to the login page
            window.location.href = 'admin-login.html'; // Update with the actual login page
        }
    });
});

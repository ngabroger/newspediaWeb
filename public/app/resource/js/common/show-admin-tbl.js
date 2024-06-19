import { db } from '../configfb.js';
import { ref, update, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

document.getElementById('search').addEventListener('input', filterAdmin);
let adminData = {};

const adminRef = ref(db, 'Admin');
onValue(adminRef, (snapshot) => {
    adminData = snapshot.val();
    displayAdmin(adminData);
});

// Display admin data in the table
function displayAdmin(data) {
    const dataList = document.getElementById("showAdmin");
    const noDataMessage = document.getElementById("noDataMessage");
    dataList.innerHTML = "";

    if (data && Object.keys(data).length > 0) {
        noDataMessage.classList.add("hidden");
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const row = data[key];
                const tr = document.createElement("tr");
                tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-200', 'dark:hover:bg-gray-600');
                tr.innerHTML = `
                    <td class="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">${key}</td>
                    <td class="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">${row.username}</td>
                    <td class="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">${censorPassword(row.password)}</td>
                    <td class="px-4 py-4">
                        <div class="flex items-center space-x-3.5">
                            <button data-key="${key}" class="hover:text-primary edit-btn">
                                <i class="material-symbols-outlined hover:text-primary">Edit</i>
                            </button>
                            <button data-key="${key}" class="hover:text-primary delete-btn">
                                <i class="material-symbols-outlined hover:text-primary">Delete</i>
                            </button>
                        </div>
                    </td>
                `;
                dataList.appendChild(tr);
            }
        }
        attachDeleteEventListeners();
        attachEditEventListeners();
    } else {
        noDataMessage.classList.remove("hidden");
    }
}

// Function to censor password with asterisks
function censorPassword(password) {
    return '*'.repeat(password.length); // Mengganti setiap karakter dengan bintang (*)
}

// Attach event listeners for delete buttons
function attachDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const key = this.getAttribute('data-key');

            // Show confirmation dialog using SweetAlert
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this item!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // If confirmed, delete item from Firebase
                    deleteAdminItem(key);
                }
            });
        });
    });
}

// Delete admin item from Firebase
function deleteAdminItem(key) {
    const adminItemRef = ref(db, `Admin/${key}`);
    remove(adminItemRef)
        .then(() => {
            console.log(`Item with key ${key} deleted successfully`);
            Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
            ).then(() => {
                location.reload(); // Reload the page after successful deletion
            });
        })
        .catch((error) => {
            console.error("Error deleting item: ", error);
            Swal.fire(
                'Error!',
                'Failed to delete item.',
                'error'
            );
        });
}

// Attach event listeners for edit buttons
function attachEditEventListeners() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const key = this.getAttribute('data-key');
            openEditModal(key);
        });
    });
}

// Function to open edit modal and load data
function openEditModal(key) {
    document.getElementById('editKey').value = key;
    const modalContainer = document.getElementById('edit-modal-container');
    modalContainer.classList.remove('hidden');
}

// Function to close edit modal
function closeEditModal() {
    const modalContainer = document.getElementById('edit-modal-container');
    modalContainer.classList.add('hidden');
}

// Event listener for close button
document.querySelectorAll('[data-modal-hide="edit-modal"]').forEach(button => {
    button.addEventListener('click', closeEditModal);
});

// Handle edit form submission
document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const key = document.getElementById('editKey').value;
    const newPassword = document.getElementById('editPassword').value;

    updateAdminPassword(key, newPassword);
});

// Function to update admin password in Firebase
function updateAdminPassword(key, newPassword) {
    const adminItemRef = ref(db, `Admin/${key}`);
    update(adminItemRef, { password: newPassword })
        .then(() => {
            console.log(`Password for item with key ${key} updated successfully`);
            Swal.fire(
                'Updated!',
                'Password has been updated.',
                'success'
            );
            closeEditModal();
            displayAdmin(adminData); // Refresh the admin list
        })
        .catch((error) => {
            console.error("Error updating password: ", error);
            Swal.fire(
                'Error!',
                'Failed to update password.',
                'error'
            );
        });
}

// Function to filter admin list based on search input
function filterAdmin() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredData = Object.keys(adminData).filter(key => {
        const username = adminData[key].username.toLowerCase();
        return username.includes(searchValue);
    }).reduce((obj, key) => {
        obj[key] = adminData[key];
        return obj;
    }, {});

    displayAdmin(filteredData);
}

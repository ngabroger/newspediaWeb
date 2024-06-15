import { db } from '../configfb.js';
import { ref, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

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
                    <td class="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">${row.email}</td>
                    <td class="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">${row.username}</td>
                    <td class="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">${row.password}</td>
                    <td class="px-4 py-4">
                        <div class="flex items-center space-x-3.5">
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
    } else {
        noDataMessage.classList.remove("hidden");
    }
}

// Attach event listeners to delete buttons
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
            );
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

// Filter admin data based on search input
function filterAdmin() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredData = {};

    for (const key in adminData) {
        if (adminData.hasOwnProperty(key)) {
            const row = adminData[key];
            if (row.email.toLowerCase().includes(searchValue) || row.username.toLowerCase().includes(searchValue) || row.password.toLowerCase().includes(searchValue)) {
                filteredData[key] = row;
            }
        }
    }
    displayAdmin(filteredData);
}

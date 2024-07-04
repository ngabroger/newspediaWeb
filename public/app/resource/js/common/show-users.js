import { db } from '../configfb.js';
import { ref, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Function to load categories into the edit dropdown
document.getElementById('search').addEventListener('input', filterUsers);
let UserData = {};
// Function to handle the initial loading and displaying of user items
const userRef = ref(db, 'users');
onValue(userRef, (snapshot) => {
    console.log("Firebase onValue triggered");
    UserData = snapshot.val();
    displayUsers(UserData);
});

// Function to display user items
function displayUsers(data) {
    const dataList = document.getElementById("dataTableBody");
    const noDataMessage = document.getElementById("noDataMessage");
    dataList.innerHTML = ""; // Clear existing elements

    if (data && Object.keys(data).length > 0) {
        noDataMessage.classList.add('hidden');
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const row = data[key];
                console.log(`Processing key: ${key}`);
                const tr = document.createElement("tr");
                tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-200', 'dark:hover:bg-gray-600');
                tr.innerHTML = `
                    <td class="border-b border-[#eee] px-4 py-5 pl-3 dark:border-strokedark xl:pl-3">
                        <h5 class="font-medium text-black dark:text-white">${row.username}</h5>
                    </td>
                    <td class="border-b border-[#eee] px-4 py-5 max-w-sm text-black dark:text-white overflow-hidden truncate">
                        ${row.email}
                    </td>
                    <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div class="flex items-center space-x-3.5">
                            <button data-key="${key}" class="hover:text-primary delete-btn">
                                <i class="material-symbols-outlined hover:text-primary">Delete</i>
                            </button>
                        </div>
                    </td>
                `;
                dataList.appendChild(tr); // Append the row to the table body
            }
        }
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
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
                        deleteUserItem(key);
                    }
                });
            });
        });
    } else {
        noDataMessage.classList.remove('hidden');
    }
}

function deleteUserItem(key) {
    const userItemRef = ref(db, `users/${key}`);
    remove(userItemRef)
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

function filterUsers() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredData = {};

    for (const key in UserData) {
        if (UserData.hasOwnProperty(key)) {
            const row = UserData[key];
            if (row.username.toLowerCase().includes(searchValue) || 
                row.email.toLowerCase().includes(searchValue)) {
                filteredData[key] = row;
            }
        }
    }

    displayUsers(filteredData);
}

import { db } from '../configfb.js';
import { ref, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Function to load categories into the edit dropdown
document.getElementById('search').addEventListener('input', filterReview);
let ReviewData = {};
// Function to handle the initial loading and displaying of news items
const reviewRef = ref(db, 'Review');
onValue(reviewRef, (snapshot) => {
    console.log("Firebase onValue triggered");
    ReviewData = snapshot.val();
    displayNews(ReviewData);
});

// Function to display news items
function displayNews(data) {
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
                    <td class="border-b border-[#eee]  px-4 py-5 pl-3 dark:border-strokedark xl:pl-3">
                        <h5 class="font-medium text-black dark:text-white">${row.reviewName}</h5>
                    </td>
                    <td class="border-b border-[#eee] px-4 py-5 max-w-sm text-black dark:text-white overflow-hidden truncate">
                        ${row.description}
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
                        deleteNewsItem(key);
                    }
                });
            });
        });
    } else {
        noDataMessage.classList.remove('hidden');
    }
}

function deleteNewsItem(key) {
    const reviewItemRef = ref(db, `Review/${key}`);
    remove(reviewItemRef)
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
function filterReview() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredData = {};

    for (const key in ReviewData) {
        if (ReviewData.hasOwnProperty(key)) {
            const row = ReviewData[key];
            if (row.reviewName.toLowerCase().includes(searchValue) || 
                row.description.toLowerCase().includes(searchValue) ) {
                filteredData[key] = row;
            }
        }
    }

    displayNews(filteredData);
}


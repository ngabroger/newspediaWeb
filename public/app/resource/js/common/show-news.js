import { db } from '../configfb.js';
import { ref, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Function to load categories into the edit dropdown
document.getElementById('search').addEventListener('input', filterNews);
let newsData = {};

function loadCategories() {
    const categoryRef = ref(db, 'category');
    onValue(categoryRef, (snapshot) => {
        const data = snapshot.val();
        const editCategoryList = document.getElementById("editCategory");
        editCategoryList.innerHTML = ""; // Clear existing options

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const row = data[key];
                const option = document.createElement("option");
                option.textContent = row.nameCategory;
                option.value = row.nameCategory;
                editCategoryList.appendChild(option);
            }
        }
    });
}

// Function to handle the initial loading and displaying of news items
const newsRef = ref(db, 'NewsList');
onValue(newsRef, (snapshot) => {
    console.log("Firebase onValue triggered");
    newsData = snapshot.val();
    displayNews(newsData);
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
                    <td class="p-4">
                        <img src="${row.imageNews}" class="w-16 h-24 object-cover rounded-md md:w-32 max-w-full max-h-full" alt="mj">
                    </td>
                    <td class="border-b border-[#eee]  px-4 py-5 pl-3 dark:border-strokedark xl:pl-3">
                        <h5 class="font-medium text-black dark:text-white">${row.nameNews}</h5>
                    </td>
                    <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p class="text-black dark:text-white">${row.category}</p>
                    </td>
                    <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p class="text-black dark:text-white">${row.datePublish}</p>
                    </td>
                    <td class="border-b border-[#eee] px-4 py-5 max-w-sm text-black dark:text-white overflow-hidden truncate">
                        ${row.description}
                    </td>
                    <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div class="flex items-center space-x-3.5">
                            <button data-key="${key}" class="hover:text-primary edit-btn">
                                <i class="material-symbols-outlined hover:text-primary">Edit</i>
                            </button>
                            <button data-key="${key}" class="hover:text-primary delete-btn">
                                <i class="material-symbols-outlined hover:text-primary">Delete</i>
                            </button>
                            <button data-key="${key}" class="hover:text-primary info-btn">
                                <i class="material-symbols-outlined hover:text-primary">Info</i>
                            </button>
                        </div>
                    </td>
                `;
                dataList.appendChild(tr); // Append the row to the table body
            }
        }
        attachEditEventListeners()
        attachInfoEventListeners()
        // Handle delete button click
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

// Function to delete news item from Firebase
function deleteNewsItem(key) {
    const newsItemRef = ref(db, `NewsList/${key}`);
    remove(newsItemRef)
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
function attachInfoEventListeners() {
    const infoButtons = document.querySelectorAll('.info-btn');
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const key = this.getAttribute('data-key');
           openInfoModal(key);
        });
    });
}
function openInfoModal(dataKey) {
    const row = newsData[dataKey];
    document.getElementById('modal-title').innerText = row.nameNews;
    document.getElementById('modal-image').src = row.imageNews;
    document.getElementById('modal-description').innerText = row.description;
    document.getElementById('modal-category').innerText = `Category: ${row.category}`;
    document.getElementById('modal-date').innerText = `Date Published: ${row.datePublish}`;
    const modalContainer = document.getElementById('info-modal-container');
    modalContainer.classList.remove('hidden');
}
function closeInfoModal() {
    const modalContainer = document.getElementById('info-modal-container');
    modalContainer.classList.add('hidden');
}
document.querySelectorAll('[data-modal-hide="info-modal"]').forEach(button => {
    button.addEventListener('click', closeInfoModal);
});

// Function to update news item in Firebase
function updateNewsItem(key, updatedData) {
    const newsItemRef = ref(db, `NewsList/${key}`);
    update(newsItemRef, updatedData)
        .then(() => {
            console.log(`Item with key ${key} updated successfully`);
            Swal.fire(
                'Updated!',
                'Your item has been updated.',
                'success'
            );
            document.getElementById('edit-modal').classList.add('hidden');
        })
        .catch((error) => {
            console.error("Error updating item: ", error);
            Swal.fire(
                'Error!',
                'Failed to update item.',
                'error'
            );
        });
}
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
    loadCategories(); // Load categories before showing the modal
    const data = newsData[key];
    document.getElementById('editKey').value = key;
    document.getElementById('editName').value = data.nameNews;
    document.getElementById('editDatePublish').value = data.datePublish;
    document.getElementById('editCategory').value = data.category;
    document.getElementById('editDescription').value = data.description;
    const modalContainer = document.getElementById('edit-modal-container');
    modalContainer.classList.remove('hidden');
}
function closeEditModal() {
    const modalContainer = document.getElementById('edit-modal-container');
    modalContainer.classList.add('hidden');
}
document.querySelectorAll('[data-modal-hide="edit-modal"]').forEach(button => {
    button.addEventListener('click', closeEditModal);
});

// Handle edit form submission
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const key = document.getElementById('editKey').value;
    const updatedData = {
        nameNews: document.getElementById('editName').value,
        datePublish: document.getElementById('editDatePublish').value,
        category: document.getElementById('editCategory').value, // Update category
        description: document.getElementById('editDescription').value
    };

    // Handle image upload if any
    const editImageNews = document.getElementById('editImageNews');
    if (editImageNews.files.length > 0) {
        const file = editImageNews.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            updatedData.imageNews = e.target.result;
            updateNewsItem(key, updatedData);
        };
        reader.readAsDataURL(file);
    } else {
        updateNewsItem(key, updatedData);
    }
});

// Function to filter news items based on search input
function filterNews() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredData = {};

    for (const key in newsData) {
        if (newsData.hasOwnProperty(key)) {
            const row = newsData[key];
            if (row.nameNews.toLowerCase().includes(searchValue) || 
                row.category.toLowerCase().includes(searchValue) || 
                row.description.toLowerCase().includes(searchValue) || 
                row.datePublish.toLowerCase().includes(searchValue)) {
                filteredData[key] = row;
            }
        }
    }

    displayNews(filteredData);
}

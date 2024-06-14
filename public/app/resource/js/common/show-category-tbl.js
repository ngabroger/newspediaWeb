import { db } from '../configfb.js'
import { ref, onValue,remove } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
const categoryRef = ref(db, 'category');
onValue(categoryRef, (snapshot) => {
    const data = snapshot.val();
    const dataList = document.getElementById("showCategory");
    dataList.innerHTML = "";
 // Kosongkan elemen sebelum menambahkan opsi baru

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const row = data[key];
            const tr = document.createElement("tr");
            tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-200', 'dark:hover:bg-gray-600');
            tr.innerHTML = `
            <td class="p-4">
                 <h5 class="font-medium text-black dark:text-white">${key}</h5>
            </td>
            <td class="border-b border-[#eee]  px-4 py-5 pl-3 dark:border-strokedark xl:pl-3">
                <h5 class="font-medium text-black dark:text-white">${row.nameCategory}</h5>
            </td>
            <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div class="flex items-center space-x-3.5">
                    <button data-key="${key}" class="hover:text-primary delete-btn">
                        <i class="material-symbols-outlined hover:text-primary">Delete</i>
                    </button>
                </div>
            </td>
        `; // Set nilai option ke kunci (atau ke nilai lain jika diinginkan)
            dataList.appendChild(tr); // Tambahkan option ke dalam select
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
});

function deleteNewsItem(key) {
    const newsItemRef = ref(db, `category/${key}`);
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
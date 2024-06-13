import { db } from '../configfb.js';
import { ref, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

const newsRef = ref(db, 'NewsList');
onValue(newsRef, (snapshot) => {
    console.log("Firebase onValue triggered");
    const data = snapshot.val();
    console.log(data);

    const dataList = document.getElementById("dataTableBody");
    dataList.innerHTML = ""; // Clear existing elements

    if (data) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const row = data[key];
                const tr = document.createElement("tr");
                tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-200', 'dark:hover:bg-gray-600')
                tr.innerHTML = `
                    <td class="p-4">
                        <img src="${row.imageNews}" class="w-16 rounded-md md:w-32 max-w-full max-h-full" alt="mj">
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
                    <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark truncate...">
                        <p class="text-black dark:text-white">${row.description}</p>
                    </td>
                    <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div class="flex items-center space-x-3.5">
                            <button class="">
                                <i class="material-symbols-outlined hover:text-primary">Edit</i>
                            </button>
                            <button class="hover:text-primary delete-btn">
                                <i class="material-symbols-outlined  hover:text-primary" data-key="${key}">Delete</i>
                            </button>
                            <button class="hover:text-primary">
                                <i class="material-symbols-outlined hover:text-primary">Visibility</i>
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
                deleteNewsItem(key);
            });
        });
    } else {
        console.log("No data available");
    }
});
function deleteNewsItem(key) {
    const newsItemRef=ref(db,`NewsList/${key}`);
    remove(newsItemRef)
        .then(()=>{
            console.log(`Item with key ${key} deleted successfully`)
        }) .catch((error) => {
            console.error("Error deleting item: ", error);
        });
}
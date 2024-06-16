import { db } from '../configfb.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';



const reviewRef = ref(db, 'Review');
onValue(reviewRef, (snapshot) => {
    console.log("Firebase onValue triggered");
    const reviewData = snapshot.val();
    const dataReview = document.getElementById("reviewSelector");
    dataReview.innerHTML = ""; // Empty the element before adding new options
    for (const key in reviewData) {
        if (reviewData.hasOwnProperty(key)) {
            const row = reviewData[key];
            const tr = document.createElement("div");
            tr.classList.add('bg-[#E0F2E2]', 'shadow-sm', 'w-72', 'rounded-lg', 'overflow-hidden', 'p-3', 'flex-shrink-0');
            tr.innerHTML = `
                <h1 class="font-normal italic text-xs w-fit">"${row.description}"<span class="font-semibold text-sm">- ${row.reviewName}</span></h1>
            `;
            dataReview.appendChild(tr);
        }
    }
});



const reviewRef2 = ref(db, 'Review');
onValue(reviewRef2, (snapshot) => {
    console.log("Firebase onValue triggered");
    const reviewData = snapshot.val();
    const dataReview = document.getElementById("reviewSelector2");
    dataReview.innerHTML = ""; // Empty the element before adding new options
    for (const key in reviewData) {
        if (reviewData.hasOwnProperty(key)) {
            const row = reviewData[key];
            const tr = document.createElement("div");
            tr.classList.add('bg-[#E0F2E2]', 'shadow-sm', 'w-72', 'rounded-lg', 'overflow-hidden', 'p-3', 'flex-shrink-0');
            tr.innerHTML = `
                <h1 class="font-normal italic text-xs w-fit">"${row.description}"<span class="font-semibold text-sm">- ${row.reviewName}</span></h1>
            `;
            dataReview.appendChild(tr);
        }
    }
});
import { db } from '../configfb.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

const reviewCountSpan = document.getElementById('userCount');

const reviewRef = ref(db, 'users');

// Fetch the data from Firebase and update the count
onValue(reviewRef, (snapshot) => {
    const reviewData = snapshot.val();
    const count = reviewData ? Object.keys(reviewData).length : 0;
    reviewCountSpan.textContent = count;
});

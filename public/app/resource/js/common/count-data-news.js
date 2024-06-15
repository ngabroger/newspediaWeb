import { db } from '../configfb.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

const newsCountSpan = document.getElementById('newsCount');

const newsRef = ref(db, 'NewsList');

// Fetch the data from Firebase and update the count
onValue(newsRef, (snapshot) => {
    const newsData = snapshot.val();
    const count = newsData ? Object.keys(newsData).length : 0;
    newsCountSpan.textContent = count;
});

// config-firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js'; // Impor getStorage dari Firebase Storage
const firebaseConfig = {
  apiKey: "AIzaSyAV5Ksy5dKllrvDqwgMk0hmRcGJHsmjzhI",
  authDomain: "newspedia-1d8af.firebaseapp.com",
  databaseURL: "https://newspedia-1d8af-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "newspedia-1d8af",
  storageBucket: "newspedia-1d8af.appspot.com",
  messagingSenderId: "795181966148",
  appId: "1:795181966148:web:a116e6ae46a85ab35fad11",
  measurementId: "G-XYYSCK63RJ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { db ,storage,auth};


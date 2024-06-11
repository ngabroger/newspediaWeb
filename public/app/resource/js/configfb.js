// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV5Ksy5dKllrvDqwgMk0hmRcGJHsmjzhI",
  authDomain: "newspedia-1d8af.firebaseapp.com",
  projectId: "newspedia-1d8af",
  storageBucket: "newspedia-1d8af.appspot.com",
  messagingSenderId: "795181966148",
  appId: "1:795181966148:web:a116e6ae46a85ab35fad11",
  measurementId: "G-XYYSCK63RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
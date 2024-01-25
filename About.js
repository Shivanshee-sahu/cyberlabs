import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, where, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiipxdvedsvk4ykh4BQ5AB1g6opx8wNEA",
    authDomain: "eduhelp-for.firebaseapp.com",
    projectId: "eduhelp-for",
    storageBucket: "eduhelp-for.appspot.com",
    messagingSenderId: "104784540576",
    appId: "1:104784540576:web:648af461e47bca47bd2ac5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("submit").addEventListener('click', function (e) {
    e.preventDefault(); // Fix typo: 'defaultPrevented' should be 'preventDefault'

    set(ref(db, 'user/' + document.getElementsByClassName("username").value), {
        username: document.getElementById("username").value,
       Branch: document.getElementById("Branch").value,
       Gender: document.getElementById("Gender").value,
       Phone_no: document.getElementById("Phone").value,
      City: document.getElementById("city").value,
       
  

        
    });

    alert("Your Information is Saved Successfully");
});


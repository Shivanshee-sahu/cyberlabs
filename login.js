var cta = document.querySelector(".cta");
var check = 0;

cta.addEventListener('click', function(e){
    var text = e.target.nextElementSibling;
    var loginText = e.target.parentElement;
    text.classList.toggle('show-hide');
    loginText.classList.toggle('expand');
    if(check == 0)
    {
        cta.innerHTML = "<i class=\"fas fa-chevron-up\"></i>";
        check++;
    }
    else
    {
        cta.innerHTML = "<i class=\"fas fa-chevron-down\"></i>";
        check = 0;
    }
})
/* === Firebase Setup === */

/* === UI === */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";

import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, onAuthStateChanged,GoogleAuthProvider, signInWithPopup ,  sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";


const provider = new GoogleAuthProvider();


  const firebaseConfig = {
    apiKey: "AIzaSyBPfDZJjBgSzbdSApeO0471NmPiKj-SHo0",
    authDomain: "eduhelp-forum-885aa.firebaseapp.com",
    projectId: "eduhelp-forum-885aa",
    storageBucket: "eduhelp-forum-885aa.appspot.com",
    messagingSenderId: "1008095975859",
    appId: "1:1008095975859:web:ad2142005a9353fa7313c6"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

 
/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")
const signOutButton = document.getElementById("sign-out-btn")
const forgotpass=document.getElementById("forgot-password")
const signInWithGoogleButton = document.getElementById("sign-in-with-google-btn")

const emailInput = document.getElementById("email-input")
const passwordInput= document.getElementById("password-input")

const signInButton = document.getElementById("sign-in-btn")
const createAccountButton = document.getElementById("create-account-btn")
signOutButton.addEventListener("click", authSignOut)

/* == UI - Event Listeners == */

signInWithGoogleButton.addEventListener("click", authSignInWithGoogle)

signInButton.addEventListener("click", authSignInWithEmail)
createAccountButton.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
      
        showLoggedInView()
  
      // ...
    } else {
        showLoggedOutView()
    }
  });

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log("Signed in with Google")
    }).catch((error) => {
        console.error(error.message)
    });
}

function authSignInWithEmail() {
   
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      clearAuthFields() 
     
    })
    .catch((error) => {
        console.error(error.message)
    });


}
let forgotpassword=()=>{
sendPasswordResetEmail(auth, emailInput.value)
.then(() => {
 alert("Password setting link has been sent to your Email!")
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
})}
function authSignOut() {
   
    signOut(auth).then(() => {
       
    }).catch((error) => {
        console.error(error.message)
    });
}

function authCreateAccountWithEmail() {
      const email = emailInput.value;
    const password = passwordInput.value;
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        clearAuthFields()
      
    })
    .catch((error) => {
        console.error(error.message)
    })
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
   view.style.display = "flex"
}

function hideView(view) {
    view.style.display = "none"}

    function clearInputField(field) {
        field.value = ""
    }
    
    function clearAuthFields() {
        clearInputField(emailInput)
        clearInputField(passwordInput)
    }
  
    forgotpass.addEventListener("click",forgotpassword);
    console.log("success");
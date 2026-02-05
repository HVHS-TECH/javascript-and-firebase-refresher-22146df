// script.js

//Variables
/********************************************/



/********************************************/

//Firebase Imports
/********************************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/********************************************/
//Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA8viBZ-gKBknRREyTiDinnugjj6Rjrog0",
  authDomain: "comp-2025-dylan-f.firebaseapp.com",
  databaseURL: "https://comp-2025-dylan-f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "comp-2025-dylan-f",
  storageBucket: "comp-2025-dylan-f.firebasestorage.app",
  messagingSenderId: "133223974410",
  appId: "1:133223974410:web:d1cde3ac980749bde601f3",
  measurementId: "G-WHVZ7GW4CF"
};
/********************************************/

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("welcomeMessage").innerHTML =
    "You've connected to the JavaScript!";

  const app = initializeApp(firebaseConfig);
  const gamedb = getDatabase(app);
  console.info(gamedb);
  console.log(
    "%c🔥🔥 FIREBASE ONLINE 🔥🔥",
    `
  color: #ff2b2b;
  font-size: 26px;
  font-weight: 900;
  background: black;
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 0 15px #ff2b2b;
  `
  );


  const textButton = document.getElementById("textInputBtn");
  textButton.addEventListener("click", () => {
    const input = document.getElementById("textInput").value;
    document.getElementById("welcomeMessage").innerHTML = input;
  });
});


/******************************************************/
// fb_login()
// Called by index.html on page load
// Log in to Firebase app
// Input: n/a
// Return: n/a
/******************************************************/
window.fb_login = function() {
  console.log("Login button clicked");
  const AUTH = getAuth();
  const PROVIDER = new GoogleAuthProvider();
  PROVIDER.setCustomParameters({
    prompt: 'select_account'
  });
  signInWithPopup(AUTH, PROVIDER)
    .then((result) => {
      const user = result.user;
      if (user) {
        console.log("User Signed In", user);
        document.getElementById('p_fbLogin').innerText = user.displayName || "Unknown User";
      } else {
        console.warn("No user returned after sign-in.");
        document.getElementById('p_fbLogin').innerText = "Login worked with no data available";
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      document.getElementById('p_fbLogin').innerText = "The Login has failed";
    });
}





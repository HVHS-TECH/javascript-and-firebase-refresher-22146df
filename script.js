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
  apiKey: "AIzaSyAg8lvqwt8ZU6G2tJwiyKOii7pgwO3jG2g",
  authDomain: "comp-refresh.firebaseapp.com",
  databaseURL: "https://comp-refresh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "comp-refresh",
  storageBucket: "comp-refresh.firebasestorage.app",
  messagingSenderId: "318121706998",
  appId: "1:318121706998:web:d5dca22b08182788c773d7",
  measurementId: "G-KEV1CCZJ41"
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





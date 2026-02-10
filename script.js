// script.js

//Variables
/********************************************/

let gamedb; //Global variable 
let user;

/********************************************/

//Firebase Imports
/********************************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
//Initialize 
/******************************************************/
document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  document.getElementById("welcomeMessage").innerHTML =
    "You've connected to the JavaScript!";
  const app = initializeApp(firebaseConfig);
  gamedb = getDatabase(app);
  console.info(gamedb);
  setupEventListeners();
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
  const AUTH = getAuth();

  onAuthStateChanged(AUTH, (currentUser) => {
    if (currentUser) {
      user = currentUser;
      document.getElementById('p_fbLogin').innerText = user.displayName || "Unknown User";
      console.log("User still logged in:", user);
    } else {
      user = null;
      console.log("No user logged in");
    }
  });
}
/******************************************************/
//Text Button Funcs
function setupEventListeners() {
  const textButton = document.getElementById("textInputBtn");

  textButton.addEventListener("click", handleWriteClick);

  const readButton = document.getElementById("readBtn");
  readButton.addEventListener("click", readFB);
}

function handleWriteClick() {
  const input = document.getElementById("textInput").value;
  console.log("Typed: " + input);
  writeFB(input);
}



/******************************************************/
// fb_login()
// Called by index.html on page load
// Log in to Firebase app
// Input: n/a
// Return: n/a
/******************************************************/
window.fb_login = function () {
  console.log("Login button clicked");
  const AUTH = getAuth();
  const PROVIDER = new GoogleAuthProvider();
  PROVIDER.setCustomParameters({
    prompt: 'select_account'
  });
  signInWithPopup(AUTH, PROVIDER)
    .then((result) => {
      user = result.user;
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


/******************************************************/
// writeFB()
// Called by index.html on page load
// Write a record to the realtime database
// Input: n/a
// Return: n/a
/******************************************************/
function writeFB(textInput) {
  console.log("Write to Firebase button clicked");
  const msg = document.getElementById("p_fbWriteRec");
  if (!user) {
    console.warn("No user is signed in. Please log in first.");
    msg.innerText = "Please log in before writing.";
    msg.style.color = "#ff4d4d";
    return;
  }
  const recordPath = "userWrite/" + user.displayName + "/text";
  const data = {
    Title: textInput,
  };
  const DATAREF = ref(gamedb, recordPath);

  msg.innerText = "Successfully Written: " + JSON.stringify(data);
  msg.style.color = "#4CAF50";

  set(DATAREF, data)
    .then(() => {
      console.log("Data Successfully written");


    })
    .catch((error) => {
      console.error("Error writing data:", error);
      document.getElementById("p_fbWriteRec").innerText = "Couldn't Write : " + JSON.stringify(data);

    });

}

/******************************************************/
// readFB
// Called by index.html on page load
// Write a record to the realtime database
// Input: n/a
// Return: n/a
/******************************************************/


function readFB() {
  const READPATH = "userWrite/" + user.displayName;
  const DATAREF = ref(gamedb, READPATH);

  get(DATAREF).then((snapshot) => {
    const fb_data = snapshot.val();
    console.log("fb_data is:", fb_data);
    document.getElementById("welcomeMessage").innerHTML =
      fb_data.text;

    if (fb_data != null) {
      let title = fb_data.text.title;
      console.log("Data successfully read:", title);
      document.getElementById("p_fbReadRec").innerText = "Read: " + title;
    } else {
      console.warn("No data found at", READPATH);
      document.getElementById("p_fbReadRec").innerText = "No data at " + READPATH;
    }
  }).catch((error) => {
    console.error("Error reading data:", error);
    document.getElementById("p_fbReadRec").innerText = "Failed to read from " + READPATH;
  });

}
// script.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
//Variables
/********************************************/



/********************************************/
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("welcomeMessage").innerHTML = "You've connected to the JavaScript!";
});

function headingButton(){
    document.getElementById("welcomeMessage").innerHTML = input;
}


function textInput(){
    var input = document.getElementById("textInput").value;
    document.getElementById("welcomeMessage").innerHTML = input;
}

function fb_setup() {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
}
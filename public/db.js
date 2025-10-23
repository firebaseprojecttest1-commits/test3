// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxD3g5LSohVSX3G0MQujJO-O6UbZ82V34",
  authDomain: "test3-9ddf1.firebaseapp.com",
  databaseURL: "https://test3-9ddf1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test3-9ddf1",
  storageBucket: "test3-9ddf1.firebasestorage.app",
  messagingSenderId: "418801365169",
  appId: "1:418801365169:web:7cb6effb4bcb7fe8b07290",
  measurementId: "G-CMWSEM98DG"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Form submit event
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values
  const name = document.getElementById("name").value.trim();
  const emailid = document.getElementById("emailid").value.trim();
  const msgContent = document.getElementById("msgContent").value.trim();

  if (!name || !emailid || !msgContent) {
    alert("Please fill out all fields.");
    return;
  }

  // Reference and push data
  const contactsRef = ref(db, "contacts");
  const newContactRef = push(contactsRef);

  set(newContactRef, {
    name: name,
    email: emailid,
    message: msgContent,
    timestamp: new Date().toISOString(),
  })
    .then(() => {
      document.querySelector(".alert").style.display = "block";
      setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
      }, 3000);
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      alert("Error sending data: " + error.message);
      console.error(error);
    });
});

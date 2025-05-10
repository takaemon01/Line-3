import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHaf3Deu1DpR42p5qZrxtwj3oHoC1_Up0",
  authDomain: "line-chat-3f9f0.firebaseapp.com",
  databaseURL: "https://line-chat-3f9f0-default-rtdb.firebaseio.com",
  projectId: "line-chat-3f9f0",
  storageBucket: "line-chat-3f9f0.firebasestorage.app",
  messagingSenderId: "965302170225",
  appId: "1:965302170225:web:6847a02de49ddd217661d0",
  measurementId: "G-44V3JNS2M9"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

document.getElementById("sendBtn").addEventListener("click", () => {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message !== "") {
    push(messagesRef, { text: message });
    input.value = "";
  }
});

onChildAdded(messagesRef, (data) => {
  const msg = data.val();
  console.log("新しいメッセージ:", msg);
  const li = document.createElement("li");
  li.textContent = msg.text;
  document.getElementById("messages").appendChild(li);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2Rzo8QWPTtam4KtlfV2EaT3wf8corGro",
  authDomain: "line-chat-app-1c6ee.firebaseapp.com",
  projectId: "line-chat-app-1c6ee",
  storageBucket: "line-chat-app-1c6ee.firebasestorage.app",
  messagingSenderId: "244301193406",
  appId: "1:244301193406:web:b63a62f866367c0f257eef"
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
  const li = document.createElement("li");
  li.textContent = msg.text;
  document.getElementById("messages").appendChild(li);
});

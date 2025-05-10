import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const messagesRef = ref(db, "messages");

// ユーザーの認証状態を監視
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("sendBtn").disabled = false;
    console.log("ログイン中:", user.displayName);
  } else {
    // ログインしてないならログインする
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("ログイン成功:", result.user.displayName);
      })
      .catch((error) => {
        console.error("ログインエラー:", error);
      });
  }
});

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

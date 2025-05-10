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
  appId: "1:965302170225:web:6847a02de49ddd217661d0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const messagesRef = ref(db, "messages");

function setupChat() {
  // メッセージ送信処理
  document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    if (message !== "") {
      push(messagesRef, { text: message });
      input.value = "";
    }
  });

  // メッセージ受信処理
  onChildAdded(messagesRef, (data) => {
    const msg = data.val();
    const li = document.createElement("li");
    li.textContent = msg.text;
    document.getElementById("messages").appendChild(li);
  });
}

// 認証状態を確認してからチャット処理を開始
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("ログイン中:", user.displayName);
    setupChat();
  } else {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("ログイン成功:", result.user.displayName);
        setupChat();
      })
      .catch((error) => {
        console.error("ログインエラー:", error);
      });
  }
});

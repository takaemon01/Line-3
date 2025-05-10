import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔧 あなたの Firebase 設定
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

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const messagesRef = ref(db, "messages");

// 🔑 ログインボタンをクリックしたら認証
document.getElementById("loginBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("ログイン成功:", result.user.displayName);
    })
    .catch((error) => {
      console.error("ログインエラー:", error);
    });
});

// 🔄 ログイン状態を監視
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("ログイン済み:", user.displayName);
    document.getElementById("sendBtn").disabled = false;
  }
});

// 📤 メッセージ送信
document.getElementById("sendBtn").addEventListener("click", () => {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message !== "") {
    push(messagesRef, { text: message });
    input.value = "";
  }
});

// 📥 メッセージ受信
onChildAdded(messagesRef, (data) => {
  const msg = data.val();
  const li = document.createElement("li");
  li.textContent = msg.text;
  
  // クリック（またはタップ）でメッセージを削除
  li.addEventListener("click", () => {
    remove(ref(db, "messages/" + data.key)); // メッセージをデータベースから削除
    li.remove(); // DOMからも削除
  });

  document.getElementById("messages").appendChild(li);
});

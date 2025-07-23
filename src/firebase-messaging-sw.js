importScripts(
    "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js",
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js",
  );
  
  firebase.initializeApp({
    apiKey: "AIzaSyBjoCjuCVt0vB6WODG3f7w4Az8dnvL72KE",
    authDomain: "paraguay-courier.firebaseapp.com",
    projectId: "paraguay-courier",
    storageBucket: "paraguay-courier.appspot.com",
    messagingSenderId: "588168558953",
    appId: "1:588168558953:web:2bbb6ff177f2c03a2e25f8",
    measurementId: "G-N65ZD2EBXZ"
  });
  const messaging = firebase.messaging();
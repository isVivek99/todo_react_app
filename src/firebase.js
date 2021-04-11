import firebase from "firebase";
  
  const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyB9eqhDt3_MQLpyP1McOPraqF7mC2n-MI8",
        authDomain: "todo-app-29ebd.firebaseapp.com",
        projectId: "todo-app-29ebd",
        storageBucket: "todo-app-29ebd.appspot.com",
        messagingSenderId: "356869387638",
        appId: "1:356869387638:web:1ca7e604d2573af6647657"
    
  });

  const db = firebaseApp.firestore();


  export default db;
// Your Firebase web app's configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnOI1lIMYVD_L_2AE6PxgyixY16jqZeJY",
  authDomain: "hydronetics-2ac6a.firebaseapp.com",
  projectId: "hydronetics-2ac6a",
  storageBucket: "hydronetics-2ac6a.appspot.com",
  messagingSenderId: "469485505135",
  appId: "1:469485505135:web:e293dfa08e2ddd8f899b9a",
  measurementId: "G-LC5SNT2WVW"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

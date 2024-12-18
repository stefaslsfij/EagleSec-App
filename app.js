// Initialize Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Elements
const signUpBtn = document.getElementById('signUpBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userDashboard = document.getElementById('userDashboard');
const authSection = document.getElementById('authSection');
const usernameElement = document.getElementById('username');
const profilePicElement = document.getElementById('profilePic');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const outlookLoginBtn = document.getElementById('outlookLoginBtn');

// Firebase sign-up logic
signUpBtn.addEventListener('click', () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  const captchaResponse = prompt("Enter the CAPTCHA code:");

  if (captchaResponse === "1234") { // Simulate CAPTCHA check
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        sendVerificationEmail(user);
      })
      .catch(error => {
        console.error(error.message);
        alert("Error signing up: " + error.message);
      });
  } else {
    alert("Captcha incorrect.");
  }
});

// Send verification email after sign-up
function sendVerificationEmail(user) {
  user.sendEmailVerification()
    .then(() => {
      alert("Verification email sent. Please check your inbox.");
    })
    .catch((error) => {
      console.error("Error sending email verification: ", error);
    });
}

// Firebase login logic
loginBtn.addEventListener('click', () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (user.emailVerified) {
        showUserDashboard(user);
      } else {
        alert("Please verify your email before logging in.");
      }
    })
    .catch(error => {
      console.error(error.message);
      alert("Error logging in: " + error.message);
    });
});

// Show user dashboard after successful login
function showUserDashboard(user) {
  authSection.style.display = 'none';
  userDashboard.style.display = 'block';
  usernameElement.textContent = user.email;

  // Simulate loading profile picture (In a real app, this would be fetched from Firebase Storage)
  profilePicElement.src = "assets/profile-pic.jpg"; 
}

// Log out logic
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    userDashboard.style.display = 'none';
    authSection.style.display = 'block';
  }).catch(error => {
    console.error(error.message);
  });
});

// Google sign-in logic
googleLoginBtn.querySelector('button').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      showUserDashboard(user);
    })
    .catch(error => {
      console.error(error.message);
    });
});

// Outlook sign-in logic (using Microsoft provider)
outlookLoginBtn.querySelector('button').addEventListener('click', () => {
  const provider = new firebase.auth.OAuthProvider('microsoft.com');
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      showUserDashboard(user);
    })
    .catch(error => {
      console.error(error.message);
    });
});

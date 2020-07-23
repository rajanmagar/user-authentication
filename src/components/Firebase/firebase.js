import app from 'firebase/app';
import 'firebase/auth'; // Import and instantiate the package from Firebase responsible for all the authentication

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }
  // Let's define all the authentication functions as class methods step by step
  createUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  signOut = () => this.auth.signOut();
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);
  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;

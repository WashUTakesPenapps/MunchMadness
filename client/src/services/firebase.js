import firebase from 'firebase';
//var firebase = require("firebase/app");

// may want to have another file to configure / somehow hide this information

const firebaseConfig = {
  apiKey: "AIzaSyDmmROengKXvPdrG3qsQ505C10yImnZ0Tk",
  authDomain: "munch-madness-d2573.firebaseapp.com",
  databaseURL: "https://munch-madness-d2573.firebaseio.com",
  projectId: "munch-madness-d2573",
  storageBucket: "munch-madness-d2573.appspot.com",
  messagingSenderId: "657051909764",
  appId: "1:657051909764:web:c52e717e3995815af0ccd1",
  measurementId: "G-3TDV966TLE"
};
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
export const auth = firebase.auth;
export const firestore = firebase.firestore();
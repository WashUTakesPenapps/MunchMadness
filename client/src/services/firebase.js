// import firebase from 'firebase';
var firebase = require("firebase");

// may want to have another file to configure / somehow hide this information

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "munch-madness-d2573.firebaseapp.com",
  databaseURL: "https://munch-madness-d2573.firebaseio.com",
  projectId: "munch-madness-d2573",
  storageBucket: "munch-madness-d2573.appspot.com",
  messagingSenderId: "657051909764",
  appId: "1:657051909764:web:c52e717e3995815af0ccd1",
  measurementId: "G-3TDV966TLE"
};
const Firebase = firebase.initializeApp(firebaseConfig);

exports.Firebase = Firebase;
// exports.firestore = Firebase.firestore();
// export default Firebase;
// export const database = firebase.database();
// export const auth = firebase.auth;
// export const firestore = firebase.firestore();
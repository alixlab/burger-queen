import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCDLgxoWum0G3wZM2_rd858yDI-Ey7XC9I",
  authDomain: "burger-queen-alixlab.firebaseapp.com",
  databaseURL: "https://burger-queen-alixlab.firebaseio.com",
  projectId: "burger-queen-alixlab",
  storageBucket: "burger-queen-alixlab.appspot.com",
  messagingSenderId: "38720981304",
  appId: "1:38720981304:web:94f0159752ac4b14"
};

firebase.initializeApp(config);

export default firebase;
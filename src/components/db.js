import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyDdEVUJsGgMsBZo7TXadXuTi6TcVydz_Gs",
    authDomain: "fir-test-1bd65.firebaseapp.com",
    databaseURL: "https://fir-test-1bd65.firebaseio.com",
    projectId: "fir-test-1bd65",
    storageBucket: "fir-test-1bd65.appspot.com",
    messagingSenderId: "584389447557"
};

let app = firebase.initializeApp(config);
const db = app.database();
export default db
const firebaseConfig = {
    apiKey: "AIzaSyC45TRUhvI901LPrAXVvoZQfEFy6ztwzuI",
    authDomain: "riofer-537b0.firebaseapp.com",
    projectId: "riofer-537b0",
    storageBucket: "riofer-537b0.appspot.com",
    messagingSenderId: "527328928618",
    appId: "1:527328928618:web:347dde977416cb3eed7b13",
    databaseURL: "https://riofer-537b0-default-rtdb.firebaseio.com",
    measurementId: "G-7HQVGFSKHC"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database(); 
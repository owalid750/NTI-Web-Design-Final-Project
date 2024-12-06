// firebaseConfig.js
const firebaseConfig = {
    apiKey: "AIzaSyCx8q-2LBID9UpBDwlQZMGdkKGxZf6fRA0",
    authDomain: "nti-final-project.firebaseapp.com",
    projectId: "nti-final-project",
    storageBucket: "nti-final-project.appspot.com",
    messagingSenderId: "444254633812",
    appId: "1:444254633812:web:53cbd71ac0d3d6036852c1"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };


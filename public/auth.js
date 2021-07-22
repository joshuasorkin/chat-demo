 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBDCZ7lehJGVY4tAWyPzAXkEiekx9QJkUY",
    authDomain: "chatabolic.firebaseapp.com",
    projectId: "chatabolic",
    storageBucket: "chatabolic.appspot.com",
    messagingSenderId: "307425308969",
    appId: "1:307425308969:web:c46450f53bc49e8e8d8738"
};
firebase.initializeApp(firebaseConfig);

const txtEmail=document.getElementById('txtEmail');
const txtPassword=document.getElementById('txtPassword');
const btnLogin=document.getElementById('btnLogin');
const btnSignup=document.getElementById('btnSignup');
const btnLogout=document.getElementById('btnLogout');

btnLogin.addEventListener('click',e=>{
    const email = txtEmail.value
    const pass = txtPassword.value;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email,pass)
    .catch(e=>console.log(e.message));

})
import { auth, db } from './firebase-config.js';



/* Function To make Sign-Up */
export function signUp(email, password, name) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Save user data to Firestore
            return db.collection('users').doc(user.uid).set({
                name: name,
                email: user.email,
            })
                .then(() => {
                    console.log('User signed up and data saved to Firestore!');
                    // Optionally store user info in sessionStorage or localStorage
                    /* sessionStorage.setItem('userEmail', user.email);
                    sessionStorage.setItem('userName', name);
                    sessionStorage.setItem('userUid', user.uid); */
                })
        })
        .catch((error) => {
            // Return error message to be handled in the form submission
            throw new Error(error.message);
        });
}

/* function to make Sign-In  */
export function signIn(email, password) {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Fetch user data from Firestore using user.uid to get the name
                db.collection('users').doc(user.uid).get()
                    .then((doc) => {
                        if (doc.exists) {
                            const userData = doc.data();
                            // Store email and name in sessionStorage
                            sessionStorage.setItem('userEmail', user.email);
                            sessionStorage.setItem('userName', userData.name);
                            sessionStorage.setItem('userUid', user.uid);
                            console.log('User signed in and data saved to sessionStorage!');
                            resolve();  // Resolve when sign-in is successful
                        } else {
                            reject('No user data found in Firestore.');
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching user data from Firestore:", error.message);
                        reject('Error fetching user data from Firestore.');
                    });
            })
            .catch((error) => {
                reject(error.message);
            });
    });
}














/* Function to Check User is Login or Not  */
export function checkUserStatus() {
    // Get user data from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');
    const userName = sessionStorage.getItem('userName');

    const welcomeMessage = document.getElementById('welcome-message');
    const authButton = document.getElementById('auth-btn');

    if (userEmail && userName) {
        // If user is logged in, show the welcome message and Log Out button
        welcomeMessage.textContent = `Welcome, ${userName}`;
        welcomeMessage.style.display = 'inline';
        welcomeMessage.style.color = "#ffc400";

        authButton.textContent = 'Log Out';
        authButton.style.display = 'inline';

        // Add an event listener for Log Out button
        authButton.addEventListener('click', function () {
            const confirmed = window.confirm("Are you sure you want to log out?");
            if (confirmed) {
                // Clear sessionStorage on logout
                sessionStorage.removeItem('userEmail');
                sessionStorage.removeItem('userName');

                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    } else {
        // If no user is logged in, show the "Sign In" button
        authButton.textContent = 'Sign In';
        authButton.href = 'login.html';
        authButton.style.display = 'inline';
    }
}

